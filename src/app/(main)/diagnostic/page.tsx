import type { Metadata } from "next";
import { DiagnosticQuiz } from "./_components/DiagnosticQuiz";

export const metadata: Metadata = {
  title: "AI Readiness Diagnostic",
  description:
    "14 questions. 3 minutes. Find out if you're ready to build and sell AI automation — or what's actually in the way.",
  alternates: { canonical: "/diagnostic" },
  openGraph: {
    title: "AI Readiness Diagnostic | Lawrence Nwuzor",
    description:
      "14 questions. 3 minutes. Find out where you actually stand on building or selling AI automation.",
    url: "https://lawrencenwuzor.com/diagnostic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Readiness Diagnostic | Lawrence Nwuzor",
    description:
      "14 questions. 3 minutes. Find out where you actually stand on building or selling AI automation.",
  },
};

export default function DiagnosticPage() {
  return <DiagnosticQuiz />;
}
