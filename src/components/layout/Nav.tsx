"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" },
  { href: "/empire", label: "Empire" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50",
        "transition-all duration-300 ease-[var(--ease-out-quint)]",
        scrolled
          ? "bg-[color:var(--color-foundation)]/85 backdrop-blur-md border-b border-[color:var(--color-line)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <OrbitalMark size={32} />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-warm-off-white)] hidden sm:block">
            Lawrence Nwuzor
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as never}
              className={cn(
                "px-3 py-2 rounded-[var(--radius-tight)]",
                "font-mono text-xs uppercase tracking-[0.14em]",
                "text-[color:var(--color-mute)]",
                "transition-colors duration-[var(--duration-micro)]",
                "hover:text-[color:var(--color-warm-off-white)]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className={cn(
              "ml-2 px-4 py-2 rounded-[var(--radius-tight)]",
              "font-mono text-xs uppercase tracking-[0.14em]",
              "border border-[color:var(--color-solar-gold)] text-[color:var(--color-solar-gold)]",
              "transition-all duration-[var(--duration-micro)]",
              "hover:bg-[color:var(--color-solar-gold)] hover:text-[color:var(--color-foundation)]",
            )}
          >
            Let&apos;s work
          </Link>
        </div>
      </div>
    </nav>
  );
}
