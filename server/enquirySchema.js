/**
 * enquirySchema.js
 * The validation rules for every form on the site, written with the "zod" library.
 * Used on: server/controllers/submissionController.js (the server checks every submission
 * with these rules before saving it, so bad or malicious data never reaches MongoDB).
 *
 * The forms in the browser also check the most important rules (required fields,
 * 10-digit phone, email format) using HTML attributes, so visitors get instant feedback.
 */
import { z } from "zod";
import { BUDGET_OPTIONS } from "../src/lib/formOptions.js";

/** Which form the data came from. Decides which MongoDB collection it is saved in. */
export const FORM_TYPES = ["lets-talk", "contact", "home-cta", "service", "careers", "internship", "newsletter"];

/**
 * Indian mobile number: 10 digits starting with 6, 7, 8 or 9.
 * We first remove spaces, dashes and a leading +91 or 0, so "+91 98765-43210" is accepted.
 * @param {string} value
 * @returns {string} Just the 10 digits
 */
export function normalisePhone(value) {
  return String(value || "")
    .replace(/[\s-]/g, "")
    .replace(/^(\+91|91|0)(?=\d{10}$)/, "");
}

const phoneRule = z
  .string()
  .transform(normalisePhone)
  .refine((digits) => /^[6-9]\d{9}$/.test(digits), "Please enter a valid 10-digit mobile number.");

/** Optional short text: trims spaces and limits length; empty becomes "". */
const optionalText = (max) => z.string().trim().max(max).optional().default("");

/** Details collected automatically (not typed by the visitor). */
const trackingFields = {
  pageUrl: optionalText(500),
  utmSource: optionalText(100),
  utmMedium: optionalText(100),
  utmCampaign: optionalText(150),
  // Honeypot: a hidden field real people never see or fill. Bots usually fill every field.
  website: z.string().optional().default(""),
};

/** Rules for enquiry forms (Let's Talk, Contact, Home CTA, Service pages). */
export const enquirySchema = z.object({
  formType: z.enum(["lets-talk", "contact", "home-cta", "service"]),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: phoneRule,
  email: z.string().trim().email("Please enter a valid email address.").max(150),
  company: optionalText(150),
  city: optionalText(100),
  service: optionalText(150),
  budget: z.union([z.enum(BUDGET_OPTIONS), z.literal("")]).optional().default(""),
  message: optionalText(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to be contacted." }) }),
  ...trackingFields,
});

/** Rules for the Careers and Internship application forms. */
export const applicationSchema = z.object({
  formType: z.enum(["careers", "internship"]),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: phoneRule,
  email: z.string().trim().email("Please enter a valid email address.").max(150),
  city: optionalText(100),
  role: optionalText(150),
  // Visitors paste a link (Google Drive, LinkedIn, portfolio) instead of uploading a file,
  // so no uploaded files need to be stored or scanned.
  resumeLink: z.string().trim().url("Please paste a valid link (starting with https://).").max(500),
  message: optionalText(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to be contacted." }) }),
  ...trackingFields,
});

/** Rules for the footer newsletter form (email only). */
export const newsletterSchema = z.object({
  formType: z.literal("newsletter"),
  email: z.string().trim().email("Please enter a valid email address.").max(150),
  ...trackingFields,
});

/**
 * Picks the right rules for the submitted form type.
 * @param {string} formType
 * @returns {import("zod").ZodTypeAny | null} null if the form type is unknown
 */
export function schemaFor(formType) {
  if (["lets-talk", "contact", "home-cta", "service"].includes(formType)) return enquirySchema;
  if (["careers", "internship"].includes(formType)) return applicationSchema;
  if (formType === "newsletter") return newsletterSchema;
  return null;
}
