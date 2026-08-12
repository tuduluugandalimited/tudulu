// D:\tudulu\apps\web\next.config.js
const path = require("path");

const rawBackend =
  process.env.INTERNAL_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tudulu-api.onrender.com";

const BACKEND_URL = rawBackend.replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  typescript: {
    // Allows production builds to successfully complete even if project has type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allows production builds to successfully complete even if project has ESLint errors
    ignoreDuringBuilds: true,
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
