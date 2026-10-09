/**
 * TestimonialsCarousel.jsx
 * A horizontal, swipeable row of cards with Previous/Next buttons.
 * Used on: Testimonials.jsx.
 *
 * HOW IT WORKS: the row is a normal scrollable list with CSS "scroll snap", so swiping
 * works natively on phones with no JavaScript. The buttons just scroll the row by one card.
 * Card widths: 1 per view on phones (85% so the next card peeks in), 2 on tablets, 3 on desktop.
 */
import { Children, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children The cards (rendered on the server)
 */
export default function TestimonialsCarousel({ children }) {
  const trackRef = useRef(null);

  /**
   * Scrolls the row by about one card.
   * @param {1|-1} direction 1 = next, -1 = previous
   */
  function scrollByCard(direction) {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild;
    const step = firstCard ? firstCard.getBoundingClientRect().width + 24 : track.clientWidth;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div>
      <ul
        ref={trackRef}
        // tabIndex 0 lets keyboard users scroll the row with arrow keys
        tabIndex={0}
        aria-label="Client testimonials"
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6"
      >
        {Children.map(children, (child) => (
          <li className="w-[85%] shrink-0 snap-start md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">{child}</li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous testimonials"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next testimonials"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
