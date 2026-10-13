/**
 * ApplicationForm.jsx
 * Job / internship application form: name, phone, email, city, role, CV link, message, consent.
 * Used on: /careers and /internship (only shown when there are open roles in /src/data/careers.js).
 * Each application is emailed to the business inbox (see useFormSubmit.js).
 *
 * WHY a link instead of a file upload: there is no server to store files, so applicants
 * share a Google Drive/LinkedIn/portfolio link.
 */
import { useId } from "react";
import { useFormSubmit } from "./useFormSubmit";
import { Field, HoneypotField, ConsentCheckbox, SubmitButton, ErrorBanner } from "./FormParts";
import SuccessMessage from "./SuccessMessage";

/**
 * @param {Object} props
 * @param {"careers"|"internship"} props.formType
 * @param {string[]} props.roles     Titles of the open roles, for the dropdown
 * @param {string} props.whatsapp    Business WhatsApp number (digits)
 */
export default function ApplicationForm({ formType, roles, whatsapp }) {
  const uid = useId();
  const id = (name) => `${uid}-${name}`;
  const { status, errors, message, submittedData, handleSubmit, reset } = useFormSubmit(formType);

  if (status === "success") {
    return (
      <SuccessMessage whatsapp={whatsapp} name={submittedData?.fullName} topic={submittedData?.role} onReset={reset} />
    );
  }

  const errorProps = (name) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${id(name)}-error` } : {};

  return (
    <form onSubmit={handleSubmit} className="relative grid gap-5 sm:grid-cols-2" aria-busy={status === "loading"}>
      <HoneypotField />

      <Field id={id("fullName")} label="Full Name" required error={errors.fullName}>
        <input id={id("fullName")} name="fullName" type="text" required minLength={2} maxLength={100} autoComplete="name" className="form-input" {...errorProps("fullName")} />
      </Field>

      <Field id={id("phone")} label="Phone" required error={errors.phone}>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="numeric"
          required
          pattern="(\+91[ \-]?|0)?[6-9]\d{4}[ \-]?\d{5}"
          title="10-digit Indian mobile number, e.g. 98765 43210"
          autoComplete="tel"
          className="form-input"
          {...errorProps("phone")}
        />
      </Field>

      <Field id={id("email")} label="Email" required error={errors.email}>
        <input id={id("email")} name="email" type="email" required maxLength={150} autoComplete="email" className="form-input" {...errorProps("email")} />
      </Field>

      <Field id={id("city")} label="City" error={errors.city}>
        <input id={id("city")} name="city" type="text" maxLength={100} autoComplete="address-level2" className="form-input" />
      </Field>

      <Field id={id("role")} label={formType === "internship" ? "Internship" : "Role"} error={errors.role} className="sm:col-span-2">
        <select id={id("role")} name="role" defaultValue="" className="form-input">
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </Field>

      <Field id={id("resumeLink")} label="Link to your CV or portfolio" required error={errors.resumeLink} className="sm:col-span-2">
        <input
          id={id("resumeLink")}
          name="resumeLink"
          type="url"
          required
          maxLength={500}
          placeholder="https://drive.google.com/..."
          className="form-input"
          {...errorProps("resumeLink")}
        />
      </Field>

      <Field id={id("message")} label="Why would you like to join us?" error={errors.message} className="sm:col-span-2">
        <textarea id={id("message")} name="message" rows={4} maxLength={2000} className="form-input" />
      </Field>

      <ConsentCheckbox id={id("consent")} error={errors.consent} />
      <ErrorBanner message={status === "error" ? message : ""} />

      <div className="sm:col-span-2">
        <SubmitButton isLoading={status === "loading"} label="Submit Application" />
      </div>
    </form>
  );
}
