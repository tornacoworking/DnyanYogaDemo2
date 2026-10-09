/**
 * requireAdmin.js
 * Protects the read / update / delete endpoints. The caller must send the secret from the
 * ADMIN_API_KEY environment variable in an "x-api-key" header (or "Authorization: Bearer ...").
 * If ADMIN_API_KEY is not set, these endpoints are switched off completely (404), so a
 * forgotten setting never leaves visitor data open to the public.
 */
import { timingSafeEqual } from "node:crypto";

/** Compares two strings in constant time, so the key cannot be guessed from response timing. */
function sameSecret(given, expected) {
  const a = Buffer.from(String(given));
  const b = Buffer.from(String(expected));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) return res.status(404).json({ ok: false, message: "Not found." });

  const bearer = (req.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const given = req.get("x-api-key") || bearer;
  if (!given || !sameSecret(given, expected)) {
    return res.status(401).json({ ok: false, message: "Unauthorised." });
  }
  next();
}
