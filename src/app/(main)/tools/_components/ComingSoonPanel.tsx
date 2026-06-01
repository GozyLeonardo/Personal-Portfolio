export function ComingSoonPanel() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-10 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-electric-teal mb-3">
        Coming soon
      </p>
      <h3 className="font-display text-2xl font-bold text-warm-off-white mb-2">
        Almost ready
      </h3>
      <p className="text-mute text-sm max-w-md mx-auto leading-relaxed">
        This one&apos;s being switched on. Check back shortly — or try the tools
        that are live right now.
      </p>
      <a
        href="/tools"
        className="inline-block mt-6 text-solar-gold font-mono text-xs hover:underline"
      >
        ← Back to tools
      </a>
    </div>
  );
}
