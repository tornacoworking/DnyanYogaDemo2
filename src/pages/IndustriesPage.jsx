/**
 * IndustriesPage.jsx (route: /industries)
 * The industries we serve, each with a short description and links to the services
 * that help that industry most (good internal linking for SEO).
 * Data comes from: /src/data/industries.js and /src/data/services.js.
 */
import { Link } from "react-router";
import { ctaBand, findServiceBySlug, getServiceOptions, industries, pageSeo, serviceUrl, site } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import Icon from "@/components/ui/Icon";
import EnquirySection from "@/components/sections/EnquirySection";
import Seo from "@/components/ui/Seo";

export default function IndustriesPage() {
  const meta = buildMetadata({ ...pageSeo.industries, path: "/industries" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="Industries"
        title="Marketing built for your industry"
        intro="Every industry has its own customers, buying cycles and rules. We plan around yours."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
      />

      <section className="section" aria-label="Industries we serve">
        {/* 1 column on phones → 2 on desktop */}
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {industries.map((industry) => (
            // id lets homepage links like /industries#healthcare jump straight to this card.
            // scroll-mt-24 leaves room for the sticky header.
            <article key={industry.slug} id={industry.slug} className="card flex scroll-mt-24 flex-col items-center p-6 text-center sm:p-8">
              <div className="flex flex-col items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-700">
                  <Icon name={industry.icon} className="h-7 w-7" />
                </span>
                <h2 className="text-2xl font-bold">{industry.name}</h2>
              </div>
              <p className="mt-4 text-gray-600">{industry.description}</p>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-gray-600">Services that help most</h3>
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {industry.focus
                  .map((slug) => findServiceBySlug(slug))
                  .filter(Boolean)
                  .map((service) => (
                    <li key={service.slug}>
                      <Link
                        to={serviceUrl(service)}
                        className="inline-flex min-h-11 items-center rounded-full bg-navy-50 px-4 text-sm font-medium text-navy-700 hover:bg-navy-700 hover:text-white"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <EnquirySection
        formType="service"
        content={ctaBand}
        serviceOptions={getServiceOptions()}
        contact={{ phone: site.phone, phoneDisplay: site.phoneDisplay, whatsapp: site.whatsapp }}
      />
    </>
  );
}
