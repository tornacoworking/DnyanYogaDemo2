/**
 * Counter.jsx
 * A number that counts up from 0 when it scrolls into view (e.g. "0 → 150+").
 * Used on: AboutStats.jsx (homepage and /about).
 *
 * How: it watches the scroll position (IntersectionObserver) and animates the number.
 * Accessibility: screen readers get the final number straight away (sr-only text),
 * and visitors with "reduce motion" turned on see the final number without animation.
 * SEO: the pre-rendered HTML also contains the final number, so Google sees the real value.
 */
import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;

/**
 * @param {Object} props
 * @param {number} props.value       Final number
 * @param {string} [props.suffix=""] Text after the number, e.g. "+"
 * @param {number} [props.decimals=0] Decimal places, e.g. 1 for 4.9
 */
export default function Counter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  // Start with the final value, so the server HTML (and no-JS visitors) show the real number.
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId;
    // Only start counting once at least 40% of the number is visible on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const startTime = performance.now();

        /** One animation frame: works out how far along we are and updates the number. */
        function tick(now) {
          const progress = Math.min((now - startTime) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out: fast start, gentle finish
          setDisplayValue(value * eased);
          if (progress < 1) frameId = requestAnimationFrame(tick);
        }
        setDisplayValue(0);
        frameId = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  const formatted = displayValue.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const finalText = `${value.toLocaleString("en-IN", { minimumFractionDigits: decimals })}${suffix}`;

  return (
    <span ref={ref}>
      {/* What sighted visitors see (animated) */}
      <span aria-hidden="true">
        {formatted}
        {suffix}
      </span>
      {/* What screen readers read (always the final number) */}
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
