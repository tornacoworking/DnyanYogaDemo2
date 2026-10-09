/**
 * netlify/functions/enquiry.js → POST /api/enquiry on Netlify
 * Only used if you host on Netlify instead of running the Express server (server/index.js).
 * It passes the request to the same code the Express route uses (submissionController.js),
 * which saves to MongoDB. `config.path` makes Netlify serve this function at /api/enquiry,
 * the same address the forms use. Set MONGODB_URI in Netlify → Site configuration →
 * Environment variables.
 */
import { submitForm } from "../../server/controllers/submissionController.js";
import { clientIpFromHeaders } from "../../server/utils/clientIp.js";

export const config = { path: "/api/enquiry" };

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export default async function enquiry(request) {
  if (request.method !== "POST") {
    return Response.json({ ok: false, message: "Method not allowed." }, { status: 405 });
  }
  const body = await request.json().catch(() => null);
  const { status, json } = await submitForm({
    body,
    ip: clientIpFromHeaders((name) => request.headers.get(name)),
  });
  return Response.json(json, { status });
}
