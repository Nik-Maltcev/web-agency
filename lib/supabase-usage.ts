/**
 * Usage limits and subscription management for Supabase
 */

import { supabase, createServerSupabaseClient } from './supabase';

export type SubscriptionTier = 'free' | 'basic' | 'professional';

export interface UsageInfo {
  requests_used: number;
  requests_limit: number;
  requests_remaining: number;
  subscription_tier: SubscriptionTier;
  subscription_end_date: string | null;
}

export interface UsageResult {
  success: boolean;
  error?: string;
  requests_used: number;
  requests_limit: number;
  requests_remaining: number;
}

// ============================================
// Client-side functions
// ============================================

/**
 * Get current user's usage information
 */
export async function getUserUsage(): Promise<UsageInfo | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('requests_used, requests_limit, subscription_tier, subscription_end_date')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching usage:', error);
    throw error;
  }

  const requests_remaining = Math.max(0, (data.requests_limit || 0) - (data.requests_used || 0));

  return {
    requests_used: data.requests_used || 0,
    requests_limit: data.requests_limit || 0,
    requests_remaining,
    subscription_tier: data.subscription_tier || 'free',
    subscription_end_date: data.subscription_end_date
  };
}

/**
 * Get usage history for current user
 */
export async function getUserUsageHistory(limit: number = 50) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { data, error } = await supabase
    .from('usage_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching usage history:', error);
    throw error;
  }

  return data;
}

/**
 * Get subscription history for current user
 */
export async function getSubscriptionHistory() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { data, error } = await supabase
    .from('subscription_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscription history:', error);
    throw error;
  }

  return data;
}

// ============================================
// Server-side functions
// ============================================

/**
 * Check if user has requests remaining (server-side)
 */
export async function checkUserLimit(userId: string): Promise<UsageInfo> {
  const client = createServerSupabaseClient();

  const { data, error } = await client
    .from('profiles')
    .select('requests_used, requests_limit, subscription_tier, subscription_end_date')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking user limit:', error);
    throw error;
  }

  const requests_remaining = Math.max(0, (data.requests_limit || 0) - (data.requests_used || 0));

  return {
    requests_used: data.requests_used || 0,
    requests_limit: data.requests_limit || 0,
    requests_remaining,
    subscription_tier: data.subscription_tier || 'free',
    subscription_end_date: data.subscription_end_date
  };
}

/**
 * Increment usage counter (server-side)
 */
export async function incrementUsage(
  userId: string,
  requestType: string = 'ai_generation',
  tokens: number = 0
): Promise<UsageResult> {
  const client = createServerSupabaseClient();

  const { data, error } = await client.rpc('increment_usage', {
    user_uuid: userId,
    request_type_param: requestType,
    tokens_param: tokens
  });

  if (error) {
    console.error('Error incrementing usage:', error);
    throw error;
  }

  return data as UsageResult;
}

/**
 * Set user subscription tier (server-side)
 */
export async function setSubscriptionTier(
  userId: string,
  tier: SubscriptionTier,
  durationDays: number = 30
): Promise<any> {
  const client = createServerSupabaseClient();

  const { data, error } = await client.rpc('set_subscription_tier', {
    user_uuid: userId,
    tier: tier,
    duration_days: durationDays
  });

  if (error) {
    console.error('Error setting subscription tier:', error);
    throw error;
  }

  return data;
}

/**
 * Get remaining requests using database function (server-side)
 */
export async function getRemainingRequests(userId: string): Promise<number> {
  const client = createServerSupabaseClient();

  const { data, error } = await client.rpc('get_remaining_requests', {
    user_uuid: userId
  });

  if (error) {
    console.error('Error getting remaining requests:', error);
    throw error;
  }

  return data as number;
}

// ============================================
// Helper functions
// ============================================

/**
 * Get tier limits
 */
export function getTierLimits(tier: SubscriptionTier): number {
  switch (tier) {
    case 'basic':
      return 5;
    case 'professional':
      return 15;
    case 'free':
    default:
      return 0;
  }
}

/**
 * Get tier name in Russian
 */
export function getTierName(tier: SubscriptionTier): string {
  switch (tier) {
    case 'basic':
      return 'Р‘Р°Р·РѕРІС‹Р№';
    case 'professional':
      return 'РџСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹Р№';
    case 'free':
    default:
      return 'Р‘РµСЃРїР»Р°С‚РЅС‹Р№';
  }
}

/**
 * Format remaining requests message
 */
export function formatRemainingRequests(remaining: number, limit: number): string {
  if (limit === 0) {
    return 'РќРµС‚ Р°РєС‚РёРІРЅРѕР№ РїРѕРґРїРёСЃРєРё';
  }
  
  if (remaining === 0) {
    return 'Р›РёРјРёС‚ РёСЃС‡РµСЂРїР°РЅ';
  }
  
  return `РћСЃС‚Р°Р»РѕСЃСЊ ${remaining} РёР· ${limit} Р·Р°РїСЂРѕСЃРѕРІ`;
}
