/**
 * OpeningsList.jsx
 * Shows open roles (title, location, type, experience, description, responsibilities,
 * requirements) and the application form.
 * Used on: /careers (jobs) and /internship (internships).
 * Data comes from: /src/data/careers.js (passed in as props).
 */
import { Briefcase, Clock, MapPin } from "lucide-react";
import ApplicationForm from "@/components/forms/ApplicationForm";

/**
 * @param {Object} props
 * @param {Array} props.openings      Openings of one type (jobs or internships)
 * @param {"careers"|"internship"} props.formType
 * @param {string} props.whatsapp
 */
export default function OpeningsList({ openings, formType, whatsapp }) {
  return (
    <>
      <section className="section" aria-labelledby="openings-heading">
        <div className="container-page max-w-5xl">
          <h2 id="openings-heading" className="mb-8 text-3xl font-bold">
            {formType === "internship" ? "Open internships" : "Open positions"}
          </h2>
          <ul className="space-y-6">
            {openings.map((opening) => (
              <li key={opening.slug}>
                <details className="card group p-6 sm:p-8">
                  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-xl font-semibold">{opening.title}</h3>
                    {/* Details wrap onto new lines on small phones */}
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" /> {opening.location}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" aria-hidden="true" /> {opening.employmentType}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" aria-hidden="true" /> {opening.experience}
                      </li>
                    </ul>
                    <p className="mt-3 text-gray-700">{opening.description}</p>
                    <span className="mt-4 inline-block font-semibold text-saffron-600 group-open:hidden">View details</span>
                  </summary>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-navy-700">Responsibilities</h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                        {opening.responsibilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-700">Requirements</h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700">
                        {opening.requirements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a href="#apply" className="btn-primary mt-6">
                    Apply now
                  </a>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apply" className="section scroll-mt-20 bg-gray-50" aria-labelledby="apply-heading">
        <div className="container-page max-w-3xl">
          <h2 id="apply-heading" className="mb-6 text-3xl font-bold">
            Apply now
          </h2>
          <div className="card p-5 sm:p-8">
            <ApplicationForm formType={formType} roles={openings.map((opening) => opening.title)} whatsapp={whatsapp} />
          </div>
        </div>
      </section>
    </>
  );
}
