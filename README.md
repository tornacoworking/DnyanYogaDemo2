# DnyanYoga: Digital Services Website (React + Vite + Express + MongoDB)

The website for **DnyanYoga** (tagline: *Digital Services*), Pune. Production domain: **DnyanYoga.com**
· inquiries: **info@dnyanyoga.com**.
Built with **React 19 + Vite + React Router + Tailwind CSS v4** (plain JavaScript, no TypeScript) and a
**Node.js + Express + MongoDB (Mongoose)** backend. Every page is **pre-rendered to its own HTML file**
at build time for speed and SEO.

> The domain and email are the *intended* production values. DNS, hosting and the mailbox must be
> set up separately; nothing in this project verifies them.

- 52 pages: Home, Services, 6 category pages, 38 service pages, About, Industries, FAQ, Contact,
  Privacy Policy and Terms. Blog, Case Studies, Testimonials, Careers and Internship appear
  automatically once you add real content.
- All content lives in `src/data`. Nothing is hard-coded in the components.
- Every form (Let's Talk, Contact, Home CTA, Service pages, Careers, Internship, Newsletter) saves to
  **MongoDB** through the Express API (`POST /api/enquiry`), with loading, error and success states.
- Admin API (protected by `ADMIN_API_KEY`) to list, read, update and delete saved enquiries,
  applications and newsletter subscribers.
- `npm run seo:check` (offline SEO check of every built page) and `npm run audit` (Lighthouse).

---

## 1. Quick start

You need **Node.js 20.11 or newer** (22 LTS recommended), **MongoDB** (local install or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster) and, for the Lighthouse audit, Google Chrome.

```bash
npm install                  # download the libraries (first time only)
cp .env.example .env         # then edit .env: set MONGODB_URI (and ADMIN_API_KEY, see section 3)
```

**Develop (two terminals):**
```bash
npm run server:dev           # terminal 1: Express + MongoDB API on http://localhost:5000
npm run dev                  # terminal 2: website on http://localhost:5173 (proxies /api to port 5000)
```

**Run like production (one process serves the built site and the API):**
```bash
npm run build                # builds dist/ and pre-renders every page
npm run server               # http://localhost:5000  (or: npm start = build + server)
```

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with hot reload. `/api/*` is proxied to the Express server. |
| `npm run server` / `npm run server:dev` | Starts the Express + MongoDB backend (`server:dev` restarts on file changes). Also serves `dist/` when it exists. |
| `npm run build` | Builds the site into `dist/`: browser bundle, server bundle, then **pre-renders every page** + `404.html`, `sitemap.xml`, `robots.txt` |
| `npm start` | `build` followed by `server` |
| `npm run preview` | Serves only the static `dist/` folder at http://localhost:4173 (no API) |
| `npm run test:api` | End-to-end API test against a real MongoDB (needs `MONGODB_TEST_URI` or `MONGODB_URI`; uses a separate `dnyanyoga_test` database and drops it afterwards) |
| `npm run seo:check` | Offline SEO check of every page in `dist/` (run `npm run build` first) |
| `npm run audit` | Builds, serves and Lighthouse-tests every page (section 6) |

---

## 2. Unfinished items (UNDONE / TODO)

Every file with unfinished work has an **"UNDONE / TODO"** block at the top. Summary:

| What | Where | What you see until it's done |
|---|---|---|
| Photos | `public/images/**` (Unsplash stock photos) | Replace with your own team / work photos when available |
| Full street address, PIN code, map location, coordinates | `src/data/site.js` | "Pune, Maharashtra, India"; map shows Pune city |
| Working hours | `src/data/site.js` → `openingHours` | Hidden |
| Social media links | `src/data/site.js` → `socialLinks` | No social icons |
| Badges (Startup India, MSME...) | `src/data/site.js` → `badges` | Hidden |
| Counters + Google rating | `src/data/stats.js` | Hidden |
| Client logos | `src/data/clients.js` | Hidden |
| Testimonials | `src/data/testimonials.js` | Section + page hidden (404) |
| Case studies | `src/data/caseStudies.js` | Section + pages hidden (404) |
| Blog posts | `src/data/blog.js` | Section + pages hidden (404) |
| Team | `src/data/team.js` | Team section hidden |
| Jobs / internships | `src/data/careers.js` | `/careers`, `/internship` hidden (404) |
| Founded year | `src/data/pages.js` → `about.foundedYear` | Not shown |
| Legal review | `src/data/pages.js` → privacy policy and terms | Starter text shown, review before launch |
| Google Search Console verification | `index.html` (TODO comment in `<head>`) | none |

---

## 3. Backend: Node.js + Express + MongoDB (Mongoose)

**form → `POST /api/enquiry` (Express: rate limit, honeypot, zod validation) → Mongoose model → MongoDB.**

### Configure
1. Install MongoDB locally, or create a free Atlas cluster and copy its connection string.
2. `cp .env.example .env` and set:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/dnyanyoga      # or your Atlas mongodb+srv://... string
   PORT=5000
   ADMIN_API_KEY=<long random secret>                    # leave empty to switch the admin API off
   ```
   Generate a key: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. `.env` is git-ignored. `.env.example` holds placeholders only. Never put these values in a
   `VITE_...` variable: those are copied into the browser code.

### Collections (Mongoose models in `server/models/`)
| Form | Model → collection |
|---|---|
| Let's Talk pop-up, Contact page, Home CTA, Service pages | `Enquiry` → `enquiries` |
| Careers, Internship | `JobApplication` → `jobapplications` |
| Footer newsletter | `NewsletterSubscriber` → `newslettersubscribers` (one document per email) |

### API
| Method + path | Access | What it does |
|---|---|---|
| `POST /api/enquiry` | public | Validates and saves a form submission. Returns `{ ok: true }` or `{ ok: false, errors, message }` |
| `GET /api/health` | public | `{ ok, database }` (503 if MongoDB is not connected) |
| `GET /api/enquiries`, `/api/applications`, `/api/subscribers` | `x-api-key` | List with `?page=&limit=&status=&formType=&q=` |
| `GET /api/<resource>/:id` | `x-api-key` | Read one record |
| `PATCH /api/enquiries/:id`, `/api/applications/:id` | `x-api-key` | Update only `status` (`new` / `contacted` / `closed`) and `notes` |
| `DELETE /api/<resource>/:id` | `x-api-key` | Delete a record |

Example: `curl -H "x-api-key: $ADMIN_API_KEY" http://localhost:5000/api/enquiries`

### Backend code (`server/`)
```
server/
├── index.js                 Starts the server: loads .env, connects to MongoDB, listens on PORT
├── app.js                   Express app: security headers, routes, serves dist/, JSON errors
├── config/db.js             Mongoose connection (cached, reads MONGODB_URI)
├── models/                  Enquiry, JobApplication, NewsletterSubscriber (+ shared tracking fields)
├── controllers/             submissionController (public form), recordsController (admin read/update/delete)
├── routes/                  submissionRoutes, recordsRoutes
├── middleware/requireAdmin.js   x-api-key check (constant-time); 404 when ADMIN_API_KEY is unset
├── enquirySchema.js         zod validation rules shared by every form
└── rateLimit.js             5 submissions / 10 minutes / IP (in memory)
```
Behind a proxy or load balancer, set `TRUST_PROXY=1` so rate limiting sees the real visitor IP.

> The old Google Sheets / Apps Script storage is no longer used. `google-apps-script/Code.gs` is kept
> only for reference and can be deleted.

---

## 4. Deploying

**Recommended: one Node server** (any VPS, Render, Railway, Fly.io...). Set `MONGODB_URI`, `PORT`,
`ADMIN_API_KEY` (and `TRUST_PROXY=1` behind a proxy) in the host's environment settings, then
run `npm install && npm run build` and start with `npm run server`. That one process serves the
pre-rendered pages (clean URLs and a real 404 page) and the API.

**Static host + serverless forms (optional):** Vercel (`vercel.json`, `api/enquiry.js`) and
Netlify (`netlify.toml`, `netlify/functions/enquiry.js`) still work: the function saves to
MongoDB using the same code, so set `MONGODB_URI` in their settings. The admin API (list /
update / delete) is only available from the Express server.

Before going live (these cannot be verified from this project):
1. Point the **DnyanYoga.com** DNS at your host, enable HTTPS, and redirect `www.dnyanyoga.com`
   to `DnyanYoga.com` (one canonical host).
2. Create the **info@dnyanyoga.com** mailbox (the site only displays it and links to it).
3. Set `VITE_SITE_URL=https://DnyanYoga.com`, rebuild and redeploy.
4. Add the site to **Google Search Console** and submit `https://DnyanYoga.com/sitemap.xml`.
5. Claim/optimise your **Google Business Profile** with the same name, phone and address.

---

## 5. How the code is organised (Project Guide)

```
dnyanyoga/
├── index.html                The HTML shell; prerender fills in each page's SEO tags + content
├── src/
│   ├── main.jsx              Browser start: fonts, CSS, router, hydrates the pre-rendered HTML
│   ├── App.jsx               Frame around every page (header, footer, pop-up) + the list of routes
│   ├── entry-server.jsx      Build-time only: renders a URL to HTML; lists all pages for the sitemap
│   ├── index.css             Global styles + reusable classes (buttons, cards, inputs)
│   ├── pages/                One file per page type (HomePage, CategoryPage, ServicePage, ...)
│   ├── components/
│   │   ├── layout/           Header, desktop mega-menu, mobile drawer, footer, floating Call/WhatsApp
│   │   ├── home/             Homepage sections (hero slider, counters, process, industries...)
│   │   ├── sections/         Sections reused on many pages (FAQ, enquiry band, testimonials...)
│   │   ├── forms/            Enquiry/application/newsletter forms, "Let's Talk" pop-up
│   │   └── ui/               Small building blocks (Seo, cards, icons, images, headings, breadcrumbs)
│   ├── data/                 ALL content (see src/data/README.md)
│   └── lib/                  SEO tags + JSON-LD helpers, shared form options
├── server/                   Express + MongoDB backend (see section 3)
├── api/enquiry.js            Optional Vercel function → server/controllers/submissionController.js
├── netlify/functions/        Optional Netlify function → same controller
├── scripts/prerender.js      Turns every page into HTML + writes 404.html, sitemap.xml, robots.txt
├── scripts/audit.mjs         The Lighthouse SEO/performance audit (section 6)
├── scripts/seo-check.mjs     Offline SEO check of every built page
├── scripts/test-api.mjs      End-to-end API test (needs MongoDB)
├── google-apps-script/Code.gs  Old Google Sheets storage, no longer used
├── public/                   Files served as-is: logo.png, og-image.png, favicon, your images
├── tailwind.config.js        Brand colours, fonts, breakpoints
├── vite.config.js            Vite settings, "@" import alias, dev proxy of /api to the Express server
├── vercel.json / netlify.toml  Hosting settings
└── .env.example              The environment variables you need
```

**How a page reaches a visitor:** at build time `scripts/prerender.js` renders every route to
a complete HTML file (e.g. `dist/digital-marketing/seo/index.html`) with its own title,
description, canonical link, social tags and JSON-LD. The visitor's browser shows that HTML
immediately, then React "hydrates" it, so clicking to the next page happens instantly without a
reload, and the `<Seo>` component updates the tab title and tags.

### How do I...?

| Task | Do this |
|---|---|
| **Change the phone number** | `src/data/site.js` → `phone`, `phoneDisplay`, `whatsapp`. It updates the header, footer, buttons, contact page and SEO data everywhere. |
| **Add a service** | Add an object to `services` in `src/data/services.js` (see `src/data/README.md`). Its page, menu and footer links, form option and sitemap entry are created automatically. |
| **Add a blog post** | Add an object to `src/data/blog.js`. The blog section, `/blog` page and menu link appear automatically. |
| **Change an image** | Replace the file in `public/images/...` (same name), or point the data file at a new path. Use WebP under ~200 KB. A missing or broken image shows a plain navy placeholder (no gradients). |
| **Change colours** | `tailwind.config.js` → `colors.navy`, `colors.saffron`, `colors.leaf`. |
| **Change fonts** | `src/main.jsx` (the `@fontsource` imports) and the font variables at the top of `src/index.css`. |
| **Change page titles/descriptions** | Services/categories: `src/data/services.js`. Other pages: `src/data/pages.js` → `pageSeo`. |
| **Change homepage text** | `src/data/home.js`. |
| **Add a new page** | Create `src/pages/MyPage.jsx` (copy a simple one like `FaqPage.jsx`), add a `<Route>` in `src/App.jsx`, and add its path to `getPages()` in `src/entry-server.jsx` so it is pre-rendered and listed in the sitemap. |
| **View enquiries** | Use the admin API (section 3), or open the `enquiries` / `jobapplications` / `newslettersubscribers` collections in MongoDB Compass or Atlas. |
| **Open the pop-up from a new button** | Use `<a href="#enquire">Text</a>` anywhere, or the `LetsTalkButton` component. Add `data-service="SEO"` to pre-select a service. |

---

## 6. SEO and the per-page audit

Built in:
- A separate pre-rendered HTML file per page, so Google reads the full content without running JavaScript
- Unique title (50–60 chars) and description (140–160 chars) per page, from `src/data`.
  The build warns if any page goes outside these lengths.
- One H1 per page, canonical URLs, Open Graph + Twitter cards (`public/og-image.png`)
- JSON-LD: Organization/LocalBusiness + WebSite (all pages), Service (service pages),
  FAQPage (FAQ sections), BreadcrumbList (inner pages), BlogPosting (posts)
- Auto `sitemap.xml` (only pages that have content), `robots.txt`, `lang="en-IN"`, noindex 404 page
- Self-hosted fonts, lazy-loaded images, cached assets, small JavaScript

**Run the audit:**
```bash
npm run audit                                        # build + test every page in the sitemap
npm run audit -- --skip-build                        # re-test the existing dist/ build
npm run audit -- --url=https://DnyanYoga.com   # test the live site
npm run audit -- --limit=5                           # quick check of the first 5 pages
```
Results: `reports/seo-report.md` and `reports/seo-report.html` (score table for every page,
mobile and desktop, plus title/description/H1/alt-text checks), and the full Lighthouse report
for each page in `reports/lighthouse/`. `npm run seo:check` is a quicker offline check of titles, descriptions, canonicals, headings, alt text, JSON-LD, links, robots and sitemap. The audit command fails if any page scores **below 95 for SEO**
or **below 90 for mobile Performance**.

> Run the audit on the production build (the default) or the live site, never on `npm run dev`.

---

## 7. Accessibility

Skip-to-content link, visible keyboard focus, 44×44px tap targets, 16px form text, WCAG AA
colour contrast, keyboard-friendly mega-menu, drawer, pop-up (native `<dialog>`) and slider
(pause button, arrow keys, swipe), screen-reader labels, and reduced-motion support.
