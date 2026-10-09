/**
 * Testimonials.jsx
 * Testimonials section: a swipeable carousel of written reviews plus the Google rating
 * badge. Hidden completely when there are no testimonials.
 * Used on: Home page (section 9).
 * Data comes from: /src/data/testimonials.js and /src/data/stats.js (googleRating), passed as props.
 *
 * Renders the cards; the scrolling row and its buttons live in TestimonialsCarousel.
 */
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import TestimonialsCarousel from "./TestimonialsCarousel";

/**
 * Star rating shown as text for screen readers and as icons for everyone else.
 * @param {Object} props
 * @param {number} props.rating 1–5
 */
export function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= Math.round(rating) ? "fill-saffron-500 text-saffron-500" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

/**
 * One written testimonial card.
 * @param {Object} props
 * @param {{name:string, role?:string, company?:string, quote:string, rating?:number, photo?:string}} props.testimonial
 */
export function TestimonialCard({ testimonial }) {
  const byline = [testimonial.role, testimonial.company].filter(Boolean).join(", ");
  return (
    <figure className="card flex h-full flex-col items-center p-6 text-center sm:p-8">
      <Quote className="h-8 w-8 text-saffron-500" aria-hidden="true" />
      {testimonial.rating && (
        <div className="mt-4">
          <Stars rating={testimonial.rating} />
        </div>
      )}
      <blockquote className="mt-4 flex-1 text-gray-700">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center justify-center gap-3 text-left">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <SmartImage src={testimonial.photo} alt={testimonial.name} icon="Users" sizes="48px" />
        </span>
        <span>
          <span className="block font-semibold text-navy-700">{testimonial.name}</span>
          {byline && <span className="block text-sm text-gray-600">{byline}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * @param {Object} props
 * @param {Array} props.testimonials
 * @param {{rating:number, reviewCount:number, reviewsUrl:string}|null} props.googleRating
 */
export default function Testimonials({ testimonials, googleRating }) {
  // Only written testimonials go in the carousel (video ones are on /testimonials).
  const written = testimonials.filter((testimonial) => testimonial.quote);
  if (written.length === 0) return null;

  return (
    <section className="section bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="container-page">
        <SectionHeading id="testimonials-heading" eyebrow="Testimonials" title="What our clients say" />

        {googleRating && (
          <a
            href={googleRating.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto -mt-4 mb-10 flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 shadow-card"
          >
            <span className="font-heading text-2xl font-bold text-navy-700">{googleRating.rating}</span>
            <Stars rating={googleRating.rating} />
            <span className="text-sm text-gray-600">{googleRating.reviewCount} Google reviews</span>
          </a>
        )}

        <TestimonialsCarousel>
          {written.map((testimonial) => (
            <TestimonialCard key={testimonial.name + testimonial.quote.slice(0, 20)} testimonial={testimonial} />
          ))}
        </TestimonialsCarousel>
      </div>
    </section>
  );
}
