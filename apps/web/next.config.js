const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixes Turbopack path-doubling issue in Vercel monorepos
  outputFileTracingRoot: path.join(__dirname, "../../"),
  typescript: {
    // Already verified locally via `npm run build`
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
