/**
 * HomePage.jsx (route: /)
 * Builds the homepage from the sections in the order given in the brief:
 *  1 Hero slider → 2 Client logos → 3 About + counters → 4 Service categories →
 *  5 Process → 6 Why choose us → 7 Case studies → 8 Industries → 9 Testimonials →
 *  10 Blog → 11 FAQ → 12 CTA + enquiry form. (13 Footer comes from src/App.jsx.)
 * Data comes from: /src/data/db.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO on this page:
 *  - Hero and About images are Unsplash stock photos (/public/images). Swap in your own office/team
 *    photos in /src/data/home.js (heroSlides[].image, aboutSnippet.image).
 *  - Client logos (section 2) hidden: /src/data/clients.js is empty.
 *  - Counters (section 3) hidden: /src/data/stats.js is empty. Add real numbers.
 *  - Case studies (section 7) hidden: /src/data/caseStudies.js is empty.
 *  - Testimonials + Google rating (section 9) hidden: /src/data/testimonials.js and googleRating are empty.
 *  - Blog (section 10) hidden: /src/data/blog.js is empty.
 * ---------------------------------------------------------------------------
 */
import {
  aboutSnippet,
  blogPosts,
  caseStudies,
  categories,
  clients,
  ctaBand,
  getAllFaqs,
  getServiceOptions,
  getServicesByCategory,
  googleRating,
  heroSlides,
  industries,
  pageSeo,
  processSteps,
  site,
  stats,
  testimonials,
  whyChooseUs,
} from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import HeroSlider from "@/components/home/HeroSlider";
import {
  AboutStats,
  CategoryGrid,
  ClientLogos,
  FeaturedCaseStudies,
  IndustriesGrid,
  LatestPosts,
  ProcessSteps,
  WhyChooseUs,
} from "@/components/home/HomeSections";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import EnquirySection from "@/components/sections/EnquirySection";
import Seo from "@/components/ui/Seo";

export default function HomePage() {
  // Slide backgrounds are created here and handed to the slider.
  // Only the first slide is "priority" (loaded first), because it is what people see first.
  const heroBackgrounds = heroSlides.map((slide, index) => (
    <SmartImage
      key={slide.headline}
      src={slide.image}
      alt={slide.imageAlt}
      priority={index === 0}
      icon={null} // no icon on the hero placeholder: it would sit behind the headline
      sizes="100vw"
    />
  ));

  // How many services each category has, shown on the category cards.
  const serviceCounts = Object.fromEntries(
    categories.map((category) => [category.slug, getServicesByCategory(category.slug).length])
  );

  const meta = buildMetadata({ ...pageSeo.home, path: "/" });

  return (
    <>
      <Seo meta={meta} />
      {/* ===== 1. Hero slider (not wrapped in Reveal: it must show instantly for LCP) ===== */}
      <HeroSlider
        slides={heroSlides.map(({ eyebrow, headline, subtext, ctaLabel, ctaHref }) => ({
          eyebrow,
          headline,
          subtext,
          ctaLabel,
          ctaHref,
        }))}
        backgrounds={heroBackgrounds}
      />

      {/* ===== 2. Client logo strip (hidden while there are no clients) ===== */}
      <ClientLogos clients={clients} />

      {/* ===== 3. About + counters ===== */}
      <Reveal>
        <AboutStats about={aboutSnippet} stats={stats} />
      </Reveal>

      {/* ===== 4. Service categories ===== */}
      <Reveal>
        <CategoryGrid categories={categories} serviceCounts={serviceCounts} />
      </Reveal>

      {/* ===== 5. Our Proven Process ===== */}
      <Reveal>
        <ProcessSteps steps={processSteps} />
      </Reveal>

      {/* ===== 6. Why Choose Us ===== */}
      <WhyChooseUs items={whyChooseUs} />

      {/* ===== 7. Featured case studies (hidden while empty) ===== */}
      <FeaturedCaseStudies studies={caseStudies} />

      {/* ===== 8. Industries ===== */}
      <Reveal>
        <IndustriesGrid industries={industries} />
      </Reveal>

      {/* ===== 9. Testimonials + Google rating (hidden while empty) ===== */}
      <Testimonials testimonials={testimonials} googleRating={googleRating} />

      {/* ===== 10. Latest blog posts (hidden while empty) ===== */}
      <LatestPosts posts={blogPosts} />

      {/* ===== 11. FAQ (first 6 general questions) ===== */}
      <FaqSection faqs={getAllFaqs().slice(0, 6)} className="bg-gray-50" />

      {/* ===== 12. CTA band + enquiry form ===== */}
      <EnquirySection
        formType="home-cta"
        content={ctaBand}
        serviceOptions={getServiceOptions()}
        contact={{ phone: site.phone, phoneDisplay: site.phoneDisplay, whatsapp: site.whatsapp }}
      />
    </>
  );
}
