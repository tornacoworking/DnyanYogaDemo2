/**
 * SmartImage.jsx
 * Shows an image, OR a plain branded placeholder when the image is missing or fails to load.
 * Used on: hero slider, service/category pages, case study and blog cards, About page, etc.
 *
 * HOW THE FALLBACK WORKS: when src is "#" (or empty), or the file cannot be loaded (broken
 * link, offline), this component shows a flat light-navy block with an icon instead of a
 * broken-image symbol. No gradients are used. When you point src at a real file such as
 * "/images/services/seo.webp" (file inside /public/images/services/), the photo appears.
 *
 * SPEED TIPS (there is no automatic image optimiser in a Vite site, so do this yourself):
 *  - Save photos as WebP, about 1600px wide for full-width images and 1000px for cards.
 *  - Keep each file under ~200 KB (squoosh.app is a free tool for this).
 *
 * The parent element must be "relative" and have a size (e.g. aspect-video), because the
 * image is stretched to cover that box.
 */
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

/**
 * @param {Object} props
 * @param {string} [props.src]        Image path, or "#" / empty for the placeholder
 * @param {string} props.alt          Description of the image for screen readers and Google.
 *                                    Use "" only for purely decorative images.
 * @param {string} [props.sizes]      Display width hint for the browser, e.g. "(min-width: 1024px) 33vw, 100vw"
 * @param {boolean} [props.priority]  true only for the main image at the top of a page: it loads
 *                                    immediately with high priority (improves LCP). Others load lazily.
 * @param {string|null} [props.icon]  Icon name for the placeholder (default "Sparkles"); null = plain block only
 * @param {string} [props.className]  Extra classes for the image
 */
export default function SmartImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  icon = "Sparkles",
  className = "",
}) {
  const [failed, setFailed] = useState(false);
  const imageRef = useRef(null);
  const hasImage = Boolean(src) && src !== "#" && !failed;

  // A pre-rendered image can fail before React attaches onError, so check once after hydration.
  useEffect(() => {
    const image = imageRef.current;
    if (image && image.complete && image.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (!hasImage) {
    return (
      // Plain fallback. aria-hidden because it carries no information.
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center bg-navy-100 ${className}`}
      >
        {icon && <Icon name={icon} className="h-1/4 max-h-16 w-1/4 max-w-16 text-navy-600/70" strokeWidth={1.25} />}
      </div>
    );
  }

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      sizes={sizes}
      // Lazy loading: images below the first screen only download when scrolled near.
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
