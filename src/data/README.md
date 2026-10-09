# /src/data: all website content

Every word, number and image path on the website lives in this folder. Change a file here,
save, and the site updates (run `npm run dev` to preview, then rebuild/redeploy).

Pages and components import these files through `db.js`. At build time every page is
turned into ready-made HTML from this data (see `scripts/prerender.js`), so Google sees the
full content. The data is also included in the website's JavaScript, so **never put secrets
(passwords, API keys) in this folder**.

## Golden rules

1. **Never add fake data.** No made-up clients, reviews, numbers or case studies.
2. **Empty means hidden.** If an array is `[]` (or a value is `null`), that section, its menu
   link, its footer link and its sitemap entry disappear automatically. Add real data and it
   appears again on the next build.
3. **Images:** use `"#"` while you do not have the image. A plain navy placeholder block is
   shown instead. Put the real file in `/public/images/...` and replace `"#"` with its path,
   e.g. `"/images/services/seo.webp"`. Use WebP, under ~200 KB.

## Which file controls what

| File | Controls | Hidden while empty? |
|---|---|---|
| `site.js` | Name, phone, WhatsApp, email, address, hours, social links, badges, SEO defaults | email, hours, social, badges |
| `services.js` | The 6 categories and all 38 services (every service page is generated from here) | no |
| `home.js` | Hero slides, About snippet, process steps, "Why choose us", CTA text | no |
| `stats.js` | Animated counters + Google rating badge | yes |
| `testimonials.js` | Testimonials carousel and `/testimonials` page | yes |
| `caseStudies.js` | Homepage case studies and `/case-studies` pages | yes |
| `blog.js` | Homepage blog posts and `/blog` pages | yes |
| `clients.js` | Scrolling client logo strip | yes |
| `team.js` | Team section on `/about` | yes |
| `careers.js` | `/careers` (type `"job"`) and `/internship` (type `"internship"`) | yes |
| `faqs.js` | General FAQs (homepage shows the first 6, `/faq` shows all) | no |
| `industries.js` | Industries section and `/industries` | no |
| `pages.js` | SEO titles/descriptions of fixed pages, About page text, Privacy Policy, Terms | no |
| `db.js` | Imports and re-exports everything + helper functions. Usually no need to edit. | n/a |

## How do I add...

**A testimonial** (`testimonials.js`):
```js
export const testimonials = [
  {
    name: "Client's name",
    role: "Founder",            // optional
    company: "Company name",     // optional
    quote: "Exactly what they said.",
    rating: 5,                   // optional, 1–5
    photo: "#",                  // or "/images/testimonials/name.webp"
    youtubeId: "",               // optional: video testimonial ID from the YouTube link
  },
];
```

**A case study** (`caseStudies.js`): copy the shape described at the top of the file.
Use real, measurable results. Set `featured: true` on up to 3 to show them on the homepage.

**A blog post** (`blog.js`):
```js
{
  slug: "how-to-rank-on-google-maps",           // becomes /blog/how-to-rank-on-google-maps
  title: "How to rank your business on Google Maps",
  excerpt: "A short summary for the card.",
  date: "2026-11-01",
  author: "Author name",
  category: "SEO",
  image: "#",
  seoDescription: "140–160 characters describing the post for Google.",
  content: [
    { paragraphs: ["Intro paragraph..."] },
    { heading: "Step 1: Claim your profile", paragraphs: ["...", "..."] },
  ],
}
```

**A counter** (`stats.js`): `{ label: "Projects Completed", value: 120, suffix: "+" }`.
For a rating use `decimals: 1`.

**A client logo** (`clients.js`): put the logo in `/public/clients/` and add
`{ name: "Client name", logo: "/clients/client-name.png" }`.

**A job or internship** (`careers.js`): add an object with `type: "job"` or `type: "internship"`
and the fields described at the top of the file.

**A new service**: add an object to `services` in `services.js` with an existing `category` slug.
Its page, menu link, footer link, dropdown option and sitemap entry are all created automatically.
Keep `seoTitle` at 50–60 characters and `seoDescription` at 140–160 characters.
