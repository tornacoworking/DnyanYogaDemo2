/**
 * caseStudies.js
 * Real client projects and their results.
 * Used on: Home page (Featured case studies), /case-studies, /case-studies/[slug].
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - Add real case studies. While this array is empty, the case studies
 *    section, the /case-studies pages and their menu/footer links are hidden
 *    and those URLs return the 404 page.
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} CaseStudy
 * @property {string} slug         URL part, lowercase-with-hyphens (required, unique)
 * @property {string} title        Project title (required)
 * @property {string} client       Client name (required; use a description like "Pune real estate developer" if the name is confidential)
 * @property {string} industry     Industry name, ideally one from industries.js (required)
 * @property {string[]} services   Service slugs used in the project, e.g. ["seo", "ppc-google-ads"] (required)
 * @property {string} result       Short headline result, e.g. "+120% organic leads in 6 months" (required, must be real)
 * @property {string} summary      One or two sentences for the card (required)
 * @property {string} image        Cover image path, or "#" while there is no image (required)
 * @property {string} challenge    The client's problem (required)
 * @property {string} solution     What we did (required)
 * @property {string[]} outcomes   Bullet list of measurable results (required)
 * @property {boolean} [featured]  true = show on the homepage (max 3 shown)
 * @property {string} seoDescription Meta description, 140–160 characters (required)
 */

/** @type {CaseStudy[]} */
export const caseStudies = [];
