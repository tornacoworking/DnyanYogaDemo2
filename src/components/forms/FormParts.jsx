/**
 * FormParts.jsx
 * Small building blocks shared by every form: a labelled field wrapper, the hidden
 * honeypot field, the consent checkbox, the submit button and the error banner.
 * Keeping them here means every form looks and behaves the same.
 * Used on: EnquiryForm.jsx, ApplicationForm.jsx, NewsletterForm.jsx.
 */
import { Link } from "react-router";
import { LoaderCircle } from "lucide-react";

/**
 * A label + input area + error message.
 * The error is linked to the input with aria-describedby (done by the caller) so screen
 * readers read it out when the field is focused.
 * @param {Object} props
 * @param {string} props.id          id of the input inside
 * @param {string} props.label       Visible label text
 * @param {boolean} [props.required] Adds a red * after the label
 * @param {string} [props.error]     Error message from the server, if any
 * @param {string} [props.className] Extra classes (e.g. "sm:col-span-2" to span two columns)
 * @param {React.ReactNode} props.children The input/select/textarea
 */
export function Field({ id, label, required = false, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && (
          <span className="text-saffron-700" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Honeypot anti-spam field. It is moved off-screen so people never see it, but simple
 * spam bots fill in every field they find. If it arrives filled in, the server silently
 * ignores the submission. tabIndex -1 keeps keyboard users from landing on it.
 */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/**
 * The required "I agree to be contacted" checkbox with a link to the privacy policy.
 * h-5 w-5 checkbox inside a 44px-tall label = comfortable tap target on phones.
 * @param {Object} props
 * @param {string} props.id
 * @param {string} [props.error]
 */
export function ConsentCheckbox({ id, error }) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 text-sm text-gray-700">
        <input
          id={id}
          name="consent"
          type="checkbox"
          required
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 accent-saffron-600"
        />
        <span>
          I agree to be contacted by DnyanYoga by phone, WhatsApp or email about my enquiry, as
          described in the{" "}
          <Link to="/privacy-policy" className="font-medium text-navy-700 underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Submit button that shows a spinner and is disabled while sending,
 * so people cannot submit the same form twice.
 * @param {Object} props
 * @param {boolean} props.isLoading
 * @param {string} props.label         Normal button text
 * @param {string} [props.className]
 */
export function SubmitButton({ isLoading, label, className = "" }) {
  return (
    <button type="submit" disabled={isLoading} className={`btn-primary w-full disabled:opacity-70 sm:w-auto ${className}`}>
      {isLoading && <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />}
      {isLoading ? "Sending..." : label}
    </button>
  );
}

/**
 * Red banner with the general error message. role="alert" makes screen readers
 * announce it immediately.
 * @param {Object} props
 * @param {string} props.message
 */
export function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">
      {message}
    </p>
  );
}
