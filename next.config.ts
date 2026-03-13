import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/agent-agency-dashboard',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
