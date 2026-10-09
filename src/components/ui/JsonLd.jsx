/**
 * JsonLd.jsx
 * Prints structured data (JSON-LD) for Google inside a <script type="application/ld+json"> tag.
 * Used on: src/App.jsx (organisation + website) and most pages (breadcrumbs, services, FAQs).
 * The data objects are built in lib/seo.js.
 */

/**
 * @param {Object} props
 * @param {Object|Object[]|null} props.data One schema object, an array of them, or null (prints nothing)
 */
export default function JsonLd({ data }) {
  if (!data) return null;
  // "<" is escaped so text inside the data can never close the script tag early (security).
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
