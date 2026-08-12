// D:\tudulu\apps\web\next.config.js
const path = require("path");

const getBackendUrl = () => {
  const url =
    process.env.INTERNAL_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!url || typeof url !== "string" || !url.trim()) {
    return "https://tudulu-api.onrender.com";
  }
  return url.trim().replace(/\/$/, "");
};

const BACKEND_URL = getBackendUrl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: `${BACKEND_URL}/api/v1/auth/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${BACKEND_URL}/api/v1/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
