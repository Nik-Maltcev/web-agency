/**
 * Supabase Database Types
 * 
 * This file contains TypeScript types for your Supabase database.
 * Update these types to match your actual database schema.
 * 
 * You can generate these types automatically using:
 * npx supabase gen types typescript --project-id lyuxhqhusukvpvwtkkum > types/supabase.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Example database schema - update to match your actual schema
export interface Database {
  public: {
    Tables: {
      // Example table - replace with your actual tables
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // Add more tables here
    }
    Views: {
      // Define your views here
    }
    Functions: {
      // Define your database functions here
    }
    Enums: {
      // Define your enums here
    }
  }
}

// Helper types for working with Supabase
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Example usage:
// type User = Tables<'users'>
// type NewUser = Insertable<'users'>
// type UserUpdate = Updatable<'users'>
