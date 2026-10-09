/**
 * App.jsx
 * The frame around every page plus the list of routes (which URL shows which page).
 * Frame: site-wide JSON-LD, skip link, header, footer, floating Call/WhatsApp buttons
 * and the "Let's Talk" pop-up.
 * Used by: src/main.jsx (in the browser) and src/entry-server.jsx (pre-rendering).
 * Data comes from: /src/data/db.js (site details, service list for the enquiry form).
 *
 * ROUTE ORDER: React Router picks the most specific match, so fixed pages such as
 * /about win over the "/:category" pattern. Category/service pages check their slugs
 * against /src/data/services.js and show the 404 page for anything unknown.
 */
import { Route, Routes } from "react-router";
import { getServiceOptions, site } from "@/data/db";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import JsonLd from "@/components/ui/JsonLd";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import EnquiryModalProvider from "@/components/forms/EnquiryModalProvider";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import CategoryPage from "@/pages/CategoryPage";
import ServicePage from "@/pages/ServicePage";
import AboutPage from "@/pages/AboutPage";
import IndustriesPage from "@/pages/IndustriesPage";
import FaqPage from "@/pages/FaqPage";
import ContactPage from "@/pages/ContactPage";
import CareersPage from "@/pages/CareersPage";
import InternshipPage from "@/pages/InternshipPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CaseStudiesPage from "@/pages/CaseStudiesPage";
import CaseStudyPage from "@/pages/CaseStudyPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsPage from "@/pages/TermsPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    // pb-14 on phones = space for the fixed Call/WhatsApp bar (removed from 768px)
    <div className="pb-14 md:pb-0">
      {/* Site-wide structured data: who the business is + the website itself */}
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <ScrollToTop />

      <EnquiryModalProvider serviceOptions={getServiceOptions()} whatsapp={site.whatsapp}>
        {/* Skip link: lets keyboard users jump past the menu straight to the content.
            Hidden until it receives keyboard focus. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-navy-700 focus:shadow-card-hover"
        >
          Skip to main content
        </a>

        <Header />
        {/* tabIndex -1 lets the skip link move keyboard focus here */}
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* The next pages show the 404 page by themselves while their data is empty */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/internship" element={<InternshipPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            {/* /brand, /digital-marketing, ... and /digital-marketing/seo, ... */}
            <Route path="/:category" element={<CategoryPage />} />
            <Route path="/:category/:service" element={<ServicePage />} />
            {/* Anything else */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingContact phone={site.phone} phoneDisplay={site.phoneDisplay} whatsapp={site.whatsapp} />
      </EnquiryModalProvider>
    </div>
  );
}
