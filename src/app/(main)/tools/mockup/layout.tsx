import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Device Mockup Generator — Free Screenshot Framer",
  description:
    "Drop a screenshot, pick a device frame (iPhone, Android, laptop, tablet, browser), download a polished mockup. Free tool by Lawrence Nwuzor.",
  alternates: { canonical: "/tools/mockup" },
  openGraph: {
    title: "Device Mockup Generator | Lawrence Nwuzor",
    description:
      "Drop a screenshot, pick a device frame, download a polished mockup. Free tool.",
    url: "https://lawrencenwuzor.com/tools/mockup",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
