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
  alternates: { canonical: "/" },
  title: {
    default:
      "Lawrence Nwuzor — Web Developer & AI Automation Engineer, Lagos Nigeria",
    template: "%s | Lawrence Nwuzor",
  },
  description:
    "Lawrence Nwuzor builds production-grade websites, AI automations, and digital infrastructure from Lagos, Nigeria. Next.js, Supabase, and full-stack systems for businesses across Africa and beyond.",
  authors: [{ name: "Lawrence Chigozie Nwuzor" }],
  creator: "Lawrence Chigozie Nwuzor",
  publisher: "Lawrence Nwuzor",
  keywords: [
    "Lawrence Nwuzor",
    "web developer Lagos",
    "web developer Nigeria",
    "AI automation Africa",
    "Next.js developer",
    "Supabase developer",
    "freelance web developer Nigeria",
    "website builder Lagos",
    "full-stack developer Africa",
    "AI tools for business",
    "Nigerian software engineer",
    "tech in Africa",
    "African tech builder",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lawrencenwuzor.com",
    siteName: "Lawrence Nwuzor",
    title:
      "Lawrence Nwuzor — Web Developer & AI Automation Engineer, Lagos Nigeria",
    description:
      "Production-grade websites and AI automations built from Lagos. Next.js, Supabase, full-stack systems for businesses across Africa and beyond.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Lawrence Nwuzor — Web Developer & AI Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GozyLeonardo",
    creator: "@GozyLeonardo",
    title:
      "Lawrence Nwuzor — Web Developer & AI Automation Engineer, Lagos Nigeria",
    description:
      "Production-grade websites and AI automations built from Lagos. Next.js, Supabase, full-stack systems for businesses across Africa and beyond.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Lagos",
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
    jobTitle: "Software Engineer & AI Automation Specialist",
    description:
      "Web developer and AI automation engineer from Lagos, Nigeria. Building production-grade digital infrastructure for businesses across Africa.",
    knowsAbout: [
      "Web Development",
      "AI Automation",
      "Next.js",
      "Supabase",
      "TypeScript",
      "Python",
      "Full-Stack Engineering",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    sameAs: [
      "https://github.com/GozyLeonardo",
      "https://x.com/GozyLeonardo",
      "https://linkedin.com/in/lawrencenwuzor",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lawrence Nwuzor",
    url: "https://lawrencenwuzor.com",
    description:
      "Production-grade websites, AI automations, and digital infrastructure built from Lagos, Nigeria.",
    author: { "@type": "Person", name: "Lawrence Chigozie Nwuzor" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://lawrencenwuzor.com/writing?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Lawrence Nwuzor — Web Development & AI Automation",
    url: "https://lawrencenwuzor.com/services",
    description:
      "Production-grade websites and AI automation systems delivered in 7 days. Fixed-price builds for businesses in Nigeria, Africa, and globally.",
    provider: { "@type": "Person", name: "Lawrence Chigozie Nwuzor" },
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Continent", name: "Africa" },
      { "@type": "Place", name: "Worldwide" },
    ],
    serviceType: [
      "Web Development",
      "AI Automation",
      "Full-Stack Engineering",
      "Website Design",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
  };

  const schemas = [personSchema, websiteSchema, serviceSchema];

  return (
    <html
      lang="en"
      className={`${ojuju.variable} ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
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
