import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["@keystatic/core", "@keystatic/next", "@keystar/ui"],
};

export default nextConfig;
