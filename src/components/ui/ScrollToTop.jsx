/**
 * ScrollToTop.jsx
 * In a React app the page does not reload when you click a link, so the browser keeps the
 * old scroll position. This component scrolls to the top on every page change, or to the
 * section named in the link (e.g. /industries#healthcare scrolls to that card).
 * Used on: src/App.jsx (once, for the whole site).
 */
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait one frame so the new page is on screen before looking for the section.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
