/**
 * entry-server.jsx
 * Used ONLY at build time by scripts/prerender.js (never in the browser).
 * It renders one URL of the site to an HTML string, and collects that page's SEO values
 * (title, description, canonical...) from the <Seo> component, so the prerender script can
 * write a complete, ready-to-read HTML file for every page.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { SeoContext } from "@/components/ui/Seo";
import {
  blogPosts,
  caseStudies,
  categories,
  hasData,
  services,
  serviceUrl,
  site,
} from "@/data/db";
import { absoluteUrl } from "@/lib/seo";

export { metaToTags } from "@/components/ui/Seo";
export { site };

/**
 * Renders one page.
 * @param {string} url e.g. "/digital-marketing/seo"
 * @returns {{ html: string, headHtml: string, meta: Object|null }}
 *   html: the page content (goes inside #root)
 *   headHtml: <link rel="preload"> tags React created for important images (go in <head>)
 *   meta: the page's SEO values from <Seo>
 */
export function render(url) {
  const collector = { meta: null };
  let html = renderToString(
    <SeoContext.Provider value={collector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </SeoContext.Provider>
  );

  // React adds <link rel="preload"> tags for images that load immediately (e.g. the logo) at
  // the very start of its output. They belong in <head>; left inside #root they would not
  // match what React expects when it takes over the page in the browser ("hydration").
  let headHtml = "";
  html = html.replace(/^(?:<link [^>]*rel="preload"[^>]*\/>)+/, (links) => {
    headHtml = links;
    return "";
  });

  return { html, headHtml, meta: collector.meta };
}

/**
 * Every page that should exist as an HTML file and in the sitemap.
 * EMPTY DATA RULE: pages without content (blog, case studies, testimonials, careers,
 * internship) are only included once their data exists, so Google never sees empty pages.
 *
 * priority (0–1) hints which pages matter most; changeFrequency hints how often they change.
 * @returns {Array<{path:string, priority:number, changeFrequency:string}>}
 */
export function getPages() {
  const page = (path, priority = 0.7, changeFrequency = "monthly") => ({ path, priority, changeFrequency });
  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...categories.map((category) => page(`/${category.slug}`, 0.9)),
    ...services.map((service) => page(serviceUrl(service), 0.8)),
    page("/about", 0.7),
    page("/work", 0.8),
    page("/industries", 0.7),
    page("/faq", 0.6),
    page("/contact", 0.8),
    ...(hasData.caseStudies
      ? [page("/case-studies", 0.7), ...caseStudies.map((study) => page(`/case-studies/${study.slug}`, 0.6))]
      : []),
    ...(hasData.blog ? [page("/blog", 0.7, "weekly"), ...blogPosts.map((post) => page(`/blog/${post.slug}`, 0.6))] : []),
    ...(hasData.testimonials ? [page("/testimonials", 0.5)] : []),
    ...(hasData.jobs ? [page("/careers", 0.5)] : []),
    ...(hasData.internships ? [page("/internship", 0.5)] : []),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms-and-conditions", 0.2, "yearly"),
  ];
}

/** Full URL helper, re-exported for the sitemap. */
export { absoluteUrl };
