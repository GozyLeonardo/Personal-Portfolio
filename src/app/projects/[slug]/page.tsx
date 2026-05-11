import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

const projects: Record<string, { name: string; tagline: string; body: string }> = {
  sqc: {
    name: "SQC Community",
    tagline: "Peer infrastructure for Nigerian builders.",
    body: "Founded on WhatsApp because that is where the audience lives. Moving members from zero to first paying client. Operations in build.",
  },
  "empire-os": {
    name: "Empire OS (in build)",
    tagline: "A direction engine for young Africans without a clear path.",
    body: "Faith-grounded. Spec-first. Asking the right questions, surfacing the right work, matching the builder to their next step.",
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return { title: "Project not found" };
  return { title: project.name, description: project.tagline };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Project</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          {project.name}
        </h1>
        <p className="mt-6 text-lg text-[color:var(--color-solar-gold)]">
          {project.tagline}
        </p>
        <p className="mt-8 text-base text-[color:var(--color-warm-off-white)] leading-relaxed">
          {project.body}
        </p>
        <p className="mt-8 text-sm text-[color:var(--color-mute)]">
          Full case study ships next. For now — DM me on X for the unfiltered version.
        </p>
      </div>
    </section>
  );
}
