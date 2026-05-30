import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono, Ojuju } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "./posthog-provider";
import "./globals.css";

const ojuju = Ojuju({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ojuju",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lawrencenwuzor.com"),
  alternates: { canonical: "./" },
  title: {
    default: "Lawrence Nwuzor — Building what shouldn't work from where it shouldn't",
    template: "%s | Lawrence Nwuzor",
  },
  description:
    "Software engineer and founder from Lagos, Nigeria. Building African infrastructure for the next generation of builders. Next.js, Supabase, full-stack systems.",
  authors: [{ name: "Lawrence Chigozie Nwuzor" }],
  creator: "Lawrence Chigozie Nwuzor",
  keywords: [
    "Lawrence Nwuzor",
    "Nigerian developer",
    "Lagos engineer",
    "Next.js",
    "Supabase",
    "African tech",
    "full-stack",
    "Africanfuturist",
    "Benlaz",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lawrencenwuzor.com",
    siteName: "Lawrence Nwuzor",
    title: "Lawrence Nwuzor — Building what shouldn't work from where it shouldn't",
    description:
      "Software engineer and founder from Lagos, Nigeria. African infrastructure for the next generation of builders.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawrence Nwuzor — Building what shouldn't work from where it shouldn't",
    description:
      "Software engineer and founder from Lagos, Nigeria. African infrastructure for the next generation of builders.",
    creator: "@GozyLeonardo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lawrence Chigozie Nwuzor",
    alternateName: "Gozy",
    url: "https://lawrencenwuzor.com",
    jobTitle: "Software Engineer & Founder",
    worksFor: { "@type": "Organization", name: "Benlaz" },
    address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
    sameAs: ["https://github.com/GozyLeonardo", "https://x.com/GozyLeonardo"],
  };

  return (
    <html
      lang="en"
      className={`${ojuju.variable} ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
