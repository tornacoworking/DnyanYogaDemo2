/**
 * recordsController.js
 * Read / update / delete for saved form submissions (the team's side of the data).
 * One factory builds the same four handlers for each model, so enquiries, job
 * applications and newsletter subscribers all behave the same way:
 *
 *   list   GET    /api/<resource>?page=1&limit=20&status=new&formType=contact&q=text
 *   getOne GET    /api/<resource>/:id
 *   update PATCH  /api/<resource>/:id      (only "status" and "notes" can be changed)
 *   remove DELETE /api/<resource>/:id
 *
 * All of them are behind requireAdmin (see routes/recordsRoutes.js).
 */
import mongoose from "mongoose";
import { SUBMISSION_STATUSES } from "../models/trackingFields.js";

/** Escapes characters that mean something in a regular expression. */
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * @param {import("mongoose").Model<any>} Model
 * @param {Object} options
 * @param {string[]} options.searchFields  Fields searched by the ?q= parameter
 * @param {boolean} options.updatable      false for models without status/notes
 */
export function recordsController(Model, { searchFields, updatable }) {
  /** Sends 400 for ids that are not valid ObjectIds, instead of a confusing CastError. */
  const validId = (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) return true;
    res.status(400).json({ ok: false, message: "Invalid id." });
    return false;
  };

  return {
    async list(req, res) {
      const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
      const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));

      const filter = {};
      if (typeof req.query.status === "string" && SUBMISSION_STATUSES.includes(req.query.status)) {
        filter.status = req.query.status;
      }
      if (typeof req.query.formType === "string") filter.formType = req.query.formType;
      if (typeof req.query.q === "string" && req.query.q.trim()) {
        const pattern = new RegExp(escapeRegex(req.query.q.trim().slice(0, 100)), "i");
        filter.$or = searchFields.map((field) => ({ [field]: pattern }));
      }

      const [items, total] = await Promise.all([
        Model.find(filter)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .lean(),
        Model.countDocuments(filter),
      ]);
      res.json({ ok: true, items, total, page, pages: Math.ceil(total / limit) });
    },

    async getOne(req, res) {
      if (!validId(req, res)) return;
      const item = await Model.findById(req.params.id).lean();
      if (!item) return res.status(404).json({ ok: false, message: "Not found." });
      res.json({ ok: true, item });
    },

    async update(req, res) {
      if (!validId(req, res)) return;
      if (!updatable) return res.status(405).json({ ok: false, message: "This record cannot be edited." });

      const changes = {};
      if (req.body?.status !== undefined) changes.status = req.body.status;
      if (req.body?.notes !== undefined) changes.notes = req.body.notes;
      if (Object.keys(changes).length === 0) {
        return res.status(400).json({ ok: false, message: 'Send "status" and/or "notes".' });
      }

      try {
        const item = await Model.findByIdAndUpdate(req.params.id, changes, {
          returnDocument: "after",
          runValidators: true, // so an invalid status is rejected
        }).lean();
        if (!item) return res.status(404).json({ ok: false, message: "Not found." });
        res.json({ ok: true, item });
      } catch (error) {
        if (error?.name === "ValidationError" || error?.name === "CastError") {
          return res.status(400).json({ ok: false, message: error.message });
        }
        throw error;
      }
    },

    async remove(req, res) {
      if (!validId(req, res)) return;
      const item = await Model.findByIdAndDelete(req.params.id).lean();
      if (!item) return res.status(404).json({ ok: false, message: "Not found." });
      res.json({ ok: true });
    },
  };
}
