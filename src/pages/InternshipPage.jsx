/**
 * InternshipPage.jsx (route: /internship)
 * Open internships and the application form.
 * Data comes from: /src/data/careers.js (items with type: "internship").
 *
 * EMPTY DATA RULE: while there are no internships, this page shows the 404 page,
 * and its links are removed from the menu, footer and sitemap.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: add real internships in /src/data/careers.js to show this page.
 * ---------------------------------------------------------------------------
 */
import { hasData, internshipOpenings, pageSeo, site } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import OpeningsList from "@/components/sections/OpeningsList";
import NotFoundPage from "./NotFoundPage";
import Seo from "@/components/ui/Seo";

export default function InternshipPage() {
  if (!hasData.internships) return <NotFoundPage />;
  const meta = buildMetadata({ ...pageSeo.internship, path: "/internship" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="Internship"
        title="Learn digital marketing on real projects"
        intro="Our internships give students and freshers hands-on experience with real clients and mentors."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Internship", path: "/internship" },
        ]}
      />
      <OpeningsList openings={internshipOpenings} formType="internship" whatsapp={site.whatsapp} />
    </>
  );
}
