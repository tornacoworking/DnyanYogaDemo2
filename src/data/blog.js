/**
 * blog.js
 * Blog posts.
 * Used on: Home page (Latest blog posts), /blog, /blog/[slug].
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - Add real blog posts. While this array is empty, the blog section,
 *    the /blog pages and their menu/footer links are hidden and the URLs return 404.
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} slug          URL part, lowercase-with-hyphens (required, unique)
 * @property {string} title         Post title (required)
 * @property {string} excerpt       One or two sentence summary for cards (required)
 * @property {string} date          Publish date as "YYYY-MM-DD" (required)
 * @property {string} author        Author name (required)
 * @property {string} category      Topic, e.g. "SEO" (required)
 * @property {string} image         Cover image path, or "#" while there is no image (required)
 * @property {Array<{heading?:string, paragraphs:string[]}>} content
 *           The article body, split into sections. Each section can have an optional
 *           H2 heading and one or more paragraphs. (required)
 * @property {string} seoDescription Meta description, 140–160 characters (required)
 */

/** @type {BlogPost[]} */
export const blogPosts = [];
