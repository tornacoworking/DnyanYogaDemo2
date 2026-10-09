/**
 * NewsletterSubscriber.js
 * Mongoose model for the footer newsletter form. One document per email address
 * (the unique index means signing up twice does not create a duplicate).
 * Stored in the "newslettersubscribers" collection.
 */
import mongoose from "mongoose";
import { trackingFields } from "./trackingFields.js";

const subscriberSchema = new mongoose.Schema(
  {
    formType: { type: String, enum: ["newsletter"], default: "newsletter" },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: [/^\S+@\S+\.\S+$/, "Invalid email."],
    },
    ...trackingFields,
  },
  { timestamps: true }
);

export default mongoose.models.NewsletterSubscriber || mongoose.model("NewsletterSubscriber", subscriberSchema);
