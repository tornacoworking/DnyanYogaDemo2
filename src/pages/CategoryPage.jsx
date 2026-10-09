/**
 * CategoryPage.jsx (route: /:category)
 * One page for each service category: /brand, /digital-marketing, /technology,
 * /design-media, /ecommerce, /video-photography.
 * Sections: hero → intro + image → all services in the category → process →
 *           FAQs (one from each service) → CTA + enquiry form.
 * Data comes from: /src/data/services.js (through /src/data/db.js).
 *
 * HOW THE PAGES ARE CREATED: the category slug comes from the URL (useParams). Unknown
 * slugs show the 404 page. scripts/prerender.js builds a static HTML file for every
 * category at build time (fast + great for SEO).
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO on this page:
 *  - Category images are "#" (branded graphic shown). Add them in /src/data/services.js → categories[].image.
 * ---------------------------------------------------------------------------
 */
import {
  ctaBand,
  getCategory,
  getServiceOptions,
  getServicesByCategory,
  serviceUrl,
  site,
} from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/Cards";
import LetsTalkButton from "@/components/forms/LetsTalkButton";
import { ProcessSteps } from "@/components/home/HomeSections";
import FaqSection from "@/components/sections/FaqSection";
import EnquirySection from "@/components/sections/EnquirySection";
import { useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
import Seo from "@/components/ui/Seo";

export default function CategoryPage() {
  const { category: slug } = useParams();
  const category = getCategory(slug);
  if (!category) return <NotFoundPage />;

  const categoryServices = getServicesByCategory(category.slug);
  // One FAQ from each service gives a useful mix of questions for the whole category.
  const categoryFaqs = categoryServices.map((service) => service.faqs[0]).filter(Boolean).slice(0, 8);

  const meta = buildMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/${category.slug}`,
    image: category.image,
  });

  return (
    <>
      <Seo meta={meta} />
      {/* ===== Hero ===== */}
      <PageHero
        eyebrow="Our services"
        title={category.title}
        intro={category.tagline}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: category.title, path: `/${category.slug}` },
        ]}
        actions={
          <>
            <LetsTalkButton label="Get a Free Consultation" />
            <a href="#services-list" className="btn-light">
              View services
            </a>
          </>
        }
      />

      {/* ===== Intro + image ===== */}
      <section className="section" aria-labelledby="intro-heading">
        {/* Stacked on phones → side by side from 1024px */}
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="intro-heading" className="text-3xl font-bold sm:text-4xl">
              {category.title} in Pune, for businesses everywhere
            </h2>
            {category.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="mt-4 text-lg text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <SmartImage
              src={category.image}
              alt={`${category.title} by DnyanYoga`}
              icon={category.icon}
              sizes="(min-width: 1024px) 600px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ===== All services in this category ===== */}
      <section id="services-list" className="section scroll-mt-20 bg-gray-50" aria-labelledby="list-heading">
        <div className="container-page">
          <SectionHeading
            id="list-heading"
            eyebrow={category.menuTitle}
            title={`Our ${category.title.replace(" Solutions", "")} services`}
          />
          {/* 1 column on phones → 2 on tablets → 3 on desktop */}
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryServices.map((service) => (
                <ServiceCard key={service.slug} service={service} href={serviceUrl(service)} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Process for this category ===== */}
      <ProcessSteps steps={category.process} title={`How we deliver ${category.menuTitle.toLowerCase()} projects`} />

      {/* ===== FAQs ===== */}
      <FaqSection faqs={categoryFaqs} className="bg-gray-50" />

      {/* ===== CTA + form ===== */}
      <EnquirySection
        formType="service"
        content={ctaBand}
        serviceOptions={getServiceOptions()}
        contact={{ phone: site.phone, phoneDisplay: site.phoneDisplay, whatsapp: site.whatsapp }}
      />
    </>
  );
}
