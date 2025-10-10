import { createClient } from '@supabase/supabase-js';

// Supabase client configuration - support both naming conventions
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://lyuxhqhusukvpvwtkkum.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzM0MjAsImV4cCI6MjA3NDc0OTQyMH0.JidO0voYsPldgFiaUYwAp-HmtOGLZnldW5Gyn0CMsYo';

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined' || process.env.NODE_ENV !== 'production') {
    console.warn('Supabase credentials not found. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.');
  }
}

// Create Supabase client for client-side operations
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Create Supabase client with service role for server-side operations
export function createServerSupabaseClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  if (!serviceRoleKey) {
    console.warn('Supabase service role key not found. Server-side operations may be limited.');
    return createClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'placeholder-key'
    );
  }
  
  return createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

export default supabase;
