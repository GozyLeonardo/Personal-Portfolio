interface SectionHeaderProps {
  label: string; // e.g. "Your Business"
  index: number; // 1-based section number
  total: number; // total sections (3)
}

/**
 * Terminal-style section marker shown above each question.
 */
export function SectionHeader({ label, index, total }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-electric-teal)]">
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-electric-teal)]" />
      <span>{label}</span>
      <span className="text-[color:var(--color-mute)]">
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
