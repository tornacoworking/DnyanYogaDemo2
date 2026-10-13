/**
 * WorkPage.jsx (route: /work)
 * Showcase page: hero with results mock-up, project cards, AI search section and free website
 * audit banner. The reviews section (SocialProof) now lives on the homepage only.
 * Data comes from: /src/data/work.js through /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: the figures, client names and reviews on this page are PLACEHOLDERS
 * (see /src/data/work.js). Replace them with real, verified content before launch.
 * ---------------------------------------------------------------------------
 */
import { aiSearch, auditTool, pageSeo, workHero, workProjects, workRating } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import Reveal from "@/components/ui/Reveal";
import Seo from "@/components/ui/Seo";
import { AiSearchSection, AuditBanner, WorkHero, WorkProjects } from "@/components/work/WorkSections";

export default function WorkPage() {
  const meta = buildMetadata({ ...pageSeo.work, path: "/work" });

  return (
    <>
      <Seo meta={meta} />
      {/* Hero is not wrapped in Reveal: it must show instantly for LCP */}
      <WorkHero hero={workHero} rating={workRating} />
      <Reveal>
        <WorkProjects content={workProjects} />
      </Reveal>
      <Reveal>
        <AiSearchSection content={aiSearch} />
      </Reveal>
      <Reveal>
        <AuditBanner content={auditTool} />
      </Reveal>
    </>
  );
}
