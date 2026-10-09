/**
 * ServicePage.jsx (route: /:category/:service)
 * One page for every individual service, e.g. /digital-marketing/seo.
 * Sections (from the brief): hero with breadcrumb → overview → what's included →
 * our process for this service → benefits → related services → FAQ → CTA + enquiry form.
 * Data comes from: /src/data/services.js (through /src/data/db.js).
 *
 * The category and service slugs come from the URL (useParams). scripts/prerender.js builds
 * a static HTML file for all 38 services. Unknown combinations show the 404 page.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO on this page:
 *  - Service images are "#" (branded graphic shown). Add them in /src/data/services.js → services[].image.
 * ---------------------------------------------------------------------------
 */
import { CircleCheck } from "lucide-react";
import {
  ctaBand,
  getCategory,
  getRelatedServices,
  getService,
  getServiceOptions,
  serviceUrl,
  site,
} from "@/data/db";
import { buildMetadata, serviceJsonLd, serviceSeoTitle } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/Cards";
import LetsTalkButton from "@/components/forms/LetsTalkButton";
import { ProcessSteps } from "@/components/home/HomeSections";
import FaqSection from "@/components/sections/FaqSection";
import EnquirySection from "@/components/sections/EnquirySection";
import { useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
import Seo from "@/components/ui/Seo";

export default function ServicePage() {
  const { category: categorySlug, service: serviceSlug } = useParams();
  const service = getService(categorySlug, serviceSlug);
  const category = getCategory(categorySlug);
  if (!service || !category) return <NotFoundPage />;

  const path = serviceUrl(service);
  const relatedServices = getRelatedServices(service, 3);

  const meta = buildMetadata({
    title: serviceSeoTitle(service),
    description: service.seoDescription,
    path,
    image: service.image,
  });

  return (
    <>
      <Seo meta={meta} />
      {/* Service schema: tells Google what this service is and who provides it */}
      <JsonLd data={serviceJsonLd(service, path, category.title)} />

      {/* ===== Hero with breadcrumb ===== */}
      <PageHero
        eyebrow={category.title}
        title={`${service.title} Services in Pune`}
        intro={service.short}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: category.title, path: `/${category.slug}` },
          { name: service.title, path },
        ]}
        actions={<LetsTalkButton label={`Enquire about ${service.title}`} service={service.title} />}
      />

      {/* ===== Overview ===== */}
      <section className="section" aria-labelledby="overview-heading">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Overview</p>
            <h2 id="overview-heading" className="text-3xl font-bold sm:text-4xl">
              What is {service.title}?
            </h2>
            {service.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="mt-4 text-lg text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <SmartImage
              src={service.image}
              alt={`${service.title} services by DnyanYoga, Pune`}
              icon={service.icon}
              sizes="(min-width: 1024px) 600px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ===== What's included (feature cards) ===== */}
      <section className="section bg-gray-50" aria-labelledby="included-heading">
        <div className="container-page">
          <SectionHeading id="included-heading" eyebrow="What's included" title={`Our ${service.title} service includes`} />
          {/* 1 column on phones → 2 on tablets → 4 on desktop */}
          <Reveal>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.features.map((feature) => (
                <li key={feature.title} className="card flex h-full flex-col items-center p-6 text-center">
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-50 text-saffron-600">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== Our process for this service (shared by the category) ===== */}
      <ProcessSteps steps={category.process} title={`Our ${service.title} process`} />

      {/* ===== Benefits ===== */}
      <section className="section bg-navy-700" aria-labelledby="benefits-heading">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow !text-saffron-300">Benefits</p>
            <h2 id="benefits-heading" className="text-3xl font-bold !text-white sm:text-4xl">
              How {service.title} helps your business
            </h2>
            <div className="mt-8">
              <LetsTalkButton label="Talk to an expert" service={service.title} />
            </div>
          </div>
          {/* 1 column on phones → 2 columns from 640px */}
          <ul className="grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 rounded-2xl bg-white/5 p-5 text-white">
                <CircleCheck className="mt-0.5 h-6 w-6 shrink-0 text-leaf-400" aria-hidden="true" />
                <span className="font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Related services (internal links help SEO and visitors) ===== */}
      {relatedServices.length > 0 && (
        <section className="section" aria-labelledby="related-heading">
          <div className="container-page">
            <SectionHeading id="related-heading" eyebrow="Explore more" title="Related services" />
            <div className="grid gap-6 md:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceCard key={related.slug} service={related} href={serviceUrl(related)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      <FaqSection faqs={service.faqs} title={`${service.title} FAQs`} className="bg-gray-50" />

      {/* ===== CTA + enquiry form (service pre-selected) ===== */}
      <EnquirySection
        formType="service"
        content={ctaBand}
        serviceOptions={getServiceOptions()}
        contact={{ phone: site.phone, phoneDisplay: site.phoneDisplay, whatsapp: site.whatsapp }}
        defaultService={service.title}
      />
    </>
  );
}
