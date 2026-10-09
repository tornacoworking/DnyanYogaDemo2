/**
 * stats.js
 * Numbers shown in the animated counters on the homepage and About page.
 * Used on: Home page (About + counters section), /about.
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - Add your REAL numbers. While this array is empty, the counters are hidden.
 *  - Never add estimates or made-up numbers.
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} Stat
 * @property {string} label    Text under the number, e.g. "Projects Completed" (required)
 * @property {number} value    The number to count up to, e.g. 150 (required)
 * @property {string} [suffix] Text after the number, e.g. "+" or "★" (optional)
 * @property {number} [decimals] Decimal places to show, e.g. 1 for a 4.9 rating (optional, default 0)
 *
 * Example of the format (do not copy these values, use your own):
 *   { label: "Projects Completed", value: 0, suffix: "+" }
 */

/** @type {Stat[]} */
export const stats = [];

/**
 * Google rating shown as a badge next to testimonials.
 * Format: { rating: number (e.g. 4.8), reviewCount: number, reviewsUrl: "https://g.page/..." }
 * TODO: add your real Google rating. Keep null to hide the badge.
 * @type {{rating:number, reviewCount:number, reviewsUrl:string} | null}
 */
export const googleRating = null;
