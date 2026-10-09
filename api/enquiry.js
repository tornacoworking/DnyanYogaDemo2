/**
 * api/enquiry.js → POST /api/enquiry on Vercel
 * Only used if you host the site on Vercel instead of running the Express server
 * (server/index.js). Vercel turns every file in /api into a serverless function. This one
 * passes the request to the same code the Express route uses (submissionController.js), which
 * saves to MongoDB. Set MONGODB_URI in Vercel → Project → Settings → Environment Variables.
 */
import { submitForm } from "../server/controllers/submissionController.js";
import { clientIpFromHeaders } from "../server/utils/clientIp.js";

/**
 * @param {import("http").IncomingMessage & { body: unknown }} req Vercel parses JSON bodies into req.body
 * @param {import("http").ServerResponse & { status: Function, json: Function }} res
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  // req.body is already an object for JSON requests; parse it ourselves if it arrived as text.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = null;
    }
  }

  const { status, json } = await submitForm({
    body,
    ip: clientIpFromHeaders((name) => req.headers[name]),
  });
  return res.status(status).json(json);
}
