/**
 * PageHero.jsx
 * The navy banner at the top of every inner page: breadcrumbs, the page's single H1,
 * a short intro and optional buttons.
 * Used on: all pages except the homepage.
 */
import Breadcrumbs from "./Breadcrumbs";

/**
 * @param {Object} props
 * @param {string} props.title  The page H1 (only one H1 per page, for SEO)
 * @param {string} [props.eyebrow]  Small label above the title
 * @param {string} [props.intro]    One or two sentences under the title
 * @param {Array<{name:string, path:string}>} props.breadcrumbs Trail from Home to this page
 * @param {React.ReactNode} [props.actions] Optional buttons under the intro
 */
export default function PageHero({ title, eyebrow, intro, breadcrumbs, actions }) {
  return (
    <section className="relative overflow-hidden bg-navy-700 text-white">
      {/* Decorative soft circles in brand colours (aria-hidden: no meaning for screen readers) */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-saffron-500/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-leaf-500/15 blur-3xl" />

      {/* Smaller padding on phones, more on desktop */}
      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={breadcrumbs} />
        {eyebrow && <p className="eyebrow !text-saffron-300">{eyebrow}</p>}
        <h1 className="max-w-4xl text-3xl font-bold !text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-navy-100">{intro}</p>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
