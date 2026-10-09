/**
 * useFormSubmit.js
 * A React hook shared by every form on the site (enquiry, application, newsletter).
 * It handles the whole submit flow so each form only has to draw its fields:
 *   1. collects the typed values from the <form>
 *   2. adds tracking details (page URL, UTM source/medium/campaign)
 *   3. sends everything to our server at /api/enquiry
 *   4. keeps track of the state: "idle" → "loading" → "success" or "error"
 *   5. stores field errors returned by the server so they can be shown under each field
 * Used on: EnquiryForm.jsx, ApplicationForm.jsx, NewsletterForm.jsx .
 */
import { useState, useCallback } from "react";

const UTM_STORAGE_KEY = "dy-utm";

/**
 * Reads UTM tags (?utm_source=...&utm_medium=...&utm_campaign=...) from the current URL.
 * WHY sessionStorage: a visitor may land on /?utm_source=google, then browse to /contact
 * before submitting. We save the tags from the first page so they are not lost.
 * Wrapped in try/catch because storage can be blocked in private browsing.
 * @returns {{utmSource:string, utmMedium:string, utmCampaign:string}}
 */
function getUtmTags() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
  try {
    if (fromUrl.utmSource || fromUrl.utmMedium || fromUrl.utmCampaign) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const saved = sessionStorage.getItem(UTM_STORAGE_KEY);
    return saved ? JSON.parse(saved) : fromUrl;
  } catch {
    return fromUrl;
  }
}

/**
 * Saves UTM tags as soon as any page loads (called once from EnquiryModalProvider),
 * so they are remembered even if the visitor submits a form on a later page.
 */
export function rememberUtmTags() {
  if (typeof window !== "undefined") getUtmTags();
}

/**
 * @param {string} formType Which form this is, e.g. "contact" (decides the Google Sheet tab)
 * @returns {{
 *   status: "idle"|"loading"|"success"|"error",
 *   errors: Record<string,string>,
 *   message: string,
 *   submittedData: Record<string,string>|null,
 *   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
 *   reset: () => void
 * }}
 */
export function useFormSubmit(formType) {
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  /**
   * Runs when the form is submitted.
   * Side effects: sends a network request to /api/enquiry and updates the form state.
   */
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault(); // stop the browser from reloading the page
      const form = event.currentTarget;
      const values = Object.fromEntries(new FormData(form).entries());

      // Checkboxes send "on" when ticked and nothing when not; convert to true/false.
      values.consent = values.consent === "on";

      const payload = {
        ...values,
        formType,
        // Page URL without the "#..." part
        pageUrl: window.location.href.split("#")[0],
        ...getUtmTags(),
      };

      setStatus("loading");
      setErrors({});
      setMessage("");

      try {
        const response = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => ({}));

        if (response.ok && result.ok) {
          setSubmittedData(values);
          setStatus("success");
          form.reset();
          return;
        }

        // The server sends back { errors: { fieldName: "message" } } for invalid fields.
        setErrors(result.errors || {});
        setMessage(result.message || "Something went wrong. Please try again or call us.");
        setStatus("error");
      } catch {
        // Network problem (offline, server down).
        setMessage("We could not send your message. Please check your internet connection, or call/WhatsApp us.");
        setStatus("error");
      }
    },
    [formType]
  );

  /** Goes back to an empty form (used by the "Send another message" button). */
  const reset = useCallback(() => {
    setStatus("idle");
    setErrors({});
    setMessage("");
    setSubmittedData(null);
  }, []);

  return { status, errors, message, submittedData, handleSubmit, reset };
}
