/**
 * CaseStudyPage.jsx (route: /case-studies/:slug)
 * One case study: challenge, solution, outcomes and the services used.
 * Data comes from: /src/data/caseStudies.js and /src/data/services.js.
 * With no case studies, every URL here shows the 404 page.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: add case studies in /src/data/caseStudies.js; images are "#" until replaced.
 * ---------------------------------------------------------------------------
 */
import { CircleCheck } from "lucide-react";
import { caseStudies, ctaBand, findServiceBySlug, getServiceOptions, serviceUrl, site } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SmartImage from "@/components/ui/SmartImage";
import EnquirySection from "@/components/sections/EnquirySection";
import NotFoundPage from "./NotFoundPage";
import { Link, useParams } from "react-router";
import Seo from "@/components/ui/Seo";

/** @param {string} slug */
function getStudy(slug) {
  return caseStudies.find((study) => study.slug === slug);
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getStudy(slug);
  if (!study) return <NotFoundPage />;
  const path = `/case-studies/${study.slug}`;
  const servicesUsed = study.services.map(findServiceBySlug).filter(Boolean);

  const meta = buildMetadata({
    title: `${study.title} | Case Study | ${site.shortName}`.slice(0, 60),
    description: study.seoDescription,
    path,
    image: study.image,
    type: "article",
  });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow={`${study.industry} · ${study.client}`}
        title={study.title}
        intro={study.result}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.title, path },
        ]}
      />
      <article className="section">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl">
              <SmartImage src={study.image} alt={study.title} icon="TrendingUp" priority sizes="(min-width: 1024px) 800px, 100vw" />
            </div>
            <h2 className="text-2xl font-bold">The challenge</h2>
            <p className="mt-3 text-lg text-gray-700">{study.challenge}</p>
            <h2 className="mt-10 text-2xl font-bold">Our solution</h2>
            <p className="mt-3 text-lg text-gray-700">{study.solution}</p>
            <h2 className="mt-10 text-2xl font-bold">The results</h2>
            <ul className="mt-4 space-y-3">
              {study.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-lg text-gray-700">
                  <CircleCheck className="mt-1 h-5 w-5 shrink-0 text-leaf-600" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
          {/* Sidebar: below the article on phones, on the right on desktop */}
          <aside className="card h-fit p-6 lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold">Services used</h2>
            <ul className="mt-3 space-y-1">
              {servicesUsed.map((service) => (
                <li key={service.slug}>
                  <Link to={serviceUrl(service)} className="flex min-h-11 items-center text-navy-700 underline hover:text-saffron-600">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
      <EnquirySection
        formType="service"
        content={ctaBand}
        serviceOptions={getServiceOptions()}
        contact={{ phone: site.phone, phoneDisplay: site.phoneDisplay, whatsapp: site.whatsapp }}
      />
    </>
  );
}
