"use client";

import { useState } from "react";

interface UnfoldProps {
  title: string;
  children: React.ReactNode;
}

export function Unfold({ title, children }: UnfoldProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-6 rounded border border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-mono text-sm text-[color:var(--color-warm-off-white)] hover:text-[color:var(--color-solar-gold)] transition-colors duration-150"
      >
        <span>{title}</span>
        <span className="text-[color:var(--color-mute)] select-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-3 border-t border-[color:var(--color-line)] text-[color:var(--color-mute)]">
          {children}
        </div>
      )}
    </div>
  );
}
