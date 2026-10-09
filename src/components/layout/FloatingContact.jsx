/**
 * FloatingContact.jsx
 * Quick ways to reach the business from any page:
 *  - Phones (below 768px): a bar fixed to the bottom of the screen with "Call" and "WhatsApp".
 *  - Tablets/desktops (768px+): two round floating buttons in the bottom-right corner.
 * Used on: src/App.jsx (every page).
 * These are plain links; no state or effects needed.
 */

import { Phone, MessageCircle } from "lucide-react";

/**
 * @param {Object} props
 * @param {string} props.phone        e.g. "+919284872656"
 * @param {string} props.phoneDisplay e.g. "+91 92848 72656"
 * @param {string} props.whatsapp     e.g. "919284872656"
 */
export default function FloatingContact({ phone, phoneDisplay, whatsapp }) {
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi DnyanYoga, I'd like to know more about your services."
  )}`;

  return (
    <>
      {/* ===== Mobile-only sticky Call/WhatsApp bar =====
          The <body> has bottom padding on phones (see src/App.jsx) so this bar
          never covers the footer content. */}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden">
        <a
          href={`tel:${phone}`}
          className="flex min-h-14 items-center justify-center gap-2 font-semibold text-navy-700"
          aria-label={`Call us on ${phoneDisplay}`}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-2 bg-leaf-700 font-semibold text-white"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          WhatsApp
        </a>
      </div>

      {/* ===== Tablet/desktop floating buttons ===== */}
      <div className="fixed bottom-6 right-6 z-30 hidden flex-col gap-3 md:flex">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-leaf-700 text-white shadow-card-hover transition-transform hover:scale-105"
        >
          <MessageCircle className="h-7 w-7" aria-hidden="true" />
        </a>
        <a
          href={`tel:${phone}`}
          aria-label={`Call us on ${phoneDisplay}`}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy-700 text-white shadow-card-hover transition-transform hover:scale-105"
        >
          <Phone className="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
