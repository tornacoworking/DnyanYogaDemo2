/**
 * Footer.jsx
 * The site footer: logo + short about, services by category, quick links, contact details,
 * social icons, newsletter sign-up, badges and copyright.
 * Used on: src/App.jsx (every page).
 * Data comes from: /src/data/db.js (site details, categories, services, quick links).
 *
 * Empty data is hidden automatically: no email → no email line, no social links → no icons,
 * no badges → no badges row, and links to empty pages (blog, careers...) are left out.
 */
import { Link } from "react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { categories, getQuickLinks, getServicesByCategory, serviceUrl, site } from "@/data/db";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Footer() {
  const quickLinks = getQuickLinks();
  const year = new Date().getFullYear();
  const cityLine = [site.address.street, site.address.city, site.address.region, site.address.postalCode]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-navy-800 text-navy-100" aria-labelledby="footer-heading">
      {/* Visually hidden heading so screen-reader users can jump to the footer */}
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-page py-14 lg:py-20">
        {/* ===== Top row: about + contact + newsletter =====
            1 column on phones → 2 on tablets → 3 on desktops */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Logo name={site.name} light />
            <p className="mt-4 max-w-sm">{site.description}</p>
            <p className="mt-3 font-medium text-saffron-300">
              {site.taglineSanskrit} · {site.tagline}
            </p>
            {site.socialLinks.length > 0 && (
              <ul className="mt-5 flex gap-2" aria-label="Social media">
                {site.socialLinks.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-saffron-600"
                    >
                      <SocialIcon label={social.label} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="font-heading text-lg font-semibold !text-white">Contact</h3>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={`tel:${site.phone}`} className="flex min-h-11 items-center gap-3 hover:text-white">
                  <Phone className="h-5 w-5 shrink-0 text-saffron-300" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 hover:text-white"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0 text-saffron-300" aria-hidden="true" />
                  WhatsApp us
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 break-all hover:text-white">
                    <Mail className="h-5 w-5 shrink-0 text-saffron-300" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
              )}
              <li className="flex min-h-11 items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-saffron-300" aria-hidden="true" />
                {cityLine}, {site.address.countryName}
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-heading text-lg font-semibold !text-white">Newsletter</h3>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* ===== Links: services by category + quick links =====
            2 columns on phones → 4 on tablets → 7 on desktops (6 categories + quick links).
            Small row gap on phones, where only the category names are shown. */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-2 border-t md:gap-y-10 border-white/10 pt-12 md:grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => (
            <div key={category.slug}>
              <h3 className="font-heading text-base font-semibold !text-white">
                <Link to={`/${category.slug}`} className="inline-flex min-h-11 items-center hover:text-saffron-300 md:min-h-0">
                  {category.menuTitle}
                </Link>
              </h3>
              {/* The full service list is hidden on phones to keep the footer short;
                  phone users reach services through the category link or the menu. */}
              <ul className="mt-3 hidden space-y-1 text-sm md:block">
                {getServicesByCategory(category.slug).map((service) => (
                  <li key={service.slug}>
                    {/* py-1 keeps each link at least 24px tall (comfortable tap target) */}
                    <Link to={serviceUrl(service)} className="inline-block py-1 hover:text-white">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 mt-6 md:col-span-1 md:mt-0">
            <h3 className="font-heading text-base font-semibold !text-white">Company</h3>
            <ul className="mt-3 space-y-1 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="inline-block py-1 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== Badges (only shown when real badges are added in site.js) ===== */}
        {site.badges.length > 0 && (
          <ul className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8" aria-label="Recognitions">
            {site.badges.map((badge) => (
              <li key={badge.label} className="relative h-12 w-28">
                <img src={badge.image} alt={badge.label} loading="lazy" className="h-full w-full object-contain" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ===== Copyright bar ===== */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link to="/privacy-policy" className="inline-block py-2 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="inline-block py-2 hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
