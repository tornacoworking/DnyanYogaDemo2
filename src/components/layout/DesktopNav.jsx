/**
 * DesktopNav.jsx
 * Desktop navigation (1024px and wider): a "Services" mega-menu showing all 6 categories
 * in columns, plus simple links (About, Industries, ...).
 * Used on: Header.jsx.
 *
 * Accessibility:
 *  - The "Services" button has aria-expanded so screen readers know if the menu is open.
 *  - It opens on hover (mouse) AND on click/Enter/Space (keyboard and touch laptops).
 *  - Escape closes it and returns focus to the button; tabbing out of the menu closes it.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { ChevronDown } from "lucide-react";

/**
 * @param {Object} props
 * @param {Array<{title:string, href:string, services:Array<{title:string, href:string}>}>} props.categories
 * @param {Array<{label:string, href:string}>} props.links Simple top-level links
 */
export default function DesktopNav({ categories, links }) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const closeTimer = useRef(null);
  const { pathname } = useLocation();

  // Close the menu whenever the page changes.
  useEffect(() => setIsMegaMenuOpen(false), [pathname]);

  // Escape closes the menu and puts focus back on the button.
  useEffect(() => {
    if (!isMegaMenuOpen) return;
    function handleKey(event) {
      if (event.key === "Escape") {
        setIsMegaMenuOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMegaMenuOpen]);

  /** Opens on mouse enter. Cancels a pending close so the menu does not flicker. */
  function openOnHover() {
    clearTimeout(closeTimer.current);
    setIsMegaMenuOpen(true);
  }

  /** Closes shortly after the mouse leaves, giving time to move into the panel. */
  function closeOnLeave() {
    closeTimer.current = setTimeout(() => setIsMegaMenuOpen(false), 150);
  }

  /** Closes when keyboard focus moves outside the whole menu area. */
  function handleBlur(event) {
    if (!wrapperRef.current?.contains(event.relatedTarget)) setIsMegaMenuOpen(false);
  }

  /** Underline style for the link of the page you are on. */
  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);
  const isServicesActive = categories.some((category) => isActive(category.href)) || pathname === "/services";

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {/* ===== Services mega-menu ===== */}
        <li ref={wrapperRef} onMouseEnter={openOnHover} onMouseLeave={closeOnLeave} onBlur={handleBlur}>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={isMegaMenuOpen}
            aria-controls="mega-menu"
            onClick={() => setIsMegaMenuOpen((open) => !open)}
            className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-3 font-medium hover:text-saffron-600 ${
              isServicesActive ? "text-saffron-600" : "text-ink"
            }`}
          >
            Services
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isMegaMenuOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {/* The panel stays in the page (hidden) so search engines can still follow the links. */}
          <div
            id="mega-menu"
            hidden={!isMegaMenuOpen}
            className="absolute inset-x-0 top-full border-t border-gray-100 bg-white shadow-card-hover"
          >
            <div className="container-page grid grid-cols-3 gap-x-8 gap-y-8 py-8 xl:grid-cols-6">
              {/* 3 columns on laptops → all 6 categories in one row on large desktops */}
              {categories.map((category) => (
                <div key={category.href}>
                  <Link
                    to={category.href}
                    className="mb-3 block font-heading font-semibold text-navy-700 hover:text-saffron-600"
                  >
                    {category.title}
                  </Link>
                  <ul className="space-y-1.5">
                    {category.services.map((service) => (
                      <li key={service.href}>
                        <Link
                          to={service.href}
                          className={`block rounded py-0.5 text-sm hover:text-saffron-600 ${
                            pathname === service.href ? "font-semibold text-saffron-600" : "text-gray-600"
                          }`}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 bg-navy-50">
              <div className="container-page py-3">
                <Link to="/services" className="text-sm font-semibold text-navy-700 hover:text-saffron-600">
                  View all services →
                </Link>
              </div>
            </div>
          </div>
        </li>

        {/* ===== Simple links ===== */}
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-lg px-3 font-medium hover:text-saffron-600 ${
                isActive(link.href) ? "text-saffron-600" : "text-ink"
              }`}
            >
              {link.label.replace(" Us", "")}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
