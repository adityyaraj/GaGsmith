import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["videos.magichour.ai"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https", 
        hostname: "*.replicate.delivery",
      },
    ],
  },
};

export default nextConfig;
