/**
 * seo-check.mjs  →  `npm run seo:check`   (run `npm run build` first)
 *
 * A fast, offline SEO and branding check of every pre-rendered page in dist/.
 * It needs no browser and no internet. It does NOT replace Lighthouse (`npm run audit`) or
 * Google Search Console: it only proves the things that can be verified from the HTML files.
 *
 * Checks per page: unique <title> and meta description (and sensible lengths), canonical URL
 * on the production domain with the right path, one H1 and no skipped heading levels, Open
 * Graph + Twitter tags, JSON-LD that parses, every <img> has an alt attribute, internal links
 * point to pages that exist, no empty or generic link text, mailto links use the contact
 * email, robots meta (404 = noindex, all others indexable), and no leftover old brand name.
 * Site-wide: robots.txt points to the sitemap, and the sitemap matches the built pages.
 *
 * Exit code 1 if any ERROR is found (warnings do not fail the check).
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = path.resolve("dist");
const { site } = await import(pathToFileURL(path.resolve("dist-server/entry-server.js")).href);
const SITE_URL = (process.env.VITE_SITE_URL || site.siteUrl).replace(/\/$/, "");

const errors = [];
const warnings = [];
const err = (page, message) => errors.push(`${page}: ${message}`);
const warn = (page, message) => warnings.push(`${page}: ${message}`);

/** Every index.html under dist (one per page) → URL path. */
function collectPages(dir = DIST, found = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "assets") collectPages(full, found);
    } else if (name === "index.html") {
      const rel = path.relative(DIST, dir).split(path.sep).join("/");
      found.push(rel ? `/${rel}` : "/");
    }
  }
  return found;
}

const decode = (text) =>
  text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x27;|&#39;/g, "'");
const stripTags = (html) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const meta = (html, attr, key) => {
  const tag = html.match(new RegExp(`<meta[^>]*\\b${attr}="${key}"[^>]*>`, "i"))?.[0];
  const value = tag?.match(/content="([^"]*)"/i)?.[1];
  return value === undefined ? null : decode(value);
};

const pages = collectPages().sort();
const seenTitles = new Map();
const seenDescriptions = new Map();
const pageExists = (urlPath) => {
  const clean = urlPath.replace(/\/$/, "") || "/";
  if (clean === "/") return true;
  return existsSync(path.join(DIST, clean, "index.html")) || (existsSync(path.join(DIST, clean)) && statSync(path.join(DIST, clean)).isFile());
};

for (const pagePath of pages) {
  const file = pagePath === "/" ? path.join(DIST, "index.html") : path.join(DIST, pagePath, "index.html");
  const html = readFileSync(file, "utf8");

  // ----- title, description -----
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
  const description = meta(html, "name", "description");
  if (!title) err(pagePath, "missing <title>");
  else {
    if (title.length < 30 || title.length > 65) warn(pagePath, `title length ${title.length} (aim for 50–60)`);
    if (seenTitles.has(title)) err(pagePath, `duplicate title (also on ${seenTitles.get(title)})`);
    seenTitles.set(title, pagePath);
  }
  if (!description) err(pagePath, "missing meta description");
  else {
    if (description.length < 120 || description.length > 170) warn(pagePath, `description length ${description.length} (aim for 140–160)`);
    if (seenDescriptions.has(description)) err(pagePath, `duplicate description (also on ${seenDescriptions.get(description)})`);
    seenDescriptions.set(description, pagePath);
  }

  // ----- canonical + robots -----
  const robots = meta(html, "name", "robots");
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1];
  const is404 = pagePath === "/404.html";
  if (!robots) err(pagePath, "missing robots meta tag");
  else if (/noindex/i.test(robots)) warn(pagePath, `is set to ${robots}`);
  if (canonical) {
    const expected = SITE_URL + (pagePath === "/" ? "" : pagePath);
    if (canonical !== expected) err(pagePath, `canonical is ${canonical}, expected ${expected}`);
  } else err(pagePath, "missing canonical link");
  if (meta(html, "property", "og:url") !== canonical) err(pagePath, "og:url does not match canonical");

  // ----- Open Graph / Twitter -----
  for (const key of ["og:title", "og:description", "og:image", "og:type", "og:site_name"]) {
    if (!meta(html, "property", key)) err(pagePath, `missing ${key}`);
  }
  if (!meta(html, "name", "twitter:card")) err(pagePath, "missing twitter:card");
  if (!meta(html, "name", "viewport")) err(pagePath, "missing viewport meta (mobile friendliness)");
  if (!/<html[^>]*\blang="/i.test(html)) err(pagePath, "missing lang attribute on <html>");

  // ----- headings -----
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: stripTags(m[2]) }));
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length !== 1) err(pagePath, `${h1s.length} H1 headings (expected exactly 1)`);
  else if (!h1s[0].text) err(pagePath, "H1 is empty");
  let previous = 0;
  for (const heading of headings) {
    if (previous && heading.level > previous + 1) {
      warn(pagePath, `heading level skips from H${previous} to H${heading.level} ("${heading.text.slice(0, 40)}")`);
    }
    previous = heading.level;
  }

  // ----- images -----
  let decorative = 0;
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    const alt = tag.match(/\balt="([^"]*)"/i);
    const src = tag.match(/\bsrc="([^"]*)"/i)?.[1] || "";
    if (!alt) err(pagePath, `<img> without alt attribute: ${src}`);
    else if (alt[1] === "") decorative++;
    if (src.startsWith("/") && !existsSync(path.join(DIST, src.split("?")[0]))) err(pagePath, `image file not found in dist: ${src}`);
  }

  // ----- JSON-LD -----
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (ldBlocks.length === 0 && !is404) warn(pagePath, "no JSON-LD structured data");
  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(decode(block[1]));
      for (const data of Array.isArray(parsed) ? parsed : [parsed]) {
        if (!data["@context"] || !data["@type"]) err(pagePath, "JSON-LD without @context/@type");
      }
    } catch {
      err(pagePath, "JSON-LD does not parse as JSON");
    }
  }

  // ----- links -----
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = match[1].match(/\bhref="([^"]*)"/i)?.[1];
    const text = stripTags(match[2]);
    const label = match[1].match(/aria-label="([^"]*)"/i)?.[1];
    if (href === undefined) continue;
    if (!text && !label) err(pagePath, `link without text: ${href}`);
    if (/^(click here|here|read more|more|link)$/i.test(text)) warn(pagePath, `generic link text "${text}" → ${href}`);
    if (href.startsWith("mailto:") && href !== `mailto:${site.email}`) err(pagePath, `unexpected email link ${href}`);
    if (/^https?:\/\//i.test(href)) {
      if (/dhyanyog/i.test(href)) err(pagePath, `old domain in link ${href}`);
      continue;
    }
    if (href.startsWith("/") && !href.startsWith("//")) {
      const target = href.split("#")[0].split("?")[0];
      if (target && !pageExists(target)) err(pagePath, `broken internal link ${href}`);
    }
  }

  // ----- leftover old brand -----
  if (/dhyan ?yog|dhyanyog/i.test(html)) err(pagePath, "still mentions the old name “Dhyan Yog”");
  if (/gradient/i.test(html.replace(/<script[\s\S]*?<\/script>/gi, ""))) warn(pagePath, "markup still contains the word “gradient”");
  void decorative;
}

// ----- the 404 page -----
const notFound = readFileSync(path.join(DIST, "404.html"), "utf8");
if (!/noindex/i.test(meta(notFound, "name", "robots") || "")) err("/404.html", "404 page must be noindex");

// ----- robots.txt + sitemap -----
const robotsTxt = readFileSync(path.join(DIST, "robots.txt"), "utf8");
if (!robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) err("robots.txt", "does not point to the production sitemap");
if (!/Disallow: \/api\//.test(robotsTxt)) err("robots.txt", "does not block /api/");
const sitemap = readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const url of sitemapUrls) {
  if (!url.startsWith(SITE_URL)) err("sitemap.xml", `URL not on ${SITE_URL}: ${url}`);
  const urlPath = url.slice(SITE_URL.length) || "/";
  if (!pages.includes(urlPath)) err("sitemap.xml", `lists a page that was not built: ${url}`);
}
for (const pagePath of pages) {
  const url = SITE_URL + (pagePath === "/" ? "" : pagePath);
  if (!sitemapUrls.includes(url)) err("sitemap.xml", `missing built page ${url}`);
}

console.log(`Checked ${pages.length} pages (+ 404.html, robots.txt, sitemap.xml with ${sitemapUrls.length} URLs) against ${SITE_URL}`);
if (warnings.length) console.log(`\n${warnings.length} warning(s):\n  ${warnings.join("\n  ")}`);
if (errors.length) {
  console.log(`\n${errors.length} ERROR(S):\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log("\nNo errors found.");
