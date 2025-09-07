import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Optimize for serverless deployment
    serverComponentsExternalPackages: ['@anthropic-ai/sdk', 'groq-sdk']
  },
  // Ensure proper port binding for Railway
  env: {
    PORT: process.env.PORT || '3000'
  }
};

export default nextConfig;
