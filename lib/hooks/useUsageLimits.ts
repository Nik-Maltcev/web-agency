/**
 * React hook for managing usage limits
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserUsage, type UsageInfo } from '@/lib/supabase-usage';

export function useUsageLimits() {
  const { user } = useAuth();
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsage = async () => {
    if (!user) {
      setUsage(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getUserUsage();
      setUsage(data);
    } catch (err: any) {
      console.error('Error fetching usage:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsage();
  }, [user]);

  const hasRequestsRemaining = usage ? usage.requests_remaining > 0 : false;
  const isLimitReached = usage ? usage.requests_remaining === 0 : false;

  return {
    usage,
    loading,
    error,
    hasRequestsRemaining,
    isLimitReached,
    refetch: fetchUsage
  };
}
