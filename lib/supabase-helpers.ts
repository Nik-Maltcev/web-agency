import { supabase, createServerSupabaseClient } from './supabase';

/**
 * Helper functions for common Supabase operations
 */

// ============================================
// Authentication Helpers
// ============================================

/**
 * Sign up a new user
 */
export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  
  if (error) {
    console.error('Sign up error:', error);
    throw error;
  }
  
  return data;
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }
  
  return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Get user error:', error);
    return null;
  }
  
  return user;
}

/**
 * Get the current session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Get session error:', error);
    return null;
  }
  
  return session;
}

// ============================================
// Database Helpers
// ============================================

/**
 * Generic function to fetch data from a table
 */
export async function fetchFromTable<T = any>(
  tableName: string,
  options?: {
    select?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  }
) {
  let query = supabase.from(tableName).select(options?.select || '*');
  
  // Apply filters
  if (options?.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }
  
  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy.column, { 
      ascending: options.orderBy.ascending ?? true 
    });
  }
  
  // Apply limit
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error(`Error fetching from ${tableName}:`, error);
    throw error;
  }
  
  return data as T[];
}

/**
 * Insert data into a table
 */
export async function insertIntoTable<T = any>(
  tableName: string,
  data: Record<string, any> | Record<string, any>[]
) {
  const { data: result, error } = await supabase
    .from(tableName)
    .insert(data)
    .select();
  
  if (error) {
    console.error(`Error inserting into ${tableName}:`, error);
    throw error;
  }
  
  return result as T[];
}

/**
 * Update data in a table
 */
export async function updateInTable<T = any>(
  tableName: string,
  filters: Record<string, any>,
  updates: Record<string, any>
) {
  let query = supabase.from(tableName).update(updates);
  
  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    query = query.eq(key, value);
  });
  
  const { data, error } = await query.select();
  
  if (error) {
    console.error(`Error updating ${tableName}:`, error);
    throw error;
  }
  
  return data as T[];
}

/**
 * Delete data from a table
 */
export async function deleteFromTable(
  tableName: string,
  filters: Record<string, any>
) {
  let query = supabase.from(tableName).delete();
  
  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    query = query.eq(key, value);
  });
  
  const { error } = await query;
  
  if (error) {
    console.error(`Error deleting from ${tableName}:`, error);
    throw error;
  }
}

// ============================================
// Storage Helpers
// ============================================

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  bucketName: string,
  filePath: string,
  file: File | Blob,
  options?: {
    cacheControl?: string;
    upsert?: boolean;
  }
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: options?.cacheControl || '3600',
      upsert: options?.upsert || false,
    });
  
  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
  
  return data;
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(bucketName: string, filePath: string) {
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}

/**
 * Download a file from Supabase Storage
 */
export async function downloadFile(bucketName: string, filePath: string) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .download(filePath);
  
  if (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
  
  return data;
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucketName: string, filePaths: string | string[]) {
  const paths = Array.isArray(filePaths) ? filePaths : [filePaths];
  
  const { error } = await supabase.storage
    .from(bucketName)
    .remove(paths);
  
  if (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// ============================================
// Realtime Helpers
// ============================================

/**
 * Subscribe to realtime changes on a table
 */
export function subscribeToTable(
  tableName: string,
  callback: (payload: any) => void,
  options?: {
    event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
    filter?: string;
  }
) {
  const channel = supabase
    .channel(`${tableName}-changes`)
    .on(
      'postgres_changes' as any,
      {
        event: options?.event || '*',
        schema: 'public',
        table: tableName,
        filter: options?.filter,
      },
      callback
    )
    .subscribe();
  
  return channel;
}

/**
 * Unsubscribe from a channel
 */
export async function unsubscribe(channel: any) {
  await supabase.removeChannel(channel);
}

// ============================================
// Server-side Helpers
// ============================================

/**
 * Execute a server-side operation with service role
 */
export async function executeServerOperation<T = any>(
  operation: (client: ReturnType<typeof createServerSupabaseClient>) => Promise<T>
) {
  const serverClient = createServerSupabaseClient();
  return await operation(serverClient);
}
