/**
 * industries.js
 * Industries the agency serves.
 * Used on: Home page (Industries we serve), /industries.
 * Read on the server only, through /src/data/db.js.
 */

/**
 * @typedef {Object} Industry
 * @property {string} slug         Unique id, lowercase-with-hyphens (required)
 * @property {string} name         Industry name (required)
 * @property {string} icon         Icon name from components/ui/Icon.jsx (required)
 * @property {string} summary      One sentence for the homepage card (required)
 * @property {string} description  Short paragraph for the /industries page (required)
 * @property {string[]} focus      Service slugs that help this industry most (required)
 */

/** @type {Industry[]} */
export const industries = [
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: "Building2",
    summary: "Generate quality site-visit leads for projects and properties.",
    description:
      "Property buyers research for months before visiting a site. We help developers, brokers and channel partners stay visible through that journey with lead-focused ads, project websites, virtual tours and content that builds trust.",
    focus: ["ppc-google-ads", "social-media-marketing", "website-designing", "ar-vr-content-creation"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    summary: "Help patients find and trust your clinic or hospital.",
    description:
      "Patients search online for doctors, clinics and treatments, and read reviews before booking. We help healthcare providers with local SEO, reputation management, educational content and simple appointment booking, always in a responsible and ethical way.",
    focus: ["seo", "online-reputation-management", "content-marketing-creation", "website-designing"],
  },
  {
    slug: "education",
    name: "Education",
    icon: "GraduationCap",
    summary: "Fill seats with admissions campaigns that reach the right students.",
    description:
      "Schools, colleges, coaching institutes and ed-tech companies compete hard during admission season. We plan admission campaigns, landing pages, social media and video content that reach students and parents at the right time.",
    focus: ["social-media-marketing", "ppc-google-ads", "social-media-video-production", "website-designing"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: "Hotel",
    summary: "Bring more bookings and footfall to hotels, cafes and restaurants.",
    description:
      "For hotels, resorts, cafes and restaurants, looks and reviews drive decisions. We create mouth-watering photos and reels, manage reviews and run local campaigns that bring more direct bookings and walk-ins.",
    focus: ["social-media-management", "lifestyle-fashion-photography", "online-reputation-management", "seo"],
  },
  {
    slug: "retail",
    name: "Retail & D2C",
    icon: "ShoppingBag",
    summary: "Grow online and in-store sales for retail and D2C brands.",
    description:
      "Retail and direct-to-consumer brands need strong visuals, smooth online stores and performance marketing that scales. We build e-commerce stores, shoot products and run campaigns focused on sales and repeat customers.",
    focus: ["shopify-development", "product-photography", "social-media-marketing", "email-marketing"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & B2B",
    icon: "Factory",
    summary: "Win more B2B enquiries, distributors and export leads.",
    description:
      "Manufacturers and B2B companies often have great products but a weak online presence. We create professional websites, corporate videos, LinkedIn campaigns and SEO that bring quality enquiries from buyers and distributors.",
    focus: ["website-designing", "corporate-video-production", "seo", "brand-identity"],
  },
  {
    slug: "startups",
    name: "Startups",
    icon: "Rocket",
    summary: "Launch faster with branding, websites and growth marketing.",
    description:
      "Startups need to look credible fast and learn quickly what works. We help founders with brand identity, launch strategies, websites, apps and lean growth marketing that tests ideas before scaling budgets.",
    focus: ["brand-identity", "brand-activation-launch-strategies", "full-stack-web-development", "social-media-marketing"],
  },
];
