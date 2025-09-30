import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

/**
 * React hook for Supabase authentication state
 */
export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading };
}

/**
 * React hook for fetching data from Supabase
 */
export function useSupabaseQuery<T = any>(
  table: string,
  options?: {
    select?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    enabled?: boolean;
  }
) {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const enabled = options?.enabled !== false;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        let query = supabase.from(table).select(options?.select || '*');

        // Apply filters
        if (options?.filters) {
          Object.entries(options.filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        // Apply ordering
        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true,
          });
        }

        // Apply limit
        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data, error } = await query;

        if (isMounted) {
          if (error) {
            setError(error);
            setData(null);
          } else {
            setData(data as T[]);
            setError(null);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [table, enabled, JSON.stringify(options)]);

  const refetch = async () => {
    setLoading(true);
    try {
      let query = supabase.from(table).select(options?.select || '*');

      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) {
        setError(error);
        setData(null);
      } else {
        setData(data as T[]);
        setError(null);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, refetch };
}

/**
 * React hook for Supabase realtime subscriptions
 */
export function useSupabaseSubscription(
  table: string,
  callback: (payload: any) => void,
  options?: {
    event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
    filter?: string;
    enabled?: boolean;
  }
) {
  const enabled = options?.enabled !== false;

  useEffect(() => {
    if (!enabled) return;

    const channel = supabase
      .channel(`${table}-changes-${Date.now()}`)
      .on(
        'postgres_changes' as any,
        {
          event: options?.event || '*',
          schema: 'public',
          table: table,
          filter: options?.filter,
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, enabled, options?.event, options?.filter]);
}

/**
 * React hook for Supabase mutations
 */
export function useSupabaseMutation<T = any>(table: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const insert = async (data: Record<string, any> | Record<string, any>[]) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select();

      if (error) throw error;
      setLoading(false);
      return result as T[];
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  const update = async (
    filters: Record<string, any>,
    updates: Record<string, any>
  ) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(table).update(updates);

      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { data, error } = await query.select();

      if (error) throw error;
      setLoading(false);
      return data as T[];
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  const remove = async (filters: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(table).delete();

      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { error } = await query;

      if (error) throw error;
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err;
    }
  };

  return { insert, update, remove, loading, error };
}
