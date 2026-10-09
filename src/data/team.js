/**
 * team.js
 * Team members shown on the About page.
 * Used on: /about (Team section).
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - Add real team members. While this array is empty, the Team section is hidden.
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} TeamMember
 * @property {string} name        Full name (required)
 * @property {string} role        Job title (required)
 * @property {string} photo       Photo path in /public/team/, or "#" until the photo is added (required)
 * @property {string} [linkedin]  LinkedIn profile URL (optional)
 */

/** @type {TeamMember[]} */
export const team = [];
