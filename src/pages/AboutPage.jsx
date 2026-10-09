/**
 * AboutPage.jsx (route: /about)
 * About the agency: story, mission & vision, values, Pune office, counters (when stats exist)
 * and team (when team data exists).
 * Data comes from: /src/data/pages.js (about), /src/data/home.js (aboutSnippet), /src/data/stats.js,
 * /src/data/team.js, /src/data/site.js.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO on this page:
 *  - Story image is "#" (uses aboutSnippet.image in /src/data/home.js).
 *  - Counters hidden until real numbers are added to /src/data/stats.js.
 *  - Team section hidden until /src/data/team.js has members.
 *  - Founded year not shown until about.foundedYear is set in /src/data/pages.js.
 *  - Office PIN code not shown until site.address.postalCode is set in /src/data/site.js.
 * ---------------------------------------------------------------------------
 */
import { Eye, MapPin, Target } from "lucide-react";
import { about, aboutSnippet, hasData, pageSeo, site, stats, team } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import LetsTalkButton from "@/components/forms/LetsTalkButton";
import Counter from "@/components/home/Counter";
import Seo from "@/components/ui/Seo";

export default function AboutPage() {
  const officeAddress = [site.address.street, site.address.city, site.address.region, site.address.postalCode]
    .filter(Boolean)
    .join(", ");

  const meta = buildMetadata({ ...pageSeo.about, path: "/about" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="About us"
        title={about.heading}
        intro={about.intro}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
      />

      {/* ===== Our story ===== */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Our story{about.foundedYear ? ` · Since ${about.foundedYear}` : ""}</p>
            <h2 id="story-heading" className="text-3xl font-bold sm:text-4xl">
              From darkness to light
            </h2>
            {about.story.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="mt-4 text-lg text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <SmartImage src={aboutSnippet.image} alt={aboutSnippet.imageAlt} icon="Users" sizes="(min-width: 1024px) 600px, 100vw" />
          </div>
        </div>

        {/* Counters only when real stats exist */}
        {hasData.stats && (
          <div className="container-page mt-14">
            <dl className="grid grid-cols-2 gap-4 rounded-3xl bg-navy-700 p-6 text-center sm:p-10 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1 py-2">
                  <dt className="text-sm text-navy-100 sm:text-base">{stat.label}</dt>
                  <dd className="font-heading text-3xl font-bold text-white sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      {/* ===== Mission & vision ===== */}
      <section className="section bg-gray-50" aria-label="Mission and vision">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col items-center p-6 text-center sm:p-8">
            <Target className="h-10 w-10 text-saffron-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Our mission</h2>
            <p className="mt-3 text-lg text-gray-600">{about.mission}</p>
          </div>
          <div className="card flex flex-col items-center p-6 text-center sm:p-8">
            <Eye className="h-10 w-10 text-saffron-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Our vision</h2>
            <p className="mt-3 text-lg text-gray-600">{about.vision}</p>
          </div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="section" aria-labelledby="values-heading">
        <div className="container-page">
          <SectionHeading id="values-heading" eyebrow="What we believe" title="Our values" />
          {/* 1 column on phones → 2 on tablets → 4 on desktop */}
          <Reveal>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((value) => (
                <li key={value.title} className="card flex h-full flex-col items-center p-6 text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700">
                    <Icon name={value.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-gray-600">{value.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== Team (only when team members are added) ===== */}
      {hasData.team && (
        <section className="section bg-gray-50" aria-labelledby="team-heading">
          <div className="container-page">
            <SectionHeading id="team-heading" eyebrow="Our people" title="Meet the team" />
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <li key={member.name} className="card overflow-hidden">
                  <div className="relative aspect-square">
                    <SmartImage src={member.photo} alt={member.name} icon="Users" sizes="(min-width: 1024px) 300px, 50vw" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-navy-700 underline">
                        LinkedIn<span className="sr-only"> profile of {member.name}</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== Pune office ===== */}
      <section className="section bg-navy-700" aria-labelledby="office-heading">
        <div className="container-page flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <MapPin className="h-10 w-10 shrink-0 text-saffron-300" aria-hidden="true" />
            <div>
              <h2 id="office-heading" className="text-2xl font-bold !text-white sm:text-3xl">
                Our office in Pune
              </h2>
              <p className="mt-2 text-lg text-navy-100">
                {officeAddress}, {site.address.countryName}
              </p>
            </div>
          </div>
          <LetsTalkButton label="Let's work together" />
        </div>
      </section>
    </>
  );
}
