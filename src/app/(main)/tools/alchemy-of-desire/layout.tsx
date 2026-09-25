import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alchemy of Desire — AI Self-Discovery",
  description:
    "A guided AI conversation that draws out your deepest desires — the ones you never named. Leave with a Soul Blueprint: a personal document of who you are and what you truly want.",
  alternates: { canonical: "/tools/alchemy-of-desire" },
  openGraph: {
    title: "Alchemy of Desire — AI Self-Discovery | Lawrence Nwuzor",
    description:
      "A guided conversation that surfaces your deepest, unspoken desires and distills them into a personal Soul Blueprint PDF.",
    url: "https://lawrencenwuzor.com/tools/alchemy-of-desire",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
