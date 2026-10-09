/**
 * home.js
 * Text content for the homepage sections that are not services, stats or testimonials.
 * Used on: Home page (hero slider, about snippet, process, why choose us, CTA band).
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - heroSlides[].image and aboutSnippet.image use stock photos from Unsplash (saved in
 *    /public/images/hero/ and /public/images/about/). Replace them with your own office or
 *    team photos when you have them (WebP, hero ~1600×900, under 200 KB).
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} HeroSlide
 * @property {string} eyebrow   Small label above the headline (required)
 * @property {string} headline  Big headline (required). Only the first slide's headline is the page's H1.
 * @property {string} subtext   One-line supporting sentence (required)
 * @property {string} ctaLabel  Button text (required)
 * @property {string} ctaHref   Button link. Use "#enquire" to open the enquiry pop-up. (required)
 * @property {string} image     Background image path, or "#" for a plain navy placeholder (required)
 * @property {string} imageAlt  Description of the image for screen readers (use "" because the hero image is decorative; the text beside it carries the meaning)
 */

/** @type {HeroSlide[]} */
export const heroSlides = [
  {
    eyebrow: "Digital Marketing Agency in Pune",
    headline: "Grow your business from darkness to light",
    subtext: "Branding, SEO, social media, websites and video under one roof, focused on real results.",
    ctaLabel: "Get a Free Consultation",
    ctaHref: "#enquire",
    image: "/images/hero/branding-team.webp",
    imageAlt: "",
  },
  {
    eyebrow: "SEO & Performance Marketing",
    headline: "Be found first when customers search",
    subtext: "Rank higher on Google and turn ad budgets into measurable leads and sales.",
    ctaLabel: "Explore Digital Marketing",
    ctaHref: "/digital-marketing",
    image: "/images/hero/seo-analytics.webp",
    imageAlt: "",
  },
  {
    eyebrow: "Websites, Apps & E-commerce",
    headline: "Websites that work as hard as you do",
    subtext: "Fast, mobile-first websites and online stores designed to turn visitors into customers.",
    ctaLabel: "See Technology Services",
    ctaHref: "/technology",
    image: "/images/hero/web-development.webp",
    imageAlt: "",
  },
];

/** About snippet on the homepage (next to the counters). */
export const aboutSnippet = {
  eyebrow: "About DnyanYoga",
  heading: "A Pune agency that brings clarity to your marketing",
  paragraphs: [
    "Our name joins dnyan, knowledge, with yoga, union, and our logo carries the prayer तमसो मा ज्योतिर्गमय: lead us from darkness to light. That is how we approach marketing: we bring focus and clarity to businesses that feel unseen online.",
    "From brand strategy and SEO to websites, social media and video, we bring every skill your brand needs under one roof, with honest advice and reporting you can understand.",
  ],
  ctaLabel: "More about us",
  ctaHref: "/about",
  image: "/images/about/team-collaboration.webp",
  imageAlt: "A digital services team collaborating around laptops",
};

/**
 * Our Proven Process: 5 steps on the homepage.
 * @type {Array<{title:string, text:string, icon:string}>}
 */
export const processSteps = [
  { title: "Discover", icon: "Search", text: "We learn about your business, customers, competitors and goals." },
  { title: "Strategise", icon: "Compass", text: "We build a clear plan with channels, budgets, timelines and KPIs." },
  { title: "Create", icon: "PenTool", text: "Our team designs, writes, shoots and builds everything the plan needs." },
  { title: "Launch", icon: "Rocket", text: "We go live with careful tracking, so every result can be measured." },
  { title: "Grow", icon: "TrendingUp", text: "We review the data, improve what works and scale your results." },
];

/**
 * Why Choose Us: 3 differentiators.
 * @type {Array<{title:string, text:string, icon:string}>}
 */
export const whyChooseUs = [
  {
    title: "Everything under one roof",
    icon: "Layers",
    text: "Brand, digital marketing, technology, design and video teams work together, so your brand stays consistent and you deal with one partner.",
  },
  {
    title: "Honest, measurable results",
    icon: "TrendingUp",
    text: "We agree on clear goals upfront, track what matters and share simple reports. No vanity metrics, no confusing jargon.",
  },
  {
    title: "Mobile-first, SEO-first",
    icon: "Smartphone",
    text: "Most of your customers are on their phones. Everything we build is designed for mobile first and set up to be found on Google.",
  },
];

/** The "Ready to grow your brand?" call-to-action band. */
export const ctaBand = {
  heading: "Ready to grow your brand?",
  text: "Tell us about your business and goals. We will get back within one working day with ideas and next steps.",
  primaryLabel: "Let's Talk",
};
