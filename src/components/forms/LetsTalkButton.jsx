/**
 * LetsTalkButton.jsx
 * A button that opens the "Let's Talk" pop-up.
 * It is a plain link to "#enquire": EnquiryModalProvider catches the click and opens the pop-up.
 * WHY a plain link: it needs no state, works even before JavaScript has loaded
 * (it then scrolls to the #enquire form section), and can be used anywhere.
 * Used on: header, hero, CTA bands, service pages.
 */

/**
 * @param {Object} props
 * @param {string} [props.label="Let's Talk"]
 * @param {string} [props.service]  Pre-selects this service in the form
 * @param {string} [props.className="btn-primary"] Button style class
 */
export default function LetsTalkButton({ label = "Let's Talk", service, className = "btn-primary" }) {
  return (
    <a href="#enquire" data-service={service} className={className}>
      {label}
    </a>
  );
}
