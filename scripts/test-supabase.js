/**
 * Test script for Supabase integration
 * Run with: node scripts/test-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🧪 Testing Supabase Integration\n');
console.log('=' .repeat(50));

// Check environment variables
console.log('\n📋 Checking environment variables...');
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set');
  process.exit(1);
}
if (!supabaseAnonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  process.exit(1);
}
if (!supabaseServiceKey) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY is not set (optional for server-side operations)');
}

console.log('✅ Environment variables are set');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Anon Key: ${supabaseAnonKey.substring(0, 20)}...`);
if (supabaseServiceKey) {
  console.log(`   Service Key: ${supabaseServiceKey.substring(0, 20)}...`);
}

// Test connection with anon key
console.log('\n🔌 Testing connection with anon key...');
const supabase = createClient(supabaseUrl, supabaseAnonKey);

try {
  // Try to query a system table to test connection
  const { data, error } = await supabase
    .from('_supabase_migrations')
    .select('version')
    .limit(1);

  if (error) {
    // If migrations table doesn't exist, that's OK - connection still works
    if (error.code === '42P01') {
      console.log('✅ Connection successful (migrations table not found, but connection works)');
    } else {
      console.error('❌ Connection error:', error.message);
      console.error('   Code:', error.code);
    }
  } else {
    console.log('✅ Connection successful');
    if (data && data.length > 0) {
      console.log(`   Found ${data.length} migration(s)`);
    }
  }
} catch (err) {
  console.error('❌ Connection failed:', err.message);
  process.exit(1);
}

// Test service role connection if available
if (supabaseServiceKey) {
  console.log('\n🔐 Testing connection with service role key...');
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    const { data, error } = await serviceClient
      .from('_supabase_migrations')
      .select('version')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        console.log('✅ Service role connection successful');
      } else {
        console.error('❌ Service role connection error:', error.message);
      }
    } else {
      console.log('✅ Service role connection successful');
    }
  } catch (err) {
    console.error('❌ Service role connection failed:', err.message);
  }
}

// List available tables
console.log('\n📊 Checking database schema...');
try {
  const { data: tables, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')
    .order('table_name');

  if (error) {
    console.log('⚠️  Could not list tables (this is normal if RLS is enabled)');
    console.log('   You may need to query specific tables directly');
  } else if (tables && tables.length > 0) {
    console.log(`✅ Found ${tables.length} table(s) in public schema:`);
    tables.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });
  } else {
    console.log('ℹ️  No tables found in public schema');
    console.log('   Create tables in Supabase Dashboard to get started');
  }
} catch (err) {
  console.log('⚠️  Could not check schema:', err.message);
}

// Test auth functionality
console.log('\n🔑 Testing auth functionality...');
try {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('❌ Auth check failed:', error.message);
  } else {
    console.log('✅ Auth module is working');
    if (session) {
      console.log('   Current session found');
    } else {
      console.log('   No active session (this is normal)');
    }
  }
} catch (err) {
  console.error('❌ Auth test failed:', err.message);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('✅ Supabase integration test completed!');
console.log('\n📚 Next steps:');
console.log('   1. Create tables in Supabase Dashboard');
console.log('   2. Set up Row Level Security (RLS) policies');
console.log('   3. Test with your application code');
console.log('   4. See SUPABASE_SETUP.md for examples');
console.log('\n🔗 Dashboard: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum');
console.log('=' .repeat(50) + '\n');
