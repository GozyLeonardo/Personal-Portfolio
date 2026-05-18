import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.hashnode.com" },
      { protocol: "https", hostname: "**.hashnode.com" },
    ],
  },
};

export default nextConfig;
