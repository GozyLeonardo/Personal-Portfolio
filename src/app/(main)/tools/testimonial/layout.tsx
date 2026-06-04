import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proof Card — Free Testimonial Card Generator",
  description:
    "Turn WhatsApp screenshots and customer reviews into polished, shareable testimonial cards. Free tool by Lawrence Nwuzor.",
  alternates: { canonical: "/tools/testimonial" },
  openGraph: {
    title: "Proof Card — Free Testimonial Card Generator | Lawrence Nwuzor",
    description:
      "Turn customer reviews into shareable testimonial cards. Free tool.",
    url: "https://lawrencenwuzor.com/tools/testimonial",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
