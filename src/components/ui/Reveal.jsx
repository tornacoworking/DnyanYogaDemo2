/**
 * Reveal.jsx
 * Gently fades and slides content up the first time it scrolls into view (Framer Motion).
 * Used on: homepage and inner pages, around sections BELOW the first screen.
 *
 * WHY only below the fold: content at the top must appear instantly, otherwise the
 * Largest Contentful Paint (LCP) score gets worse.
 * Accessibility: visitors who turned on "reduce motion" get the content with no animation.
 */
import { motion, useReducedMotion } from "framer-motion";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay=0] Seconds to wait before animating (for staggered items)
 */
export default function Reveal({ children, delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      // once: animate only the first time; amount: start when 15% is visible
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
