/**
 * app.js
 * Builds the Express application (no port, no database connection here, so tests can
 * import it). server/index.js starts it.
 *
 *   /api/health        → server + database status
 *   /api/enquiry       → POST, public: every website form (submissionRoutes.js)
 *   /api/enquiries, /api/applications, /api/subscribers
 *                      → admin only: list / read / update / delete (recordsRoutes.js)
 *   everything else    → the pre-rendered website from dist/ (after `npm run build`)
 */
import fs from "node:fs";
import path from "node:path";
import express from "express";
import { dbState } from "./config/db.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import recordsRoutes from "./routes/recordsRoutes.js";

const DIST = path.resolve("dist");

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  // Behind a proxy (Nginx, Render, Railway...) set TRUST_PROXY=1 so req.ip is the visitor's IP.
  if (process.env.TRUST_PROXY) {
    app.set("trust proxy", process.env.TRUST_PROXY === "true" ? true : Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY);
  }

  // Same security headers as vercel.json / netlify.toml.
  app.use((req, res, next) => {
    res.set({
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "SAMEORIGIN",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    });
    next();
  });

  app.use("/api", express.json({ limit: "50kb" }));

  app.get("/api/health", (req, res) => {
    const database = dbState();
    res.status(database === "connected" ? 200 : 503).json({ ok: database === "connected", database });
  });
  app.use("/api", submissionRoutes);
  app.use("/api", recordsRoutes);
  app.use("/api", (req, res) => res.status(404).json({ ok: false, message: "Not found." }));

  // ----- The website itself (only when it has been built) -----
  if (fs.existsSync(path.join(DIST, "index.html"))) {
    // Built JS/CSS names change with every build, so they can be cached for a year.
    app.use(
      "/assets",
      express.static(path.join(DIST, "assets"), { immutable: true, maxAge: "1y", redirect: false, index: false })
    );
    app.use(express.static(DIST, { redirect: false, index: false }));

    // Clean URLs: /about → dist/about/index.html (no redirect to /about/, matching the canonical URLs).
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      const page = path.join(DIST, path.normalize(decodeURIComponent(req.path)), "index.html");
      if (page.startsWith(DIST + path.sep) && fs.existsSync(page)) return res.sendFile(page);
      next();
    });
    app.use((req, res) => res.status(404).sendFile(path.join(DIST, "404.html")));
  }

  // JSON errors for the API (bad JSON body, unexpected failures). Nothing internal is leaked.
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    if (error.type === "entity.parse.failed" || error.status === 400) {
      return res.status(400).json({ ok: false, message: "Invalid request." });
    }
    if (error.type === "entity.too.large") {
      return res.status(413).json({ ok: false, message: "Request is too large." });
    }
    console.error("[server] Unhandled error:", error);
    res.status(500).json({ ok: false, message: "Something went wrong. Please try again." });
  });

  return app;
}
