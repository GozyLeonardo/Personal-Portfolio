"use client";

import { useEffect } from "react";
import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { GhostButton } from "@/components/ui/GhostButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <OrbitalMark size={120} />
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)]">
          Something broke
        </p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl text-[color:var(--color-warm-off-white)]">
          A piece slipped.{" "}
          <span className="text-[color:var(--color-solar-gold)]">
            The mission stands.
          </span>
        </h1>
        <p className="mt-6 text-base text-[color:var(--color-mute)]">
          {error.digest ? `Reference: ${error.digest}` : "An unexpected error occurred."}
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <GhostButton onClick={() => reset()}>Try again</GhostButton>
          <GhostButton href="/">Return home</GhostButton>
        </div>
      </div>
    </section>
  );
}
