export function Verdict({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded border-l-4 border-[color:var(--color-solar-gold)] bg-[color:var(--color-surface)] px-6 py-5">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] mb-3">
        Verdict
      </p>
      <div className="text-[color:var(--color-warm-off-white)]">{children}</div>
    </aside>
  );
}
