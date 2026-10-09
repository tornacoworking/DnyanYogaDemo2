/**
 * EnquiryForm.jsx
 * The main enquiry form: name, phone, email, company, city, service, budget, message, consent.
 * Used on: the "Let's Talk" pop-up, /contact, the homepage CTA section and every
 * service/category page. Submissions are saved to Google Sheets + Google Docs through
 * /api/enquiry (see server/handleEnquiry.js and google-apps-script/Code.gs).
 *
 * Shows loading/success/error states without reloading the page.
 * Data comes from: the page passes serviceOptions and whatsapp as props, so the form
 * stays reusable and does not depend on where the data lives.
 */
import { useId } from "react";
import { BUDGET_OPTIONS } from "@/lib/formOptions";
import { useFormSubmit } from "./useFormSubmit";
import { Field, HoneypotField, ConsentCheckbox, SubmitButton, ErrorBanner } from "./FormParts";
import SuccessMessage from "./SuccessMessage";

/**
 * @param {Object} props
 * @param {"lets-talk"|"contact"|"home-cta"|"service"} props.formType Where the form is used (decides the Google Sheet tab)
 * @param {Array<{group:string, options:string[]}>} props.serviceOptions Services for the dropdown, grouped by category
 * @param {string} props.whatsapp       Business WhatsApp number (digits)
 * @param {string} [props.defaultService] Pre-selects a service (e.g. on the SEO page, "SEO")
 * @param {string} [props.submitLabel="Send Enquiry"]
 */
export default function EnquiryForm({
  formType,
  serviceOptions,
  whatsapp,
  defaultService = "",
  submitLabel = "Send Enquiry",
}) {
  // useId gives unique ids, so two forms on the same page never clash
  // (e.g. the page form and the pop-up form both have a "phone" field).
  const uid = useId();
  const id = (name) => `${uid}-${name}`;
  const { status, errors, message, submittedData, handleSubmit, reset } = useFormSubmit(formType);

  if (status === "success") {
    return (
      <SuccessMessage
        whatsapp={whatsapp}
        name={submittedData?.fullName}
        topic={submittedData?.service}
        onReset={reset}
      />
    );
  }

  /** Props that connect an input to its error message for screen readers. */
  const errorProps = (name) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${id(name)}-error` } : {};

  return (
    // noValidate is NOT set, so the browser also checks required fields and formats instantly.
    // "relative" is needed for the hidden honeypot field.
    <form onSubmit={handleSubmit} className="relative grid gap-5 sm:grid-cols-2" aria-busy={status === "loading"}>
      {/* 1 column on phones → 2 columns from 640px */}
      <HoneypotField />

      <Field id={id("fullName")} label="Full Name" required error={errors.fullName}>
        <input
          id={id("fullName")}
          name="fullName"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className="form-input"
          {...errorProps("fullName")}
        />
      </Field>

      <Field id={id("phone")} label="Phone" required error={errors.phone}>
        {/* type="tel" + inputMode="numeric" opens the number keypad on phones.
            The pattern accepts 10 digits, optionally starting with +91 or 0.
            The "-" is escaped because modern browsers read patterns in strict regex mode. */}
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="numeric"
          required
          pattern="(\+91[ \-]?|0)?[6-9]\d{4}[ \-]?\d{5}"
          title="10-digit Indian mobile number, e.g. 98765 43210"
          autoComplete="tel"
          placeholder="98765 43210"
          className="form-input"
          {...errorProps("phone")}
        />
      </Field>

      <Field id={id("email")} label="Email" required error={errors.email}>
        <input
          id={id("email")}
          name="email"
          type="email"
          required
          maxLength={150}
          autoComplete="email"
          className="form-input"
          {...errorProps("email")}
        />
      </Field>

      <Field id={id("company")} label="Company Name" error={errors.company}>
        <input id={id("company")} name="company" type="text" maxLength={150} autoComplete="organization" className="form-input" />
      </Field>

      <Field id={id("city")} label="City" error={errors.city}>
        <input id={id("city")} name="city" type="text" maxLength={100} autoComplete="address-level2" className="form-input" />
      </Field>

      <Field id={id("budget")} label="Budget" error={errors.budget}>
        <select id={id("budget")} name="budget" defaultValue="" className="form-input">
          <option value="">Select a budget</option>
          {BUDGET_OPTIONS.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </Field>

      <Field id={id("service")} label="Service Interested In" error={errors.service} className="sm:col-span-2">
        <select id={id("service")} name="service" defaultValue={defaultService} className="form-input">
          <option value="">Select a service</option>
          {/* <optgroup> groups the 38 services under their category names */}
          {serviceOptions.map((group) => (
            <optgroup key={group.group} label={group.group}>
              {group.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </Field>

      <Field id={id("message")} label="Message" error={errors.message} className="sm:col-span-2">
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Tell us a little about your business and goals"
          className="form-input"
        />
      </Field>

      <ConsentCheckbox id={id("consent")} error={errors.consent} />
      <ErrorBanner message={status === "error" ? message : ""} />

      <div className="sm:col-span-2">
        <SubmitButton isLoading={status === "loading"} label={submitLabel} />
      </div>
    </form>
  );
}
