/**
 * careers.js
 * Open job roles and internships.
 * Used on: /careers (type "job") and /internship (type "internship").
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - Add real openings. If there are no "job" items, /careers is hidden;
 *    if there are no "internship" items, /internship is hidden
 *    (menu/footer links removed, URL returns 404).
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} Opening
 * @property {string} slug            Unique id, lowercase-with-hyphens (required)
 * @property {"job"|"internship"} type  Which page it appears on (required)
 * @property {string} title           Role title, e.g. "SEO Executive" (required)
 * @property {string} location        e.g. "Pune (On-site)" (required)
 * @property {string} employmentType  e.g. "Full-time", "6-month internship" (required)
 * @property {string} experience      e.g. "1–3 years" or "Freshers welcome" (required)
 * @property {string} description     Short description of the role (required)
 * @property {string[]} responsibilities  Bullet list (required)
 * @property {string[]} requirements      Bullet list (required)
 */

/** @type {Opening[]} */
export const openings = [];
