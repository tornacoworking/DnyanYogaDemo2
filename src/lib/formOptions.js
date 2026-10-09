/**
 * formOptions.js
 * Dropdown options shared by the browser forms (src/components/forms) and the server
 * validation (server/enquirySchema.js).
 * Kept in its own tiny file (without zod) so the browser forms can import it
 * without downloading the whole validation library.
 */

/** Budget ranges shown in the "Budget" dropdown. */
export const BUDGET_OPTIONS = ["Under ₹25k", "₹25k–50k", "₹50k–1L", "₹1L–3L", "₹3L+"];
