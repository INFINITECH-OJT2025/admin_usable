import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;



module.exports = {
  reactStrictMode: true, // Optional, but recommended
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  swcMinify: true, // If you want to enable SWC-based minification (optional)
  experimental: {
    react: {
      throwIfNamespace: false, // Disable the namespace error
    },
  },
  images: {
    domains: ['127.0.0.1', 'localhost'], // Add any other domains here
  },
};
