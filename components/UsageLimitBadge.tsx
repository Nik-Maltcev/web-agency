'use client';

import { useUsageLimits } from '@/lib/hooks/useUsageLimits';
import { getTierName } from '@/lib/supabase-usage';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function UsageLimitBadge() {
  const { usage, loading, hasRequestsRemaining, isLimitReached } = useUsageLimits();

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-600 dark:text-gray-400">Р—Р°РіСЂСѓР·РєР°...</span>
      </div>
    );
  }

  if (!usage) {
    return null;
  }

  const getStatusColor = () => {
    if (isLimitReached) return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    if (usage.requests_remaining <= 2) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  };

  const getIcon = () => {
    if (isLimitReached) return <XCircle size={16} />;
    if (usage.requests_remaining <= 2) return <AlertCircle size={16} />;
    return <CheckCircle size={16} />;
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor()}`}>
      {getIcon()}
      <span>
        {usage.requests_remaining} / {usage.requests_limit} Р·Р°РїСЂРѕСЃРѕРІ
      </span>
      {usage.subscription_tier !== 'free' && (
        <span className="text-xs opacity-75">
          ({getTierName(usage.subscription_tier)})
        </span>
      )}
    </div>
  );
}
