/**
 * testimonials.js
 * Written and video reviews from real clients.
 * Used on: Home page (Testimonials carousel), /testimonials.
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - Add real client testimonials (with their permission).
 *  - While this array is empty, the testimonials section, the /testimonials
 *    page and its menu/footer links are hidden.
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} name          Client's name (required)
 * @property {string} [role]        Job title, e.g. "Founder" (optional)
 * @property {string} [company]     Company name (optional)
 * @property {string} quote         What they said, in their words (required)
 * @property {number} [rating]      Star rating 1–5 (optional)
 * @property {string} [photo]       Photo path in /public, or "#" if none yet (optional)
 * @property {string} [youtubeId]   For video testimonials: the ID from the YouTube link,
 *                                  e.g. for https://youtu.be/AbC123xyz the ID is "AbC123xyz" (optional)
 */

/** @type {Testimonial[]} */
export const testimonials = [];
