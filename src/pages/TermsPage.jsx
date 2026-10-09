/**
 * TermsPage.jsx (route: /terms-and-conditions)
 * Data comes from: /src/data/pages.js → terms.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: have the terms reviewed by a legal professional before launch.
 * ---------------------------------------------------------------------------
 */
import { legal, pageSeo, terms } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import Seo from "@/components/ui/Seo";
import LegalPage from "@/components/sections/LegalPage";

export default function TermsPage() {
  const meta = buildMetadata({ ...pageSeo.terms, path: "/terms-and-conditions" });
  return (
    <>
      <Seo meta={meta} />
      <LegalPage title="Terms & Conditions" path="/terms-and-conditions" lastUpdated={legal.lastUpdated} sections={terms} />
    </>
  );
}
