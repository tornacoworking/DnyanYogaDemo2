/**
 * clients.js
 * Logos of real clients, shown in the scrolling logo strip.
 * Used on: Home page (Client logo strip).
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - Add real client logos (with permission). Put the files in /public/clients/.
 *  - While this array is empty, the logo strip is hidden.
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} Client
 * @property {string} name   Client name, used as the image alt text (required)
 * @property {string} logo   Logo path, e.g. "/clients/acme.png", or "#" until the file is added (required)
 */

/** @type {Client[]} */
export const clients = [];
