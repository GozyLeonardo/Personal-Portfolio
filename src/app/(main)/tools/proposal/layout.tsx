import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposal Generator — Free Client Proposal Builder",
  description:
    "Build clean, professional client proposals in minutes. Add line items, set currency, download as PDF. Free tool by Lawrence Nwuzor.",
  alternates: { canonical: "/tools/proposal" },
  openGraph: {
    title: "Proposal Generator — Free Client Proposal Builder | Lawrence Nwuzor",
    description:
      "Build professional client proposals in minutes. Free tool.",
    url: "https://lawrencenwuzor.com/tools/proposal",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
