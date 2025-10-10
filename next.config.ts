import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Packages used in server components; keeps Railway build happy.
  serverExternalPackages: ["@anthropic-ai/sdk", "groq-sdk"],
  // Ensure proper port binding for Railway.
  env: {
    PORT: process.env.PORT || "3000",
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default nextConfig;
