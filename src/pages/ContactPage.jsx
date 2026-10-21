/**
 * ContactPage.jsx (route: /contact)
 * Contact page: enquiry form, phone, WhatsApp, email (when set), address, working hours
 * (when set) and a Google Map.
 * Data comes from: /src/data/site.js and /src/data/services.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO on this page:
 *  - Working hours not shown: add site.openingHours in /src/data/site.js.
 *  - PIN code not shown: add site.address.postalCode.
 * ---------------------------------------------------------------------------
 */
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { getServiceOptions, pageSeo, site } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import SocialIcon from "@/components/layout/SocialIcon";
import Seo from "@/components/ui/Seo";

export default function ContactPage() {
  const address = [site.address.street, site.address.city, site.address.region, site.address.postalCode]
    .filter(Boolean)
    .join(", ");

  const meta = buildMetadata({ ...pageSeo.contact, path: "/contact" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="Contact us"
        title="Let's grow your business together"
        intro="Call, WhatsApp or send us a message. We reply within one working day."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ]}
      />

      <section className="section" aria-label="Contact details and enquiry form">
        {/* Phones: details first, then the form. Desktop: details left (2/5), form right (3/5). */}
        <div className="container-page grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold sm:text-3xl">Get in touch</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <Phone className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-gray-600">Call us</p>
                  <a href={`tel:${site.phone}`} className="text-lg font-semibold text-navy-700 hover:text-saffron-600">
                    {site.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <WhatsAppIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-gray-600">WhatsApp</p>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-navy-700 hover:text-saffron-600"
                  >
                    Chat with us
                  </a>
                </div>
              </li>
              {site.email && (
                <li className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${site.email}`} className="break-all text-lg font-semibold text-navy-700 hover:text-saffron-600">
                      {site.email}
                    </a>
                  </div>
                </li>
              )}
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-gray-600">Office</p>
                  <address className="text-lg font-semibold not-italic text-navy-700">
                    {address}, {site.address.countryName}
                  </address>
                </div>
              </li>
              {site.openingHours.length > 0 && (
                <li className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-gray-600">Working hours</p>
                    <ul className="font-semibold text-navy-700">
                      {site.openingHours.map((hours) => (
                        <li key={hours.days.join()}>
                          {hours.days.join(", ")}: {hours.opens}–{hours.closes}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )}
            </ul>

            {site.socialLinks.length > 0 && (
              <ul className="mt-8 flex gap-2" aria-label="Social media">
                {site.socialLinks.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-700 hover:bg-navy-700 hover:text-white"
                    >
                      <SocialIcon label={social.label} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-5 sm:p-8 lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold">Send us an enquiry</h2>
            <EnquiryForm formType="contact" serviceOptions={getServiceOptions()} whatsapp={site.whatsapp} />
          </div>
        </div>
      </section>

      {/* ===== Google Map =====
          loading="lazy": the map only loads when scrolled near, keeping the page fast. */}
      <section aria-label="Map" className="h-80 w-full bg-gray-100 sm:h-96">
        <iframe
          src={site.mapEmbedUrl}
          title={`Map showing ${site.name} in ${site.address.city}`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
