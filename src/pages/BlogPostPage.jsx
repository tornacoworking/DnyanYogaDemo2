/**
 * BlogPostPage.jsx (route: /blog/:slug)
 * A single blog article with BlogPosting + breadcrumb structured data.
 * Data comes from: /src/data/blog.js.
 * With no posts, every /blog/... URL shows the 404 page.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: add posts in /src/data/blog.js; post images are "#" until replaced.
 * ---------------------------------------------------------------------------
 */
import { blogPosts, ctaBand, getServiceOptions, site } from "@/data/db";
import { blogPostingJsonLd, buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import SmartImage from "@/components/ui/SmartImage";
import JsonLd from "@/components/ui/JsonLd";
import EnquirySection from "@/components/sections/EnquirySection";
import { useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";
import Seo from "@/components/ui/Seo";

/**
 * Finds a post by slug.
 * @param {string} slug
 */
function getPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFoundPage />;
  const path = `/blog/${post.slug}`;
  const readableDate = new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const meta = buildMetadata({
    title: `${post.title} | ${site.shortName}`.slice(0, 60),
    description: post.seoDescription,
    path,
    image: post.image,
    type: "article",
  });

  return (
    <>
      <Seo meta={meta} />
      <JsonLd data={blogPostingJsonLd(post, path)} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        intro={`${post.author} · ${readableDate}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]}
      />
      <article className="section">
        <div className="container-page max-w-3xl">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl">
            <SmartImage src={post.image} alt={post.title} icon="FileText" priority sizes="(min-width: 768px) 768px, 100vw" />
          </div>
          <div className="prose-body text-lg">
            {post.content.map((section, index) => (
              <div key={section.heading || index}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </article>
      <EnquirySection
        formType="service"
        content={ctaBand}
        serviceOptions={getServiceOptions()}
        contact={{ phone: site.phone, phoneDisplay: site.phoneDisplay, whatsapp: site.whatsapp }}
      />
    </>
  );
}
