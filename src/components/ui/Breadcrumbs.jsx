/**
 * Breadcrumbs.jsx
 * The "Home › Digital Marketing › SEO" trail at the top of inner pages,
 * plus the matching BreadcrumbList JSON-LD for Google.
 * Used on: every page except the homepage (inside PageHero).
 */
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

/**
 * @param {Object} props
 * @param {Array<{name:string, path:string}>} props.items From Home to the current page.
 *        The last item is the current page and is not a link.
 */
export default function Breadcrumbs({ items }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-5">
        {/* flex-wrap so long trails wrap onto two lines on small phones instead of overflowing */}
        <ol className="flex flex-wrap items-center gap-1 text-sm text-navy-100">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-white">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link to={item.path} className="rounded hover:text-white hover:underline">
                      {item.name}
                    </Link>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
