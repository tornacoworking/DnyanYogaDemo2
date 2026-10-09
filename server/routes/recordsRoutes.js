/**
 * recordsRoutes.js
 * Admin-only routes to read, update and delete saved submissions (see requireAdmin.js).
 *   /api/enquiries     → Enquiry (Let's Talk, Contact, Home CTA, Service forms)
 *   /api/applications  → JobApplication (Careers, Internship)
 *   /api/subscribers   → NewsletterSubscriber
 */
import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { recordsController } from "../controllers/recordsController.js";
import { connectDB } from "../config/db.js";
import Enquiry from "../models/Enquiry.js";
import JobApplication from "../models/JobApplication.js";
import NewsletterSubscriber from "../models/NewsletterSubscriber.js";

const router = Router();

// Guard only the record paths (other /api paths fall through to the 404 handler).
// requireAdmin runs first; then MongoDB is connected before any record handler runs.
router.use(["/enquiries", "/applications", "/subscribers"], requireAdmin, async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("[records] MongoDB is not available:", error.message);
    res.status(503).json({ ok: false, message: "Database unavailable." });
  }
});

/** Mounts list / get / update / delete for one model under a path. */
function mountRecords(path, Model, options) {
  const controller = recordsController(Model, options);
  router.get(path, controller.list);
  router.get(`${path}/:id`, controller.getOne);
  router.patch(`${path}/:id`, controller.update);
  router.delete(`${path}/:id`, controller.remove);
}

mountRecords("/enquiries", Enquiry, { searchFields: ["fullName", "email", "company", "service"], updatable: true });
mountRecords("/applications", JobApplication, { searchFields: ["fullName", "email", "role"], updatable: true });
mountRecords("/subscribers", NewsletterSubscriber, { searchFields: ["email"], updatable: false });

export default router;
