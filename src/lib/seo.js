/**
 * seo.js
 * Helpers that build SEO data for every page:
 *  - buildMetadata(): the <title>, meta description, canonical URL, Open Graph and
 *    Twitter values for one page. Pages pass the result to the <Seo> component
 *    (src/components/ui/Seo.jsx), which writes the tags into <head>.
 *  - JSON-LD builders: small objects describing the business, services, FAQs and
 *    breadcrumbs in schema.org format. Google reads these to show rich results
 *    (FAQ drop-downs, breadcrumbs) in search.
 * Used on: every page in src/pages, through <Seo> and the <JsonLd> component.
 */
import { site } from "@/data/db";

/**
 * The live site address without a trailing slash.
 * The VITE_SITE_URL environment variable wins (set it in .env or in your hosting settings),
 * so you can use a different address on a staging server without editing code.
 */
export const SITE_URL = ((import.meta.env && import.meta.env.VITE_SITE_URL) || site.siteUrl).replace(/\/$/, "");

/**
 * Turns a path like "/about" into a full URL like "https://DnyanYoga.com/about".
 * Google wants full URLs in canonical tags, Open Graph tags and JSON-LD.
 * @param {string} [path="/"]
 * @returns {string}
 */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/**
 * Builds the <title> for a service page when the service has no custom seoTitle.
 * Format: "<Service> Services in Pune | DnyanYoga Digital Services".
 * @param {{title:string, seoTitle?:string}} service
 * @returns {string}
 */
export function serviceSeoTitle(service) {
  return service.seoTitle || `${service.title} Services in Pune | ${site.seo.titleSuffix}`;
}

/**
 * Builds the SEO values for one page.
 *
 * What each value does for Google and social media:
 *  - title / description: the blue link and grey text in Google results.
 *  - canonical: tells Google the one "official" URL of this page, so duplicates
 *    (e.g. with ?utm= tags) do not compete with each other.
 *  - image / type: the picture and type shown when the link is shared on WhatsApp,
 *    Facebook, LinkedIn and X (Open Graph + Twitter card tags).
 *  - noIndex: asks Google not to list the page (used by the 404 page).
 *
 * @param {Object} options
 * @param {string} options.title        Full page title, 50–60 characters
 * @param {string} options.description  Meta description, 140–160 characters
 * @param {string} options.path         Page path, e.g. "/about"
 * @param {string} [options.image]      Social share image path (defaults to the site OG image)
 * @param {"website"|"article"} [options.type="website"]
 * @param {boolean} [options.noIndex=false]
 * @returns {{title:string, description:string, canonical:string, image:string, type:string, noIndex:boolean}}
 */
export function buildMetadata({ title, description, path, image, type = "website", noIndex = false }) {
  // "#" means "no image yet", so fall back to the default share image.
  const shareImage = image && image !== "#" ? image : site.seo.ogImage;
  return {
    title,
    description,
    canonical: absoluteUrl(path),
    image: absoluteUrl(shareImage),
    type,
    noIndex,
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD (structured data) builders                                  */
/* Each returns a plain object; <JsonLd data={...} /> prints it inside  */
/* a <script type="application/ld+json"> tag.                          */
/* ------------------------------------------------------------------ */

/**
 * Organization + LocalBusiness schema for the whole site.
 * Tells Google the business name, logo, phone, city and (when filled in) address,
 * opening hours and social profiles. Helps the Google knowledge panel and local search.
 * Fields that are still null in site.js are simply left out.
 * @returns {Object}
 */
export function organizationJsonLd() {
  const address = {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
    ...(site.address.street && { streetAddress: site.address.street }),
    ...(site.address.postalCode && { postalCode: site.address.postalCode }),
  };

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl(site.seo.ogImage),
    description: site.description,
    slogan: site.tagline,
    telephone: site.phone,
    ...(site.email && { email: site.email }),
    // Tells Google how customers can reach the business (shown in the knowledge panel).
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: site.phone,
        ...(site.email && { email: site.email }),
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
    ],
    address,
    areaServed: [{ "@type": "City", name: "Pune" }, { "@type": "Country", name: "India" }],
    ...(site.geo && {
      geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    }),
    ...(site.openingHours.length > 0 && {
      openingHoursSpecification: site.openingHours.map((hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.days,
        opens: hours.opens,
        closes: hours.closes,
      })),
    }),
    ...(site.socialLinks.length > 0 && { sameAs: site.socialLinks.map((link) => link.url) }),
  };
}

/**
 * WebSite schema: tells Google the site name (shown above the URL in results).
 * @returns {Object}
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: site.name,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * BreadcrumbList schema: lets Google show "Home › Digital Marketing › SEO"
 * instead of a long URL in search results.
 * @param {Array<{name:string, path:string}>} items From Home to the current page, in order
 * @returns {Object}
 */
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * FAQPage schema: describes question/answer pairs that are visible on the page.
 * Google only accepts this for FAQs that people can actually read on the page.
 * @param {Array<{q:string, a:string}>} faqs
 * @returns {Object|null} null when there are no FAQs (nothing is printed then)
 */
export function faqJsonLd(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/**
 * Service schema: describes one service, who provides it and where.
 * @param {{title:string, short:string, seoDescription:string}} service
 * @param {string} path       The service page path
 * @param {string} categoryTitle
 * @returns {Object}
 */
export function serviceJsonLd(service, path, categoryTitle) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: categoryTitle,
    description: service.seoDescription,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [{ "@type": "City", name: "Pune" }, { "@type": "Country", name: "India" }],
  };
}

/**
 * BlogPosting schema for a blog article (title, date, author, image).
 * @param {{title:string, seoDescription:string, date:string, author:string, image:string}} post
 * @param {string} path
 * @returns {Object}
 */
export function blogPostingJsonLd(post, path) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(path),
    ...(post.image && post.image !== "#" && { image: absoluteUrl(post.image) }),
    inLanguage: "en-IN",
  };
}
