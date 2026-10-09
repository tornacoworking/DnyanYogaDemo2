/**
 * faqs.js
 * General questions about working with the agency.
 * Used on: Home page (FAQ section shows the first 6), /faq (shows all, grouped).
 * Each service also has its own FAQs inside services.js.
 * Read on the server only, through /src/data/db.js.
 */

/**
 * @typedef {Object} FaqGroup
 * @property {string} group   Group heading on the /faq page (required)
 * @property {Array<{q:string, a:string}>} items  Questions and answers (required)
 */

/** @type {FaqGroup[]} */
export const faqGroups = [
  {
    group: "Working with us",
    items: [
      {
        q: "What does DnyanYoga do?",
        a: "We are a Pune-based digital marketing agency. We help businesses with branding, SEO, social media, Google Ads, websites and apps, e-commerce stores, design, PR, video and photography.",
      },
      {
        q: "Do you only work with businesses in Pune?",
        a: "No. We are based in Pune and love working with local businesses, but most of our services are delivered online, so we work with clients across India and abroad.",
      },
      {
        q: "How do we get started?",
        a: "Fill in the enquiry form or call or WhatsApp us. We will set up a free discovery call to understand your goals, then share a proposal with scope, timeline and pricing.",
      },
      {
        q: "Do you offer one-time projects or monthly plans?",
        a: "Both. Websites, branding and videos are usually one-time projects. SEO, social media, ads and content usually run on monthly plans because they improve over time.",
      },
    ],
  },
  {
    group: "Pricing and contracts",
    items: [
      {
        q: "How much do your services cost?",
        a: "Pricing depends on your goals, the services you need and the scope of work. After a short discovery call we share a clear proposal, with no hidden charges.",
      },
      {
        q: "Is there a long-term lock-in?",
        a: "We prefer to earn your trust month by month. Monthly services usually start with a minimum period so there is enough time to see results, and this is always agreed upfront.",
      },
      {
        q: "Is ad spend included in your fees?",
        a: "No. Advertising budgets are paid directly to platforms like Google and Meta, so you keep full control and visibility. Our fee covers strategy, creatives and management.",
      },
    ],
  },
  {
    group: "Results and reporting",
    items: [
      {
        q: "How will I know if the marketing is working?",
        a: "We agree on clear goals and KPIs at the start, set up tracking, and send simple monthly reports showing results, what we learnt and what we will do next.",
      },
      {
        q: "How soon will I see results?",
        a: "Paid ads can bring enquiries within weeks. SEO, content and organic social media usually take three to six months to build strong, lasting results.",
      },
      {
        q: "Will I own my website, ad accounts and content?",
        a: "Yes. Your website, domain, ad accounts, social profiles and the content we create for you belong to your business.",
      },
    ],
  },
];
