# Supabase Integration Setup

## рџ“‹ РљРѕРЅС„РёРіСѓСЂР°С†РёСЏ

Р’Р°С€ РїСЂРѕРµРєС‚ РЅР°СЃС‚СЂРѕРµРЅ РґР»СЏ СЂР°Р±РѕС‚С‹ СЃ Supabase. Р”РѕР±Р°РІСЊС‚Рµ СЃР»РµРґСѓСЋС‰РёРµ РїРµСЂРµРјРµРЅРЅС‹Рµ РѕРєСЂСѓР¶РµРЅРёСЏ РІ `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://lyuxhqhusukvpvwtkkum.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzM0MjAsImV4cCI6MjA3NDc0OTQyMH0.JidO0voYsPldgFiaUYwAp-HmtOGLZnldW5Gyn0CMsYo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE3MzQyMCwiZXhwIjoyMDc0NzQ5NDIwfQ.LkxzPWN_T0jMmwJGwdkYs1Pkw01cYzf_4g4oSdxQcaE
```

## рџљЂ РЈСЃС‚Р°РЅРѕРІРєР°

РџР°РєРµС‚ `@supabase/supabase-js` СѓР¶Рµ СѓСЃС‚Р°РЅРѕРІР»РµРЅ. Р•СЃР»Рё РЅСѓР¶РЅРѕ РїРµСЂРµСѓСЃС‚Р°РЅРѕРІРёС‚СЊ:

```bash
npm install @supabase/supabase-js
```

## рџ“Ѓ Р¤Р°Р№Р»С‹

### `lib/supabase.ts`
РћСЃРЅРѕРІРЅРѕР№ РєР»РёРµРЅС‚ Supabase СЃ РєРѕРЅС„РёРіСѓСЂР°С†РёРµР№ РґР»СЏ client-side Рё server-side РѕРїРµСЂР°С†РёР№.

### `lib/supabase-helpers.ts`
РќР°Р±РѕСЂ РіРѕС‚РѕРІС‹С… helper-С„СѓРЅРєС†РёР№ РґР»СЏ СЂР°Р±РѕС‚С‹ СЃ Supabase:
- **Authentication**: sign up, sign in, sign out, get user
- **Database**: CRUD РѕРїРµСЂР°С†РёРё
- **Storage**: upload, download, delete С„Р°Р№Р»РѕРІ
- **Realtime**: РїРѕРґРїРёСЃРєР° РЅР° РёР·РјРµРЅРµРЅРёСЏ РІ С‚Р°Р±Р»РёС†Р°С…

## рџ’Ў РџСЂРёРјРµСЂС‹ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ

### 1. РђСѓС‚РµРЅС‚РёС„РёРєР°С†РёСЏ

```typescript
import { signUp, signIn, signOut, getCurrentUser } from '@/lib/supabase-helpers';

// Р РµРіРёСЃС‚СЂР°С†РёСЏ
const user = await signUp('user@example.com', 'password123', {
  full_name: 'John Doe'
});

// Р’С…РѕРґ
const session = await signIn('user@example.com', 'password123');

// РџРѕР»СѓС‡РёС‚СЊ С‚РµРєСѓС‰РµРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
const currentUser = await getCurrentUser();

// Р’С‹С…РѕРґ
await signOut();
```

### 2. Р Р°Р±РѕС‚Р° СЃ Р±Р°Р·РѕР№ РґР°РЅРЅС‹С…

```typescript
import { 
  fetchFromTable, 
  insertIntoTable, 
  updateInTable, 
  deleteFromTable 
} from '@/lib/supabase-helpers';

// РџРѕР»СѓС‡РёС‚СЊ РґР°РЅРЅС‹Рµ
const users = await fetchFromTable('users', {
  select: 'id, name, email',
  filters: { status: 'active' },
  orderBy: { column: 'created_at', ascending: false },
  limit: 10
});

// Р’СЃС‚Р°РІРёС‚СЊ РґР°РЅРЅС‹Рµ
const newUser = await insertIntoTable('users', {
  name: 'John Doe',
  email: 'john@example.com',
  status: 'active'
});

// РћР±РЅРѕРІРёС‚СЊ РґР°РЅРЅС‹Рµ
await updateInTable('users', 
  { id: 1 }, 
  { name: 'Jane Doe' }
);

// РЈРґР°Р»РёС‚СЊ РґР°РЅРЅС‹Рµ
await deleteFromTable('users', { id: 1 });
```

### 3. Р Р°Р±РѕС‚Р° СЃ С„Р°Р№Р»Р°РјРё (Storage)

```typescript
import { 
  uploadFile, 
  getPublicUrl, 
  downloadFile, 
  deleteFile 
} from '@/lib/supabase-helpers';

// Р—Р°РіСЂСѓР·РёС‚СЊ С„Р°Р№Р»
const file = document.querySelector('input[type="file"]').files[0];
await uploadFile('avatars', `user-${userId}.png`, file);

// РџРѕР»СѓС‡РёС‚СЊ РїСѓР±Р»РёС‡РЅС‹Р№ URL
const url = getPublicUrl('avatars', `user-${userId}.png`);

// РЎРєР°С‡Р°С‚СЊ С„Р°Р№Р»
const blob = await downloadFile('avatars', `user-${userId}.png`);

// РЈРґР°Р»РёС‚СЊ С„Р°Р№Р»
await deleteFile('avatars', `user-${userId}.png`);
```

### 4. Realtime РїРѕРґРїРёСЃРєРё

```typescript
import { subscribeToTable, unsubscribe } from '@/lib/supabase-helpers';

// РџРѕРґРїРёСЃР°С‚СЊСЃСЏ РЅР° РёР·РјРµРЅРµРЅРёСЏ
const channel = subscribeToTable('messages', (payload) => {
  console.log('Change received!', payload);
}, {
  event: 'INSERT', // РёР»Рё 'UPDATE', 'DELETE', '*'
  filter: 'room_id=eq.1'
});

// РћС‚РїРёСЃР°С‚СЊСЃСЏ
await unsubscribe(channel);
```

### 5. Server-side РѕРїРµСЂР°С†РёРё (API Routes)

```typescript
import { executeServerOperation } from '@/lib/supabase-helpers';

// Р’ API route
export async function POST(request: Request) {
  const result = await executeServerOperation(async (serverClient) => {
    // РСЃРїРѕР»СЊР·СѓРµРј serverClient СЃ service_role РїСЂР°РІР°РјРё
    const { data, error } = await serverClient
      .from('admin_data')
      .select('*');
    
    return data;
  });
  
  return Response.json(result);
}
```

### 6. РџСЂСЏРјРѕРµ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ РєР»РёРµРЅС‚Р°

```typescript
import { supabase } from '@/lib/supabase';

// Р”Р»СЏ Р±РѕР»РµРµ СЃР»РѕР¶РЅС‹С… Р·Р°РїСЂРѕСЃРѕРІ
const { data, error } = await supabase
  .from('posts')
  .select(`
    id,
    title,
    author:users(name, email),
    comments(count)
  `)
  .eq('published', true)
  .gte('created_at', '2024-01-01')
  .order('created_at', { ascending: false });
```

## рџ”ђ Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ

- **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Р±РµР·РѕРїР°СЃРЅРѕ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РЅР° РєР»РёРµРЅС‚Рµ (РїСѓР±Р»РёС‡РЅС‹Р№ РєР»СЋС‡)
- **SUPABASE_SERVICE_ROLE_KEY** - РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РўРћР›Р¬РљРћ РЅР° СЃРµСЂРІРµСЂРµ (API routes)
- РќР°СЃС‚СЂРѕР№С‚Рµ Row Level Security (RLS) РІ Supabase РґР»СЏ Р·Р°С‰РёС‚С‹ РґР°РЅРЅС‹С…

## рџ“љ Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ СЂРµСЃСѓСЂСЃС‹

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## рџЋЇ РЎР»РµРґСѓСЋС‰РёРµ С€Р°РіРё

1. РЎРѕР·РґР°Р№С‚Рµ С‚Р°Р±Р»РёС†С‹ РІ Supabase Dashboard
2. РќР°СЃС‚СЂРѕР№С‚Рµ Row Level Security (RLS) РїРѕР»РёС‚РёРєРё
3. РЎРѕР·РґР°Р№С‚Рµ Storage buckets РµСЃР»Рё РЅСѓР¶РЅРѕ СЂР°Р±РѕС‚Р°С‚СЊ СЃ С„Р°Р№Р»Р°РјРё
4. РРЅС‚РµРіСЂРёСЂСѓР№С‚Рµ Р°СѓС‚РµРЅС‚РёС„РёРєР°С†РёСЋ РІ РІР°С€Рµ РїСЂРёР»РѕР¶РµРЅРёРµ
5. РСЃРїРѕР»СЊР·СѓР№С‚Рµ helper-С„СѓРЅРєС†РёРё РґР»СЏ СЂР°Р±РѕС‚С‹ СЃ РґР°РЅРЅС‹РјРё

## рџ”„ РњРёРіСЂР°С†РёРё

Р”Р»СЏ СЃРѕР·РґР°РЅРёСЏ С‚Р°Р±Р»РёС† РјРѕР¶РЅРѕ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ SQL Editor РІ Supabase Dashboard РёР»Рё СЃРѕР·РґР°С‚СЊ РјРёРіСЂР°С†РёРё:

```sql
-- РџСЂРёРјРµСЂ СЃРѕР·РґР°РЅРёСЏ С‚Р°Р±Р»РёС†С‹ users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Р’РєР»СЋС‡РёС‚СЊ RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- РЎРѕР·РґР°С‚СЊ РїРѕР»РёС‚РёРєСѓ (РїРѕР»СЊР·РѕРІР°С‚РµР»Рё РІРёРґСЏС‚ С‚РѕР»СЊРєРѕ СЃРІРѕРё РґР°РЅРЅС‹Рµ)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```
