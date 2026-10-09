/**
 * Seo.jsx
 * Puts a page's SEO tags into <head>: <title>, meta description, canonical link,
 * Open Graph (WhatsApp/Facebook/LinkedIn previews), Twitter card and robots.
 * Used on: every page in src/pages (usually the first line of the page).
 *
 * HOW IT WORKS IN TWO SITUATIONS:
 *  1. At build time (scripts/prerender.js): the page is rendered to HTML on your computer
 *     or on Vercel/Netlify. Seo hands its values to a "collector" (SeoContext), and the
 *     prerender script writes the tags into that page's HTML file. This is what Google reads.
 *  2. In the visitor's browser, when they click to another page: Seo updates the tags in
 *     <head> directly (useEffect), so the browser tab title and share data stay correct.
 */
import { createContext, useContext, useEffect } from "react";

/**
 * Holds the collector during pre-rendering. In the browser it is null.
 * @type {React.Context<{ meta: Object | null } | null>}
 */
export const SeoContext = createContext(null);

/**
 * Creates or updates one <meta> / <link> tag in <head>.
 * Tags we manage are marked with data-seo, so we never touch tags added by others.
 * @param {"meta"|"link"} tagName
 * @param {string} keyAttr   Attribute that identifies the tag, e.g. "name", "property" or "rel"
 * @param {string} keyValue  e.g. "description"
 * @param {string} valueAttr Attribute holding the value, e.g. "content" or "href"
 * @param {string|null} value  null removes the tag
 */
function setHeadTag(tagName, keyAttr, keyValue, valueAttr, value) {
  let element = document.head.querySelector(`${tagName}[${keyAttr}="${keyValue}"]`);
  if (value === null) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement(tagName);
    element.setAttribute(keyAttr, keyValue);
    element.setAttribute("data-seo", "");
    document.head.appendChild(element);
  }
  element.setAttribute(valueAttr, value);
}

/**
 * Turns the SEO values into the list of tags to write. Shared by the browser update
 * (below) and the prerender script, so both always produce the same tags.
 * @param {{title:string, description:string, canonical:string, image:string, type:string, noIndex:boolean}} meta
 * @param {string} siteName
 * @returns {Array<[tag:string, keyAttr:string, keyValue:string, valueAttr:string, value:string|null]>}
 */
export function metaToTags(meta, siteName) {
  return [
    ["meta", "name", "description", "content", meta.description],
    ["link", "rel", "canonical", "href", meta.noIndex ? null : meta.canonical],
    ["meta", "name", "robots", "content", meta.noIndex ? "noindex, follow" : "index, follow"],
    ["meta", "property", "og:type", "content", meta.type],
    ["meta", "property", "og:site_name", "content", siteName],
    ["meta", "property", "og:locale", "content", "en_IN"],
    ["meta", "property", "og:url", "content", meta.canonical],
    ["meta", "property", "og:title", "content", meta.title],
    ["meta", "property", "og:description", "content", meta.description],
    ["meta", "property", "og:image", "content", meta.image],
    ["meta", "property", "og:image:width", "content", "1200"],
    ["meta", "property", "og:image:height", "content", "630"],
    ["meta", "name", "twitter:card", "content", "summary_large_image"],
    ["meta", "name", "twitter:title", "content", meta.title],
    ["meta", "name", "twitter:description", "content", meta.description],
    ["meta", "name", "twitter:image", "content", meta.image],
  ];
}

/**
 * @param {Object} props
 * @param {ReturnType<import("@/lib/seo").buildMetadata>} props.meta Values from buildMetadata()
 * @param {string} [props.siteName="DnyanYoga"]
 */
export default function Seo({ meta, siteName = "DnyanYoga" }) {
  const collector = useContext(SeoContext);

  // 1. Pre-rendering: just hand the values over (effects do not run during pre-rendering).
  if (collector) collector.meta = meta;

  // 2. Browser: update <head> whenever the page (meta) changes.
  useEffect(() => {
    document.title = meta.title;
    for (const tag of metaToTags(meta, siteName)) setHeadTag(...tag);
  }, [meta, siteName]);

  // Renders nothing visible.
  return null;
}
