/**
 * Motion variants — used everywhere a Motion animation is wired.
 * Never define inline objects in components. Reference these.
 */

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as const;

export const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { staggerChildren: 0.08 },
} as const;

export const orbitalSpin = {
  animate: { rotate: 360 },
  transition: { duration: 20, ease: "linear" as const, repeat: Infinity },
} as const;

export const orbitalSpinReverse = {
  animate: { rotate: -360 },
  transition: { duration: 12, ease: "linear" as const, repeat: Infinity },
} as const;
