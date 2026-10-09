/**
 * SocialIcon.jsx
 * Picks the right icon for a social media link based on its label in site.js
 * (e.g. { label: "Instagram", url: "..." }).
 * Used on: Footer and the Contact page.
 */
import { Facebook, Globe, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const ICONS_BY_LABEL = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  x: Twitter,
  twitter: Twitter,
};

/**
 * @param {Object} props
 * @param {string} props.label Social network name, e.g. "Instagram"
 * @param {string} [props.className]
 */
export default function SocialIcon({ label, className = "h-5 w-5" }) {
  // Unknown networks get a generic globe icon.
  const IconComponent = ICONS_BY_LABEL[label.toLowerCase()] || Globe;
  return <IconComponent className={className} aria-hidden="true" />;
}
