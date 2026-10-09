/**
 * CaseStudiesPage.jsx (route: /case-studies)
 * Grid of all case studies.
 * Data comes from: /src/data/caseStudies.js.
 *
 * EMPTY DATA RULE: while there are no case studies, this page shows the 404 page and its links
 * are removed from the menu, footer and sitemap.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: add real case studies in /src/data/caseStudies.js to show this page.
 * ---------------------------------------------------------------------------
 */
import { caseStudies, hasData, pageSeo } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { CaseStudyCard } from "@/components/ui/Cards";
import NotFoundPage from "./NotFoundPage";
import Seo from "@/components/ui/Seo";

export default function CaseStudiesPage() {
  if (!hasData.caseStudies) return <NotFoundPage />;
  const meta = buildMetadata({ ...pageSeo.caseStudies, path: "/case-studies" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="Case studies"
        title="Real projects, real results"
        intro="A look at how we have helped businesses grow."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ]}
      />
      <section className="section" aria-label="Case studies">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </>
  );
}
