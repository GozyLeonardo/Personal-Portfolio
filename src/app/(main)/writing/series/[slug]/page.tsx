import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllSeries, getSeries, getPostsInSeries } from "@/lib/keystatic";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export async function generateStaticParams() {
  const series = await getAllSeries();
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeries(slug);
  if (!series) return {};
  return {
    title: series.title,
    description: series.description,
    openGraph: series.coverImage
      ? { images: [{ url: series.coverImage }] }
      : undefined,
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [series, posts] = await Promise.all([
    getSeries(slug),
    getPostsInSeries(slug),
  ]);
  if (!series) notFound();

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const firstPublished = posts.find((p) => p.status === "published");

  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Series</TerminalLabel>

        {series.coverImage && (
          <div className="relative w-full aspect-video rounded overflow-hidden mt-8">
            <Image
              src={series.coverImage}
              alt={series.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div className="flex flex-wrap items-start gap-4 mt-8">
          <h1 className="font-display text-4xl md:text-5xl text-[color:var(--color-warm-off-white)]">
            {series.title}
          </h1>
          <span
            className={`mt-1 flex-shrink-0 font-mono text-xs px-2 py-1 rounded border flex items-center gap-1.5 ${
              series.status === "complete"
                ? "border-[color:var(--color-solar-gold)] text-[color:var(--color-solar-gold)]"
                : "border-[color:var(--color-electric-teal)] text-[color:var(--color-electric-teal)]"
            }`}
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                series.status === "complete"
                  ? "bg-[color:var(--color-solar-gold)]"
                  : "bg-[color:var(--color-electric-teal)]"
              }`}
            />
            {series.status}
          </span>
        </div>

        <p className="mt-4 text-lg text-[color:var(--color-mute)]">
          {series.description}
        </p>

        <p className="mt-2 font-mono text-xs text-[color:var(--color-mute)]">
          {publishedCount} of {posts.length} published
        </p>

        {firstPublished && (
          <Link
            href={`/writing/${firstPublished.slug}`}
            className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-[color:var(--color-solar-gold)] hover:text-[color:var(--color-solar-gold-soft)] transition-colors"
          >
            Start reading →
          </Link>
        )}

        <ol className="mt-12">
          {posts.map((post, i) => {
            const isPublished = post.status === "published";
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={post.slug}>
                {isPublished ? (
                  <Link
                    href={`/writing/${post.slug}`}
                    className="group flex gap-6 py-8 border-b border-[color:var(--color-line)] hover:border-[color:var(--color-solar-gold)] transition-colors duration-200"
                  >
                    <span className="font-mono text-2xl text-[color:var(--color-line)] group-hover:text-[color:var(--color-solar-gold)] transition-colors duration-200 tabular-nums w-8 flex-shrink-0 leading-none pt-1">
                      {num}
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-display text-xl text-[color:var(--color-warm-off-white)] group-hover:text-[color:var(--color-solar-gold)] transition-colors duration-200">
                        {post.title}
                      </h2>
                      <p className="mt-1 text-sm text-[color:var(--color-mute)] line-clamp-2">
                        {post.excerpt}
                      </p>
                      <p className="mt-2 font-mono text-xs text-[color:var(--color-mute)]">
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex gap-6 py-8 border-b border-[color:var(--color-line)] opacity-40 pointer-events-none">
                    <span className="font-mono text-2xl text-[color:var(--color-line)] tabular-nums w-8 flex-shrink-0 leading-none pt-1">
                      {num}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xl text-[color:var(--color-mute)]">
                        Coming soon
                      </p>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
