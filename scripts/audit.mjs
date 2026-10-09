/**
 * audit.mjs: the per-page SEO & performance audit (run with: npm run audit)
 *
 * WHAT IT DOES:
 *  1. Builds the site (npm run build) and serves the dist/ folder locally on port 3123.
 *     (Skip this and test a live site instead with: npm run audit -- --url=https://www.yoursite.com)
 *  2. Reads /sitemap.xml to get the list of every page.
 *  3. Runs Google Lighthouse on each page twice: once as a phone (mobile) and once as a desktop.
 *  4. Also checks each page's HTML for: <title> length, meta description length,
 *     exactly one <h1>, and images without alt text.
 *  5. Writes reports/seo-report.md (a table) and reports/seo-report.html (same table, coloured),
 *     plus the full Lighthouse HTML report of every page in reports/lighthouse/.
 *  6. FAILS (exit code 1) if any page has an SEO score below 95 or a mobile Performance
 *     score below 90, so it can be used in CI before deploying.
 *
 * OPTIONS:
 *   --url=<address>   Audit an already running site instead of building one locally
 *   --skip-build      Use the existing dist/ build (faster when re-running)
 *   --limit=<n>       Only audit the first n pages (quick check)
 *
 * REQUIREMENTS: Google Chrome or Chromium installed on the computer. If Chrome is in an
 * unusual place, set CHROME_PATH, e.g. CHROME_PATH=/usr/bin/chromium npm run audit
 */
import { spawn, execSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

/* ----------------------------- settings ----------------------------- */
const PORT = 3123;
const THRESHOLDS = { seo: 95, mobilePerformance: 90 };
const REPORT_DIR = path.resolve("reports");
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

/* ------------------------- read command options ------------------------- */
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value] = arg.replace(/^--/, "").split("=");
    return [key, value ?? true];
  })
);
const externalUrl = typeof args.url === "string" ? args.url.replace(/\/$/, "") : null;
const baseUrl = externalUrl || `http://localhost:${PORT}`;
const limit = args.limit ? Number(args.limit) : Infinity;

/* ------------------------------ helpers ------------------------------ */

/** Waits until the local server answers, or gives up after ~60 seconds. */
async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      /* not ready yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Server at ${url} did not start in time.`);
}

/**
 * Reads the sitemap and returns page paths ("/", "/about", ...).
 * The sitemap contains the live domain; we keep only the path and test it on baseUrl.
 */
async function getPagePaths() {
  const xml = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  return urls.map((url) => new URL(url).pathname).slice(0, limit);
}

/**
 * Quick HTML checks that complement Lighthouse.
 * @param {string} html
 * @returns {{title:string, titleLength:number, descriptionLength:number, h1Count:number, imagesWithoutAlt:number, issues:string[]}}
 */
function checkHtml(html) {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").replace(/&amp;/g, "&").trim();
  const description =
    html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] ||
    html.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i)?.[1] ||
    "";
  const decodedDescription = description.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'");
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const imagesWithoutAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/gi) || []).length;

  const issues = [];
  if (!title) issues.push("missing title");
  else if (title.length < 50 || title.length > 60) issues.push(`title ${title.length} chars`);
  if (!decodedDescription) issues.push("missing description");
  else if (decodedDescription.length < 140 || decodedDescription.length > 160)
    issues.push(`description ${decodedDescription.length} chars`);
  if (h1Count !== 1) issues.push(`${h1Count} h1 tags`);
  if (imagesWithoutAlt > 0) issues.push(`${imagesWithoutAlt} img without alt`);

  return { title, titleLength: title.length, descriptionLength: decodedDescription.length, h1Count, imagesWithoutAlt, issues };
}

/**
 * Runs Lighthouse for one URL.
 * @param {string} url
 * @param {"mobile"|"desktop"} formFactor
 * @param {number} port Chrome debugging port
 * @returns {Promise<{scores: Record<string, number>, html: string}>}
 */
async function runLighthouse(url, formFactor, port) {
  const config =
    formFactor === "desktop"
      ? {
          extends: "lighthouse:default",
          settings: {
            formFactor: "desktop",
            screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
            throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
          },
        }
      : { extends: "lighthouse:default" }; // default = Moto G Power phone on slow 4G

  const result = await lighthouse(
    url,
    { port, output: "html", onlyCategories: CATEGORIES, logLevel: "error" },
    config
  );
  const scores = Object.fromEntries(
    CATEGORIES.map((category) => [category, Math.round((result.lhr.categories[category].score ?? 0) * 100)])
  );
  return { scores, html: result.report };
}

/** Coloured cell for the HTML report: green ≥90, orange ≥50, red below. */
function scoreCell(score) {
  const colour = score >= 90 ? "#0c7a43" : score >= 50 ? "#b45309" : "#b91c1c";
  return `<td style="color:${colour};font-weight:600;text-align:center">${score}</td>`;
}

/* -------------------------------- main -------------------------------- */
async function main() {
  let server;

  if (!externalUrl) {
    if (!args["skip-build"]) {
      console.log("▶ Building the site (npm run build)...");
      execSync("npm run build", { stdio: "inherit" });
    }
    console.log(`▶ Starting the site on ${baseUrl} ...`);
    // `vite preview` serves the built dist/ folder, like a real host would.
    server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
      stdio: "ignore",
      shell: process.platform === "win32",
    });
    await waitForServer(baseUrl);
  }

  const paths = await getPagePaths();
  console.log(`▶ Auditing ${paths.length} pages (mobile + desktop). This takes a few minutes...`);

  await mkdir(path.join(REPORT_DIR, "lighthouse"), { recursive: true });
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });

  const rows = [];
  try {
    for (const pagePath of paths) {
      const url = `${baseUrl}${pagePath}`;
      const html = await (await fetch(url)).text();
      const htmlCheck = checkHtml(html);
      const mobile = await runLighthouse(url, "mobile", chrome.port);
      const desktop = await runLighthouse(url, "desktop", chrome.port);

      // Save the full Lighthouse reports, e.g. reports/lighthouse/digital-marketing__seo.mobile.html
      const fileBase = pagePath === "/" ? "home" : pagePath.slice(1).replace(/\//g, "__");
      await writeFile(path.join(REPORT_DIR, "lighthouse", `${fileBase}.mobile.html`), mobile.html);
      await writeFile(path.join(REPORT_DIR, "lighthouse", `${fileBase}.desktop.html`), desktop.html);

      const failed =
        mobile.scores.seo < THRESHOLDS.seo ||
        desktop.scores.seo < THRESHOLDS.seo ||
        mobile.scores.performance < THRESHOLDS.mobilePerformance;

      rows.push({ pagePath, fileBase, mobile: mobile.scores, desktop: desktop.scores, htmlCheck, failed });
      console.log(
        `${failed ? "✖" : "✔"} ${pagePath.padEnd(48)} mobile P${mobile.scores.performance} A${mobile.scores.accessibility} BP${mobile.scores["best-practices"]} SEO${mobile.scores.seo} | desktop P${desktop.scores.performance} SEO${desktop.scores.seo}${
          htmlCheck.issues.length ? `  ⚠ ${htmlCheck.issues.join(", ")}` : ""
        }`
      );
    }
  } finally {
    await chrome.kill();
    server?.kill();
  }

  /* ----------------------------- write reports ----------------------------- */
  const generatedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const markdown = [
    `# SEO & Performance Report`,
    ``,
    `Generated: ${generatedAt} (IST) · Site: ${baseUrl} · Pages: ${rows.length}`,
    ``,
    `Pass rules: SEO ≥ ${THRESHOLDS.seo} on mobile and desktop, mobile Performance ≥ ${THRESHOLDS.mobilePerformance}.`,
    ``,
    `| Page | Mobile Perf | Mobile A11y | Mobile BP | Mobile SEO | Desktop Perf | Desktop A11y | Desktop BP | Desktop SEO | HTML checks | Result |`,
    `|---|---|---|---|---|---|---|---|---|---|---|`,
    ...rows.map(
      (row) =>
        `| ${row.pagePath} | ${row.mobile.performance} | ${row.mobile.accessibility} | ${row.mobile["best-practices"]} | ${row.mobile.seo} | ${row.desktop.performance} | ${row.desktop.accessibility} | ${row.desktop["best-practices"]} | ${row.desktop.seo} | ${row.htmlCheck.issues.join(", ") || "OK"} | ${row.failed ? "❌ FAIL" : "✅ PASS"} |`
    ),
    ``,
  ].join("\n");
  await writeFile(path.join(REPORT_DIR, "seo-report.md"), markdown);

  const htmlReport = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SEO Report – DnyanYoga</title>
<style>body{font-family:system-ui,sans-serif;margin:24px;color:#1f2937}table{border-collapse:collapse;width:100%;font-size:14px}th,td{border:1px solid #e5e7eb;padding:6px 8px}th{background:#23206b;color:#fff;position:sticky;top:0}tr:nth-child(even){background:#f9fafb}a{color:#23206b}</style></head>
<body><h1>SEO &amp; Performance Report</h1><p>Generated ${generatedAt} (IST) · ${baseUrl} · ${rows.length} pages</p>
<table><thead><tr><th>Page</th><th>M Perf</th><th>M A11y</th><th>M BP</th><th>M SEO</th><th>D Perf</th><th>D A11y</th><th>D BP</th><th>D SEO</th><th>HTML checks</th><th>Result</th><th>Full reports</th></tr></thead><tbody>
${rows
  .map(
    (row) =>
      `<tr><td>${row.pagePath}</td>${CATEGORIES.map((c) => scoreCell(row.mobile[c])).join("")}${CATEGORIES.map((c) => scoreCell(row.desktop[c])).join("")}<td>${
        row.htmlCheck.issues.join(", ") || "OK"
      }</td><td>${row.failed ? "❌ FAIL" : "✅ PASS"}</td><td><a href="lighthouse/${row.fileBase}.mobile.html">mobile</a> · <a href="lighthouse/${row.fileBase}.desktop.html">desktop</a></td></tr>`
  )
  .join("\n")}
</tbody></table></body></html>`;
  await writeFile(path.join(REPORT_DIR, "seo-report.html"), htmlReport);

  const failures = rows.filter((row) => row.failed);
  console.log(`\n▶ Reports written to reports/seo-report.md and reports/seo-report.html`);
  if (failures.length > 0) {
    console.error(`✖ ${failures.length} page(s) below the thresholds:\n  ${failures.map((row) => row.pagePath).join("\n  ")}`);
    process.exit(1);
  }
  console.log("✔ All pages passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
