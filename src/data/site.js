/**
 * site.js
 * Business-wide details: name, contact info, address, social links,
 * opening hours and default SEO settings.
 * Used on: every page (header, footer, contact page, SEO tags, JSON-LD).
 * Read on the server only, through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO (fill these in, then redeploy):
 *  - address.postalCode: add the PIN code
 *  - geo: add latitude/longitude of the office (used by Google in LocalBusiness schema)
 *  - openingHours: add real working hours (hidden while empty)
 *  - badges: add real certifications/recognitions (hidden while empty)
 *  - socialLinks: add Instagram / Facebook / LinkedIn / YouTube URLs (icons hidden while empty)
 * ---------------------------------------------------------------------------
 */

/**
 * @typedef {Object} SiteInfo
 * @property {string} name            Full business name (required)
 * @property {string} shortName       Short name used where space is tight (required)
 * @property {string} tagline         English tagline from the logo (required)
 * @property {string} taglineSanskrit Sanskrit tagline from the logo (required)
 * @property {string} siteUrl         Live website address, no trailing slash, e.g. "https://www.example.com" (required)
 * @property {string} phone           Phone number in international format, e.g. "+919876543210" (required)
 * @property {string} phoneDisplay    Phone number as people should read it (required)
 * @property {string} whatsapp        WhatsApp number, digits only with country code, e.g. "919876543210" (required)
 * @property {string|null} email      Business email, or null if not decided yet
 * @property {Object} address         Office address. Unknown parts stay null.
 * @property {{lat:number,lng:number}|null} geo  Office coordinates, or null
 * @property {Array<{days:string[],opens:string,closes:string}>} openingHours
 *           Working hours. Format: { days: ["Monday","Tuesday"], opens: "10:00", closes: "19:00" }
 * @property {Array<{label:string,url:string}>} socialLinks
 *           Format: { label: "Instagram", url: "https://instagram.com/yourpage" }
 *           Supported labels (they pick the icon): Instagram, Facebook, LinkedIn, YouTube, X
 */

/** @type {SiteInfo} */
export const site = {
  name: "DnyanYoga",
  shortName: "DnyanYoga",
  tagline: "Darkness to Light",
  // Shown directly below the name in the logo, header and footer.
  brandTagline: "Digital Services",
  taglineSanskrit: "तमसो मा ज्योतिर्गमय",
  description:
    "DnyanYoga is a Pune-based agency for branding, SEO, social media, websites, e-commerce, design and video that helps businesses grow online.",

  // Intended production domain (DNS and hosting must be set up before it works).
  siteUrl: "https://DnyanYoga.com",

  phone: "+919284872656",
  phoneDisplay: "+91 92848 72656",
  whatsapp: "919284872656",

  // Inquiry / contact email. Shown in the footer and contact page, and used in JSON-LD.
  email: "info@dnyanyoga.com",

  // Every form on the site (enquiry, careers, internship, newsletter) is emailed to the business
  // inbox, one email per submission, through the FormSubmit.co service
  // (see src/components/forms/useFormSubmit.js).
  // This is FormSubmit's private ID for the inbox (activated for tornacoworking@gmail.com), used
  // instead of the plain email address so the address is not exposed in the page code.
  // To change the inbox: submit a form with the new address, click "Activate Form" in the email
  // FormSubmit sends, then paste the new ID from that email here.
  formEndpointId: "3c12b5c96f898719c1ed9cc24cd400ac",

  address: {
    street: "Coworking Space - Torna, 82/2/9, Baner Road",
    city: "Pune",
    region: "Maharashtra",
    postalCode: null, // TODO: PIN code
    country: "IN",
    countryName: "India",
  },

  // TODO: office coordinates, e.g. { lat: 18.5204, lng: 73.8567 }
  geo: null,

  // TODO: working hours. Empty array = the "Working hours" block is hidden.
  openingHours: [],

  // TODO: social media profiles. Empty array = no social icons are shown.
  socialLinks: [],

  // Badges/certifications shown in the footer (e.g. Startup India, MSME, Google Partner).
  // Only add badges you really hold. Format: { label: "Startup India Recognised", image: "/badges/startup-india.png" }
  // TODO: add real badges. Empty array = the badges row is hidden.
  badges: [],

  // Google Maps embed shown on /contact: Coworking Space - Torna, Baner Road, Pune.
  mapEmbedUrl: "https://www.google.com/maps?q=Coworking%20Space%20Torna%2C%2082%2F2%2F9%2C%20Baner%20Road%2C%20Pune%2C%20Maharashtra%2C%20India&output=embed",

  // Default SEO values used when a page does not set its own.
  seo: {
    defaultTitle: "Digital Marketing Agency in Pune | DnyanYoga Digital Services",
    titleSuffix: "DnyanYoga Digital Services",
    defaultDescription:
      "DnyanYoga is a Pune agency for SEO, social media, branding, websites, e-commerce, design and video. Talk to us to grow your business online.",
    ogImage: "/og-image.png",
    locale: "en_IN",
  },
};
