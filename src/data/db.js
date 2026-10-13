/**
 * db.js
 * The single entry point for ALL website content. Every page and component
 * imports data from here, never from the individual files directly.
 * It also provides small helper functions to look things up (e.g. a service by slug)
 * and flags that say which optional sections have data.
 *
 * HOW THE CONTENT REACHES VISITORS: at build time, scripts/prerender.js renders every
 * page to a ready-made HTML file using this data (fast first load, Google reads it
 * directly). The same data is also bundled into the JavaScript so pages can switch
 * instantly when visitors click around. Never put secrets (passwords, API keys) in /src/data.
 */

import { site } from "./site";
import { categories, services } from "./services";
import { stats, googleRating } from "./stats";
import { testimonials } from "./testimonials";
import { caseStudies } from "./caseStudies";
import { blogPosts } from "./blog";
import { clients } from "./clients";
import { team } from "./team";
import { openings } from "./careers";
import { faqGroups } from "./faqs";
import { industries } from "./industries";
import { heroSlides, aboutSnippet, processSteps, whyChooseUs, ctaBand } from "./home";
import { workHero, aiSearch, auditTool, workRating, socialProof, sampleClients, sampleReviews, workProjects } from "./work";
import { pageSeo, about, legal, privacyPolicy, terms } from "./pages";

// Re-export everything so pages can do: import { site, services } from "@/data/db";
export {
  site,
  categories,
  services,
  stats,
  googleRating,
  testimonials,
  caseStudies,
  blogPosts,
  clients,
  team,
  openings,
  faqGroups,
  industries,
  heroSlides,
  aboutSnippet,
  processSteps,
  whyChooseUs,
  ctaBand,
  workHero,
  aiSearch,
  auditTool,
  workRating,
  socialProof,
  sampleClients,
  sampleReviews,
  workProjects,
  pageSeo,
  about,
  legal,
  privacyPolicy,
  terms,
};

/* ------------------------------------------------------------------ */
/* Lookup helpers                                                      */
/* ------------------------------------------------------------------ */

/**
 * Finds a category by its URL slug.
 * @param {string} slug e.g. "digital-marketing"
 * @returns {import("./services").Category | undefined} The category, or undefined if not found.
 */
export function getCategory(slug) {
  return categories.find((category) => category.slug === slug);
}

/**
 * Returns every service that belongs to one category, in the order written in services.js.
 * @param {string} categorySlug e.g. "brand"
 * @returns {import("./services").Service[]}
 */
export function getServicesByCategory(categorySlug) {
  return services.filter((service) => service.category === categorySlug);
}

/**
 * Finds one service inside a category.
 * @param {string} categorySlug e.g. "digital-marketing"
 * @param {string} serviceSlug  e.g. "seo"
 * @returns {import("./services").Service | undefined}
 */
export function getService(categorySlug, serviceSlug) {
  return services.find((service) => service.category === categorySlug && service.slug === serviceSlug);
}

/**
 * Finds a service by slug only (slugs are unique across the site).
 * Used to turn service slugs stored in other data (industries, case studies) into links.
 * @param {string} serviceSlug
 * @returns {import("./services").Service | undefined}
 */
export function findServiceBySlug(serviceSlug) {
  return services.find((service) => service.slug === serviceSlug);
}

/**
 * Builds the URL of a service page.
 * @param {{category:string, slug:string}} service
 * @returns {string} e.g. "/digital-marketing/seo"
 */
export function serviceUrl(service) {
  return `/${service.category}/${service.slug}`;
}

/**
 * Picks up to `limit` other services from the same category, used in "Related services".
 * @param {import("./services").Service} service The current service
 * @param {number} [limit=3]
 * @returns {import("./services").Service[]}
 */
export function getRelatedServices(service, limit = 3) {
  return getServicesByCategory(service.category)
    .filter((other) => other.slug !== service.slug)
    .slice(0, limit);
}

/** @returns {Array<{q:string,a:string}>} All general FAQs in one flat list. */
export function getAllFaqs() {
  return faqGroups.flatMap((group) => group.items);
}

/** Openings split by page. */
export const jobOpenings = openings.filter((opening) => opening.type === "job");
export const internshipOpenings = openings.filter((opening) => opening.type === "internship");

/* ------------------------------------------------------------------ */
/* "Has data" flags                                                    */
/* WHY: the Data Rules say an empty section must be hidden completely, */
/* including its menu and footer links and its sitemap entry. Every    */
/* component checks these flags instead of repeating the logic.        */
/* ------------------------------------------------------------------ */
export const hasData = {
  stats: stats.length > 0,
  googleRating: googleRating !== null,
  testimonials: testimonials.length > 0,
  caseStudies: caseStudies.length > 0,
  blog: blogPosts.length > 0,
  clients: clients.length > 0,
  team: team.length > 0,
  jobs: jobOpenings.length > 0,
  internships: internshipOpenings.length > 0,
};

/**
 * The "Quick links" shown in the footer and the mobile menu.
 * Links to sections without data are left out automatically.
 * @returns {Array<{label:string, href:string}>}
 */
export function getQuickLinks() {
  return [
    { label: "About Us", href: "/about", show: true },
    { label: "Services", href: "/services", show: true },
    { label: "Industries", href: "/industries", show: true },
    { label: "Our Work", href: "/work", show: true },
    { label: "Case Studies", href: "/case-studies", show: hasData.caseStudies },
    { label: "Testimonials", href: "/testimonials", show: hasData.testimonials },
    { label: "Blog", href: "/blog", show: hasData.blog },
    { label: "Careers", href: "/careers", show: hasData.jobs },
    { label: "Internship", href: "/internship", show: hasData.internships },
    { label: "FAQ", href: "/faq", show: true },
    { label: "Contact Us", href: "/contact", show: true },
  ]
    .filter((link) => link.show)
    .map(({ label, href }) => ({ label, href }));
}

/**
 * The menu structure passed to the header (desktop mega-menu + mobile drawer).
 * Only plain text and links are returned, so the menus stay simple.
 * @returns {Array<{title:string, href:string, services:Array<{title:string, href:string}>}>}
 */
export function getMenuCategories() {
  return categories.map((category) => ({
    title: category.menuTitle,
    href: `/${category.slug}`,
    services: getServicesByCategory(category.slug).map((service) => ({
      title: service.title,
      href: serviceUrl(service),
    })),
  }));
}

/**
 * The options of the "Service Interested In" dropdown, grouped by category.
 * @returns {Array<{group:string, options:string[]}>}
 */
export function getServiceOptions() {
  return categories.map((category) => ({
    group: category.title,
    options: getServicesByCategory(category.slug).map((service) => service.title),
  }));
}
