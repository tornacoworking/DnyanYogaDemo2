/**
 * JobApplication.js
 * Mongoose model for the Careers and Internship application forms.
 * Stored in the "jobapplications" collection. Applicants share a link to their resume
 * (Google Drive, LinkedIn, portfolio) instead of uploading a file.
 */
import mongoose from "mongoose";
import { SUBMISSION_STATUSES, trackingFields } from "./trackingFields.js";

export const APPLICATION_FORM_TYPES = ["careers", "internship"];

const applicationSchema = new mongoose.Schema(
  {
    formType: { type: String, enum: APPLICATION_FORM_TYPES, required: true, index: true },
    fullName: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    phone: { type: String, required: true, match: [/^[6-9]\d{9}$/, "Invalid 10-digit mobile number."] },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 150, match: [/^\S+@\S+\.\S+$/, "Invalid email."] },
    city: { type: String, trim: true, maxlength: 100, default: "" },
    role: { type: String, trim: true, maxlength: 150, default: "" },
    resumeLink: { type: String, required: true, trim: true, maxlength: 500, match: [/^https?:\/\//i, "Resume link must start with http(s)://"] },
    message: { type: String, trim: true, maxlength: 2000, default: "" },
    consent: { type: Boolean, required: true, validate: [(value) => value === true, "Consent is required."] },
    ...trackingFields,
    status: { type: String, enum: SUBMISSION_STATUSES, default: "new", index: true },
    notes: { type: String, trim: true, maxlength: 2000, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.JobApplication || mongoose.model("JobApplication", applicationSchema);
