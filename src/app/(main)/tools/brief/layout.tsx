import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Brief — AI Project Intake Interview",
  description:
    "Talk through your idea with an AI interviewer and get a full project brief — every desire ranked — as a downloadable PDF. Free tool by Lawrence Nwuzor.",
  alternates: { canonical: "/tools/brief" },
  openGraph: {
    title: "The Brief — AI Project Intake | Lawrence Nwuzor",
    description:
      "Describe the project you want built and get a full brief — vision, audience, ranked desires, constraints — as a branded PDF.",
    url: "https://lawrencenwuzor.com/tools/brief",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
