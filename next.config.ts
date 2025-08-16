import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["videos.magichour.ai", "lh3.googleusercontent.com"],
    remotePatterns: [
      { protocol: "https", hostname: "videos.magichour.ai", pathname: "/**" },
    ],
  },
};
module.exports = nextConfig
