import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Line — Free AI Cold Email Opener",
  description:
    "Enter a prospect website URL and get 3 personalized cold email opening lines with pain-point hooks in seconds. Free AI tool by Lawrence Nwuzor.",
  alternates: { canonical: "/tools/first-line" },
  openGraph: {
    title: "First Line — Free AI Cold Email Opener | Lawrence Nwuzor",
    description:
      "Enter a URL, get 3 personalized cold email openers with pain-point hooks. Free AI tool.",
    url: "https://lawrencenwuzor.com/tools/first-line",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
