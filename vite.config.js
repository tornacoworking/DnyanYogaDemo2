/**
 * vite.config.js
 * Settings for Vite, the tool that runs the dev server and builds the site.
 *
 *  - react():        lets Vite understand JSX.
 *  - tailwindcss():  runs Tailwind CSS v4 (reads tailwind.config.js through src/index.css).
 *  - resolve.alias:  "@/..." means "src/...", so imports look like "@/data/db" everywhere.
 */
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  build: {
    // Warn if a JavaScript file grows above 600 KB (keeps the site fast on phones).
    chunkSizeWarningLimit: 600,
  },
});
