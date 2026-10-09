/**
 * PrivacyPolicyPage.jsx (route: /privacy-policy)
 * Data comes from: /src/data/pages.js → privacyPolicy.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: have the policy text reviewed by a legal professional before launch.
 * ---------------------------------------------------------------------------
 */
import { legal, pageSeo, privacyPolicy } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import Seo from "@/components/ui/Seo";
import LegalPage from "@/components/sections/LegalPage";

export default function PrivacyPolicyPage() {
  const meta = buildMetadata({ ...pageSeo.privacy, path: "/privacy-policy" });
  return (
    <>
      <Seo meta={meta} />
      <LegalPage title="Privacy Policy" path="/privacy-policy" lastUpdated={legal.lastUpdated} sections={privacyPolicy} />
    </>
  );
}
