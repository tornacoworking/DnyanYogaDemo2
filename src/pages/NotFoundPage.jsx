/**
 * NotFoundPage.jsx (route: any unknown URL)
 * The custom 404 page, shown for any URL that does not exist (and for hidden pages
 * like /blog while there are no posts). Includes helpful links so visitors are not stuck.
 * Marked "noindex" so Google does not list it. scripts/prerender.js saves it as 404.html,
 * which Vercel and Netlify show automatically for unknown URLs.
 */
import { Link } from "react-router";
import { categories, pageSeo } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import Seo from "@/components/ui/Seo";
import LetsTalkButton from "@/components/forms/LetsTalkButton";

export default function NotFoundPage() {
  const meta = buildMetadata({ ...pageSeo.notFound, path: "/404", noIndex: true });
  return (
    <>
      <Seo meta={meta} />
      <section className="section">
        <div className="container-page max-w-3xl text-center">
          <p className="font-heading text-7xl font-bold text-saffron-600 sm:text-8xl">404</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">This page is lost in the dark</h1>
          <p className="mt-4 text-lg text-gray-600">
            The page you are looking for does not exist or has moved. Let us guide you back to the light.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary">
              Go to the homepage
            </Link>
            <LetsTalkButton label="Contact us" className="btn-outline" />
          </div>
          <h2 className="mt-14 text-xl font-semibold">Popular services</h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/${category.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-navy-50 px-4 font-medium text-navy-700 hover:bg-navy-700 hover:text-white"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
