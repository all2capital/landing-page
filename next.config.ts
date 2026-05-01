import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/companies", destination: "/portfolio", permanent: true },
    ];
  },
};

export default nextConfig;
