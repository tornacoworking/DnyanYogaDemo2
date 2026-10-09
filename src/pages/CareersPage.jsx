/**
 * CareersPage.jsx (route: /careers)
 * Open job positions and the application form.
 * Data comes from: /src/data/careers.js (items with type: "job").
 *
 * EMPTY DATA RULE: while there are no job openings, this page shows the 404 page,
 * and its links are removed from the menu, footer and sitemap.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: add real job openings in /src/data/careers.js to show this page.
 * ---------------------------------------------------------------------------
 */
import { hasData, jobOpenings, pageSeo, site } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import OpeningsList from "@/components/sections/OpeningsList";
import NotFoundPage from "./NotFoundPage";
import Seo from "@/components/ui/Seo";

export default function CareersPage() {
  if (!hasData.jobs) return <NotFoundPage />;
  const meta = buildMetadata({ ...pageSeo.careers, path: "/careers" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="Careers"
        title="Build your career with DnyanYoga"
        intro="Work on real brands, learn from a supportive team and grow your skills in Pune."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />
      <OpeningsList openings={jobOpenings} formType="careers" whatsapp={site.whatsapp} />
    </>
  );
}
