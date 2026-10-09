/**
 * submissionController.js
 * The public form endpoint: POST /api/enquiry. Every form on the website posts here.
 *
 * THE FLOW, STEP BY STEP:
 *  1. Rate limit: refuse if this IP sent too many forms recently (spam protection).
 *  2. Honeypot check: if the hidden "website" field is filled, it is a bot. We answer
 *     "ok" (so the bot thinks it worked) but do NOT save anything.
 *  3. Validate with zod (server/enquirySchema.js): required fields, 10-digit phone, email
 *     format, allowed dropdown values, maximum lengths. Invalid → 400 with field errors.
 *  4. Save to MongoDB with the model that matches the form type:
 *       lets-talk / contact / home-cta / service → Enquiry
 *       careers / internship                     → JobApplication
 *       newsletter                               → NewsletterSubscriber
 *  5. Answer { ok: true } on success, or a friendly error message.
 *
 * submitForm() is framework-free (plain input → { status, json }), so Express, Vercel and
 * Netlify wrappers all share it. createSubmission() is the Express handler.
 */
import { schemaFor } from "../enquirySchema.js";
import { isAllowed } from "../rateLimit.js";
import { connectDB } from "../config/db.js";
import Enquiry from "../models/Enquiry.js";
import JobApplication from "../models/JobApplication.js";
import NewsletterSubscriber from "../models/NewsletterSubscriber.js";

/** @param {string} formType @returns {import("mongoose").Model<any>} */
export function modelFor(formType) {
  if (["careers", "internship"].includes(formType)) return JobApplication;
  if (formType === "newsletter") return NewsletterSubscriber;
  return Enquiry;
}

/**
 * Processes one submission.
 * @param {Object} input
 * @param {unknown} input.body  The parsed JSON sent by the form
 * @param {string} input.ip     The visitor's IP address ("unknown" if not available)
 * @returns {Promise<{status:number, json:Object}>} HTTP status code and JSON answer for the browser
 */
export async function submitForm({ body, ip }) {
  // ----- Step 1: rate limit -----
  if (!isAllowed(ip || "unknown")) {
    return {
      status: 429,
      json: { ok: false, message: "Too many messages from your connection. Please wait a few minutes or call us." },
    };
  }

  if (!body || typeof body !== "object") {
    return { status: 400, json: { ok: false, message: "Invalid request." } };
  }

  // ----- Step 2: honeypot -----
  if (body.website) {
    return { status: 200, json: { ok: true } }; // pretend success, save nothing
  }

  // ----- Step 3: validate -----
  const schema = schemaFor(body.formType);
  if (!schema) {
    return { status: 400, json: { ok: false, message: "Unknown form." } };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // Turn zod's error list into { fieldName: "first error message" } for the form.
    const errors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: 400, json: { ok: false, errors, message: "Please check the highlighted fields." } };
  }

  // ----- Step 4: save to MongoDB (the honeypot field is dropped) -----
  const { website, ...cleanData } = parsed.data;
  try {
    await connectDB();
  } catch (error) {
    console.error("[submit] MongoDB is not available:", error.message);
    return {
      status: 503,
      json: { ok: false, message: "Our form is temporarily unavailable. Please call or WhatsApp us for now." },
    };
  }

  try {
    if (cleanData.formType === "newsletter") {
      // Signing up twice is not an error: keep one document per email address.
      await NewsletterSubscriber.updateOne(
        { email: cleanData.email.toLowerCase() },
        { $setOnInsert: cleanData },
        { upsert: true }
      );
    } else {
      await modelFor(cleanData.formType).create(cleanData);
    }
  } catch (error) {
    if (error?.name === "ValidationError") {
      const errors = {};
      for (const [field, detail] of Object.entries(error.errors)) errors[field] = detail.message;
      return { status: 400, json: { ok: false, errors, message: "Please check the highlighted fields." } };
    }
    console.error("[submit] Could not save to MongoDB:", error);
    return {
      status: 500,
      json: { ok: false, message: "We could not save your message. Please try again or call/WhatsApp us." },
    };
  }

  // ----- Step 5: success -----
  return { status: 200, json: { ok: true } };
}

/** Express handler for POST /api/enquiry. */
export async function createSubmission(req, res) {
  const { status, json } = await submitForm({ body: req.body, ip: req.ip });
  res.status(status).json(json);
}
