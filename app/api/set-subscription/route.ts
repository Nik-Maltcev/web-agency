import { NextRequest, NextResponse } from 'next/server';
import { setSubscriptionTier, type SubscriptionTier } from '@/lib/supabase-usage';
import { createServerSupabaseClient } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

/**
 * POST /api/set-subscription - Set user subscription tier
 * Body: { tier: 'basic' | 'professional', durationDays?: number }
 * 
 * Note: In production, this should be called after successful payment
 */
export async function POST(request: NextRequest) {
  try {
    const client = createServerSupabaseClient();
    const { data: { user }, error: authError } = await client.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const body = await request.json();
    const { tier, durationDays = 30 } = body;

    if (!tier || !['basic', 'professional'].includes(tier)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid tier. Must be "basic" or "professional"'
      }, { status: 400 });
    }

    const result = await setSubscriptionTier(user.id, tier as SubscriptionTier, durationDays);

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('Error setting subscription:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to set subscription'
    }, { status: 500 });
  }
}
