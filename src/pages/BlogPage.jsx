/**
 * BlogPage.jsx (route: /blog)
 * List of all blog posts, newest first.
 * Data comes from: /src/data/blog.js.
 *
 * EMPTY DATA RULE: while there are no posts, this page shows the 404 page and its links are
 * removed from the menu, footer and sitemap.
 *
 * ---------------------------------------------------------------------------
 * UNDONE / TODO: add real posts in /src/data/blog.js to show the blog.
 * ---------------------------------------------------------------------------
 */
import { blogPosts, hasData, pageSeo } from "@/data/db";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import { BlogCard } from "@/components/ui/Cards";
import NotFoundPage from "./NotFoundPage";
import Seo from "@/components/ui/Seo";

export default function BlogPage() {
  if (!hasData.blog) return <NotFoundPage />;
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  const meta = buildMetadata({ ...pageSeo.blog, path: "/blog" });

  return (
    <>
      <Seo meta={meta} />
      <PageHero
        eyebrow="Blog"
        title="Digital marketing insights"
        intro="Practical guides and ideas to help your business grow online."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <section className="section" aria-label="Blog posts">
        {/* 1 column on phones → 2 on tablets → 3 on desktop */}
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
