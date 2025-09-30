'use client';

import { useState } from 'react';
import { useSupabaseAuth, useSupabaseQuery, useSupabaseMutation } from '@/lib/hooks/useSupabase';
import { Button } from '@/components/ui/button';
import { signIn, signUp, signOut } from '@/lib/supabase-helpers';

/**
 * Example component demonstrating Supabase integration
 * This is a reference implementation - customize for your needs
 */
export default function SupabaseExample() {
  const { user, loading: authLoading } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Example: Fetch data from a table
  // Replace 'your_table' with your actual table name
  const { data, loading, refetch } = useSupabaseQuery('your_table', {
    enabled: !!user, // Only fetch when user is logged in
    limit: 10,
  });

  // Example: Mutations
  const { insert, update, remove } = useSupabaseMutation('your_table');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signUp(email, password);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signIn(email, password);
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (authLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Supabase Integration Example</h1>

      {!user ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Authentication</h2>
          
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex gap-2">
              <Button type="submit">Sign In</Button>
              <Button type="button" onClick={handleSignUp} variant="outline">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Welcome!</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Data Example</h3>
            
            {loading ? (
              <p>Loading data...</p>
            ) : data && data.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Found {data.length} records
                </p>
                <pre className="p-3 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
                <Button onClick={refetch} size="sm">
                  Refresh
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-gray-600">
                  No data found. Make sure you have a table named 'your_table' in Supabase.
                </p>
                <p className="text-sm text-gray-500">
                  Update the table name in the component to match your schema.
                </p>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  try {
                    await insert({ 
                      name: 'Test Item',
                      created_at: new Date().toISOString()
                    });
                    refetch();
                  } catch (err: any) {
                    setError(err.message);
                  }
                }}
                size="sm"
              >
                Insert Test Data
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">📚 Documentation</h3>
        <p className="text-sm text-gray-700">
          See <code className="bg-white px-1 rounded">SUPABASE_SETUP.md</code> for complete documentation and examples.
        </p>
      </div>
    </div>
  );
}
