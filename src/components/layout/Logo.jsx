/**
 * Logo.jsx
 * The brand logo + name, linking to the homepage.
 * Used on: Header and Footer.
 * The logo file is /public/logo.png (transparent background, 256×256).
 */
import { Link } from "react-router";
import { site } from "@/data/db";

/**
 * @param {Object} props
 * @param {string} props.name      Business name (from site.js)
 * @param {boolean} [props.light]  true on dark backgrounds (white text)
 * @param {boolean} [props.priority] true in the header so the logo loads first
 */
export default function Logo({ name, light = false, priority = false }) {
  return (
    <Link to="/" className="flex min-h-11 items-center gap-2.5" aria-label={`${name} – Home`}>
      {/* Explicit width/height stops the layout from jumping while the logo loads (CLS). */}
      <img
        src="/logo.png"
        alt=""
        width={48}
        height={48}
        loading={priority ? "eager" : "lazy"}
        className="h-11 w-11 sm:h-12 sm:w-12"
      />
      <span className="flex flex-col leading-tight">
        <span className={`font-heading text-lg font-bold ${light ? "text-white" : "text-navy-700"}`}>DnyanYoga</span>
        <span className={`text-xs font-medium tracking-wide ${light ? "text-navy-100" : "text-saffron-600"}`}>
          {site.brandTagline}
        </span>
      </span>
    </Link>
  );
}
