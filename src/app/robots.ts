import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/keystatic", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/writing/", "/tools/", "/services", "/projects/"],
        disallow: ["/keystatic", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/writing/", "/tools/", "/services", "/projects/"],
        disallow: ["/keystatic", "/api/"],
      },
    ],
    sitemap: "https://lawrencenwuzor.com/sitemap.xml",
    host: "https://lawrencenwuzor.com",
  };
}
