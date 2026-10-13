/**
 * work.js
 * Content for the /work page: hero, AI search section, free audit tool and social proof.
 * Used on: /work (src/pages/WorkPage.jsx).
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: EVERYTHING BELOW MARKED "PLACEHOLDER" IS SAMPLE CONTENT.
 *  - workHero.stats, workHero.dashboard: placeholder figures from the design brief.
 *    Replace with verified numbers, then set workHero.statsAreSample to false
 *    (this removes the yellow "placeholders" notice).
 *  - sampleClients and sampleReviews: invented names for layout only. Each review card
 *    carries a "Sample" badge. Replace with real clients/reviews (with their permission),
 *    then set sample: false on each review to remove the badge.
 *  - workRating: placeholder Google rating. Add the real rating and reviewsUrl.
 *  - auditScores: an "Example output" for the audit tool, not a real result.
 * ---------------------------------------------------------------------------
 */

export const workHero = {
  locationBadge: "Pune",
  badgeText: "SEO · Websites · Social · Ads · AI search",
  headline: ["We Turn Digital", "Presence Into", "Business Growth."],
  // The last line is shown in the accent colour.
  intro:
    "DnyanYoga helps ambitious businesses grow through data-driven marketing, high-performing websites, SEO, social media, advertising and AI-powered digital strategies.",
  image: "/images/hero/seo-analytics.webp",
  imageAlt: "Marketing analytics dashboard on a laptop screen",
  // PLACEHOLDER figures (see the note at the top of this file).
  statsAreSample: true,
  stats: [
    { label: "Projects delivered", value: "100+" },
    { label: "Businesses served", value: "50+" },
    { label: "Client satisfaction", value: "95%" },
    { label: "Years in digital marketing", value: "5+" },
  ],
  // Floating "dashboard" cards next to the headline. PLACEHOLDER data.
  keywordRankings: [
    { keyword: "seo agency pune", rank: 2 },
    { keyword: "local seo services", rank: 3 },
    { keyword: "google ads expert", rank: 5 },
  ],
  dashboard: {
    sessionsLabel: "Organic sessions",
    sessions: "48,210",
    change: "+62%",
    metrics: [
      { label: "Leads", value: "1,284", delta: "+38%", good: true },
      { label: "Conv. rate", value: "4.6%", delta: "+1.2pt", good: true },
      { label: "Cost / lead", value: "₹412", delta: "-27%", good: true },
    ],
    // Points of the small trend line (0-100, left to right).
    trend: [8, 14, 12, 22, 20, 34, 30, 48, 62, 78],
  },
  campaign: { label: "Google Ads campaign", value: "4.2× ROAS", pacing: 78 },
};

export const aiSearch = {
  eyebrow: "AI search",
  headline: "Search is changing. Make sure your brand is the answer.",
  intro:
    "Your customers now ask ChatGPT, Gemini and Perplexity as well as Google. We optimise for both — with AI SEO, Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO).",
  primaryCta: { label: "Explore AI Marketing", href: "/digital-marketing" },
  secondaryCta: { label: "Read: AEO vs GEO", href: "/blog" },
  points: [
    {
      title: "Google AI Overviews",
      text: "Answer-first content and schema that AI summaries can quote.",
    },
    {
      title: "ChatGPT · Gemini · Perplexity",
      text: "Consistent brand facts and trusted mentions that generative engines cite.",
    },
    {
      title: "Classic Google search",
      text: "Technical SEO and authority — still the foundation for everything above.",
    },
  ],
  disclaimer:
    "No one can guarantee placement in AI answers. We improve the signals these systems rely on and track results transparently.",
};

export const auditTool = {
  eyebrow: "Free tool",
  headline: "How healthy is your website?",
  intro:
    "Get six quick scores — SEO, performance, mobile, content, technical and conversion — and the three things to fix first.",
  placeholder: "yourwebsite.com",
  buttonLabel: "Run Free Audit",
  // Preselected in the enquiry pop-up when the form is submitted.
  service: "SEO",
  image: "/images/hero/web-development.webp",
  // "Example output" tiles. tone: good | warn | bad
  exampleScores: [
    { label: "SEO", value: 78, tone: "good" },
    { label: "Speed", value: 64, tone: "warn" },
    { label: "Mobile", value: 91, tone: "good" },
    { label: "Content", value: 58, tone: "warn" },
    { label: "Technical", value: 72, tone: "good" },
    { label: "Conversion", value: 49, tone: "bad" },
  ],
};

/** PLACEHOLDER Google rating shown in the Social proof section. */
export const workRating = {
  rating: 4.9,
  reviewCount: "60+",
  reviewsUrl: "", // TODO: add the Google reviews link; the badge is not a link while empty
};

export const socialProof = {
  eyebrow: "Social proof",
  headline: "Trusted by businesses ready to grow.",
  intro:
    "Clinics, developers, D2C brands, institutes and manufacturers work with us because we tie marketing to numbers they already care about.",
};

/** PLACEHOLDER client names for the scrolling strip (invented). */
export const sampleClients = [
  "Aurora Realty",
  "Kestrel Labs",
  "Lumen Foods",
  "Orbit Learning",
  "Vertex Motors",
  "Saffron & Co.",
  "Bluepeak Finance",
];

/**
 * PLACEHOLDER reviews (invented names). For each REAL review:
 *  - use the client's real name, role and words (with their permission),
 *  - set `photo` to their picture, e.g. "/images/clients/priya-s.webp" (square, ~200px, WebP;
 *    leave "" to show their initials instead),
 *  - set `rating` (1-5) and delete the `sample: true` line (this removes the "Sample" tag).
 */
export const sampleReviews = [
  {
    quote:
      "Within six months our appointment requests from Google had nearly doubled. The monthly reports are clear enough that I actually read them.",
    name: "Dr. A. Kulkarni",
    role: "Director, Sample Multispeciality Clinic",
    rating: 5,
    photo: "",
    sample: true,
  },
  {
    quote:
      "They fixed our store before asking for more ad budget. Our cost per purchase came down and we finally know which creatives work.",
    name: "Priya S.",
    role: "Co-founder, Sample D2C Brand",
    rating: 5,
    photo: "",
    sample: true,
  },
  {
    quote:
      "Lead quality changed completely. Our team spends time on real site visits instead of chasing numbers that never pick up.",
    name: "Rahul M.",
    role: "Sales Head, Sample Realty",
    rating: 5,
    photo: "",
    sample: true,
  },
  {
    quote:
      "Counsellors now respond within minutes and enrolments are up. The team understands how admissions actually work.",
    name: "Sneha D.",
    role: "Admissions Manager, Sample Institute",
    rating: 5,
    photo: "",
    sample: true,
  },
  {
    quote:
      "The brand refresh and Instagram work brought a new crowd in on weekdays. They shoot at our outlets and it shows.",
    name: "Vikram J.",
    role: "Founder, Sample Café Chain",
    rating: 5,
    photo: "",
    sample: true,
  },
  {
    quote:
      "Our new website gets RFQs from companies we had never heard of. Straightforward team, no jargon.",
    name: "Nitin P.",
    role: "Managing Director, Sample Manufacturer",
    rating: 5,
    photo: "",
    sample: true,
  },
];

export const workProjects = {
  eyebrow: "Selected work",
  headline: "Projects that moved real numbers.",
  intro: "A few of the brands we have helped grow, and what changed for them.",
  cta: "Start your project",
  /**
   * PLACEHOLDER projects (invented). For each REAL project: fill in the real client, result and
   * summary, point `image` at a project picture in /public/images/work/, and delete `sample: true`
   * (this removes the "Sample project" tag).
   */
  items: [
    {
      title: "Local SEO for a multispeciality clinic",
      client: "Sample Multispeciality Clinic",
      industry: "Healthcare",
      result: "2x appointment requests from Google",
      summary: "Rebuilt the service pages, fixed local listings and tracked every call and form from search.",
      services: ["SEO", "Website"],
      image: "/images/services/seo.webp",
      sample: true,
    },
    {
      title: "Store fixes before ad spend for a D2C brand",
      client: "Sample D2C Brand",
      industry: "E-commerce",
      result: "Lower cost per purchase",
      summary: "Improved product pages and checkout first, then scaled Google and Meta ads on the creatives that worked.",
      services: ["Google Ads", "E-commerce"],
      image: "/images/services/ecommerce-website-development.webp",
      sample: true,
    },
    {
      title: "Lead-quality campaign for a real estate developer",
      client: "Sample Realty",
      industry: "Real estate",
      result: "More site visits, fewer dead leads",
      summary: "Tightened targeting and lead forms so the sales team called buyers, not random numbers.",
      services: ["PPC", "Landing pages"],
      image: "/images/services/ppc-google-ads.webp",
      sample: true,
    },
    {
      title: "Admissions funnel for an institute",
      client: "Sample Institute",
      industry: "Education",
      result: "Enquiries answered in minutes",
      summary: "Set up enquiry capture and follow-up so counsellors respond fast, backed by SEO and social campaigns.",
      services: ["SEO", "Social media"],
      image: "/images/services/social-media-marketing.webp",
      sample: true,
    },
    {
      title: "Brand refresh and Instagram for a cafe chain",
      client: "Sample Cafe Chain",
      industry: "Hospitality",
      result: "New weekday crowd",
      summary: "New identity and an Instagram plan built around on-site shoots at each outlet.",
      services: ["Branding", "Social media"],
      image: "/images/services/brand-identity.webp",
      sample: true,
    },
    {
      title: "Lead-generating website for a manufacturer",
      client: "Sample Manufacturer",
      industry: "Manufacturing",
      result: "RFQs from new companies",
      summary: "A clear catalogue-style website with quote forms and SEO for the products buyers search for.",
      services: ["Website", "SEO"],
      image: "/images/services/website-designing.webp",
      sample: true,
    },
  ],
};
