/**
 * FaqPage.jsx (route: /faq)
 * All general FAQs, grouped (Working with us, Pricing, Results), plus FAQPage JSON-LD.
 * Data comes from: /src/data/faqs.js.
 */
import { faqGroups, getAllFaqs, pageSeo } from "@/data/db";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import LetsTalkButton from "@/components/forms/LetsTalkButton";
import { FaqList } from "@/components/sections/FaqSection";
import Seo from "@/components/ui/Seo";

export default function FaqPage() {
  const meta = buildMetadata({ ...pageSeo.faq, path: "/faq" });

  return (
    <>
      <Seo meta={meta} />
      {/* One FAQPage schema covering every question on the page */}
      <JsonLd data={faqJsonLd(getAllFaqs())} />

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="Quick answers about how we work, pricing and results. Can't find your question? Just ask."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />

      <section className="section" aria-label="Questions and answers">
        <div className="container-page max-w-4xl space-y-12">
          {faqGroups.map((group) => (
            <div key={group.group}>
              <h2 className="mb-5 text-2xl font-bold">{group.group}</h2>
              <FaqList faqs={group.items} />
            </div>
          ))}

          <div className="rounded-2xl bg-navy-50 p-6 text-center sm:p-8">
            <h2 className="text-2xl font-bold">Still have a question?</h2>
            <p className="mt-2 text-gray-700">Talk to us. We usually reply within one working day.</p>
            <div className="mt-5">
              <LetsTalkButton label="Ask us anything" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
