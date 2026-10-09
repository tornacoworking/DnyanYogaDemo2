/**
 * rateLimit.js
 * A very small "rate limiter": it stops one visitor (one IP address) from sending
 * too many form submissions in a short time, which blocks most spam bots.
 * Used on: server/controllers/submissionController.js.
 *
 * HOW IT WORKS: we remember, in memory, the times each IP address submitted a form.
 * If an IP sent more than MAX_REQUESTS in the last WINDOW_MS, we refuse the request.
 *
 * LIMITATION: on Vercel/Netlify each serverless "instance" has its own memory, which is
 * cleared when the instance goes to sleep. It still stops rapid-fire spam bursts, which
 * is enough for a small business site. For heavy traffic, use a shared store such as
 * Upstash Redis instead.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // max submissions per IP inside the window

/** @type {Map<string, number[]>} IP address → list of submission timestamps (ms) */
const submissionsByIp = new Map();

/**
 * Checks whether this IP is allowed to submit now, and records the attempt if it is.
 * @param {string} ip The visitor's IP address ("unknown" if it cannot be detected)
 * @returns {boolean} true = allowed, false = too many requests
 */
export function isAllowed(ip) {
  const now = Date.now();
  // Keep only the timestamps that are still inside the time window.
  const recent = (submissionsByIp.get(ip) || []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    submissionsByIp.set(ip, recent);
    return false;
  }

  recent.push(now);
  submissionsByIp.set(ip, recent);

  // Occasionally clean out old IPs so the Map does not grow forever.
  if (submissionsByIp.size > 5000) {
    for (const [key, times] of submissionsByIp) {
      if (times.every((time) => now - time >= WINDOW_MS)) submissionsByIp.delete(key);
    }
  }
  return true;
}
