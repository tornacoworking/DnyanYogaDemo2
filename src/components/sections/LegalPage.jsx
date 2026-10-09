/**
 * LegalPage.jsx
 * Shared layout for the Privacy Policy and Terms & Conditions pages:
 * hero, "last updated" date and the text sections.
 * Data comes from: /src/data/pages.js (passed in as props).
 */
import PageHero from "@/components/ui/PageHero";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.path
 * @param {string} props.lastUpdated  "YYYY-MM-DD"
 * @param {Array<{heading:string, paragraphs:string[]}>} props.sections
 */
export default function LegalPage({ title, path, lastUpdated, sections }) {
  const readableDate = new Date(lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <PageHero
        title={title}
        intro={`Last updated: ${readableDate}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <section className="section">
        <div className="container-page prose-body max-w-3xl text-lg">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
