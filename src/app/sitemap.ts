import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lawrencenwuzor.com";
  const now = new Date();
  const routes = ["", "/projects", "/writing", "/now", "/empire", "/uses", "/press", "/give"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
