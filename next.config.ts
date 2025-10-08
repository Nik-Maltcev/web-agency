import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Packages used in server components; keeps Railway build happy.
  serverExternalPackages: ["@anthropic-ai/sdk", "groq-sdk"],
  // Ensure proper port binding for Railway.
  env: {
    PORT: process.env.PORT || "3000",
  },
};

export default nextConfig;
