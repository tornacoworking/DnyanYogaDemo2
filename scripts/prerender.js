/**
 * prerender.js (runs automatically at the end of `npm run build`)
 *
 * WHAT IT DOES: a normal React app sends an empty page and builds it in the browser,
 * which is slow on phones and harder for Google to read. This script fixes that by
 * turning every page into a complete HTML file at build time ("pre-rendering"):
 *
 *  1. Reads dist/index.html (the shell made by `vite build`, with the CSS/JS links).
 *  2. Loads dist-server/entry-server.js (made by `vite build --ssr`).
 *  3. For every page in getPages(): renders it to HTML, collects its SEO tags, and saves
 *     dist/<page>/index.html, e.g. dist/digital-marketing/seo/index.html.
 *  4. Saves the 404 page as dist/404.html (Vercel and Netlify show it for unknown URLs).
 *  5. Writes dist/sitemap.xml and dist/robots.txt.
 *  6. Warns if any title or description is outside the recommended length.
 *
 * When visitors open a page, they get this ready-made HTML instantly; React then
 * "hydrates" it (see src/main.jsx) so clicks between pages are instant.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = path.resolve("dist");

/** Makes text safe to put inside an HTML attribute or tag. */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const template = await readFile(path.join(DIST, "index.html"), "utf8");
const server = await import(pathToFileURL(path.resolve("dist-server/entry-server.js")).href);
const { render, getPages, metaToTags, site, absoluteUrl } = server;

/**
 * Builds the full HTML file for one page.
 * @param {string} url
 * @returns {{ html: string, meta: Object }}
 */
function buildPage(url) {
  const { html: appHtml, headHtml, meta } = render(url);
  if (!meta) throw new Error(`Page ${url} did not render a <Seo> component.`);

  const headTags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    ...metaToTags(meta, site.name)
      .filter(([, , , , value]) => value !== null)
      .map(([tag, keyAttr, keyValue, valueAttr, value]) =>
        tag === "link"
          ? `<link ${keyAttr}="${keyValue}" ${valueAttr}="${escapeHtml(value)}" data-seo>`
          : `<meta ${keyAttr}="${keyValue}" ${valueAttr}="${escapeHtml(value)}" data-seo>`
      ),
    headHtml, // image preload hints created by React (see src/entry-server.jsx)
  ]
    .filter(Boolean)
    .join("\n    ");

  const html = template.replace("<!--seo-head-->", headTags).replace("<!--app-html-->", appHtml);
  return { html, meta };
}

const warnings = [];
const pages = getPages();

for (const page of pages) {
  const { html, meta } = buildPage(page.path);
  const file = page.path === "/" ? path.join(DIST, "index.html") : path.join(DIST, page.path, "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);

  // SEO length checks (Google shows about 50–60 title characters and 140–160 description characters).
  if (meta.title.length < 50 || meta.title.length > 60) warnings.push(`${page.path}: title is ${meta.title.length} characters`);
  if (meta.description.length < 140 || meta.description.length > 160)
    warnings.push(`${page.path}: description is ${meta.description.length} characters`);
}

// 404 page: any URL that matches no page renders NotFoundPage.
const notFound = buildPage("/this-page-does-not-exist");
await writeFile(path.join(DIST, "404.html"), notFound.html);

// sitemap.xml: the list of pages Google should index.
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) =>
      `  <url><loc>${absoluteUrl(page.path)}</loc><lastmod>${today}</lastmod><changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap);

// robots.txt: allow everything except the form API, and point to the sitemap.
await writeFile(
  path.join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`
);

console.log(`✔ Pre-rendered ${pages.length} pages + 404.html, sitemap.xml and robots.txt into dist/`);
if (warnings.length) console.warn(`⚠ SEO length warnings:\n  ${warnings.join("\n  ")}`);
