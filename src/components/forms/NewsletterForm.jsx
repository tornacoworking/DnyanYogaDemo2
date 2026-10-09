/**
 * NewsletterForm.jsx
 * Small email sign-up form in the footer. Saved to the "newsletter" tab of the Google Sheet.
 * Used on: Footer (every page).
 */
import { useId } from "react";
import { useFormSubmit } from "./useFormSubmit";
import { HoneypotField } from "./FormParts";

export default function NewsletterForm() {
  const inputId = useId();
  const { status, errors, message, handleSubmit } = useFormSubmit("newsletter");

  if (status === "success") {
    return (
      <p role="status" className="rounded-xl bg-white/10 px-4 py-3 text-sm text-white">
        Thank you for subscribing! We&apos;ll only send useful updates.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative" aria-busy={status === "loading"}>
      <HoneypotField />
      <label htmlFor={inputId} className="mb-2 block text-sm text-navy-100">
        Get practical marketing tips in your inbox.
      </label>
      {/* Stacked on small phones, side by side from 400px+ via flex-wrap */}
      <div className="flex flex-wrap gap-2">
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          className="form-input min-w-0 flex-1 basis-48 !border-navy-400 !bg-navy-800 !text-white placeholder:!text-navy-200"
          aria-describedby={errors.email || message ? `${inputId}-msg` : undefined}
        />
        <button type="submit" disabled={status === "loading"} className="btn-primary shrink-0 disabled:opacity-70">
          {status === "loading" ? "Sending..." : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p id={`${inputId}-msg`} role="alert" className="mt-2 text-sm text-saffron-200">
          {errors.email || message}
        </p>
      )}
    </form>
  );
}
