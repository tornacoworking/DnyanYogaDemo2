/**
 * SectionHeading.jsx
 * The small label + heading + intro text used at the top of most sections.
 * Used on: almost every section of every page.
 */

/**
 * @param {Object} props
 * @param {string} [props.eyebrow]   Small orange label above the heading
 * @param {string} props.title       The heading text
 * @param {string} [props.intro]     Optional paragraph under the heading
 * @param {"h1"|"h2"|"h3"} [props.as="h2"] Heading level. Each page has exactly ONE h1 (SEO rule),
 *                                    so sections use h2 by default.
 * @param {"center"|"left"} [props.align="center"]
 * @param {boolean} [props.light=false] true when placed on a dark background
 * @param {string} [props.id]        id for the heading, used by aria-labelledby on the section
 */
export default function SectionHeading({ eyebrow, title, intro, as: Heading = "h2", align = "center", light = false, id }) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`mb-10 max-w-3xl lg:mb-14 ${alignment}`}>
      {eyebrow && <p className={`eyebrow ${light ? "!text-saffron-300" : ""}`}>{eyebrow}</p>}
      {/* Heading size grows from phone → desktop */}
      <Heading id={id} className={`text-3xl font-bold sm:text-4xl ${light ? "!text-white" : ""}`}>
        {title}
      </Heading>
      {intro && <p className={`mt-4 text-lg ${light ? "text-navy-100" : "text-gray-600"}`}>{intro}</p>}
    </div>
  );
}
