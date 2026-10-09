/**
 * Enquiry.js
 * Mongoose model for the enquiry forms: Let's Talk pop-up, Contact page, Home CTA and
 * the forms on service pages. Stored in the "enquiries" collection.
 * Field rules mirror server/enquirySchema.js (zod), so data is checked twice.
 */
import mongoose from "mongoose";
import { BUDGET_OPTIONS } from "../../src/lib/formOptions.js";
import { SUBMISSION_STATUSES, trackingFields } from "./trackingFields.js";

export const ENQUIRY_FORM_TYPES = ["lets-talk", "contact", "home-cta", "service"];

const enquirySchema = new mongoose.Schema(
  {
    formType: { type: String, enum: ENQUIRY_FORM_TYPES, required: true, index: true },
    fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    phone: { type: String, required: true, match: [/^[6-9]\d{9}$/, "Invalid 10-digit mobile number."] },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150, match: [/^\S+@\S+\.\S+$/, "Invalid email."] },
    company: { type: String, trim: true, maxlength: 150, default: "" },
    city: { type: String, trim: true, maxlength: 100, default: "" },
    service: { type: String, trim: true, maxlength: 150, default: "" },
    budget: { type: String, enum: [...BUDGET_OPTIONS, ""], default: "" },
    message: { type: String, trim: true, maxlength: 2000, default: "" },
    consent: { type: Boolean, required: true, validate: [(value) => value === true, "Consent is required."] },
    ...trackingFields,
    // Set by the team through PATCH /api/enquiries/:id
    status: { type: String, enum: SUBMISSION_STATUSES, default: "new", index: true },
    notes: { type: String, trim: true, maxlength: 2000, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
