import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { GhostButton } from "@/components/ui/GhostButton";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <OrbitalMark size={120} />
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)]">
          404 · path not found
        </p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          The line carries.
          <br />
          <span className="text-[color:var(--color-solar-gold)]">This page does not.</span>
        </h1>
        <p className="mt-6 text-base text-[color:var(--color-mute)]">
          What you wanted is somewhere else. Head back and find it.
        </p>
        <div className="mt-10">
          <GhostButton href="/">Return home &rarr;</GhostButton>
        </div>
      </div>
    </section>
  );
}
