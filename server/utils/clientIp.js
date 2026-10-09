/**
 * clientIp.js
 * Works out the visitor's IP from the headers added by hosting platforms and proxies.
 * Used by the serverless wrappers (api/, netlify/); Express uses req.ip instead.
 * @param {(name:string) => string|null|undefined} getHeader Function that reads a request header
 * @returns {string}
 */
export function clientIpFromHeaders(getHeader) {
  const forwarded = getHeader("x-forwarded-for");
  if (forwarded) return String(forwarded).split(",")[0].trim();
  return getHeader("x-real-ip") || getHeader("x-nf-client-connection-ip") || "unknown";
}
