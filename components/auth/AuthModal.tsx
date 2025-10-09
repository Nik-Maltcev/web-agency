'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn, signUp } from '@/lib/supabase-helpers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password, { full_name: fullName });
        setSuccess('Р РµРіРёСЃС‚СЂР°С†РёСЏ СѓСЃРїРµС€РЅР°! РџСЂРѕРІРµСЂСЊС‚Рµ email РґР»СЏ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ.');
        setTimeout(() => {
          setMode('signin');
          setSuccess(null);
        }, 3000);
      } else {
        await signIn(email, password);
        setSuccess('Р’С…РѕРґ РІС‹РїРѕР»РЅРµРЅ СѓСЃРїРµС€РЅРѕ!');
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || 'РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 m-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {mode === 'signin' ? 'Р’С…РѕРґ' : 'Р РµРіРёСЃС‚СЂР°С†РёСЏ'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {mode === 'signin'
              ? 'Р’РѕР№РґРёС‚Рµ РІ СЃРІРѕР№ Р°РєРєР°СѓРЅС‚'
              : 'РЎРѕР·РґР°Р№С‚Рµ РЅРѕРІС‹Р№ Р°РєРєР°СѓРЅС‚'}
          </p>
        </div>

        {/* Error/Success messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                РџРѕР»РЅРѕРµ РёРјСЏ
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="РРІР°РЅ РРІР°РЅРѕРІ"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              РџР°СЂРѕР»СЊ
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="вЂўвЂўвЂўвЂўвЂўвЂўвЂўвЂў"
              required
              minLength={6}
            />
            {mode === 'signup' && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                РњРёРЅРёРјСѓРј 6 СЃРёРјРІРѕР»РѕРІ
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold"
          >
            {loading ? 'Р—Р°РіСЂСѓР·РєР°...' : mode === 'signin' ? 'Р’РѕР№С‚Рё' : 'Р—Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°С‚СЊСЃСЏ'}
          </Button>
        </form>

        {/* Toggle mode */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError(null);
              setSuccess(null);
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            {mode === 'signin'
              ? 'РќРµС‚ Р°РєРєР°СѓРЅС‚Р°? Р—Р°СЂРµРіРёСЃС‚СЂРёСЂСѓР№С‚РµСЃСЊ'
              : 'РЈР¶Рµ РµСЃС‚СЊ Р°РєРєР°СѓРЅС‚? Р’РѕР№РґРёС‚Рµ'}
          </button>
        </div>
      </div>
    </div>
  );
}
