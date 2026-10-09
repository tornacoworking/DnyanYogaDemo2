/**
 * EnquirySection.jsx
 * The "Ready to grow your brand?" call-to-action band with the enquiry form next to it.
 * Used on: Home page (section 12), category pages and service pages.
 * id="enquire" lets "#enquire" links scroll here if JavaScript has not loaded yet
 * (normally they open the pop-up instead).
 */
import { MessageCircle, Phone } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";

/**
 * @param {Object} props
 * @param {"home-cta"|"service"|"contact"} props.formType Which Google Sheet tab the enquiry goes to
 * @param {{heading:string, text:string}} props.content    Heading and text (from /src/data/home.js → ctaBand)
 * @param {Array<{group:string, options:string[]}>} props.serviceOptions
 * @param {{phone:string, phoneDisplay:string, whatsapp:string}} props.contact
 * @param {string} [props.defaultService] Pre-selected service on service pages
 */
export default function EnquirySection({ formType, content, serviceOptions, contact, defaultService }) {
  return (
    <section id="enquire" className="section scroll-mt-20 bg-navy-700" aria-labelledby="enquiry-heading">
      {/* Stacked on phones; text left + form right from 1024px */}
      <div className="container-page grid gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="lg:col-span-2">
          <p className="eyebrow !text-saffron-300">Let&apos;s Talk</p>
          <h2 id="enquiry-heading" className="text-3xl font-bold !text-white sm:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-4 text-lg text-navy-100">{content.text}</p>
          <ul className="mt-8 space-y-3">
            <li>
              <a href={`tel:${contact.phone}`} className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold text-white hover:text-saffron-300">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold text-white hover:text-saffron-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-card-hover sm:p-8 lg:col-span-3">
          <EnquiryForm
            formType={formType}
            serviceOptions={serviceOptions}
            whatsapp={contact.whatsapp}
            defaultService={defaultService}
          />
        </div>
      </div>
    </section>
  );
}
