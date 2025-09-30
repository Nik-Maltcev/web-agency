import { NextRequest, NextResponse } from 'next/server';
import { checkUserLimit, incrementUsage } from '@/lib/supabase-usage';
import { createServerSupabaseClient } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

/**
 * GET /api/check-usage - Check user's remaining requests
 */
export async function GET(request: NextRequest) {
  try {
    const client = createServerSupabaseClient();
    const { data: { user }, error: authError } = await client.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const usage = await checkUserLimit(user.id);

    return NextResponse.json({
      success: true,
      ...usage
    });
  } catch (error: any) {
    console.error('Error checking usage:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to check usage'
    }, { status: 500 });
  }
}

/**
 * POST /api/check-usage - Increment usage counter
 * Body: { requestType?: string, tokens?: number }
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
    const { requestType = 'ai_generation', tokens = 0 } = body;

    // Check if user has requests remaining
    const currentUsage = await checkUserLimit(user.id);
    
    if (currentUsage.requests_remaining <= 0) {
      return NextResponse.json({
        success: false,
        error: 'Request limit reached',
        ...currentUsage
      }, { status: 429 }); // Too Many Requests
    }

    // Increment usage
    const result = await incrementUsage(user.id, requestType, tokens);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error incrementing usage:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to increment usage'
    }, { status: 500 });
  }
}
