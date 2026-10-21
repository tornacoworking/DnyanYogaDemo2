/**
 * WorkSections.jsx
 * The sections of the /work page: WorkHero, AiSearchSection, AuditBanner, SocialProof.
 * Used on: src/pages/WorkPage.jsx.
 * Data comes from: /src/data/work.js (through /src/data/db.js), passed in as props.
 *
 * NOTE: most figures, names and reviews in /src/data/work.js are PLACEHOLDERS. The hero shows a
 * yellow notice until the figures are replaced with real ones.
 */
import { Link } from "react-router";
import { ArrowRight, MousePointerClick, Quote, Search, Star, TrendingUp } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import LetsTalkButton from "@/components/forms/LetsTalkButton";
import AuditForm from "./AuditForm";

const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.16em] text-accent-600";
const accentButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-500 px-7 text-base font-semibold text-white shadow-[0_10px_30px_-8px_rgba(79,91,255,0.7)] transition-colors hover:bg-accent-600";

/* ====================================================================== */
/* Hero                                                                    */
/* ====================================================================== */

/** Small trend line for the dashboard card. Values are 0-100, drawn left to right. */
function Sparkline({ points }) {
  const step = 100 / (points.length - 1);
  const coords = points.map((value, index) => `${(index * step).toFixed(1)},${(36 - value * 0.34).toFixed(1)}`);
  const last = coords[coords.length - 1].split(",");
  return (
    <svg viewBox="0 0 100 40" className="h-10 w-28" aria-hidden="true" preserveAspectRatio="none">
      <polyline points={coords.join(" ")} fill="none" stroke="#A8AEFF" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="2.2" fill="#fff" />
    </svg>
  );
}

/**
 * Dark hero with the headline, buttons, a floating "dashboard" mock-up and the stats bar.
 * @param {Object} props
 * @param {typeof import("@/data/work").workHero} props.hero
 * @param {{rating:number, reviewCount:string}} props.rating
 */
export function WorkHero({ hero, rating }) {
  const { dashboard, campaign } = hero;
  return (
    <section className="relative overflow-hidden bg-night-900 text-white" aria-labelledby="work-heading">
      {/* Background photo under a dark overlay (decorative) */}
      <div className="absolute inset-0 opacity-35">
        <SmartImage src={hero.image} alt="" priority icon={null} sizes="100vw" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night-900 via-night-900/85 to-night-900/50" />

      <div className="container-page relative pt-12 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* ----- Left: text ----- */}
          <div>
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-sm text-white/90">
              <span className="rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-semibold">{hero.locationBadge}</span>
              <span className="truncate">{hero.badgeText}</span>
            </p>

            <h1 id="work-heading" className="mt-6 text-4xl font-bold leading-[1.08] !text-white sm:text-5xl lg:text-6xl">
              {hero.headline.map((line, index) => (
                <span key={line} className={`block ${index === hero.headline.length - 1 ? "!text-accent-300" : ""}`}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">{hero.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LetsTalkButton label="Get Free Strategy Call" className={accentButton} />
              <Link
                to="/services"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Our Services
              </Link>
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-x-2 text-sm text-white/80">
              <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span>
                <strong className="font-semibold text-white">{rating.rating}/5</strong> from {rating.reviewCount} Google reviews
              </span>
            </p>
          </div>

          {/* ----- Right: floating dashboard mock-up (decorative) ----- */}
          <div aria-hidden="true" className="relative mx-auto hidden h-[460px] w-full max-w-lg sm:block lg:max-w-none">
            {/* Keyword rankings */}
            <div className="absolute left-0 top-0 z-10 w-60 rounded-2xl bg-white p-4 text-ink shadow-card-hover">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-white">
                  <Search className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">Keyword rankings</span>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-600">
                {hero.keywordRankings.map((item) => (
                  <li key={item.keyword} className="flex items-center justify-between gap-2">
                    {item.keyword}
                    <span className="rounded-md bg-accent-100 px-2 py-0.5 font-semibold text-accent-700">#{item.rank}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Analytics panel */}
            <div className="absolute bottom-32 right-0 w-[78%] rounded-2xl border border-white/10 bg-night-800/95 p-4 shadow-card-hover backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-white/70">{dashboard.sessionsLabel}</p>
                  <p className="font-heading text-2xl font-semibold">{dashboard.sessions}</p>
                </div>
                <Sparkline points={dashboard.trend} />
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-400/15 px-2 py-1 text-xs font-semibold text-emerald-300">
                  <TrendingUp className="h-3 w-3" />
                  {dashboard.change}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
                {dashboard.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-white/70">{metric.label}</dt>
                    <dd className="mt-0.5 text-base font-semibold">{metric.value}</dd>
                    <dd className={`mt-0.5 ${metric.good ? "text-emerald-300" : "text-red-300"}`}>{metric.delta}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Google Ads campaign */}
            <div className="absolute bottom-0 right-2 z-10 w-60 rounded-2xl bg-white p-4 text-ink shadow-card-hover">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-night-900 text-white">
                  <MousePointerClick className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-gray-600">{campaign.label}</p>
                  <p className="font-heading text-lg font-semibold">{campaign.value}</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-accent-500" style={{ width: `${campaign.pacing}%` }} />
              </div>
              <p className="mt-1.5 text-xs text-gray-600">Budget pacing {campaign.pacing}%</p>
            </div>
          </div>
        </div>

        {/* ----- Stats bar ----- */}
        <dl className="relative mt-14 grid grid-cols-2 rounded-t-2xl border border-b-0 border-white/10 bg-night-900/85 backdrop-blur lg:mt-20 lg:grid-cols-4">
          {hero.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-6 ${index % 2 === 1 ? "border-l border-white/10" : ""} ${index > 1 ? "border-t border-white/10 lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-white/10" : ""}`}
            >
              <dt className="text-sm text-white/75">{stat.label}</dt>
              <dd className="mt-2 font-heading text-4xl font-semibold sm:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {hero.statsAreSample && (
        <div className="relative border-t border-white/10 bg-night-900 pb-5 pt-4">
          <p className="container-page">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              Figures shown are placeholders from the brief — replace with verified numbers.
            </span>
          </p>
        </div>
      )}
    </section>
  );
}

/* ====================================================================== */
/* Selected work (project cards)                                           */
/* ====================================================================== */

/**
 * @param {Object} props
 * @param {typeof import("@/data/work").workProjects} props.content
 */
export function WorkProjects({ content }) {
  return (
    <section className="section" aria-labelledby="work-projects-heading">
      <div className="container-page">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <p className={eyebrowClass}>{content.eyebrow}</p>
          <h2 id="work-projects-heading" className="mt-4 text-3xl font-bold !text-night-900 sm:text-4xl lg:text-5xl">
            {content.headline}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{content.intro}</p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((project) => (
            <li key={project.title} className="card card-hover flex flex-col overflow-hidden border border-gray-200">
              <div className="relative aspect-[16/10] bg-night-900">
                <SmartImage src={project.image} alt={project.title} sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-night-900">
                  {project.industry}
                </span>
                {project.sample && (
                  <span className="absolute right-4 top-4 rounded-md bg-amber-50 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-800">
                    Sample project
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="inline-flex items-center gap-2 font-heading text-lg font-semibold text-accent-600">
                  <TrendingUp className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {project.result}
                </p>
                <h3 className="mt-3 text-xl font-semibold !text-night-900">{project.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{project.client}</p>
                <p className="mt-3 flex-1 text-gray-700">{project.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Services used">
                  {project.services.map((service) => (
                    <li key={service} className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <LetsTalkButton label={content.cta} className={accentButton} />
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* AI search                                                               */
/* ====================================================================== */

/**
 * @param {Object} props
 * @param {typeof import("@/data/work").aiSearch} props.content
 */
export function AiSearchSection({ content }) {
  return (
    <section className="section" aria-labelledby="ai-search-heading">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className={eyebrowClass}>{content.eyebrow}</p>
          <h2 id="ai-search-heading" className="mt-4 text-3xl font-bold leading-tight !text-night-900 sm:text-4xl lg:text-5xl">
            {content.headline}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-gray-600">{content.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={content.primaryCta.href} className={accentButton}>
              {content.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to={content.secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-gray-300 px-7 text-base font-semibold text-night-900 transition-colors hover:bg-gray-50"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div>
          <ol className="space-y-4">
            {content.points.map((point, index) => (
              <li key={point.title} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-card">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-night-900 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-body text-base font-semibold text-night-900">{point.title}</h3>
                  <p className="mt-1 text-gray-600">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-gray-600">{content.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* Free audit banner                                                       */
/* ====================================================================== */

const toneClass = { good: "text-emerald-300", warn: "text-amber-300", bad: "text-red-300" };

/**
 * @param {Object} props
 * @param {typeof import("@/data/work").auditTool} props.content
 */
export function AuditBanner({ content }) {
  return (
    <section className="pb-16 lg:pb-24" aria-labelledby="audit-heading">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-night-900 text-white">
          <div className="absolute inset-0 opacity-30">
            <SmartImage src={content.image} alt="" icon={null} sizes="(min-width: 1280px) 1200px, 100vw" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-night-900 via-night-900/90 to-night-900/70" />

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:p-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-300">{content.eyebrow}</p>
              <h2 id="audit-heading" className="mt-4 text-3xl font-bold !text-white sm:text-4xl">
                {content.headline}
              </h2>
              <p className="mt-4 max-w-lg text-white/80">{content.intro}</p>
              <AuditForm placeholder={content.placeholder} buttonLabel={content.buttonLabel} service={content.service} />
            </div>

            <div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-label="Example audit scores">
                {content.exampleScores.map((score) => (
                  <li key={score.label} className="rounded-2xl border border-white/15 bg-white/5 px-3 py-6 text-center backdrop-blur">
                    <span className={`block font-heading text-3xl font-semibold ${toneClass[score.tone]}`}>{score.value}</span>
                    <span className="mt-1 block text-sm text-white/80">{score.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-xs text-white/70">Example output</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================== */
/* Social proof                                                            */
/* ====================================================================== */

/** "Dr. A. Kulkarni" → "AK" (titles are skipped). */
function initials(name) {
  const parts = name.split(/\s+/).filter((part) => !/^(dr|mr|mrs|ms)\.?$/i.test(part));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

/**
 * @param {Object} props
 * @param {typeof import("@/data/work").socialProof} props.content
 * @param {{rating:number, reviewCount:string, reviewsUrl:string}} props.rating
 * @param {string[]} props.clients  Client names for the scrolling strip
 * @param {Array<{quote:string,name:string,role:string,rating?:number,photo?:string}>} props.reviews
 */
export function SocialProof({ content, rating, clients, reviews }) {
  const badge = (
    <>
      <GoogleG />
      <div>
        <p className="text-sm">
          <span className="font-heading text-2xl font-bold text-night-900">{rating.rating}</span>
          <span className="text-gray-600"> / 5</span>
        </p>
        <p className="text-xs text-gray-600">Google rating · {rating.reviewCount} reviews</p>
      </div>
    </>
  );
  const badgeClass = "flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-card";

  const renderClients = (isCopy) => (
    <ul className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={isCopy || undefined}>
      {clients.map((client) => (
        <li key={client} className="whitespace-nowrap font-heading text-lg font-semibold text-gray-400">
          {client}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="section border-t border-gray-100 bg-white pt-0 lg:pt-0" aria-labelledby="social-proof-heading">
      <div className="container-page pt-16 lg:pt-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-2xl">
            <p className={eyebrowClass}>{content.eyebrow}</p>
            <h2 id="social-proof-heading" className="mt-4 text-3xl font-bold !text-night-900 sm:text-4xl lg:text-5xl">
              {content.headline}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{content.intro}</p>
          </div>
          {rating.reviewsUrl ? (
            <a href={rating.reviewsUrl} target="_blank" rel="noopener noreferrer" className={`${badgeClass} shrink-0`}>
              {badge}
            </a>
          ) : (
            <div className={`${badgeClass} shrink-0`}>{badge}</div>
          )}
        </div>

        {/* Scrolling client names, faded at both edges. The copy is hidden from screen readers. */}
        <div
          className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
          aria-label="Our clients"
        >
          <div className="flex w-max animate-marquee">
            {renderClients(false)}
            {renderClients(true)}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.name} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
              <div className="flex items-start justify-between">
                <span className="flex gap-0.5 text-amber-400" role="img" aria-label={`${review.rating ?? 5} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className={`h-4 w-4 ${n <= (review.rating ?? 5) ? "fill-current" : "text-gray-300"}`} aria-hidden="true" />
                  ))}
                </span>
                <Quote className="h-7 w-7 text-accent-100" aria-hidden="true" />
              </div>
              <blockquote className="mt-4 flex-1 text-gray-700">“{review.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                {review.photo ? (
                  <img src={review.photo} alt={review.name} width="44" height="44" loading="lazy" className="h-11 w-11 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-600 text-sm font-semibold text-white" aria-hidden="true">
                    {initials(review.name)}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-night-900">{review.name}</span>
                  <span className="block truncate text-sm text-gray-600" title={review.role}>
                    {review.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
