/**
 * ServicesPage.jsx (route: /services)
 * Overview of all 6 service categories, each with its list of services.
 * Data comes from: /src/data/services.js (through /src/data/db.js).
 */
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { categories, ctaBand, getServiceOptions, getServicesByCategory, pageSeo, serviceUrl, site } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import Icon from "@/components/ui/Icon";
import LetsTalkButton from "@/components/forms/LetsTalkButton";
import EnquirySection from "@/components/sections/EnquirySection";
import Seo from "@/components/ui/Seo";

export default function ServicesPage() {
  const meta = buildMetadata({ ...pageSeo.services, path: "/services" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="Our services"
        title="Digital marketing, branding, technology and media services"
        intro="Six specialist teams under one roof. Pick a category to see every service we offer."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        actions={<LetsTalkButton label="Get a Free Consultation" />}
      />

      <section className="section" aria-label="All services by category">
        {/* 1 column on phones → 2 on large tablets/desktop */}
        <div className="container-page grid gap-8 lg:grid-cols-2">
          {categories.map((category) => (
            <article key={category.slug} className="card flex flex-col items-center p-6 text-center sm:p-8">
              <div className="flex flex-col items-center gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy-700">
                  <Icon name={category.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold">
                    <Link to={`/${category.slug}`} className="hover:text-saffron-600">
                      {category.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-gray-600">{category.tagline}</p>
                </div>
              </div>
              {/* Services as two columns of links from 640px */}
              <ul className="mt-6 grid w-full flex-1 gap-x-6 sm:grid-cols-2">
                {getServicesByCategory(category.slug).map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={serviceUrl(service)}
                      className="flex min-h-11 items-center justify-center gap-2 border-b border-gray-100 text-ink hover:text-saffron-600"
                    >
                      <ArrowRight className="h-4 w-4 shrink-0 text-saffron-600" aria-hidden="true" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to={`/${category.slug}`} className="btn-outline mt-6">
                Explore {category.menuTitle}
              </Link>
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
