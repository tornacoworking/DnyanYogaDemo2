/**
 * useFormSubmit.js
 * A React hook shared by every form on the site (enquiry, application, newsletter).
 * There is no backend or database: each submission is sent straight from the browser to the
 * FormSubmit.co email service, which emails it to our business inbox (ID in
 * site.formEndpointId, src/data/site.js). Every submission becomes ONE separate email, with a subject that says
 * which form it came from.
 *
 * The hook handles the whole submit flow so each form only has to draw its fields:
 *   1. collects the typed values from the <form>
 *   2. adds tracking details (page URL, UTM source/medium/campaign)
 *   3. posts everything to FormSubmit
 *   4. keeps track of the state: "idle" → "loading" → "success" or "error"
 * Used on: EnquiryForm.jsx, ApplicationForm.jsx, NewsletterForm.jsx .
 */
import { useState, useCallback } from "react";
import { site } from "@/data/site";

/** FormSubmit's JSON endpoint: POST here and the data is emailed to the inbox this ID belongs to. */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${site.formEndpointId}`;

/** Email subject for each form, so every email says what it is. */
const SUBJECTS = {
  "lets-talk": "New Enquiry: Let's Talk pop-up",
  contact: "New Enquiry: Contact page",
  "home-cta": "New Enquiry: Homepage",
  service: "New Enquiry: Service page",
  careers: "New Enquiry: Job application",
  internship: "New Enquiry: Internship application",
  newsletter: "New Enquiry: Newsletter subscriber",
};

/** Readable labels for the rows of the email (anything not listed keeps its field name). */
const LABELS = {
  fullName: "Full name",
  phone: "Phone",
  email: "Email",
  company: "Company",
  city: "City",
  budget: "Budget",
  service: "Service interested in",
  role: "Role",
  resumeLink: "CV / portfolio link",
  message: "Message",
  consent: "Agreed to be contacted",
  pageUrl: "Page",
  utmSource: "UTM source",
  utmMedium: "UTM medium",
  utmCampaign: "UTM campaign",
};

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
 * @param {string} formType Which form this is, e.g. "contact" (decides the email subject)
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
   * Side effects: sends a network request to FormSubmit (which emails it) and updates the form state.
   */
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault(); // stop the browser from reloading the page
      const form = event.currentTarget;
      const values = Object.fromEntries(new FormData(form).entries());

      // Checkboxes send "on" when ticked and nothing when not; convert to true/false.
      values.consent = values.consent === "on";

      // Honeypot: real visitors never see this field, bots fill it in. Pretend it worked, send nothing.
      if (values._honey) {
        setSubmittedData(values);
        setStatus("success");
        form.reset();
        return;
      }
      delete values._honey;

      const details = {
        ...values,
        // Page URL without the "#..." part
        pageUrl: window.location.href.split("#")[0],
        ...getUtmTags(),
      };

      // Build the email: readable labels, empty fields left out.
      const payload = {};
      for (const [key, value] of Object.entries(details)) {
        if (value === "" || value === false || value == null) continue;
        payload[LABELS[key] || key] = value === true ? "Yes" : value;
      }
      // Special FormSubmit settings (they start with an underscore and are not shown in the email).
      payload._subject = SUBJECTS[formType] || "New Enquiry: Website form";
      payload._template = "table";
      payload._captcha = "false";

      setStatus("loading");
      setErrors({});
      setMessage("");

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => ({}));

        if (response.ok && String(result.success) === "true") {
          setSubmittedData(values);
          setStatus("success");
          form.reset();
          return;
        }

        // FormSubmit says "needs Activation" until the recipient clicks the link in its first email.
        // Visitors should not see that; the site owner fixes it once (see README section 3).
        const needsActivation = /activat/i.test(result.message || "");
        setMessage(
          needsActivation || !result.message
            ? "We could not send your message right now. Please call or WhatsApp us and we will help you straight away."
            : result.message
        );
        setStatus("error");
      } catch {
        // Network problem (offline, email service unreachable).
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
