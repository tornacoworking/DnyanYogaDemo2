/**
 * FaqSection.jsx
 * Frequently asked questions as an accordion, plus FAQPage JSON-LD for Google.
 * Used on: Home page, /faq, category pages and every service page.
 *
 * WHY <details>/<summary>: the browser provides the open/close behaviour, keyboard
 * support and screen-reader announcements by itself, with zero JavaScript.
 * The answers stay in the HTML, so Google can read them (needed for FAQ rich results).
 */
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";

/**
 * Just the accordion list (used on its own on /faq, where questions are grouped).
 * @param {Object} props
 * @param {Array<{q:string, a:string}>} props.faqs
 */
export function FaqList({ faqs }) {
  return (
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
      {faqs.map((faq) => (
        <details key={faq.q} className="group">
          {/* list-none + [&::-webkit-details-marker]:hidden remove the default triangle */}
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-navy-700 sm:px-6 [&::-webkit-details-marker]:hidden">
            {faq.q}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-saffron-600 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-5 text-gray-700 sm:px-6">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * A full FAQ section with heading and structured data.
 * @param {Object} props
 * @param {Array<{q:string, a:string}>} props.faqs
 * @param {string} [props.title="Frequently asked questions"]
 * @param {string} [props.eyebrow="FAQ"]
 * @param {boolean} [props.withSchema=true] Add FAQPage JSON-LD. Use it only once per page.
 * @param {string} [props.className]  Extra classes, e.g. a background colour
 */
export default function FaqSection({
  faqs,
  title = "Frequently asked questions",
  eyebrow = "FAQ",
  withSchema = true,
  className = "",
}) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className={`section ${className}`} aria-labelledby="faq-heading">
      <div className="container-page max-w-4xl">
        <SectionHeading id="faq-heading" eyebrow={eyebrow} title={title} />
        <FaqList faqs={faqs} />
      </div>
      {withSchema && <JsonLd data={faqJsonLd(faqs)} />}
    </section>
  );
}
