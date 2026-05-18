import type { Metadata } from "next";
import Image from "next/image";
import { getPosts } from "@/lib/hashnode";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and field notes from Lawrence Nwuzor — Lagos, Nigeria.",
};

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Writing</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          The line carries.
        </h1>
        <p className="mt-4 text-lg text-[color:var(--color-mute)]">
          Field notes from Lagos. Published on Hashnode.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 text-base text-[color:var(--color-mute)]">
            No posts yet.
          </p>
        ) : (
          <div className="mt-16">
            {posts.map((post, i) => (
              <div key={post.slug}>
                <a
                  href={`https://lawrencenwuzor.hashnode.dev/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group py-10"
                >
                  {post.coverImage && (
                    <div className="relative w-full aspect-video rounded overflow-hidden mb-6">
                      <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </div>
                  )}
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] flex items-center gap-2 mb-3">
                    <NsibidiGlyph variant="cross" size={12} />
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {post.readTimeInMinutes} min read
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl text-[color:var(--color-warm-off-white)] group-hover:text-[color:var(--color-solar-gold)] transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base text-[color:var(--color-mute)] max-w-[54ch]">
                    {post.brief}
                  </p>
                </a>
                {i < posts.length - 1 && <hr className="uli-rule" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
