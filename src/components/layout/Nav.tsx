"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" },
  { href: "/empire", label: "Empire" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.line
        x1={4} x2={20}
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
        animate={{
          y1: open ? 12 : 7,
          y2: open ? 12 : 7,
          rotate: open ? 45 : 0,
        }}
        style={{ originX: "12px", originY: "12px" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.line
        x1={4} x2={20} y1={12} y2={12}
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
        animate={{ opacity: open ? 0 : 1, x1: open ? 12 : 4 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1={4} x2={20}
        stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
        animate={{
          y1: open ? 12 : 17,
          y2: open ? 12 : 17,
          rotate: open ? -45 : 0,
        }}
        style={{ originX: "12px", originY: "12px" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50",
          "transition-all duration-300 ease-[var(--ease-out-quint)]",
          scrolled || mobileOpen
            ? "bg-[color:var(--color-foundation)]/90 backdrop-blur-xl border-b border-[color:var(--color-line)]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <OrbitalMark size={32} />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-warm-off-white)] hidden sm:block">
              Lawrence Nwuzor
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href as never}
                  className={cn(
                    "relative px-3 py-2 rounded-[var(--radius-tight)]",
                    "font-mono text-xs uppercase tracking-[0.14em]",
                    "transition-colors duration-[var(--duration-micro)]",
                    isActive
                      ? "text-[color:var(--color-warm-off-white)]"
                      : "text-[color:var(--color-mute)] hover:text-[color:var(--color-warm-off-white)]",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-[1px] left-3 right-3 h-px bg-gradient-to-r from-transparent via-[var(--color-solar-gold)] to-transparent"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/services"
              className={cn(
                "ml-3 px-4 py-2 rounded-[var(--radius-tight)]",
                "font-mono text-xs uppercase tracking-[0.14em]",
                "border border-[color:var(--color-solar-gold)] text-[color:var(--color-solar-gold)]",
                "transition-all duration-[var(--duration-micro)]",
                "hover:bg-[color:var(--color-solar-gold)] hover:text-[color:var(--color-foundation)]",
                "hover:shadow-[0_0_20px_rgba(196,122,0,0.15)]",
              )}
            >
              Let&apos;s work
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "lg:hidden p-2 -mr-2 rounded-[var(--radius-tight)]",
              "text-[color:var(--color-warm-off-white)]",
              "transition-colors duration-[var(--duration-micro)]",
              "hover:bg-white/5",
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[color:var(--color-foundation)]/95 backdrop-blur-xl" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-8 sm:px-12">
              {/* Nav links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        delay: 0.05 + i * 0.06,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href as never}
                        className={cn(
                          "group flex items-center gap-4 py-3",
                          "transition-colors duration-[var(--duration-micro)]",
                        )}
                      >
                        <span
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.2em] w-8 tabular-nums",
                            isActive
                              ? "text-[color:var(--color-solar-gold)]"
                              : "text-[color:var(--color-mute)]/50",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-headline text-2xl sm:text-3xl tracking-tight",
                            isActive
                              ? "text-[color:var(--color-warm-off-white)]"
                              : "text-[color:var(--color-mute)] group-hover:text-[color:var(--color-warm-off-white)]",
                            "transition-colors duration-[var(--duration-micro)]",
                          )}
                        >
                          {link.label}
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="mobile-dot"
                            className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-solar-gold)]"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="my-8 h-px bg-gradient-to-r from-transparent via-[var(--color-solar-gold)]/40 to-transparent origin-left"
              />

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/services"
                  className={cn(
                    "inline-flex items-center gap-3 px-6 py-3.5 rounded-[var(--radius-tight)]",
                    "font-mono text-sm uppercase tracking-[0.14em]",
                    "border border-[color:var(--color-solar-gold)] text-[color:var(--color-solar-gold)]",
                    "transition-all duration-300",
                    "hover:bg-[color:var(--color-solar-gold)] hover:text-[color:var(--color-foundation)]",
                    "hover:shadow-[0_0_30px_rgba(196,122,0,0.2)]",
                  )}
                >
                  <span>Let&apos;s work</span>
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
