/**
 * HomeSections.jsx
 * Homepage sections that are simple display components (no state or effects):
 *  ClientLogos, AboutStats, CategoryGrid, ProcessSteps, WhyChooseUs,
 *  FeaturedCaseStudies, IndustriesGrid, LatestPosts.
 * Several are also reused on other pages (e.g. AboutStats on /about, ProcessSteps on category pages).
 *
 * EMPTY DATA RULE: sections whose data is empty (client logos, stats, case studies,
 * blog posts) return null, so nothing at all is shown, not even the heading.
 */
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/Icon";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { CategoryCard, CaseStudyCard, BlogCard } from "@/components/ui/Cards";
import Counter from "./Counter";

/* ====================================================================== */
/* Client logo strip                                                       */
/* ====================================================================== */

/**
 * Auto-scrolling strip of client logos. Hidden when there are no clients.
 * The list is rendered twice in a row and moved left by 50%, which makes the scroll
 * loop seamlessly. The second copy is aria-hidden so screen readers read each name once.
 * @param {Object} props
 * @param {Array<{name:string, logo:string}>} props.clients
 */
export function ClientLogos({ clients }) {
  if (clients.length === 0) return null;
  const renderList = (isCopy) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={isCopy || undefined}>
      {clients.map((client) => (
        <li key={client.name} className="relative h-12 w-32 shrink-0 grayscale transition hover:grayscale-0">
          {client.logo && client.logo !== "#" ? (
            <img src={client.logo} alt={isCopy ? "" : client.name} loading="lazy" className="h-full w-full object-contain" />
          ) : (
            // No logo file yet: show the name as text instead of a broken image.
            <span className="flex h-full items-center justify-center text-center text-sm font-semibold text-gray-600">
              {client.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Our clients" className="border-b border-gray-100 py-10">
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-600">
        Trusted by growing businesses
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* About snippet + counters                                                */
/* ====================================================================== */

/**
 * About text with an image, plus animated counters when real stats exist.
 * @param {Object} props
 * @param {{eyebrow:string, heading:string, paragraphs:string[], ctaLabel:string, ctaHref:string, image:string, imageAlt:string}} props.about
 * @param {Array<{label:string, value:number, suffix?:string, decimals?:number}>} props.stats
 * @param {boolean} [props.showCta=true] false on the /about page itself
 */
export function AboutStats({ about, stats, showCta = true }) {
  return (
    <section className="section" aria-labelledby="about-heading">
      {/* Text first on phones; image on the right from 1024px */}
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-heading" className="text-3xl font-bold sm:text-4xl">
            {about.heading}
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 30)} className="mt-4 text-lg text-gray-600">
              {paragraph}
            </p>
          ))}
          {showCta && (
            <Link to={about.ctaHref} className="btn-outline mt-8">
              {about.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <SmartImage
            src={about.image}
            alt={about.imageAlt}
            icon="Users"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
      </div>

      {/* Counters are only shown when real numbers exist in /src/data/stats.js */}
      {stats.length > 0 && (
        <div className="container-page mt-14">
          {/* 2 columns on phones → 4 on desktop */}
          <dl className="grid grid-cols-2 gap-4 rounded-3xl bg-navy-700 p-6 text-center sm:p-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1 py-2">
                <dt className="text-sm text-navy-100 sm:text-base">{stat.label}</dt>
                <dd className="font-heading text-3xl font-bold text-white sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

/* ====================================================================== */
/* Service categories                                                      */
/* ====================================================================== */

/**
 * The 6 service category cards.
 * @param {Object} props
 * @param {Array<{slug:string, title:string, icon:string, tagline:string}>} props.categories
 * @param {Record<string, number>} props.serviceCounts Category slug → number of services
 * @param {boolean} [props.withHeading=true]
 */
export function CategoryGrid({ categories, serviceCounts, withHeading = true }) {
  return (
    <section className="section bg-gray-50" aria-labelledby={withHeading ? "services-heading" : undefined}>
      <div className="container-page">
        {withHeading && (
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Everything your brand needs to grow"
            intro="Six specialist teams under one roof, working together on one clear goal: your growth."
          />
        )}
        {/* 1 column on phones → 2 on tablets → 3 on desktop */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} serviceCount={serviceCounts[category.slug]} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* Process steps                                                           */
/* ====================================================================== */

/**
 * "Our Proven Process": 5 numbered steps joined by a line.
 * Phones: a vertical timeline (line on the left). Desktop: a horizontal row (line across the top).
 * @param {Object} props
 * @param {Array<{title:string, text:string, icon?:string}>} props.steps
 * @param {string} [props.title="Our Proven Process"]
 * @param {string} [props.intro]
 * @param {string} [props.headingId="process-heading"]
 */
export function ProcessSteps({ steps, title = "Our Proven Process", intro, headingId = "process-heading" }) {
  return (
    <section className="section" aria-labelledby={headingId}>
      <div className="container-page">
        <SectionHeading
          id={headingId}
          eyebrow="How we work"
          title={title}
          intro={intro || "A simple, transparent process, so you always know what is happening and why."}
        />
        <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
          {/* Connecting line: vertical on phones/tablets, horizontal on desktop */}
          <span aria-hidden="true" className="absolute bottom-8 left-7 top-8 w-0.5 bg-navy-100 lg:hidden" />
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-navy-100 lg:block" />

          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-saffron-600 font-heading text-xl font-bold text-white ring-8 ring-white">
                {index + 1}
              </span>
              <div className="pt-2 lg:pt-0">
                <h3 className="flex items-center gap-2 text-lg font-semibold lg:justify-center">
                  {step.icon && <Icon name={step.icon} className="h-5 w-5 text-navy-400" />}
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* Why choose us                                                           */
/* ====================================================================== */

/**
 * 3 highlight blocks on a navy background.
 * @param {Object} props
 * @param {Array<{title:string, text:string, icon:string}>} props.items
 */
export function WhyChooseUs({ items }) {
  return (
    <section className="section bg-navy-700" aria-labelledby="why-heading">
      <div className="container-page">
        <SectionHeading
          id="why-heading"
          eyebrow="Why choose us"
          title="A partner focused on your growth"
          light
        />
        {/* 1 column on phones → 3 on desktop */}
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center sm:p-8">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-saffron-600 text-white">
                <Icon name={item.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-semibold !text-white">{item.title}</h3>
              <p className="mt-3 text-navy-100">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* Featured case studies                                                   */
/* ====================================================================== */

/**
 * Up to 3 featured case studies. Hidden when there are none.
 * @param {Object} props
 * @param {Array} props.studies All case studies; featured ones are shown first
 */
export function FeaturedCaseStudies({ studies }) {
  if (studies.length === 0) return null;
  const featured = [...studies].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 3);
  return (
    <section className="section bg-gray-50" aria-labelledby="work-heading">
      <div className="container-page">
        <SectionHeading id="work-heading" eyebrow="Our work" title="Results we are proud of" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/case-studies" className="btn-outline">
            View all case studies
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* Industries                                                              */
/* ====================================================================== */

/**
 * Industries we serve, as icon tiles linking to /industries.
 * @param {Object} props
 * @param {Array<{slug:string, name:string, icon:string, summary:string}>} props.industries
 */
export function IndustriesGrid({ industries }) {
  return (
    <section className="section" aria-labelledby="industries-heading">
      <div className="container-page">
        <SectionHeading
          id="industries-heading"
          eyebrow="Industries"
          title="Industries we serve"
          intro="We understand the customers, seasons and rules of the industries we work in."
        />
        {/* 1 column on phones → 2 on large phones → 4 on desktop */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <Link
                to={`/industries#${industry.slug}`}
                className="card card-hover flex h-full flex-col items-center gap-3 p-5 text-center"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">
                  <Icon name={industry.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-heading font-semibold text-navy-700">{industry.name}</span>
                  <span className="mt-1 block text-sm text-gray-600">{industry.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* Latest blog posts                                                       */
/* ====================================================================== */

/**
 * The 3 newest blog posts. Hidden when there are none.
 * @param {Object} props
 * @param {Array} props.posts All blog posts
 */
export function LatestPosts({ posts }) {
  if (posts.length === 0) return null;
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <section className="section bg-gray-50" aria-labelledby="blog-heading">
      <div className="container-page">
        <SectionHeading id="blog-heading" eyebrow="Insights" title="Latest from our blog" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/blog" className="btn-outline">
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
