/**
 * main.jsx
 * The starting point of the website in the visitor's browser.
 *  - Loads the fonts and global CSS.
 *  - Starts React with the browser router (handles clicks between pages without reloading).
 *
 * HYDRATE vs RENDER: every page was already turned into HTML at build time
 * (scripts/prerender.js), so visitors and Google see content immediately. If that HTML
 * is present, React "hydrates" it (attaches click handlers to the existing HTML) instead
 * of drawing the page again. During `npm run dev` there is no pre-rendered HTML, so React
 * renders from scratch.
 */
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

// Self-hosted fonts (only the weights we use, to keep downloads small)
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource-variable/inter";
import "./index.css";

import App from "./App";

const rootElement = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// firstElementChild (not hasChildNodes) because during `npm run dev` the root only contains
// the <!--app-html--> placeholder comment, which must not count as pre-rendered content.
if (rootElement.firstElementChild) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
