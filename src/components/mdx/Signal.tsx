interface SignalProps {
  type: "intel" | "risk";
  children: React.ReactNode;
}

export function Signal({ type, children }: SignalProps) {
  const isIntel = type === "intel";
  return (
    <aside
      className={`my-6 rounded border px-5 py-4 bg-[color:var(--color-surface)] ${
        isIntel
          ? "border-[color:var(--color-electric-teal)]"
          : "border-[color:var(--color-solar-gold)]"
      }`}
    >
      <p
        className={`font-mono text-xs uppercase tracking-[0.18em] mb-2 ${
          isIntel
            ? "text-[color:var(--color-electric-teal)]"
            : "text-[color:var(--color-solar-gold)]"
        }`}
      >
        {isIntel ? "Intel" : "Risk"}
      </p>
      <div className="text-[color:var(--color-mute)]">{children}</div>
    </aside>
  );
}
