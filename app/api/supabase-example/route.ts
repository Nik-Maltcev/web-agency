import { NextRequest, NextResponse } from 'next/server';

/**
 * Example API endpoint demonstrating Supabase integration
 * 
 * GET /api/supabase-example - Test connection
 * POST /api/supabase-example - Example data operation
 */

// Force dynamic rendering to avoid build-time execution
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({
      success: false,
      error: 'Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.'
    }, { status: 503 });
  }

  // Lazy import to avoid build-time execution
  const { executeServerOperation } = await import('@/lib/supabase-helpers');
  try {
    // Test Supabase connection
    const result = await executeServerOperation(async (client) => {
      // Try to query a simple table or check connection
      const { data, error } = await client
        .from('_supabase_migrations')
        .select('version')
        .limit(1);
      
      if (error) {
        // If migrations table doesn't exist, connection is still OK
        if (error.code === '42P01') {
          return { connected: true, message: 'Supabase connected successfully' };
        }
        throw error;
      }
      
      return { 
        connected: true, 
        message: 'Supabase connected successfully',
        migrations: data 
      };
    });
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('Supabase connection error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to connect to Supabase'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({
      success: false,
      error: 'Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.'
    }, { status: 503 });
  }

  // Lazy import to avoid build-time execution
  const { executeServerOperation } = await import('@/lib/supabase-helpers');
  
  try {
    const body = await request.json();
    const { action, table, data: requestData } = body;
    
    if (!action || !table) {
      return NextResponse.json({
        success: false,
        error: 'action and table are required'
      }, { status: 400 });
    }
    
    // Example: Perform database operations
    const result = await executeServerOperation(async (client) => {
      switch (action) {
        case 'select':
          const { data: selectData, error: selectError } = await client
            .from(table)
            .select('*')
            .limit(10);
          
          if (selectError) throw selectError;
          return { action: 'select', data: selectData };
        
        case 'insert':
          if (!requestData) {
            throw new Error('data is required for insert action');
          }
          
          const { data: insertData, error: insertError } = await client
            .from(table)
            .insert(requestData)
            .select();
          
          if (insertError) throw insertError;
          return { action: 'insert', data: insertData };
        
        case 'count':
          const { count, error: countError } = await client
            .from(table)
            .select('*', { count: 'exact', head: true });
          
          if (countError) throw countError;
          return { action: 'count', count };
        
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    });
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('Supabase operation error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Operation failed'
    }, { status: 500 });
  }
}
