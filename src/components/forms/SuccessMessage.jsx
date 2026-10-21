/**
 * SuccessMessage.jsx
 * Shown in place of a form after it was sent successfully.
 * Includes a "Chat on WhatsApp" button with a message already typed in,
 * containing the visitor's name and the service they chose.
 * Used on: EnquiryForm.jsx and ApplicationForm.jsx.
 */
import { CircleCheck } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/**
 * @param {Object} props
 * @param {string} props.whatsapp   Business WhatsApp number, digits with country code (from site.js)
 * @param {string} [props.name]     The visitor's name
 * @param {string} [props.topic]    The service or role they asked about
 * @param {() => void} props.onReset  Shows the empty form again
 */
export default function SuccessMessage({ whatsapp, name, topic, onReset }) {
  // Pre-filled WhatsApp text. encodeURIComponent makes spaces and symbols safe inside a URL.
  const text = `Hi DnyanYoga, I'm ${name || "interested in your services"}. I just sent an enquiry${
    topic ? ` about ${topic}` : ""
  } on your website.`;
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;

  return (
    // role="status" + aria-live: screen readers announce the success message when it appears.
    <div role="status" aria-live="polite" className="rounded-2xl bg-leaf-50 p-6 text-center sm:p-8">
      <CircleCheck className="mx-auto h-12 w-12 text-leaf-600" aria-hidden="true" />
      <p className="mt-4 text-xl font-semibold text-navy-700">Thank you! We&apos;ll call you within 24 hours.</p>
      <p className="mt-2 text-gray-700">Want a faster reply? Message us on WhatsApp.</p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto">
          <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
          Chat on WhatsApp
        </a>
        <button type="button" onClick={onReset} className="btn-outline w-full sm:w-auto">
          Send another message
        </button>
      </div>
    </div>
  );
}
