/**
 * submissionRoutes.js
 * The public route used by every form on the website.
 */
import { Router } from "express";
import { createSubmission } from "../controllers/submissionController.js";

const router = Router();
router.post("/enquiry", createSubmission);
router.all("/enquiry", (req, res) => {
  res.set("Allow", "POST").status(405).json({ ok: false, message: "Method not allowed." });
});

export default router;
