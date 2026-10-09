/**
 * HeroSlider.jsx
 * Full-width hero slider at the top of the homepage: 3 slides, each with a label,
 * bold headline, one-line text and one button.
 * Used on: Home page (section 1).
 * Data comes from: /src/data/home.js → heroSlides (passed in as props by src/pages/HomePage.jsx).
 *
 * Features:
 *  - Auto-plays every 6 seconds, with a Pause/Play button (WCAG: moving content must be pausable).
 *  - Auto-play is OFF for visitors who set "reduce motion" on their device.
 *  - Swipe left/right on touch screens; arrow keys when the slider has focus.
 *  - Only the FIRST slide's headline is an <h1> (one H1 per page for SEO).
 *
 * The slide backgrounds (SmartImage) are created by HomePage and passed in as
 * `backgrounds`, so this component only deals with the slider behaviour.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD_PX = 50;

/**
 * @param {Object} props
 * @param {Array<{eyebrow:string, headline:string, subtext:string, ctaLabel:string, ctaHref:string}>} props.slides
 * @param {React.ReactNode[]} props.backgrounds One background element per slide (rendered on the server)
 */
export default function HeroSlider({ slides, backgrounds }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef(null);
  const slideCount = slides.length;

  /** Moves to a slide; wraps around at the ends. */
  const goTo = useCallback((index) => setActiveIndex((index + slideCount) % slideCount), [slideCount]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Respect the device's "reduce motion" setting: start paused.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setIsPlaying(false);
  }, []);

  // Auto-play timer. Restarts every time the slide changes, so a manual change
  // always gets a full 6 seconds.
  useEffect(() => {
    if (!isPlaying || slideCount < 2) return;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [isPlaying, next, slideCount, activeIndex]);

  /** Swipe support: remember where the finger started... */
  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }
  /** ...and on release, move if the finger travelled far enough sideways. */
  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > SWIPE_THRESHOLD_PX) (distance < 0 ? next : previous)();
    touchStartX.current = null;
  }

  /** Left/right arrow keys change slides when focus is inside the slider. */
  function handleKeyDown(event) {
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") previous();
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      className="relative overflow-hidden bg-navy-700"
    >
      {/* Height: tall enough for the text on phones, a bit taller on desktop */}
      <div className="relative min-h-[540px] sm:min-h-[560px] lg:min-h-[620px]">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          // Slide 1 is the page's H1; the others are paragraphs styled the same way.
          const Headline = index === 0 ? "h1" : "p";
          return (
            <div
              key={slide.headline}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slideCount}`}
              aria-hidden={!isActive}
              // "inert" stops keyboard focus reaching buttons on hidden slides.
              inert={!isActive ? true : undefined}
              className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {/* Background image + flat dark navy overlay so white text stays readable (no gradient) */}
              {backgrounds[index]}
              <div aria-hidden="true" className="absolute inset-0 bg-navy-900/75" />
              {/* Decorative lotus-coloured glow */}
              <div aria-hidden="true" className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-saffron-500/25 blur-3xl" />

              <div className="container-page relative flex h-full flex-col justify-center pb-24 pt-16">
                <p className="eyebrow !text-saffron-300">{slide.eyebrow}</p>
                {/* Text size grows with the screen: 36px phones → 48px tablets → 60px desktops */}
                <Headline className="max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {slide.headline}
                </Headline>
                <p className="mt-5 max-w-xl text-lg text-navy-100 sm:text-xl">{slide.subtext}</p>
                <div className="mt-8">
                  {/* Internal pages use <Link> (instant navigation); "#enquire" stays a plain link
                      so EnquiryModalProvider can open the pop-up. */}
                  {slide.ctaHref.startsWith("/") ? (
                    <Link to={slide.ctaHref} className="btn-primary w-full sm:w-auto">
                      {slide.ctaLabel}
                    </Link>
                  ) : (
                    <a href={slide.ctaHref} className="btn-primary w-full sm:w-auto">
                      {slide.ctaLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Controls: dots, previous/next, pause/play ===== */}
      {slideCount > 1 && (
        <div className="container-page absolute inset-x-0 bottom-6 flex items-center justify-between gap-4">
          <div className="flex items-center">
            {slides.map((slide, index) => (
              // Each dot is a 44×44 tap area with a small visible dot inside.
              <button
                key={slide.headline}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-saffron-500" : "w-2.5 bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying((playing) => !playing)}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
            >
              {isPlaying ? <Pause className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
            </button>
            {/* Arrow buttons are hidden on phones, where swiping is more natural */}
            <button
              type="button"
              onClick={previous}
              aria-label="Previous slide"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10 sm:flex"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10 sm:flex"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
