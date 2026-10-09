/**
 * TestimonialsPage.jsx (route: /testimonials)
 * All written testimonials and YouTube video testimonials.
 * Data comes from: /src/data/testimonials.js and /src/data/stats.js (googleRating).
 *
 * EMPTY DATA RULE: while there are no testimonials, this page shows the 404 page and its links
 * are removed from the menu, footer and sitemap.
 *
 * Video testimonials use a "click to load" thumbnail (YouTubeEmbed): the heavy YouTube
 * player only loads after a click, which keeps the page fast.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: add real testimonials in /src/data/testimonials.js to show this page.
 * ---------------------------------------------------------------------------
 */
import { googleRating, hasData, pageSeo, testimonials } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stars, TestimonialCard } from "@/components/sections/Testimonials";
import YouTubeEmbed from "@/components/ui/YouTubeEmbed";
import NotFoundPage from "./NotFoundPage";
import Seo from "@/components/ui/Seo";

export default function TestimonialsPage() {
  if (!hasData.testimonials) return <NotFoundPage />;
  const written = testimonials.filter((testimonial) => testimonial.quote);
  const videos = testimonials.filter((testimonial) => testimonial.youtubeId);

  const meta = buildMetadata({ ...pageSeo.testimonials, path: "/testimonials" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="Testimonials"
        title="What our clients say"
        intro="Real words from the businesses we work with."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ]}
      />

      {googleRating && (
        <div className="container-page mt-10 flex justify-center">
          <a
            href={googleRating.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-card"
          >
            <span className="font-heading text-2xl font-bold text-navy-700">{googleRating.rating}</span>
            <Stars rating={googleRating.rating} />
            <span className="text-sm text-gray-600">{googleRating.reviewCount} Google reviews</span>
          </a>
        </div>
      )}

      {videos.length > 0 && (
        <section className="section" aria-labelledby="video-heading">
          <div className="container-page">
            <SectionHeading id="video-heading" eyebrow="Video" title="Video testimonials" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <YouTubeEmbed key={video.youtubeId} videoId={video.youtubeId} title={`Testimonial from ${video.name}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {written.length > 0 && (
        <section className="section bg-gray-50" aria-labelledby="written-heading">
          <div className="container-page">
            <SectionHeading id="written-heading" eyebrow="Reviews" title="Client reviews" />
            {/* Masonry-like columns: 1 on phones → 2 on tablets → 3 on desktop */}
            <div className="gap-6 space-y-6 md:columns-2 lg:columns-3">
              {written.map((testimonial) => (
                <div key={testimonial.name + testimonial.quote.slice(0, 20)} className="break-inside-avoid">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
