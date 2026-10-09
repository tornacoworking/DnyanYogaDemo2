/**
 * trackingFields.js
 * Mongoose fields shared by every submission model: where on the site the form was sent
 * from and the campaign (UTM) tags. Collected automatically by the browser, not typed.
 */
export const trackingFields = {
  pageUrl: { type: String, trim: true, maxlength: 500, default: "" },
  utmSource: { type: String, trim: true, maxlength: 100, default: "" },
  utmMedium: { type: String, trim: true, maxlength: 100, default: "" },
  utmCampaign: { type: String, trim: true, maxlength: 150, default: "" },
};

/** Workflow status the team can set from the admin API. */
export const SUBMISSION_STATUSES = ["new", "contacted", "closed"];
