/**
 * vite.config.js
 * Settings for Vite, the tool that runs the dev server and builds the site.
 *
 *  - react():        lets Vite understand JSX.
 *  - tailwindcss():  runs Tailwind CSS v4 (reads tailwind.config.js through src/index.css).
 *  - resolve.alias:  "@/..." means "src/...", so imports look like "@/data/db" everywhere.
 *  - server.proxy:   during `npm run dev` only, forwards /api/* to the Express + MongoDB
 *                    backend (server/index.js, started with `npm run server`), so forms
 *                    can be tested locally. In production, Express serves both.
 */
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // "" = load ALL variables from .env files (not only VITE_ ones); only PORT is read here.
  // Variables without the VITE_ prefix are never sent to the browser.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // Forms post to /api/enquiry → the Express server (default port 5000, see .env.example).
      proxy: { "/api": `http://localhost:${env.PORT || 5000}` },
    },
    resolve: {
      alias: { "@": path.resolve(import.meta.dirname, "src") },
    },
    build: {
      // Warn if a JavaScript file grows above 600 KB (keeps the site fast on phones).
      chunkSizeWarningLimit: 600,
    },
  };
});
