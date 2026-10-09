/**
 * services.js
 * Every service category and every individual service the agency offers.
 * Used on: header mega-menu, mobile menu, footer, /services, the 6 category
 * pages (/brand, /digital-marketing, ...), every service page
 * (/brand/brand-identity, ...), enquiry form "Service" dropdown, sitemap.
 * Read on the server only, through /src/data/db.js.
 *
 * HOW PAGES ARE MADE: src/pages/CategoryPage.jsx and src/pages/ServicePage.jsx read the
 * slugs from the URL and look them up here, and scripts/prerender.js builds an HTML file for
 * every entry, so adding a new object here automatically creates a new page.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO:
 *  - image: every category and service points to a photo in /public/images/categories/ or
 *    /public/images/services/ (WebP, downloaded from Unsplash, free to use). Swap a file, or
 *    change the path, to use your own photo. "#" still shows a plain placeholder.
 *    While it is "#", a branded navy-to-orange graphic with the icon is shown instead.
 *  - Review the wording of each service and adjust it to match exactly how you work.
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} ProcessStep
 * @property {string} title  Step name, e.g. "Research" (required)
 * @property {string} text   One or two sentences on what happens in this step (required)
 */

/**
 * @typedef {Object} Category
 * @property {string} slug            URL part, lowercase with hyphens, e.g. "digital-marketing" (required, unique)
 * @property {string} title           Full name shown on the page (required)
 * @property {string} menuTitle       Shorter name for menus (required)
 * @property {string} icon            Icon name from components/ui/Icon.jsx (required)
 * @property {string} tagline         One-line summary under the title (required)
 * @property {string[]} intro         One or more paragraphs for the category page (required)
 * @property {ProcessStep[]} process  5 steps shown on the category's service pages (required)
 * @property {string} image           Image path, or "#" while there is no image (required)
 * @property {string} seoTitle        <title> tag, 50–60 characters (required)
 * @property {string} seoDescription  Meta description, 140–160 characters (required)
 */

/**
 * @typedef {Object} Service
 * @property {string} slug            URL part, e.g. "seo" (required, unique inside its category)
 * @property {string} category        slug of the category it belongs to (required)
 * @property {string} title           Service name (required)
 * @property {string} icon            Icon name from components/ui/Icon.jsx (required)
 * @property {string} short           One sentence used on cards (required)
 * @property {string[]} overview      Paragraphs for the "Overview" section (required)
 * @property {Array<{title:string,text:string}>} features  "What's included" cards, 3–6 items (required)
 * @property {string[]} benefits      Short benefit lines (required)
 * @property {Array<{q:string,a:string}>} faqs  Questions and answers for the FAQ accordion (required)
 * @property {string} image           Image path, or "#" while there is no image (required)
 * @property {string} [seoTitle]      Optional custom <title>. If missing, one is built from the title.
 * @property {string} seoDescription  Meta description, 140–160 characters (required)
 */

/** @type {Category[]} */
export const categories = [
  {
    slug: "brand",
    title: "Brand Solutions",
    menuTitle: "Brand",
    icon: "Sparkles",
    tagline: "Build a brand people remember, trust and choose.",
    intro: [
      "A strong brand makes every other kind of marketing easier. When people instantly understand who you are, what you stand for and why you are different, they choose you faster and stay with you longer.",
      "We help new and growing businesses shape their identity from the ground up: strategy, positioning, messaging, voice and visual design, all working together as one clear brand.",
    ],
    process: [
      { title: "Discover", text: "We study your business, customers, competitors and goals through workshops and research." },
      { title: "Define", text: "We agree on your positioning, audience, personality and the promise your brand makes." },
      { title: "Design", text: "We create the identity, messaging and guidelines that bring the strategy to life." },
      { title: "Deliver", text: "You receive ready-to-use brand files, templates and a clear brand guideline document." },
      { title: "Support", text: "We help your team apply the brand consistently across every channel as you grow." },
    ],
    image: "/images/categories/brand.webp",
    seoTitle: "Branding Agency in Pune | DnyanYoga Digital Services",
    seoDescription:
      "Brand identity, positioning, messaging and brand strategy services in Pune. DnyanYoga builds brands that people remember, trust and choose online.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    menuTitle: "Digital Marketing",
    icon: "TrendingUp",
    tagline: "Reach the right people online and turn them into customers.",
    intro: [
      "Your customers are searching, scrolling and comparing online every day. Digital marketing puts your business in front of them at the right moment, with the right message.",
      "From SEO and paid ads to social media, email and influencer campaigns, we plan and run marketing that is measured by one thing: real business results.",
    ],
    process: [
      { title: "Audit", text: "We review your current channels, website, competitors and the numbers you have today." },
      { title: "Plan", text: "We set clear goals and KPIs and build a channel plan and content calendar around them." },
      { title: "Launch", text: "We set up tracking, create the content and ads, and start the campaigns." },
      { title: "Optimise", text: "We watch the data every week and improve targeting, creatives and budgets." },
      { title: "Report", text: "You get simple monthly reports showing what worked, what we learnt and what comes next." },
    ],
    image: "/images/categories/digital-marketing.webp",
    seoTitle: "SEO & Digital Marketing Services in Pune | DnyanYoga",
    seoDescription:
      "SEO, social media, Google Ads, email, content and influencer marketing in Pune. DnyanYoga runs campaigns focused on leads and real growth for you.",
  },
  {
    slug: "technology",
    title: "Technology Solutions",
    menuTitle: "Technology",
    icon: "Code",
    tagline: "Fast, secure websites and apps built to grow your business.",
    intro: [
      "Your website or app is often the first place customers meet your business. It needs to load fast, look great on every phone and make it easy for people to contact or buy from you.",
      "We design and develop websites, WordPress sites, mobile apps and custom web applications with clean code, strong SEO foundations and simple ways for your team to update content.",
    ],
    process: [
      { title: "Requirements", text: "We understand your goals, users, features and content, and agree on the scope." },
      { title: "Design", text: "We create wireframes and visual designs, mobile first, for your approval." },
      { title: "Develop", text: "We build the site or app with clean, well-commented code and regular previews." },
      { title: "Test & Launch", text: "We test on real devices and browsers, check speed and SEO, then go live." },
      { title: "Maintain", text: "We offer updates, backups, security checks and improvements after launch." },
    ],
    image: "/images/categories/technology.webp",
    seoTitle: "Website & App Development Company in Pune | DnyanYoga",
    seoDescription:
      "Website design, WordPress, mobile app and full stack web development in Pune. DnyanYoga builds fast, secure, SEO-ready websites and apps for you.",
  },
  {
    slug: "design-media",
    title: "Design & Media",
    menuTitle: "Design & Media",
    icon: "PenTool",
    tagline: "Design and media that get your brand seen and talked about.",
    intro: [
      "Good design makes people stop, look and understand. The right media plan makes sure the right people see it.",
      "Our design and media team handles everything from logos, print and UI/UX design to PR and media buying, so your brand looks professional and reaches the audience that matters.",
    ],
    process: [
      { title: "Brief", text: "We understand the goal, audience, message and where the work will appear." },
      { title: "Concept", text: "We explore ideas and share first concepts or a media plan for feedback." },
      { title: "Create", text: "We refine the chosen direction into polished, ready-to-use work." },
      { title: "Deliver", text: "You receive final files in every format you need, or we place the media for you." },
      { title: "Measure", text: "For media and PR, we track reach and results and report back clearly." },
    ],
    image: "/images/categories/design-media.webp",
    seoTitle: "Creative Design, PR & Media Agency in Pune | DnyanYoga",
    seoDescription:
      "Logo, print, creative and UI/UX design plus PR and media buying in Pune. DnyanYoga makes your brand look great and reach the right people fast.",
  },
  {
    slug: "ecommerce",
    title: "E-commerce Solutions",
    menuTitle: "E-commerce",
    icon: "ShoppingCart",
    tagline: "Online stores that are easy to manage and easy to buy from.",
    intro: [
      "Selling online needs more than a product list. It needs a fast store, smooth checkout, secure payments and a setup your team can manage every day.",
      "We build and improve online stores on Shopify, WooCommerce, Magento, PrestaShop and custom platforms, with Indian payment gateways, shipping and GST-ready setups.",
    ],
    process: [
      { title: "Plan", text: "We choose the right platform for your products, budget and growth plans." },
      { title: "Design", text: "We design a mobile-first store focused on easy browsing and quick checkout." },
      { title: "Build", text: "We set up products, payments, shipping, taxes and the apps or plugins you need." },
      { title: "Launch", text: "We test orders end to end, train your team and take the store live." },
      { title: "Grow", text: "We help improve conversions and connect the store with marketing campaigns." },
    ],
    image: "/images/categories/ecommerce.webp",
    seoTitle: "E-commerce Solutions & Online Stores in Pune | DnyanYoga",
    seoDescription:
      "Shopify, WooCommerce, Magento and PrestaShop store development in Pune. DnyanYoga builds online stores that are easy to run and simple to buy from.",
  },
  {
    slug: "video-photography",
    title: "Video & Photography",
    menuTitle: "Video & Photography",
    icon: "Video",
    tagline: "Visual stories that make people watch, feel and act.",
    intro: [
      "Video and photos are the fastest way to show what your brand is about. They grab attention on social media, build trust on your website and help products sell.",
      "We plan, shoot and edit commercial videos, corporate films, social media reels, product photography and more, with a clear story behind every frame.",
    ],
    process: [
      { title: "Concept", text: "We understand the goal and audience and develop the idea and story." },
      { title: "Pre-production", text: "We prepare scripts, storyboards, shot lists, locations and schedules." },
      { title: "Shoot", text: "Our crew captures the footage and photos with professional equipment." },
      { title: "Post-production", text: "We edit, colour-grade, add music, graphics and subtitles." },
      { title: "Deliver", text: "You receive final files sized for every platform you plan to use." },
    ],
    image: "/images/categories/video-photography.webp",
    seoTitle: "Video Production & Photography in Pune | DnyanYoga",
    seoDescription:
      "Commercial video, corporate films, social media reels and product photography in Pune. DnyanYoga creates visuals that make people stop, watch and act.",
  },
];

/** @type {Service[]} */
export const services = [
  /* ===================== BRAND SOLUTIONS ===================== */
  {
    slug: "brand-identity",
    category: "brand",
    title: "Brand Identity",
    icon: "Fingerprint",
    short: "A complete visual and verbal identity that makes your business instantly recognisable.",
    overview: [
      "Your brand identity is everything people see and hear from you: your name, logo, colours, fonts, imagery and tone. When these work together, people recognise you anywhere and remember you later.",
      "We create a complete identity system based on your strategy, and give you clear rules so every post, brochure and web page looks like it came from the same brand.",
    ],
    features: [
      { title: "Logo & logo variations", text: "A primary logo plus versions for social media, favicons, dark and light backgrounds." },
      { title: "Colour & typography system", text: "A brand palette and font pairing chosen for clarity, mood and accessibility." },
      { title: "Visual language", text: "Patterns, icon style, photography direction and graphic elements." },
      { title: "Brand guidelines", text: "A simple guide that shows your team exactly how to use the identity." },
    ],
    benefits: [
      "Look professional and consistent everywhere",
      "Be recognised faster by customers",
      "Save time on every future design",
      "Build long-term trust and value",
    ],
    faqs: [
      { q: "What is the difference between a logo and a brand identity?", a: "A logo is one part of your identity. A brand identity is the full system: logo, colours, fonts, imagery, tone of voice and the rules for using them together." },
      { q: "How long does a brand identity project take?", a: "Most projects take three to six weeks, depending on the research needed and the number of feedback rounds." },
      { q: "Will I own the final files?", a: "Yes. Once the project is complete you receive all final source and export files, and full rights to use them." },
    ],
    image: "/images/services/brand-identity.webp",
    seoTitle: "Brand Identity Design in Pune | DnyanYoga Digital Services",
    seoDescription:
      "Brand identity design in Pune: logo, colours, fonts, visual language and brand guidelines. Look professional and consistent with DnyanYoga today.",
  },
  {
    slug: "brand-positioning",
    category: "brand",
    title: "Brand Positioning",
    icon: "Target",
    short: "Find the clear, unique place your brand should own in your customers' minds.",
    overview: [
      "Positioning answers one simple question: why should a customer choose you over everyone else? Without a clear answer, businesses end up competing only on price.",
      "We research your market, customers and competitors to find a position that is true to you, valuable to your customers and hard for others to copy.",
    ],
    features: [
      { title: "Market & competitor research", text: "We map who else your customers are considering and how they talk about themselves." },
      { title: "Customer insight", text: "We dig into what your best customers really want, fear and value." },
      { title: "Positioning statement", text: "One clear sentence that guides your marketing, sales and product decisions." },
      { title: "Proof points", text: "The facts and stories that make your position believable." },
    ],
    benefits: [
      "Stand out in a crowded market",
      "Stop competing only on price",
      "Make marketing decisions faster",
      "Attract better-fit customers",
    ],
    faqs: [
      { q: "Do small businesses need brand positioning?", a: "Yes. Small businesses often benefit the most, because a sharp position helps a small budget work harder against bigger competitors." },
      { q: "Can you reposition an existing brand?", a: "Yes. We review how you are seen today, find the gaps and help you move to a stronger position step by step." },
      { q: "What do I receive at the end?", a: "A positioning document with your target audience, positioning statement, key differentiators and proof points." },
    ],
    image: "/images/services/brand-positioning.webp",
    seoTitle: "Brand Positioning Strategy Agency in Pune | DnyanYoga",
    seoDescription:
      "Brand positioning services in Pune. We research your market and customers to find a clear, unique position that helps your business stand out from rivals.",
  },
  {
    slug: "brand-messaging",
    category: "brand",
    title: "Brand Messaging",
    icon: "MessageSquare",
    short: "Clear, consistent words that explain what you do and why it matters.",
    overview: [
      "Customers decide in seconds whether you are right for them. Your messaging needs to tell them quickly what you offer, who it is for and why it is better.",
      "We build a messaging framework that your whole team can use, from the website headline to sales calls and social media captions.",
    ],
    features: [
      { title: "Core message & value proposition", text: "The main idea every piece of communication should support." },
      { title: "Audience-specific messages", text: "Tailored key messages for each type of customer you serve." },
      { title: "Taglines & headlines", text: "Short, memorable lines for your website, ads and campaigns." },
      { title: "Messaging guide", text: "A practical reference document with do's, don'ts and examples." },
    ],
    benefits: [
      "Explain your business in seconds",
      "Keep every team member on message",
      "Improve website and ad conversions",
      "Write content faster",
    ],
    faqs: [
      { q: "Is brand messaging the same as copywriting?", a: "Messaging is the foundation; copywriting uses it. We first define what you say, and then any copy, from ads to web pages, is written from that framework." },
      { q: "Can you write in Hindi or Marathi as well?", a: "Yes. We can adapt your core messages for Hindi and Marathi audiences while keeping the meaning consistent." },
      { q: "How do you test whether the messaging works?", a: "We can test key messages through ads, landing pages or customer feedback before rolling them out everywhere." },
    ],
    image: "/images/services/brand-messaging.webp",
    seoTitle: "Brand Messaging in Pune | DnyanYoga Digital Services",
    seoDescription:
      "Brand messaging services in Pune: value proposition, key messages, taglines and a messaging guide so your business is explained clearly and consistently.",
  },
  {
    slug: "brand-voice",
    category: "brand",
    title: "Brand Voice",
    icon: "Mic",
    short: "A distinct personality and tone that makes your brand sound like you.",
    overview: [
      "Two brands can say the same thing and feel completely different. That difference is voice. A consistent voice makes your brand feel human, familiar and trustworthy.",
      "We define how your brand speaks, in writing and on camera, and show your team how to use that voice across every channel.",
    ],
    features: [
      { title: "Personality traits", text: "Three to four traits that describe how your brand should feel." },
      { title: "Tone for every situation", text: "How the voice adapts for ads, support replies, social posts and formal documents." },
      { title: "Word lists", text: "Words and phrases to use, and ones to avoid." },
      { title: "Before & after examples", text: "Real examples of your content rewritten in the new voice." },
    ],
    benefits: [
      "Sound consistent across every channel",
      "Connect emotionally with customers",
      "Make content creation easier for your team",
      "Be more memorable than competitors",
    ],
    faqs: [
      { q: "Why does my business need a brand voice?", a: "When several people write for your brand, the tone can change from post to post. A defined voice keeps you consistent and recognisable." },
      { q: "Is brand voice only for social media?", a: "No. It applies to your website, emails, ads, customer support, packaging, videos and anything else your customers read or hear." },
      { q: "Can you train our team?", a: "Yes. We can run a short workshop to help your team write confidently in the new voice." },
    ],
    image: "/images/services/brand-voice.webp",
    seoDescription:
      "Define a brand voice that sounds like you. DnyanYoga in Pune creates personality traits, tone guides and real examples for consistent content.",
  },
  {
    slug: "brand-strategy-development",
    category: "brand",
    title: "Brand Strategy Development",
    icon: "Compass",
    short: "A long-term plan that connects your brand to your business goals.",
    overview: [
      "Brand strategy is the plan behind everything else: who you serve, what you stand for, how you are different and how your brand will grow over the next few years.",
      "We combine research, workshops and practical thinking to create a strategy that guides your marketing, hiring, product and customer experience decisions.",
    ],
    features: [
      { title: "Brand workshops", text: "Guided sessions with your leadership team to agree on vision, mission and values." },
      { title: "Audience personas", text: "Clear profiles of your most valuable customers and what drives them." },
      { title: "Brand architecture", text: "How your products, services or sub-brands relate to each other." },
      { title: "Roadmap", text: "A step-by-step plan to roll out the strategy across your business." },
    ],
    benefits: [
      "Align your whole team behind one direction",
      "Make confident marketing decisions",
      "Build brand value over time",
      "Grow without losing your identity",
    ],
    faqs: [
      { q: "When should a business invest in brand strategy?", a: "At launch, before a rebrand, when entering a new market, or when growth slows and marketing stops working as well as it used to." },
      { q: "How is brand strategy different from marketing strategy?", a: "Brand strategy defines who you are and why you matter. Marketing strategy decides how to reach and convert customers using that brand." },
      { q: "What is included in the final strategy?", a: "Vision, mission, values, audience personas, positioning, brand architecture, messaging pillars and a rollout roadmap." },
    ],
    image: "/images/services/brand-strategy-development.webp",
    seoTitle: "Brand Strategy Development Agency in Pune | DnyanYoga",
    seoDescription:
      "Brand strategy development in Pune: workshops, personas, positioning and a clear roadmap that connects your brand to long-term business goals and growth.",
  },
  {
    slug: "brand-design",
    category: "brand",
    title: "Brand Design",
    icon: "Palette",
    short: "Beautiful, consistent brand assets for every place your customers see you.",
    overview: [
      "Once your identity is set, you need it on everything: business cards, social templates, presentations, signage, packaging and more.",
      "We design a complete toolkit of brand assets so your business looks polished and consistent at every touchpoint, online and offline.",
    ],
    features: [
      { title: "Stationery", text: "Business cards, letterheads, envelopes, email signatures and invoices." },
      { title: "Social media templates", text: "Editable post, story and highlight templates in your brand style." },
      { title: "Presentation templates", text: "Pitch and company profile decks your team can easily reuse." },
      { title: "Signage & merchandise", text: "Office signage, standees, T-shirts, mugs and event branding." },
    ],
    benefits: [
      "Look professional at every touchpoint",
      "Save time with ready templates",
      "Keep a consistent look as you grow",
      "Impress clients, partners and investors",
    ],
    faqs: [
      { q: "Do I need a brand identity before brand design?", a: "Ideally yes. If you do not have one yet, we can create the identity first and then design the assets." },
      { q: "Will the templates be editable?", a: "Yes. We can provide templates in Canva, PowerPoint, Google Slides or Adobe formats, depending on what your team uses." },
      { q: "Can you handle printing as well?", a: "We prepare print-ready files and can coordinate with trusted printers in Pune if you need it." },
    ],
    image: "/images/services/brand-design.webp",
    seoDescription:
      "Brand design services in Pune: stationery, social media templates, presentations, signage and merchandise that keep your brand polished and consistent.",
  },
  {
    slug: "brand-audit-analysis",
    category: "brand",
    title: "Brand Audit & Analysis",
    icon: "ClipboardCheck",
    short: "An honest health check of how your brand is seen and where it can improve.",
    overview: [
      "Over time brands drift. Logos get stretched, messages change, new channels appear and customers' expectations move on. A brand audit shows you exactly where you stand.",
      "We review your brand assets, online presence, customer perception and competitors, then give you a clear report with prioritised recommendations.",
    ],
    features: [
      { title: "Asset review", text: "We check your logo, website, social media, print and packaging for consistency." },
      { title: "Perception research", text: "Surveys, reviews and interviews show how customers really see you." },
      { title: "Competitor comparison", text: "We compare your brand with key competitors on look, message and visibility." },
      { title: "Action plan", text: "A prioritised list of quick wins and long-term improvements." },
    ],
    benefits: [
      "See your brand through your customers' eyes",
      "Find and fix inconsistencies",
      "Spot opportunities competitors are missing",
      "Plan a rebrand with confidence",
    ],
    faqs: [
      { q: "How often should we audit our brand?", a: "Every one to two years, or before any major change such as a rebrand, new market or new product line." },
      { q: "Does an audit mean we need a full rebrand?", a: "Not at all. Many audits end with small, practical fixes. A rebrand is only recommended when the evidence clearly supports it." },
      { q: "How long does a brand audit take?", a: "Most audits take two to four weeks, depending on how many channels and markets are involved." },
    ],
    image: "/images/services/brand-audit-analysis.webp",
    seoTitle: "Brand Audit & Analysis Services in Pune | DnyanYoga",
    seoDescription:
      "Brand audit and analysis in Pune. We review your assets, customer perception and competitors, then give you a clear action plan to strengthen your brand.",
  },
  {
    slug: "brand-activation-launch-strategies",
    category: "brand",
    title: "Brand Activation & Launch Strategies",
    icon: "Rocket",
    short: "Launch a new brand, product or rebrand with impact and momentum.",
    overview: [
      "A launch is your best chance to make noise. Done well, it builds awareness, excitement and early sales. Done badly, even a great product can go unnoticed.",
      "We plan and run launches and activations that combine digital campaigns, events, PR, influencers and on-ground experiences to get people talking.",
    ],
    features: [
      { title: "Launch strategy", text: "Goals, audience, key message, timeline and budget split across channels." },
      { title: "Pre-launch buzz", text: "Teasers, waitlists, influencer seeding and social countdowns." },
      { title: "Launch campaigns", text: "Coordinated ads, PR, content and events on launch day and week." },
      { title: "On-ground activation", text: "Pop-ups, events, sampling and in-store experiences that let people try the brand." },
    ],
    benefits: [
      "Create strong first impressions",
      "Build awareness quickly",
      "Generate early leads and sales",
      "Get people talking about your brand",
    ],
    faqs: [
      { q: "How early should we start planning a launch?", a: "Ideally six to eight weeks before launch day, so there is time for teasers, content creation and media bookings." },
      { q: "Do you handle offline events too?", a: "Yes. We can plan and manage on-ground activations, pop-ups and launch events alongside the digital campaign." },
      { q: "Can you launch a rebrand without confusing existing customers?", a: "Yes. We plan clear communication that explains what is changing and why, so loyal customers feel included." },
    ],
    image: "/images/services/brand-activation-launch-strategies.webp",
    seoTitle: "Brand Activation & Launch Strategy | DnyanYoga Pune",
    seoDescription:
      "Brand activation and launch strategies in Pune. Plan a new brand, product or rebrand launch with digital campaigns, PR, influencers and on-ground events.",
  },

  /* ===================== DIGITAL MARKETING ===================== */
  {
    slug: "social-media-marketing",
    category: "digital-marketing",
    title: "Social Media Marketing",
    icon: "Share2",
    short: "Campaigns on Instagram, Facebook, LinkedIn and YouTube that build reach and leads.",
    overview: [
      "Social media is where your customers spend hours every day. The right content and ads can turn that attention into followers, enquiries and sales.",
      "We create social media strategies and campaigns that combine engaging content with targeted paid ads, focused on the results that matter to your business.",
    ],
    features: [
      { title: "Social media strategy", text: "Platform choice, audience, content pillars and goals for each channel." },
      { title: "Creative content", text: "Posts, carousels, reels and stories designed to stop the scroll." },
      { title: "Paid social ads", text: "Meta, LinkedIn and YouTube ads targeted to your ideal customers." },
      { title: "Performance reporting", text: "Clear monthly reports on reach, engagement, leads and cost per result." },
    ],
    benefits: [
      "Grow a loyal, engaged audience",
      "Generate leads directly from social",
      "Reach exactly the right customers",
      "Know what every rupee delivers",
    ],
    faqs: [
      { q: "Which social media platforms should my business use?", a: "It depends on your audience. B2C brands often do best on Instagram and Facebook, while B2B companies usually get better results on LinkedIn. We recommend a mix after studying your customers." },
      { q: "How soon will I see results?", a: "Paid campaigns can bring leads within the first few weeks. Organic growth usually builds steadily over three to six months." },
      { q: "Is ad spend included in your fee?", a: "No. Ad spend is paid directly to the platform, so you always control and can see your budget. Our fee covers strategy, creatives and management." },
    ],
    image: "/images/services/social-media-marketing.webp",
    seoTitle: "Social Media Marketing Agency in Pune, India | DnyanYoga",
    seoDescription:
      "Social media marketing in Pune for Instagram, Facebook, LinkedIn and YouTube. Strategy, creative content and paid ads that build reach, leads and sales.",
  },
  {
    slug: "social-media-management",
    category: "digital-marketing",
    title: "Social Media Management",
    icon: "Users",
    short: "Day-to-day handling of your social profiles, so they stay active and on-brand.",
    overview: [
      "Posting regularly, replying to comments and keeping up with trends takes hours every week. Inconsistent profiles make a business look inactive.",
      "We take care of your social media from planning to posting to community management, so your profiles stay active, professional and on-brand.",
    ],
    features: [
      { title: "Monthly content calendar", text: "A planned calendar of posts, reels and stories shared for approval in advance." },
      { title: "Design & copywriting", text: "On-brand graphics, captions and hashtags for every post." },
      { title: "Scheduling & posting", text: "Posts published at the best times for your audience." },
      { title: "Community management", text: "Replies to comments and messages, and monitoring of mentions." },
    ],
    benefits: [
      "Save hours every week",
      "Keep your profiles consistently active",
      "Respond to customers faster",
      "Present a professional brand image",
    ],
    faqs: [
      { q: "How many posts per month do you create?", a: "It depends on your plan. Most businesses choose between 12 and 30 posts per month, including reels and stories." },
      { q: "Do I get to approve posts before they go live?", a: "Yes. You see the full calendar in advance and nothing is posted without your approval." },
      { q: "Do you reply to customer messages?", a: "Yes, we can handle first replies to comments and DMs using an agreed set of answers, and pass sales enquiries to your team." },
    ],
    image: "/images/services/social-media-management.webp",
    seoTitle: "Social Media Management Company in Pune | DnyanYoga",
    seoDescription:
      "Social media management in Pune: content calendars, design, captions, scheduling and community management that keep your profiles active and on-brand.",
  },
  {
    slug: "seo",
    category: "digital-marketing",
    title: "SEO",
    icon: "Search",
    short: "Rank higher on Google and get steady, free traffic from people ready to buy.",
    overview: [
      "When people need a product or service, they search on Google. Search engine optimisation (SEO) helps your website appear at the top of those results, bringing visitors who are already interested.",
      "We improve your website's technical health, content and authority, and focus on local SEO so customers in Pune and beyond can find you easily.",
    ],
    features: [
      { title: "Technical SEO", text: "Site speed, mobile-friendliness, indexing, structured data and fixing errors." },
      { title: "Keyword research & on-page SEO", text: "Finding what customers search for and optimising your pages for it." },
      { title: "Local SEO", text: "Google Business Profile optimisation, local citations and review strategy." },
      { title: "Content & link building", text: "Helpful articles and quality backlinks that build your site's authority." },
    ],
    benefits: [
      "Get found by people ready to buy",
      "Reduce dependence on paid ads",
      "Build long-term, compounding traffic",
      "Win more local customers in Pune",
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most websites see clear improvements in three to six months. Competitive keywords can take longer, but the results keep building over time." },
      { q: "Can you guarantee first position on Google?", a: "No honest agency can guarantee a specific ranking, because Google controls the results. We focus on proven practices and report real progress every month." },
      { q: "What is local SEO?", a: "Local SEO helps your business show up when people nearby search, for example on Google Maps or for searches like 'near me', mainly by optimising your Google Business Profile." },
    ],
    image: "/images/services/seo.webp",
    seoTitle: "SEO Company & Services in Pune | DnyanYoga Digital Services",
    seoDescription:
      "SEO services in Pune: technical SEO, keyword research, on-page and local SEO, content and link building to rank higher on Google and win more customers.",
  },
  {
    slug: "email-marketing",
    category: "digital-marketing",
    title: "Email Marketing",
    icon: "Mail",
    short: "Emails and automations that turn subscribers into repeat customers.",
    overview: [
      "Email is one of the few channels you fully own. It lets you talk directly to people who already know you, at very low cost.",
      "We plan, design and automate email campaigns, newsletters and journeys that nurture leads, win back customers and drive repeat sales.",
    ],
    features: [
      { title: "Email strategy", text: "Goals, audience segments and a sending calendar that respects your subscribers." },
      { title: "Design & copy", text: "Mobile-friendly email templates and copy that gets opened and clicked." },
      { title: "Automation journeys", text: "Welcome series, abandoned cart, follow-up and re-engagement flows." },
      { title: "List growth & hygiene", text: "Sign-up forms, lead magnets and regular list cleaning for better delivery." },
    ],
    benefits: [
      "Turn one-time buyers into repeat customers",
      "Nurture leads automatically",
      "Get high return on a small budget",
      "Own your audience, not rent it",
    ],
    faqs: [
      { q: "Which email platform do you use?", a: "We work with Mailchimp, Brevo, Klaviyo, Zoho Campaigns and others. We can use your current tool or recommend one that fits your budget." },
      { q: "Will my emails land in spam?", a: "We set up proper domain authentication, use clean lists and follow best practices to give your emails the best chance of reaching the inbox." },
      { q: "Can you build a list from scratch?", a: "Yes. We create sign-up forms, offers and campaigns that encourage the right people to subscribe." },
    ],
    image: "/images/services/email-marketing.webp",
    seoTitle: "Email Marketing in Pune | DnyanYoga Digital Services",
    seoDescription:
      "Email marketing services in Pune: strategy, design, newsletters and automated journeys that nurture leads and turn subscribers into repeat customers.",
  },
  {
    slug: "ppc-google-ads",
    category: "digital-marketing",
    title: "PPC / Google Ads",
    icon: "MousePointerClick",
    short: "Paid search and display campaigns that bring qualified leads from day one.",
    overview: [
      "Pay-per-click (PPC) advertising puts your business at the top of Google the moment someone searches for what you sell. You only pay when someone clicks.",
      "We plan, build and manage Google Ads campaigns across Search, Display, Performance Max and YouTube, with careful tracking so every rupee is accountable.",
    ],
    features: [
      { title: "Account setup & structure", text: "Campaigns organised by goal, location and audience for better control." },
      { title: "Keyword & ad copy", text: "High-intent keywords, negative keywords and tested ad variations." },
      { title: "Landing page advice", text: "Recommendations so visitors who click actually convert." },
      { title: "Conversion tracking", text: "Calls, forms and WhatsApp clicks tracked so you know your real cost per lead." },
    ],
    benefits: [
      "Get leads from day one",
      "Pay only for real clicks",
      "Target by location, device and time",
      "Scale what works, stop what doesn't",
    ],
    faqs: [
      { q: "What budget do I need for Google Ads?", a: "It depends on your industry and goals. We help you start with a test budget, measure the cost per lead and then scale up what works." },
      { q: "Is the ad budget paid to you?", a: "No. Ad spend is billed directly by Google to your account. Our fee covers the strategy and management." },
      { q: "Do you also run ads on Meta and LinkedIn?", a: "Yes. Paid social campaigns are covered under our Social Media Marketing service and can be combined with Google Ads." },
    ],
    image: "/images/services/ppc-google-ads.webp",
    seoTitle: "Google Ads & PPC Management Agency in Pune | DnyanYoga",
    seoDescription:
      "Google Ads and PPC management in Pune. Search, Display, Performance Max and YouTube campaigns with full conversion tracking to get qualified leads fast.",
  },
  {
    slug: "content-marketing-creation",
    category: "digital-marketing",
    title: "Content Marketing & Creation",
    icon: "FileText",
    short: "Useful blogs, guides and posts that attract, educate and convert customers.",
    overview: [
      "Customers trust businesses that help them. Helpful content answers their questions, shows your expertise and keeps your brand top of mind until they are ready to buy.",
      "We plan and create content for your website, blog, social media and email, based on what your audience is actually searching for.",
    ],
    features: [
      { title: "Content strategy", text: "Topics, formats and a calendar based on keyword and audience research." },
      { title: "Blog & website content", text: "SEO-friendly articles, service pages and landing page copy." },
      { title: "Lead magnets", text: "E-books, checklists, case studies and guides that capture leads." },
      { title: "Content repurposing", text: "One idea turned into posts, reels, emails and more." },
    ],
    benefits: [
      "Build trust and authority",
      "Improve SEO rankings",
      "Generate leads with valuable resources",
      "Keep every channel full of fresh content",
    ],
    faqs: [
      { q: "Who writes the content?", a: "Our in-house writers, guided by your team's knowledge. We interview your experts so the content is accurate and sounds like you." },
      { q: "How many blogs should we publish?", a: "Quality matters more than quantity. Most businesses start with four to eight well-researched articles per month." },
      { q: "Is the content original?", a: "Yes. All content is written from scratch for your brand and checked before delivery." },
    ],
    image: "/images/services/content-marketing-creation.webp",
    seoTitle: "Content Marketing & Creation Agency in Pune | DnyanYoga",
    seoDescription:
      "Content marketing and creation in Pune: strategy, SEO blogs, website copy, lead magnets and repurposed content that build trust and generate leads.",
  },
  {
    slug: "online-reputation-management",
    category: "digital-marketing",
    title: "Online Reputation Management",
    icon: "ShieldCheck",
    short: "Monitor, protect and improve what people see about your brand online.",
    overview: [
      "Before buying, most people read reviews and search your name. A few negative results can quietly cost you customers every day.",
      "We monitor what is being said about your brand, help you respond professionally, encourage happy customers to share reviews and build positive content that represents you fairly.",
    ],
    features: [
      { title: "Brand monitoring", text: "Tracking reviews, mentions and search results for your brand name." },
      { title: "Review management", text: "Response templates and timely replies to reviews on Google and other platforms." },
      { title: "Review generation", text: "Simple systems that encourage satisfied customers to leave genuine reviews." },
      { title: "Positive content building", text: "Profiles, articles and PR that improve what appears when people search for you." },
    ],
    benefits: [
      "Build trust before the first call",
      "Handle negative feedback professionally",
      "Increase genuine positive reviews",
      "Protect your brand long term",
    ],
    faqs: [
      { q: "Can you remove negative reviews?", a: "We cannot remove genuine reviews. We can report reviews that break platform rules, help you reply professionally and build more positive reviews over time." },
      { q: "Which platforms do you monitor?", a: "Google, social media, industry directories and other review sites relevant to your business." },
      { q: "Do you write fake reviews?", a: "Never. Fake reviews break platform rules and damage trust. We only help you collect genuine reviews from real customers." },
    ],
    image: "/images/services/online-reputation-management.webp",
    seoTitle: "Online Reputation Management Agency in Pune | DnyanYoga",
    seoDescription:
      "Online reputation management in Pune: brand monitoring, review replies, genuine review generation and positive content that protects your brand online.",
  },
  {
    slug: "influencer-marketing",
    category: "digital-marketing",
    title: "Influencer Marketing",
    icon: "Star",
    short: "Partner with the right creators to reach new audiences who trust them.",
    overview: [
      "People trust recommendations from creators they follow. Influencer marketing lets you borrow that trust to reach new, relevant audiences.",
      "We find creators who genuinely fit your brand, manage the collaboration end to end and measure the results, from nano influencers in Pune to national creators.",
    ],
    features: [
      { title: "Influencer discovery", text: "Shortlisting creators by audience fit, engagement quality and brand values." },
      { title: "Campaign planning", text: "Brief, content formats, timelines and clear deliverables." },
      { title: "Collaboration management", text: "Negotiation, contracts, product dispatch and content approvals." },
      { title: "Tracking & reporting", text: "Reach, engagement, clicks, codes and sales measured for every creator." },
    ],
    benefits: [
      "Reach new audiences quickly",
      "Build trust through real recommendations",
      "Get authentic content you can reuse",
      "Measure what each creator delivers",
    ],
    faqs: [
      { q: "Do you work with small influencers?", a: "Yes. Nano and micro influencers often bring higher engagement and better value, especially for local businesses." },
      { q: "How do you check if an influencer's followers are real?", a: "We review engagement patterns, audience location and growth history to avoid creators with fake or low-quality followers." },
      { q: "Can we reuse the influencer content in our ads?", a: "Usually yes, if usage rights are agreed in the contract. We include this in the negotiation when you need it." },
    ],
    image: "/images/services/influencer-marketing.webp",
    seoTitle: "Influencer Marketing Agency & Services in Pune | DnyanYoga",
    seoDescription:
      "Influencer marketing in Pune. We find the right creators, manage collaborations end to end and track reach, engagement and sales for every campaign.",
  },

  /* ===================== TECHNOLOGY ===================== */
  {
    slug: "website-designing",
    category: "technology",
    title: "Website Designing",
    icon: "Monitor",
    short: "Modern, mobile-first websites designed to turn visitors into enquiries.",
    overview: [
      "Your website works for you 24 hours a day. A good one builds trust in seconds and makes it easy for visitors to call, message or buy.",
      "We design websites that look great on every phone, load fast, rank well on Google and guide visitors clearly towards contacting you.",
    ],
    features: [
      { title: "Mobile-first design", text: "Designed for phones first, then scaled up for tablets and desktops." },
      { title: "Conversion-focused layout", text: "Clear calls to action, enquiry forms and WhatsApp buttons in the right places." },
      { title: "SEO-ready build", text: "Clean structure, fast loading, meta tags and schema from day one." },
      { title: "Easy updates", text: "A simple way for your team to update text, images and blogs." },
    ],
    benefits: [
      "Make a strong first impression",
      "Get more enquiries from visitors",
      "Rank better on Google",
      "Update content without a developer",
    ],
    faqs: [
      { q: "How long does it take to design a website?", a: "A typical business website takes three to six weeks, depending on the number of pages and how quickly content is ready." },
      { q: "Will my website work on mobile phones?", a: "Yes. Every site we build is designed mobile-first and tested on real phones and tablets." },
      { q: "Do you provide hosting and domain?", a: "We can help you buy a domain and choose reliable hosting, and we can manage it for you if you prefer." },
    ],
    image: "/images/services/website-designing.webp",
    seoTitle: "Website Designing & Development Company in Pune | DnyanYoga",
    seoDescription:
      "Website designing in Pune: modern, mobile-first, fast and SEO-ready websites built to turn visitors into enquiries. Talk to DnyanYoga today.",
  },
  {
    slug: "wordpress-development",
    category: "technology",
    title: "WordPress Development",
    icon: "Globe",
    short: "Custom WordPress websites that are fast, secure and easy to manage.",
    overview: [
      "WordPress powers a large share of the world's websites because it is flexible and easy to update. Built badly, though, it can become slow and insecure.",
      "We build custom WordPress themes and sites with lightweight code, carefully chosen plugins, strong security and an editor your team will find simple to use.",
    ],
    features: [
      { title: "Custom themes", text: "Designs built specifically for your brand, not heavy ready-made templates." },
      { title: "Performance optimisation", text: "Caching, image optimisation and clean code for fast loading." },
      { title: "Security hardening", text: "Updates, backups, firewalls and login protection." },
      { title: "Maintenance plans", text: "Ongoing updates, monitoring and small changes every month." },
    ],
    benefits: [
      "Update content yourself easily",
      "Get a fast, secure website",
      "Add features as you grow",
      "Avoid plugin bloat and slowdowns",
    ],
    faqs: [
      { q: "Can you fix or speed up my existing WordPress site?", a: "Yes. We audit existing sites and fix speed, security and design issues, or rebuild them if that is more cost-effective." },
      { q: "Will I be able to edit the site myself?", a: "Yes. We set up an easy editor and give your team a short training session." },
      { q: "Do you offer WordPress maintenance?", a: "Yes. Our maintenance plans cover updates, backups, uptime monitoring and small content changes." },
    ],
    image: "/images/services/wordpress-development.webp",
    seoTitle: "WordPress Development in Pune | DnyanYoga Digital Services",
    seoDescription:
      "WordPress development in Pune: custom themes, speed optimisation, security and maintenance plans for fast, secure websites your team can easily manage.",
  },
  {
    slug: "mobile-app-development",
    category: "technology",
    title: "Mobile App Development",
    icon: "Smartphone",
    short: "Android and iOS apps that are simple to use and built to scale.",
    overview: [
      "A mobile app puts your business on your customers' home screens, making it easy for them to book, order, learn or stay connected.",
      "We design and build Android and iOS apps using modern cross-platform and native technologies, from idea and design to launch on the app stores.",
    ],
    features: [
      { title: "UX & app design", text: "Simple, intuitive screens designed around how your users think." },
      { title: "Cross-platform development", text: "One codebase for Android and iOS to save time and cost, where it fits." },
      { title: "Backend & APIs", text: "Secure servers, databases, admin panels and integrations." },
      { title: "App store launch", text: "Publishing on Google Play and the App Store, plus updates after launch." },
    ],
    benefits: [
      "Stay on your customers' phones",
      "Offer faster bookings and orders",
      "Send push notifications directly",
      "Build a product that can scale",
    ],
    faqs: [
      { q: "How much does a mobile app cost?", a: "It depends on the features, platforms and integrations. After understanding your requirements, we share a detailed scope and estimate." },
      { q: "Should I build for Android or iOS first?", a: "In India, Android usually reaches more users, but it depends on your audience. Cross-platform development often lets you launch on both together." },
      { q: "Do you maintain apps after launch?", a: "Yes. We offer support plans for bug fixes, OS updates, new features and server maintenance." },
    ],
    image: "/images/services/mobile-app-development.webp",
    seoTitle: "Mobile App Development Company in Pune | DnyanYoga",
    seoDescription:
      "Android and iOS mobile app development in Pune: UX design, cross-platform builds, secure backends and app store launch with support after you go live.",
  },
  {
    slug: "full-stack-web-development",
    category: "technology",
    title: "Full Stack Web Development",
    icon: "Layers",
    short: "Custom web applications, portals and dashboards built end to end.",
    overview: [
      "Some businesses need more than a website: customer portals, booking systems, dashboards, CRMs or SaaS products built around how they work.",
      "Our full stack team designs and builds custom web applications, covering the user interface, server, database, integrations and hosting.",
    ],
    features: [
      { title: "Frontend development", text: "Fast, responsive interfaces built with modern frameworks like React and Next.js." },
      { title: "Backend & database", text: "Secure APIs, business logic and databases designed to scale." },
      { title: "Integrations", text: "Payment gateways, CRMs, ERPs, SMS, WhatsApp and third-party APIs." },
      { title: "Cloud deployment", text: "Hosting, CI/CD, monitoring and backups on reliable cloud platforms." },
    ],
    benefits: [
      "Automate manual work",
      "Get software built around your process",
      "Integrate all your tools in one place",
      "Scale as your business grows",
    ],
    faqs: [
      { q: "What technologies do you use?", a: "We commonly use React, Next.js and Node.js along with SQL and NoSQL databases, and choose the stack that best fits each project." },
      { q: "Will I own the source code?", a: "Yes. After final payment, you own the source code and we hand over everything needed to run it." },
      { q: "Can you work with our existing system?", a: "Yes. We can extend, integrate with or gradually modernise your existing software." },
    ],
    image: "/images/services/full-stack-web-development.webp",
    seoTitle: "Full Stack Web Development Company in Pune | DnyanYoga",
    seoDescription:
      "Full stack web development in Pune: custom web apps, portals, dashboards and integrations built end to end with modern, secure and scalable technology.",
  },

  /* ===================== DESIGN & MEDIA ===================== */
  {
    slug: "public-relations",
    category: "design-media",
    title: "PR (Public Relations)",
    icon: "Newspaper",
    short: "Earn media coverage and credibility that money can't simply buy.",
    overview: [
      "When respected publications talk about your business, people take notice. Public relations builds credibility, awareness and trust in a way ads alone cannot.",
      "We craft your story, write press releases, pitch to journalists and media houses, and help you become a trusted voice in your industry.",
    ],
    features: [
      { title: "Story & PR strategy", text: "Finding the newsworthy angles in your business and planning when to share them." },
      { title: "Press releases", text: "Clear, professional releases for launches, milestones and announcements." },
      { title: "Media outreach", text: "Pitching to relevant journalists, publications and digital media." },
      { title: "Thought leadership", text: "Articles, interviews and speaking opportunities for your leaders." },
    ],
    benefits: [
      "Build credibility quickly",
      "Reach new audiences through trusted media",
      "Strengthen your search results",
      "Position leaders as experts",
    ],
    faqs: [
      { q: "Can you guarantee media coverage?", a: "Editorial coverage is decided by journalists, so it cannot be guaranteed. We focus on strong stories and good media relationships to maximise your chances." },
      { q: "What is the difference between PR and advertising?", a: "Advertising is paid space you control. PR earns coverage through stories that journalists choose to publish, which usually carries more trust." },
      { q: "Do you handle crisis communication?", a: "Yes. We can help you prepare statements and respond calmly and clearly if something goes wrong." },
    ],
    image: "/images/services/public-relations.webp",
    seoTitle: "Public Relations (PR) Agency in Pune, India | DnyanYoga",
    seoDescription:
      "Public relations services in Pune: PR strategy, press releases, media outreach and thought leadership that build credibility and trust in your brand.",
  },
  {
    slug: "media-buying-planning",
    category: "design-media",
    title: "Media Buying & Planning",
    icon: "Megaphone",
    short: "Smart media plans that put your ads in front of the right audience at the right price.",
    overview: [
      "Where your ad appears matters as much as what it says. Good media planning stretches your budget and puts your message where your audience really is.",
      "We plan and buy media across digital, print, radio, outdoor and cinema, negotiating rates and tracking results so every placement earns its place.",
    ],
    features: [
      { title: "Audience & media research", text: "Understanding what your audience reads, watches and listens to." },
      { title: "Media planning", text: "The right channel mix, timing and budget split for your goals." },
      { title: "Buying & negotiation", text: "Booking placements at competitive rates through our media network." },
      { title: "Post-campaign analysis", text: "Reporting on reach, frequency and results to improve the next plan." },
    ],
    benefits: [
      "Get more reach for your budget",
      "Reach audiences across online and offline",
      "Avoid wasted ad spend",
      "One partner for all media bookings",
    ],
    faqs: [
      { q: "Which media do you buy?", a: "Digital ads, newspapers and magazines, radio, outdoor hoardings, transit, cinema and more, depending on your audience and budget." },
      { q: "Is media buying suitable for small budgets?", a: "Yes. We help small businesses choose a few focused placements, often local and digital, that deliver the best value." },
      { q: "How do you measure offline media?", a: "We use tracking numbers, QR codes, offer codes and before-and-after comparisons to estimate the impact of offline campaigns." },
    ],
    image: "/images/services/media-buying-planning.webp",
    seoTitle: "Media Buying & Planning Agency in Pune | DnyanYoga",
    seoDescription:
      "Media buying and planning in Pune across digital, print, radio, outdoor and cinema. Smart plans and negotiated rates that stretch your advertising budget.",
  },
  {
    slug: "creative-design",
    category: "design-media",
    title: "Creative Design",
    icon: "Brush",
    short: "Eye-catching creatives for ads, social media, campaigns and more.",
    overview: [
      "In a busy feed or a crowded street, good creative work makes people stop. It turns your message into something people notice, understand and remember.",
      "Our designers create campaign concepts, ad creatives, social media graphics, infographics and more, always in line with your brand.",
    ],
    features: [
      { title: "Campaign concepts", text: "Big creative ideas that tie your campaign together across channels." },
      { title: "Ad creatives", text: "Static and animated ads sized for every platform." },
      { title: "Social media graphics", text: "Posts, carousels, story designs and covers." },
      { title: "Infographics & presentations", text: "Complex information turned into clear, visual stories." },
    ],
    benefits: [
      "Stand out in busy feeds",
      "Communicate ideas quickly",
      "Keep visuals consistent with your brand",
      "Improve ad performance",
    ],
    faqs: [
      { q: "How many revisions are included?", a: "Most projects include two to three rounds of revisions. We agree this upfront so there are no surprises." },
      { q: "Can you work with our existing brand guidelines?", a: "Yes. We follow your guidelines closely, or help you create them if you do not have any yet." },
      { q: "Do you offer monthly design retainers?", a: "Yes. Retainers suit businesses that need a steady flow of creatives every month." },
    ],
    image: "/images/services/creative-design.webp",
    seoTitle: "Creative Design in Pune | DnyanYoga Digital Services",
    seoDescription:
      "Creative design services in Pune: campaign concepts, ad creatives, social media graphics, infographics and presentations that make people stop and look.",
  },
  {
    slug: "print-design",
    category: "design-media",
    title: "Print Design",
    icon: "Printer",
    short: "Brochures, flyers, packaging and more, ready for the printing press.",
    overview: [
      "Printed materials are still powerful. A well-designed brochure, catalogue or package can make your business feel premium and trustworthy.",
      "We design print materials that look great and are prepared correctly for printing, with the right sizes, bleeds and colour settings.",
    ],
    features: [
      { title: "Brochures & catalogues", text: "Company profiles, product catalogues and menus." },
      { title: "Flyers & posters", text: "Promotional material for events, offers and launches." },
      { title: "Packaging & labels", text: "Boxes, labels and pouches that stand out on the shelf." },
      { title: "Outdoor & event print", text: "Hoardings, banners, standees and exhibition booths." },
    ],
    benefits: [
      "Make your brand feel premium",
      "Get print-ready files the first time",
      "Stand out at events and stores",
      "Avoid costly printing mistakes",
    ],
    faqs: [
      { q: "Do you provide print-ready files?", a: "Yes. We deliver files with correct sizes, bleeds and CMYK colour settings, ready for any printer." },
      { q: "Can you arrange the printing too?", a: "Yes. We can coordinate printing with trusted vendors and check proofs before the final run." },
      { q: "Do you design packaging?", a: "Yes. We design boxes, labels and pouches, keeping both shelf appeal and practical printing in mind." },
    ],
    image: "/images/services/print-design.webp",
    seoTitle: "Print Design Services in Pune | DnyanYoga Digital Services",
    seoDescription:
      "Print design services in Pune: brochures, catalogues, flyers, packaging, labels, banners and standees delivered as print-ready files with correct settings.",
  },
  {
    slug: "logo-design",
    category: "design-media",
    title: "Logo Design",
    icon: "Shapes",
    short: "A memorable, meaningful logo that works everywhere your brand appears.",
    overview: [
      "Your logo is often the first thing people see. A good logo is simple, memorable, meaningful and works at every size, from an app icon to a hoarding.",
      "We design original logos based on your story and values, and deliver every file format you will ever need.",
    ],
    features: [
      { title: "Discovery questionnaire", text: "Understanding your business, values, audience and preferences." },
      { title: "Multiple concepts", text: "Several original logo directions to choose from." },
      { title: "Refinement", text: "Revisions on your chosen concept until it feels just right." },
      { title: "Complete file kit", text: "Vector, PNG, SVG and favicon files in colour, black and white." },
    ],
    benefits: [
      "Get a logo that is truly yours",
      "Look professional from day one",
      "Use it everywhere without quality loss",
      "Build instant recognition",
    ],
    faqs: [
      { q: "How many logo concepts will I get?", a: "Usually two to three original concepts, depending on the package you choose." },
      { q: "Will the logo be original?", a: "Yes. Every logo is designed from scratch for your brand. We never use templates or stock logos." },
      { q: "Which file formats do I receive?", a: "AI, EPS, SVG, PDF, PNG and JPG files, plus favicon and social media versions." },
    ],
    image: "/images/services/logo-design.webp",
    seoTitle: "Logo Design Company in Pune | DnyanYoga Digital Services",
    seoDescription:
      "Professional logo design in Pune. Original concepts, refinements and a complete file kit so your logo looks sharp everywhere, from app icons to hoardings.",
  },
  {
    slug: "ui-ux-design",
    category: "design-media",
    title: "UI/UX Design",
    icon: "LayoutDashboard",
    short: "Websites and apps that are easy, clear and enjoyable to use.",
    overview: [
      "User experience (UX) is about how easy something is to use. User interface (UI) is how it looks. Together they decide whether people stay, buy and come back.",
      "We research your users, map their journeys and design clean, accessible screens for websites, apps and software products.",
    ],
    features: [
      { title: "User research", text: "Interviews, analytics and competitor reviews to understand real user needs." },
      { title: "Wireframes & user flows", text: "The structure of every screen and how users move between them." },
      { title: "Visual UI design", text: "Polished, on-brand screens with a reusable design system." },
      { title: "Prototypes & testing", text: "Clickable prototypes tested with real users before development." },
    ],
    benefits: [
      "Increase sign-ups and sales",
      "Reduce user confusion and support calls",
      "Save development time and cost",
      "Build products people enjoy using",
    ],
    faqs: [
      { q: "What tools do you design in?", a: "We mainly use Figma, which makes it easy for you and your developers to view, comment and collaborate." },
      { q: "Can you redesign an existing app or website?", a: "Yes. We start with a UX audit to find problems, then redesign the parts that matter most." },
      { q: "Do you also develop the designs?", a: "Yes. Our technology team can build the designs, or we can hand them over cleanly to your developers." },
    ],
    image: "/images/services/ui-ux-design.webp",
    seoTitle: "UI/UX Design Agency in Pune | DnyanYoga Digital Services",
    seoDescription:
      "UI/UX design in Pune: user research, wireframes, visual design, design systems and clickable prototypes for websites, apps and software that people love.",
  },

  /* ===================== E-COMMERCE ===================== */
  {
    slug: "ecommerce-website-development",
    category: "ecommerce",
    title: "E-commerce Website Development",
    icon: "ShoppingBag",
    short: "Complete online stores built to sell, from product pages to checkout.",
    overview: [
      "A good online store makes it effortless to find products, trust your business and pay quickly. Every extra step or slow page loses sales.",
      "We plan, design and build complete e-commerce websites with payments, shipping, inventory, GST invoices and marketing tools set up for India.",
    ],
    features: [
      { title: "Store design", text: "Mobile-first product, category, cart and checkout pages built to convert." },
      { title: "Payments & shipping", text: "UPI, cards, wallets, COD and shipping partner integrations." },
      { title: "Inventory & orders", text: "Easy product management, stock tracking and order processing." },
      { title: "Marketing tools", text: "Coupons, abandoned cart reminders, reviews and analytics." },
    ],
    benefits: [
      "Sell 24/7 across India",
      "Offer a smooth buying experience",
      "Manage orders easily",
      "Grow beyond marketplaces",
    ],
    faqs: [
      { q: "Which platform is best for my online store?", a: "It depends on your products, budget and growth plans. Shopify suits most new stores, WooCommerce suits WordPress users, and Magento suits large catalogues. We recommend after understanding your needs." },
      { q: "Can you integrate Indian payment gateways?", a: "Yes. We integrate Razorpay, PayU, Cashfree, PhonePe and others, along with COD." },
      { q: "Can my store connect with Amazon or Flipkart?", a: "In many cases, yes. We can help sync products and inventory with marketplaces, depending on the platform." },
    ],
    image: "/images/services/ecommerce-website-development.webp",
    seoTitle: "E-commerce Website Development in Pune | DnyanYoga",
    seoDescription:
      "E-commerce website development in Pune: mobile-first stores with UPI and card payments, shipping, inventory and marketing tools set up to sell across India.",
  },
  {
    slug: "prestashop-development",
    category: "ecommerce",
    title: "PrestaShop Development",
    icon: "Store",
    short: "Flexible, open-source PrestaShop stores customised for your business.",
    overview: [
      "PrestaShop is a flexible open-source platform that gives you full control over your store without monthly platform fees.",
      "We set up, customise and maintain PrestaShop stores, including themes, modules, payment integrations and migrations from other platforms.",
    ],
    features: [
      { title: "Store setup", text: "Installation, configuration, hosting and security setup." },
      { title: "Theme customisation", text: "A unique, mobile-friendly design built on a reliable theme." },
      { title: "Module development", text: "Custom modules and integrations for features you need." },
      { title: "Migration & upgrades", text: "Moving your store to PrestaShop or upgrading to a newer version safely." },
    ],
    benefits: [
      "No platform subscription fees",
      "Full control over your store",
      "Multi-language and multi-currency support",
      "Customise anything you need",
    ],
    faqs: [
      { q: "Is PrestaShop good for small businesses?", a: "Yes, especially for businesses that want control and no platform fees, and have some budget for setup and maintenance." },
      { q: "Can you migrate my store to PrestaShop?", a: "Yes. We migrate products, customers and orders from other platforms with care to protect your SEO." },
      { q: "Do you provide maintenance?", a: "Yes. We offer updates, backups, security patches and small changes on a monthly plan." },
    ],
    image: "/images/services/prestashop-development.webp",
    seoTitle: "PrestaShop Development Company in Pune | DnyanYoga",
    seoDescription:
      "PrestaShop development in Pune: store setup, theme customisation, custom modules, migrations and upgrades for flexible online stores with no platform fees.",
  },
  {
    slug: "magento-development",
    category: "ecommerce",
    title: "Magento Development",
    icon: "Package",
    short: "Powerful Magento (Adobe Commerce) stores for large catalogues and growing brands.",
    overview: [
      "Magento, now Adobe Commerce, is built for stores with large catalogues, complex pricing, B2B needs or multiple stores in one system.",
      "We build, customise, speed up and maintain Magento stores, and help businesses migrate or upgrade with minimum downtime.",
    ],
    features: [
      { title: "Custom Magento builds", text: "Stores designed around your catalogue, pricing and customer types." },
      { title: "Extension development", text: "Custom extensions and third-party integrations." },
      { title: "Performance optimisation", text: "Caching, hosting and code improvements for faster pages." },
      { title: "Migration & upgrades", text: "Safe upgrades and migrations with data and SEO protected." },
    ],
    benefits: [
      "Handle thousands of products easily",
      "Support B2B and B2C in one store",
      "Run multiple stores from one admin",
      "Scale with high traffic",
    ],
    faqs: [
      { q: "Is Magento right for a small store?", a: "Usually not. Magento suits larger or complex stores. For smaller catalogues, Shopify or WooCommerce is often more cost-effective." },
      { q: "Can you speed up my slow Magento store?", a: "Yes. We audit hosting, caching, extensions and code, and fix the issues that slow your store down." },
      { q: "Do you support Magento 2 upgrades?", a: "Yes. We handle version upgrades and migrations from older versions with careful testing." },
    ],
    image: "/images/services/magento-development.webp",
    seoTitle: "Magento & Adobe Commerce Development in Pune | DnyanYoga",
    seoDescription:
      "Magento and Adobe Commerce development in Pune: custom stores, extensions, speed optimisation, upgrades and migrations for large and growing online brands.",
  },
  {
    slug: "shopify-development",
    category: "ecommerce",
    title: "Shopify Development",
    icon: "ShoppingCart",
    short: "Beautiful Shopify stores that are quick to launch and easy to run.",
    overview: [
      "Shopify is one of the easiest ways to start and grow an online store. It handles hosting, security and updates, so you can focus on selling.",
      "We design and set up Shopify stores, customise themes, add the right apps and integrate Indian payment and shipping options.",
    ],
    features: [
      { title: "Store setup", text: "Products, collections, payments, shipping, taxes and policies configured." },
      { title: "Theme design & customisation", text: "A unique, fast theme that reflects your brand." },
      { title: "Apps & integrations", text: "Reviews, WhatsApp, COD verification, shipping and marketing apps." },
      { title: "Store optimisation", text: "Speed, SEO and conversion improvements for existing stores." },
    ],
    benefits: [
      "Launch your store quickly",
      "No hosting or security worries",
      "Easy day-to-day management",
      "Huge app ecosystem to grow with",
    ],
    faqs: [
      { q: "How long does a Shopify store take to build?", a: "Most stores take two to five weeks, depending on design, number of products and integrations." },
      { q: "Does Shopify support Indian payments?", a: "Yes. Shopify works with Indian payment gateways like Razorpay, PayU and Cashfree, along with COD." },
      { q: "Can you move my store to Shopify?", a: "Yes. We migrate products, customers and orders, and set up redirects to protect your SEO." },
    ],
    image: "/images/services/shopify-development.webp",
    seoTitle: "Shopify Store Development Company in Pune | DnyanYoga",
    seoDescription:
      "Shopify development in Pune: store setup, custom themes, apps, Indian payments and shipping. Launch a beautiful online store that is quick and easy to run.",
  },
  {
    slug: "woocommerce-development",
    category: "ecommerce",
    title: "WooCommerce Development",
    icon: "Store",
    short: "Turn your WordPress website into a full-featured online store.",
    overview: [
      "WooCommerce adds a complete store to WordPress. It is flexible, has thousands of extensions and works well if you already use WordPress or want strong content and SEO alongside your store.",
      "We build and customise WooCommerce stores with fast performance, secure checkout and the integrations Indian businesses need.",
    ],
    features: [
      { title: "Store setup", text: "Products, variations, payments, shipping and GST settings." },
      { title: "Custom design", text: "A unique, mobile-first store design that matches your brand." },
      { title: "Plugin customisation", text: "Custom features and carefully selected plugins without bloat." },
      { title: "Speed & security", text: "Caching, image optimisation, backups and security hardening." },
    ],
    benefits: [
      "Combine your blog and store in one site",
      "Full ownership and flexibility",
      "Low running costs",
      "Strong SEO with WordPress",
    ],
    faqs: [
      { q: "Should I choose WooCommerce or Shopify?", a: "WooCommerce gives more control and suits content-heavy sites. Shopify is easier to maintain. We help you compare based on your needs." },
      { q: "Can you add WooCommerce to my existing WordPress site?", a: "Yes. We can add a store to your current site and style it to match." },
      { q: "Is WooCommerce secure?", a: "Yes, when properly maintained. We keep it updated, secured and backed up." },
    ],
    image: "/images/services/woocommerce-development.webp",
    seoTitle: "WooCommerce Development Company in Pune | DnyanYoga",
    seoDescription:
      "WooCommerce development in Pune: store setup, custom design, plugins, speed and security for WordPress stores that are flexible, low-cost and SEO-friendly.",
  },

  /* ===================== VIDEO & PHOTOGRAPHY ===================== */
  {
    slug: "commercial-video-making",
    category: "video-photography",
    title: "Commercial Video Making",
    icon: "Clapperboard",
    short: "Ad films and promotional videos that sell your product or service.",
    overview: [
      "A strong commercial grabs attention in the first few seconds, tells a simple story and leaves people with a clear reason to act.",
      "We create ad films and promotional videos for TV, YouTube, social media and websites, from concept and script to shoot and final edit.",
    ],
    features: [
      { title: "Concept & script", text: "A clear idea and script built around your key message." },
      { title: "Professional shoot", text: "Crew, cameras, lighting, talent and locations managed for you." },
      { title: "Editing & motion graphics", text: "Sharp editing, music, voice-over, graphics and subtitles." },
      { title: "Multi-format delivery", text: "Versions for TV, YouTube, Instagram reels and ads." },
    ],
    benefits: [
      "Capture attention in seconds",
      "Explain your offer clearly",
      "Improve ad performance",
      "Reuse one shoot across many channels",
    ],
    faqs: [
      { q: "How long should a commercial video be?", a: "Social ads work best at 6 to 30 seconds. Website and YouTube videos can be longer. We plan versions for each platform." },
      { q: "Do you provide actors and locations?", a: "Yes. We can arrange models, actors, voice-over artists and locations as part of the production." },
      { q: "How long does production take?", a: "Simple videos can take one to two weeks. Larger productions take three to six weeks from concept to delivery." },
    ],
    image: "/images/services/commercial-video-making.webp",
    seoTitle: "Commercial Video Production Company in Pune | DnyanYoga",
    seoDescription:
      "Commercial video making in Pune: ad films and promotional videos from concept and script to shoot, edit and delivery for TV, YouTube and social media.",
  },
  {
    slug: "product-photography",
    category: "video-photography",
    title: "Product Photography",
    icon: "Camera",
    short: "Clean, detailed product photos that help customers buy with confidence.",
    overview: [
      "Online shoppers cannot touch your product, so your photos have to do the selling. Clear, attractive images directly improve clicks and conversions.",
      "We shoot white-background catalogue images, lifestyle shots and creative product photos for websites, marketplaces, ads and packaging.",
    ],
    features: [
      { title: "Catalogue photography", text: "White-background images that meet Amazon, Flipkart and website standards." },
      { title: "Lifestyle shots", text: "Products shown in real settings to help customers picture them in use." },
      { title: "Creative & flat-lay", text: "Styled compositions for social media and campaigns." },
      { title: "Retouching", text: "Colour correction, cleanup and consistent editing across the catalogue." },
    ],
    benefits: [
      "Increase online conversions",
      "Meet marketplace image rules",
      "Look more premium than competitors",
      "Reduce returns with accurate images",
    ],
    faqs: [
      { q: "Do you shoot for Amazon and Flipkart?", a: "Yes. We follow each marketplace's image guidelines for size, background and angles." },
      { q: "Can we send products to your studio?", a: "Yes. You can send products to us, and we return them safely after the shoot." },
      { q: "How many images per product do you shoot?", a: "Usually three to eight angles per product, depending on the product type and where the images will be used." },
    ],
    image: "/images/services/product-photography.webp",
    seoTitle: "Product Photography in Pune | DnyanYoga Digital Services",
    seoDescription:
      "Product photography in Pune: white-background catalogue images, lifestyle and creative shots with retouching for websites, Amazon, Flipkart and social ads.",
  },
  {
    slug: "corporate-video-production",
    category: "video-photography",
    title: "Corporate Video Production",
    icon: "Building2",
    short: "Company profiles, training and event videos that represent your business professionally.",
    overview: [
      "Corporate videos help clients, investors and new employees understand who you are, what you do and how you work.",
      "We produce company profile films, testimonial videos, training modules, event coverage and internal communication videos with a professional finish.",
    ],
    features: [
      { title: "Company profile films", text: "Your story, team, facilities and values in a few powerful minutes." },
      { title: "Testimonial videos", text: "Real customers sharing their experience on camera." },
      { title: "Training & explainer videos", text: "Clear videos that make processes and products easy to understand." },
      { title: "Event coverage", text: "Conferences, launches and celebrations captured and edited." },
    ],
    benefits: [
      "Impress clients and investors",
      "Speed up onboarding and training",
      "Build trust with real stories",
      "Show your culture to future hires",
    ],
    faqs: [
      { q: "Can you shoot at our office or factory?", a: "Yes. We regularly shoot on location at offices, factories, hospitals, campuses and sites." },
      { q: "Do you write the script?", a: "Yes. We interview your team and write a script that you approve before the shoot." },
      { q: "Can you add subtitles in other languages?", a: "Yes. We can add English, Hindi, Marathi and other subtitles or voice-overs." },
    ],
    image: "/images/services/corporate-video-production.webp",
    seoTitle: "Corporate Video Production Company in Pune | DnyanYoga",
    seoDescription:
      "Corporate video production in Pune: company profile films, testimonials, training, explainer and event videos that present your business professionally.",
  },
  {
    slug: "social-media-video-production",
    category: "video-photography",
    title: "Social Media Video Production",
    icon: "Play",
    short: "Reels, shorts and stories made to stop the scroll and get shared.",
    overview: [
      "Short-form video is the most powerful format on social media today. Reels and shorts reach new people and build connection fast.",
      "We plan, shoot and edit social-first videos in vertical format, with hooks, trends, captions and music that suit each platform.",
    ],
    features: [
      { title: "Content ideas & scripts", text: "Monthly reel ideas, hooks and scripts based on trends and your goals." },
      { title: "Batch shoots", text: "Efficient shoot days that create a month of content at once." },
      { title: "Platform-ready edits", text: "Vertical edits with captions, music, effects and strong hooks." },
      { title: "Performance review", text: "Tracking views, watch time and shares to improve future videos." },
    ],
    benefits: [
      "Reach new audiences organically",
      "Show the human side of your brand",
      "Stay consistent with a monthly plan",
      "Turn viewers into followers and leads",
    ],
    faqs: [
      { q: "How many reels can you make in one shoot day?", a: "Usually eight to fifteen reels, depending on how complex the ideas and locations are." },
      { q: "Do you follow trends?", a: "Yes, when they fit your brand. We balance trends with original content that builds your identity." },
      { q: "Can our team appear in the videos?", a: "Yes, and we coach them on camera. Real people usually perform better than polished ads." },
    ],
    image: "/images/services/social-media-video-production.webp",
    seoTitle: "Social Media Video & Reels Production in Pune | DnyanYoga",
    seoDescription:
      "Social media video production in Pune: reels, shorts and stories with strong hooks, captions and music, made in efficient batch shoots for steady posting.",
  },
  {
    slug: "brand-storytelling-videos",
    category: "video-photography",
    title: "Brand Storytelling Videos",
    icon: "BookOpen",
    short: "Emotional, authentic videos that share the story behind your brand.",
    overview: [
      "People remember stories, not features. A brand story video shows why you started, what you believe in and the people behind the business.",
      "We craft documentary-style and narrative brand films that build emotional connection and give customers a reason to believe in you.",
    ],
    features: [
      { title: "Story discovery", text: "Interviews and research to find the real, moving story in your business." },
      { title: "Narrative scripting", text: "A story structure with a clear beginning, challenge and purpose." },
      { title: "Cinematic production", text: "High-quality visuals, sound and music that carry emotion." },
      { title: "Cut-downs", text: "Short versions of the film for social media and ads." },
    ],
    benefits: [
      "Create emotional connection",
      "Differentiate beyond price and features",
      "Inspire customers and employees",
      "Content that stays relevant for years",
    ],
    faqs: [
      { q: "What makes a good brand story?", a: "Honesty. The best stories show real people, real challenges and a clear purpose, rather than just listing achievements." },
      { q: "How long is a brand story video?", a: "Usually two to four minutes for the main film, with 15 to 60-second cut-downs for social media." },
      { q: "Where should we use it?", a: "Your homepage, about page, social media, presentations, events and recruitment." },
    ],
    image: "/images/services/brand-storytelling-videos.webp",
    seoTitle: "Brand Storytelling Video Production in Pune | DnyanYoga",
    seoDescription:
      "Brand storytelling videos in Pune: documentary-style brand films that share your purpose, people and story to build emotional connection with customers.",
  },
  {
    slug: "lifestyle-fashion-photography",
    category: "video-photography",
    title: "Lifestyle & Fashion Photography",
    icon: "Shirt",
    short: "Stylish lifestyle, fashion and lookbook photography for brands and campaigns.",
    overview: [
      "Lifestyle and fashion photography shows the feeling of your brand, not just the product. It helps customers imagine themselves in your world.",
      "We plan and shoot lookbooks, campaign images, e-commerce model shots and lifestyle content with styling, models and locations handled for you.",
    ],
    features: [
      { title: "Creative direction", text: "Mood boards, styling and concepts that match your brand." },
      { title: "Model & location management", text: "Casting, hair and make-up, locations and permissions." },
      { title: "Lookbooks & campaigns", text: "Seasonal collections and campaign imagery." },
      { title: "E-commerce model shoots", text: "Consistent on-model photos for your online store." },
    ],
    benefits: [
      "Show the lifestyle behind your brand",
      "Boost engagement on social media",
      "Increase online sales with on-model images",
      "Get a cohesive visual identity",
    ],
    faqs: [
      { q: "Do you arrange models?", a: "Yes. We cast models that suit your brand and audience, and manage contracts and usage rights." },
      { q: "Can you shoot outdoors in Pune?", a: "Yes. We shoot at studios, homes, cafes, streets and outdoor locations in and around Pune." },
      { q: "How soon will we get the photos?", a: "Edited photos are usually delivered within one to two weeks after the shoot." },
    ],
    image: "/images/services/lifestyle-fashion-photography.webp",
    seoTitle: "Lifestyle & Fashion Photography in Pune | DnyanYoga",
    seoDescription:
      "Lifestyle and fashion photography in Pune: lookbooks, campaigns and e-commerce model shoots with creative direction, models and locations handled for you.",
  },
  {
    slug: "ar-vr-content-creation",
    category: "video-photography",
    title: "AR/VR Content Creation",
    icon: "Glasses",
    short: "Immersive augmented and virtual reality experiences that people remember.",
    overview: [
      "Augmented reality (AR) adds digital objects to the real world through a phone camera. Virtual reality (VR) places people inside a fully digital space. Both create experiences people talk about.",
      "We create AR filters, product try-ons, 360° virtual tours and VR experiences for marketing, real estate, education and events.",
    ],
    features: [
      { title: "AR social filters", text: "Branded Instagram and Snapchat filters and effects." },
      { title: "AR product views", text: "Let customers place products in their room or try them on virtually." },
      { title: "360° virtual tours", text: "Walkthroughs of properties, campuses, showrooms and venues." },
      { title: "VR experiences", text: "Immersive training, demos and event experiences." },
    ],
    benefits: [
      "Create memorable brand experiences",
      "Let customers try before they buy",
      "Show spaces remotely",
      "Stand out with innovative content",
    ],
    faqs: [
      { q: "Do customers need special devices for AR?", a: "No. Most AR experiences work on a normal smartphone through social apps or the web browser." },
      { q: "Which industries benefit from AR/VR?", a: "Real estate, retail, furniture, fashion, education, healthcare training, tourism and events, among others." },
      { q: "How long does an AR/VR project take?", a: "Simple AR filters take one to two weeks. Larger VR experiences and virtual tours take longer, depending on scope." },
    ],
    image: "/images/services/ar-vr-content-creation.webp",
    seoTitle: "AR/VR Content Creation in Pune | DnyanYoga Digital Services",
    seoDescription:
      "AR/VR content creation in Pune: AR filters, virtual try-ons, 360° virtual tours and VR experiences for marketing, real estate, education and events.",
  },
];
