const path = require("path");

const DEFAULT_BACKEND = "https://tudulu-api.onrender.com";

const getBackendUrl = () => {
  const envUrl =
    process.env.INTERNAL_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl || typeof envUrl !== "string" || envUrl.trim() === "") {
    return DEFAULT_BACKEND;
  }
  const trimmed = envUrl.trim().replace(/\/$/, "");
  return trimmed.startsWith("http") ? trimmed : DEFAULT_BACKEND;
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
        source: "/auth/login",
        destination: `${BACKEND_URL}/api/v1/auth/login`,
      },
      {
        source: "/auth/register",
        destination: `${BACKEND_URL}/api/v1/auth/register`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${BACKEND_URL}/api/v1/:path*`,
      },
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
