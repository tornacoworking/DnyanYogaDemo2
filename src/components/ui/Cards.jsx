/**
 * Cards.jsx
 * The card designs used in grids across the site:
 *  - CategoryCard: one of the 6 service categories
 *  - ServiceCard: one individual service
 *  - CaseStudyCard: one case study
 *  - BlogCard: one blog post
 * They only display data; they have no state of their own.
 * Data comes from /src/data (passed in as props by the page or section).
 */
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Icon from "./Icon";
import SmartImage from "./SmartImage";

/**
 * Card for a service category (Brand, Digital Marketing, ...).
 * The whole card is one link, so it is a single, large tap target on phones.
 * @param {Object} props
 * @param {{slug:string, title:string, icon:string, tagline:string}} props.category
 * @param {number} props.serviceCount Number of services inside (shown as a small note)
 */
export function CategoryCard({ category, serviceCount }) {
  return (
    <Link
      to={`/${category.slug}`}
      className="card card-hover group flex h-full flex-col items-center p-6 text-center sm:p-8"
    >
      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-saffron-600 group-hover:text-white">
        <Icon name={category.icon} className="h-7 w-7" />
      </span>
      <h3 className="text-xl font-semibold">{category.title}</h3>
      <p className="mt-2 flex-1 text-gray-600">{category.tagline}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-saffron-600">
        {serviceCount} services
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

/**
 * Card for a single service.
 * @param {Object} props
 * @param {{title:string, icon:string, short:string}} props.service
 * @param {string} props.href The service page URL
 * @param {"h2"|"h3"} [props.headingLevel="h3"] Heading tag, so the heading order stays correct on every page
 */
export function ServiceCard({ service, href, headingLevel: Heading = "h3" }) {
  return (
    <Link to={href} className="card card-hover group flex h-full flex-col items-center p-6 text-center">
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <Heading className="text-lg font-semibold">{service.title}</Heading>
      <p className="mt-2 flex-1 text-gray-600">{service.short}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-700">
        Learn more<span className="sr-only"> about {service.title}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

/**
 * Card for a case study: image, industry, result, summary and "Read More".
 * @param {Object} props
 * @param {{slug:string, title:string, industry:string, result:string, summary:string, image:string}} props.study
 */
export function CaseStudyCard({ study }) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10]">
        {/* 1 column on phones, 2 on tablets, 3 on desktop → matching image sizes */}
        <SmartImage
          src={study.image}
          alt={`${study.title} project for ${study.client}`}
          icon="TrendingUp"
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col items-center p-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-saffron-600">{study.industry}</p>
        <h3 className="mt-2 text-xl font-semibold">{study.title}</h3>
        <p className="mt-3 w-full rounded-lg bg-leaf-50 px-3 py-2 font-semibold text-leaf-700">{study.result}</p>
        <p className="mt-3 flex-1 text-gray-600">{study.summary}</p>
        <Link
          to={`/case-studies/${study.slug}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-navy-700 hover:text-saffron-600"
        >
          Read More<span className="sr-only"> about {study.title}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/**
 * Card for a blog post: image, category, date, title and excerpt.
 * @param {Object} props
 * @param {{slug:string, title:string, excerpt:string, date:string, category:string, image:string}} props.post
 */
export function BlogCard({ post }) {
  // Show dates the Indian way, e.g. "7 Oct 2026".
  const readableDate = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    // "relative" lets the stretched title link (below) cover the whole card.
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9]">
        <SmartImage
          src={post.image}
          alt={post.title}
          icon="FileText"
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col items-center p-6 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-saffron-600">{post.category}</span> ·{" "}
          <time dateTime={post.date}>{readableDate}</time>
        </p>
        <h3 className="mt-2 text-xl font-semibold">
          {/* The title link is stretched over the whole card with the after: pseudo-element,
              so the full card is clickable while the link text stays meaningful. */}
          <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-saffron-600">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-gray-600">{post.excerpt}</p>
      </div>
    </article>
  );
}
