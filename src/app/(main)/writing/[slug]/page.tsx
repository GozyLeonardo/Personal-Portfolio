import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { PluggableList } from "unified";
import {
  getAllPosts,
  getPost,
  getSeries,
  getPostsInSeries,
  getRelatedPosts,
} from "@/lib/keystatic";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { mdxComponents } from "@/components/mdx";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverImage
      ? { images: [{ url: post.coverImage }] }
      : undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [seriesData, seriesPosts, related] = await Promise.all([
    post.series ? getSeries(post.series) : Promise.resolve(null),
    post.series ? getPostsInSeries(post.series) : Promise.resolve([]),
    getRelatedPosts(post, 3),
  ]);

  const publishedSeriesPosts = seriesPosts.filter(
    (p) => p.status === "published",
  );
  const seriesIndex = publishedSeriesPosts.findIndex((p) => p.slug === slug);
  const prevPost = seriesIndex > 0 ? publishedSeriesPosts[seriesIndex - 1] : null;
  const nextPost =
    seriesIndex < publishedSeriesPosts.length - 1
      ? publishedSeriesPosts[seriesIndex + 1]
      : null;

  const rehypePlugins: PluggableList = [
    [rehypePrettyCode, { theme: "github-dark" }],
  ];

  return (
    <article className="pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>{seriesData ? seriesData.title : "Writing"}</TerminalLabel>

        {post.coverImage && (
          <div className="relative w-full aspect-video rounded overflow-hidden mt-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <h1 className="mt-8 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)] leading-tight">
          {post.title}
        </h1>

        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-mute)] flex items-center gap-3">
          <NsibidiGlyph variant="cross" size={12} animate />
          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          <span aria-hidden>·</span>
          <span>{post.readTime} min read</span>
        </p>

        {seriesData && publishedSeriesPosts.length > 0 && (
          <nav
            aria-label="Series navigation"
            className="mt-10 flex items-center justify-between gap-4 rounded border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-5 py-4"
          >
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-mute)] truncate">
                {seriesData.title}
              </p>
              <p className="font-mono text-xs text-[color:var(--color-solar-gold)] mt-0.5">
                {seriesIndex + 1} of {publishedSeriesPosts.length}
              </p>
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              {prevPost ? (
                <Link
                  href={`/writing/${prevPost.slug}`}
                  className="font-mono text-xs text-[color:var(--color-mute)] hover:text-[color:var(--color-warm-off-white)] transition-colors"
                >
                  ← Prev
                </Link>
              ) : (
                <span className="font-mono text-xs text-[color:var(--color-line)]">
                  ← Prev
                </span>
              )}
              <Link
                href={`/writing/series/${seriesData.slug}`}
                className="font-mono text-xs text-[color:var(--color-mute)] hover:text-[color:var(--color-solar-gold)] transition-colors"
              >
                Series
              </Link>
              {nextPost ? (
                <Link
                  href={`/writing/${nextPost.slug}`}
                  className="font-mono text-xs text-[color:var(--color-mute)] hover:text-[color:var(--color-warm-off-white)] transition-colors"
                >
                  Next →
                </Link>
              ) : (
                <span className="font-mono text-xs text-[color:var(--color-line)]">
                  Next →
                </span>
              )}
            </div>
          </nav>
        )}

        <div className="mt-12 prose-content">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { rehypePlugins } }}
            components={mdxComponents}
          />
        </div>

        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[color:var(--color-line)]">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-mute)] mb-8">
              Continue reading
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/writing/${r.slug}`}
                  className="group rounded border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-5 hover:border-[color:var(--color-solar-gold)] transition-colors duration-200"
                >
                  <p className="font-mono text-xs text-[color:var(--color-mute)] mb-2">
                    {new Date(r.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="font-display text-base text-[color:var(--color-warm-off-white)] group-hover:text-[color:var(--color-solar-gold)] transition-colors duration-200 line-clamp-2">
                    {r.title}
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--color-mute)] line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
