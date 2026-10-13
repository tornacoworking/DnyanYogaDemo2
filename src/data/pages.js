/**
 * pages.js
 * SEO titles/descriptions and text content for the fixed pages
 * (About, Services, Industries, FAQ, Contact, Careers, Internship, Testimonials,
 * Blog, Case Studies, Privacy Policy, Terms & Conditions).
 * Used on: those pages' <Seo> tags and page content.
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - about.foundedYear is null. Add the year the agency started (shown on /about).
 *  - privacyPolicy and terms: these are a starting point written for an Indian
 *    agency. Have them reviewed by a legal professional before going live.
 *  - legal.lastUpdated: change to the date you publish the final version.
 * ---------------------------------------------------------------------------
 */

/**
 * SEO for each fixed page.
 * title: 50–60 characters. description: 140–160 characters.
 * @type {Record<string, {title:string, description:string}>}
 */
export const pageSeo = {
  home: {
    title: "DnyanYoga Digital Services | Digital Marketing Pune",
    description:
      "DnyanYoga is a Pune agency for SEO, social media, branding, websites, e-commerce, design and video. Talk to us to grow your business online.",
  },
  about: {
    title: "About DnyanYoga | Digital Services Agency in Pune, India",
    description:
      "Meet DnyanYoga, a Pune agency bringing focus and clarity to branding, digital marketing, technology, design and video for growing businesses.",
  },
  services: {
    title: "Our Services | Digital Marketing Agency in Pune | DnyanYoga",
    description:
      "Explore all services from DnyanYoga in Pune: branding, SEO, social media, websites, apps, e-commerce, design, PR, video and photography today.",
  },
  industries: {
    title: "Industries We Serve | DnyanYoga Digital Services, Pune",
    description:
      "Digital marketing for real estate, healthcare, education, hospitality, retail, manufacturing and startups. See how DnyanYoga helps businesses in your industry.",
  },
  work: {
    title: "Our Work & Results | DnyanYoga Digital Services, Pune",
    description:
      "See how DnyanYoga turns SEO, websites, ads, social media and AI search into leads and growth for Pune businesses. Get a free website audit today.",
  },
  faq: {
    title: "FAQs | DnyanYoga Digital Services Agency in Pune, India",
    description:
      "Answers to common questions about working with DnyanYoga in Pune: services, pricing, contracts, timelines, reporting and the ownership of your work.",
  },
  contact: {
    title: "Contact Us | DnyanYoga Digital Services Agency, Pune",
    description:
      "Contact DnyanYoga in Pune. Call or WhatsApp +91 92848 72656 or send an enquiry to discuss branding, SEO, social media, websites or video projects.",
  },
  careers: {
    title: "Careers | Join the Team at DnyanYoga",
    description:
      "Build your career in digital marketing, design, technology and video at DnyanYoga in Pune. See current openings and apply online today.",
  },
  internship: {
    title: "Internships in Pune | DnyanYoga Digital Services",
    description:
      "Learn digital marketing, design, development and video with real projects. Apply for an internship at DnyanYoga in Pune and grow your skills.",
  },
  testimonials: {
    title: "Client Testimonials | DnyanYoga Digital Services, Pune",
    description:
      "Read and watch what clients say about working with DnyanYoga in Pune on branding, SEO, social media, websites, design and video projects.",
  },
  blog: {
    title: "Digital Marketing Blog | DnyanYoga Digital Services Pune",
    description:
      "Practical tips and guides on SEO, social media, branding, websites and e-commerce from the team at DnyanYoga in Pune. Learn and grow online.",
  },
  caseStudies: {
    title: "Case Studies & Results | DnyanYoga Digital Services, Pune",
    description:
      "See real results from DnyanYoga projects in Pune and across India: branding, SEO, social media, websites, e-commerce and video campaigns.",
  },
  privacy: {
    title: "Privacy Policy | DnyanYoga Digital Services in Pune",
    description:
      "Read how DnyanYoga collects, uses, stores and protects the personal information you share through our website, forms, calls and WhatsApp chats.",
  },
  terms: {
    title: "Terms & Conditions | DnyanYoga Digital Services, Pune",
    description:
      "The terms and conditions for using the DnyanYoga website, including content use, enquiries, intellectual property and limitation of liability.",
  },
  notFound: {
    title: "Page Not Found (404) | DnyanYoga Digital Services, Pune",
    description:
      "The page you are looking for could not be found. Explore DnyanYoga services in Pune or contact us by phone or WhatsApp for help today.",
  },
};

/** Content for /about. */
export const about = {
  foundedYear: null, // TODO: e.g. 2024
  heading: "Bringing focus and light to growing brands",
  intro:
    "DnyanYoga is a full-service agency based in Pune. We help businesses build strong brands, get found online and turn attention into customers.",
  story: [
    "Many good businesses stay hidden online. They have great products and services, but their websites are slow, their social media is quiet and their marketing feels scattered.",
    "We started DnyanYoga to change that. Our name joins dnyan (knowledge) with yoga (union), and our logo carries the prayer तमसो मा ज्योतिर्गमय: lead us from darkness to light. That is our promise to every client: focused work that brings their business out of the shadows and into the light.",
    "Today our team brings together brand strategists, digital marketers, developers, designers and video creators, so every part of your brand works together.",
  ],
  mission:
    "To give every business we work with a clear, consistent and visible brand, and marketing that brings real, measurable growth.",
  vision:
    "To be the most trusted growth partner for ambitious businesses in Pune and across India.",
  values: [
    { title: "Focus", icon: "Target", text: "We concentrate on the few things that will make the biggest difference to your business." },
    { title: "Honesty", icon: "ShieldCheck", text: "We give straight advice, set realistic expectations and report results openly." },
    { title: "Craft", icon: "PenTool", text: "We care about the details, from a headline to a line of code." },
    { title: "Partnership", icon: "Handshake", text: "We work as an extension of your team and celebrate your wins as our own." },
  ],
};

/** Shared values for the legal pages. */
export const legal = {
  lastUpdated: "2026-10-07", // TODO: update when the final version is published
};

/**
 * Privacy Policy content, as sections of heading + paragraphs.
 * TODO: have this reviewed by a legal professional.
 * @type {Array<{heading:string, paragraphs:string[]}>}
 */
export const privacyPolicy = [
  {
    heading: "Who we are",
    paragraphs: [
      "This website is run by DnyanYoga, a digital marketing agency based in Pune, Maharashtra, India. In this policy, \"we\", \"us\" and \"our\" mean DnyanYoga.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "When you fill in a form on this website, we collect the details you choose to share, such as your name, phone number, email address, company name, city, the service you are interested in, your budget range and your message.",
      "We also record basic technical details with each enquiry: the page you submitted it from, the date and time, and campaign information in the page address (UTM tags) so we know how you found us.",
      "If you call or message us on WhatsApp, we receive your phone number and the messages you send.",
    ],
  },
  {
    heading: "How we use your information",
    paragraphs: [
      "We use your information only to reply to your enquiry, discuss and provide our services, process job or internship applications, send newsletters you have signed up for, and improve our website and marketing.",
      "We do not sell your personal information to anyone.",
    ],
  },
  {
    heading: "Where your information is stored",
    paragraphs: [
      "Enquiries submitted through this website are sent by email to our team through a third-party form-to-email service (FormSubmit) and are read from our business inbox. We do not keep them in a separate database on this website.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep enquiry details for as long as needed to respond and provide our services, and to meet legal or accounting requirements. You can ask us to delete your details at any time.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask us to access, correct or delete the personal information we hold about you, or to stop sending you marketing messages. Contact us using the details on our Contact page and we will respond as soon as possible.",
    ],
  },
  {
    heading: "Cookies and third-party services",
    paragraphs: [
      "This website may use essential cookies and, if enabled, analytics tools to understand how visitors use the site. Embedded content such as Google Maps and YouTube videos may set their own cookies under those companies' privacy policies.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The date at the top of this page shows when it was last changed.",
    ],
  },
];

/**
 * Terms & Conditions content.
 * TODO: have this reviewed by a legal professional.
 * @type {Array<{heading:string, paragraphs:string[]}>}
 */
export const terms = [
  {
    heading: "About these terms",
    paragraphs: [
      "By using this website you agree to these terms. If you do not agree, please do not use the website.",
    ],
  },
  {
    heading: "Use of this website",
    paragraphs: [
      "The content on this website is for general information about our services. We work to keep it accurate and up to date, but it does not form an offer or contract. Details of any project are agreed separately in writing.",
      "You agree not to misuse the website, including by sending spam through our forms, trying to access it without permission or interfering with how it works.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The text, design, logo and other content on this website belong to DnyanYoga unless stated otherwise. You may not copy or reuse them for commercial purposes without our written permission.",
    ],
  },
  {
    heading: "Enquiries and communication",
    paragraphs: [
      "When you submit an enquiry, you agree that we may contact you by phone, WhatsApp or email about your request. Submitting an enquiry does not create a contract for services.",
    ],
  },
  {
    heading: "Links to other websites",
    paragraphs: [
      "This website may link to other websites. We are not responsible for their content or privacy practices.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "We are not liable for any loss arising from the use of this website or reliance on its general information, to the extent permitted by law.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India, and any disputes are subject to the jurisdiction of the courts in Pune, Maharashtra.",
    ],
  },
];
