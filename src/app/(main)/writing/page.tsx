import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllSeries } from "@/lib/keystatic";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and field notes from Lawrence Nwuzor — Lagos, Nigeria.",
};

export default async function WritingPage() {
  const [posts, allSeries] = await Promise.all([getAllPosts(), getAllSeries()]);

  const seriesMap = Object.fromEntries(allSeries.map((s) => [s.slug, s.title]));

  const seriesWithCounts = allSeries.map((s) => ({
    ...s,
    postCount: posts.filter((p) => p.series === s.slug).length,
  }));

  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Writing</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          The line carries.
        </h1>
        <p className="mt-4 text-lg text-[color:var(--color-mute)]">
          Field notes from Lagos. Build dispatches from the front.
        </p>

        {seriesWithCounts.length > 0 && (
          <div className="mt-16">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-mute)] mb-6">
              Series
            </p>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
              {seriesWithCounts.map((s) => (
                <Link
                  key={s.slug}
                  href={`/writing/series/${s.slug}`}
                  className="group flex-shrink-0 snap-start w-56 rounded border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-5 hover:border-[color:var(--color-solar-gold)] transition-colors duration-200"
                >
                  {s.coverImage && (
                    <div className="relative w-full aspect-video rounded overflow-hidden mb-4">
                      <Image
                        src={s.coverImage}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="224px"
                      />
                    </div>
                  )}
                  <p className="font-display text-base text-[color:var(--color-warm-off-white)] group-hover:text-[color:var(--color-solar-gold)] transition-colors duration-200 line-clamp-2">
                    {s.title}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-mono text-xs text-[color:var(--color-mute)]">
                      {s.postCount} {s.postCount === 1 ? "post" : "posts"}
                    </span>
                    <span
                      className={`font-mono text-xs flex items-center gap-1 ${
                        s.status === "complete"
                          ? "text-[color:var(--color-solar-gold)]"
                          : "text-[color:var(--color-electric-teal)]"
                      }`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          s.status === "complete"
                            ? "bg-[color:var(--color-solar-gold)]"
                            : "bg-[color:var(--color-electric-teal)]"
                        }`}
                      />
                      {s.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          {posts.length === 0 ? (
            <p className="text-base text-[color:var(--color-mute)]">
              No posts yet.
            </p>
          ) : (
            posts.map((post, i) => (
              <div key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="block group py-10"
                >
                  {post.coverImage && (
                    <div className="relative w-full aspect-video rounded overflow-hidden mb-6">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] flex items-center gap-2">
                      <NsibidiGlyph variant="cross" size={12} />
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    {post.series && (
                      <span className="font-mono text-xs px-2 py-0.5 rounded border border-[color:var(--color-solar-gold)] text-[color:var(--color-solar-gold)]">
                        {seriesMap[post.series] ?? post.series}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-[color:var(--color-warm-off-white)] group-hover:text-[color:var(--color-solar-gold)] transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base text-[color:var(--color-mute)] max-w-[54ch]">
                    {post.excerpt}
                  </p>
                </Link>
                {i < posts.length - 1 && <hr className="uli-rule" />}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
