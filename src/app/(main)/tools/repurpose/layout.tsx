import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Repurposer — AI Multi-Platform Post Generator",
  description:
    "Paste one piece of content, get optimized versions for Twitter, LinkedIn, Instagram, and email. Free AI tool by Lawrence Nwuzor.",
  alternates: { canonical: "/tools/repurpose" },
  openGraph: {
    title:
      "Content Repurposer — AI Multi-Platform Post Generator | Lawrence Nwuzor",
    description:
      "Paste content, get optimized versions for Twitter, LinkedIn, Instagram, email. Free AI tool.",
    url: "https://lawrencenwuzor.com/tools/repurpose",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
