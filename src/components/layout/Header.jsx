/**
 * Header.jsx
 * The sticky top bar: logo on the left, navigation in the centre, "Let's Talk" on the right.
 * On phones the navigation is replaced by a hamburger button that opens MobileMenu.
 * Used on: src/App.jsx (every page).
 *
 * This file reads the menu from /src/data/db.js and passes it as plain props to the
 * interactive parts (DesktopNav, MobileMenu), so those stay simple and reusable.
 */
import { getMenuCategories, getQuickLinks, site } from "@/data/db";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import LetsTalkButton from "@/components/forms/LetsTalkButton";

/** Top-level links shown next to "Services" on desktop (a short list keeps the bar clean). */
const PRIMARY_LINK_HREFS = ["/work", "/about", "/industries", "/case-studies", "/blog", "/contact"];

export default function Header() {
  const menuCategories = getMenuCategories();
  const quickLinks = getQuickLinks();
  // Only show primary links whose pages exist (e.g. /blog is hidden while there are no posts).
  const primaryLinks = quickLinks.filter((link) => PRIMARY_LINK_HREFS.includes(link.href));

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo name={site.name} priority />

        {/* Desktop navigation: hidden below 1024px */}
        <DesktopNav categories={menuCategories} links={primaryLinks} />

        <div className="flex items-center gap-2">
          {/* "Let's Talk" button: hidden on very small phones (the sticky bottom bar has Call/WhatsApp) */}
          <LetsTalkButton className="btn-primary hidden !px-5 sm:inline-flex" />
          {/* Hamburger + drawer: only below 1024px */}
          <MobileMenu
            categories={menuCategories}
            links={quickLinks}
            phone={site.phone}
            phoneDisplay={site.phoneDisplay}
            whatsapp={site.whatsapp}
          />
        </div>
      </div>
    </header>
  );
}
