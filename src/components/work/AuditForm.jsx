/**
 * AuditForm.jsx
 * The "yourwebsite.com" field + "Run Free Audit" button in the audit banner.
 * Used on: /work (AuditBanner in WorkSections.jsx).
 *
 * There is no automatic audit engine yet. On submit this opens the "Let's Talk" enquiry
 * pop-up with the service pre-selected, so our team can send the audit by hand.
 * The typed address is NOT sent to the pop-up (the enquiry form has no website field).
 * (This is the only interactive part of the section, so it is its own small component.)
 */
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useEnquiryModal } from "@/components/forms/EnquiryModalProvider";

/**
 * @param {Object} props
 * @param {string} props.placeholder  Example address shown in the empty field
 * @param {string} props.buttonLabel
 * @param {string} props.service      Service pre-selected in the enquiry pop-up
 */
export default function AuditForm({ placeholder, buttonLabel, service }) {
  const { openModal } = useEnquiryModal();
  const [website, setWebsite] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    openModal(service);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row" aria-label="Free website audit">
      <label htmlFor="audit-website" className="sr-only">
        Your website address
      </label>
      <input
        id="audit-website"
        type="text"
        inputMode="url"
        autoComplete="url"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        placeholder={placeholder}
        className="min-h-12 w-full flex-1 rounded-full border border-white/20 bg-white/10 px-6 text-base text-white placeholder:text-white/60 focus:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-300/50"
      />
      <button
        type="submit"
        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent-500 px-7 text-base font-semibold text-white shadow-[0_10px_30px_-8px_rgba(79,91,255,0.7)] transition-colors hover:bg-accent-600"
      >
        {buttonLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
