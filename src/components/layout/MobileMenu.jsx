/**
 * MobileMenu.jsx
 * Hamburger button + full-screen menu drawer for phones and tablets (below 1024px).
 * Each service category is an accordion: tap it to show its services.
 * Used on: Header.jsx.
 *
 * Accessibility:
 *  - The drawer is a native <dialog>, so focus stays inside it and Escape closes it.
 *  - Every tap target is at least 44px tall.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";

/**
 * @param {Object} props
 * @param {Array<{title:string, href:string, services:Array<{title:string, href:string}>}>} props.categories
 * @param {Array<{label:string, href:string}>} props.links  Quick links (About, FAQ, Contact...)
 * @param {string} props.phone         Phone in +91 format for tel: links
 * @param {string} props.phoneDisplay  Phone number as shown to people
 * @param {string} props.whatsapp      WhatsApp number (digits)
 */
export default function MobileMenu({ categories, links, phone, phoneDisplay, whatsapp }) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  // Which category accordion is open (only one at a time keeps the list short).
  const [openCategory, setOpenCategory] = useState(null);
  const { pathname } = useLocation();

  // Close the drawer after navigating to another page.
  useEffect(() => setIsOpen(false), [pathname]);

  // Open/close the native dialog. (Page scrolling behind any open dialog is locked
  // by the "body:has(dialog[open])" rule in globals.css.)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* ===== Hamburger button (44×44px) ===== */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy-700 hover:bg-navy-50"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* ===== Full-screen drawer ===== */}
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => setIsOpen(false)}
        className="m-0 h-full max-h-none w-full max-w-none bg-white p-0 backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 px-4">
            <span className="font-heading text-lg font-bold text-navy-700">Menu</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy-700 hover:bg-navy-50"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">Services</p>
            <ul className="divide-y divide-gray-100">
              {/* ===== Category accordions ===== */}
              {categories.map((category) => {
                const isExpanded = openCategory === category.href;
                const panelId = `mobile-panel-${category.href.slice(1)}`;
                return (
                  <li key={category.href}>
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => setOpenCategory(isExpanded ? null : category.href)}
                      className="flex min-h-12 w-full items-center justify-between px-2 text-left font-semibold text-navy-700"
                    >
                      {category.title}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    <ul id={panelId} hidden={!isExpanded} className="pb-3 pl-4">
                      <li>
                        <Link to={category.href} className="flex min-h-11 items-center px-2 font-medium text-saffron-600">
                          All {category.title} services
                        </Link>
                      </li>
                      {category.services.map((service) => (
                        <li key={service.href}>
                          <Link
                            to={service.href}
                            aria-current={pathname === service.href ? "page" : undefined}
                            className="flex min-h-11 items-center px-2 text-gray-700"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">Company</p>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="flex min-h-11 items-center px-2 font-medium text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== Contact buttons pinned to the bottom of the drawer ===== */}
          <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-gray-100 p-4">
            <a href={`tel:${phone}`} className="btn-outline !px-3" aria-label={`Call ${phoneDisplay}`}>
              <Phone className="h-5 w-5" aria-hidden="true" /> Call
            </a>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary !px-3">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
            </a>
            <a href="#enquire" onClick={() => setIsOpen(false)} className="btn-primary col-span-2">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
