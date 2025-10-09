# рџљЂ Supabase Quick Start

## РЁР°Рі 1: Р”РѕР±Р°РІСЊС‚Рµ РїРµСЂРµРјРµРЅРЅС‹Рµ РѕРєСЂСѓР¶РµРЅРёСЏ

РЎРѕР·РґР°Р№С‚Рµ РёР»Рё РѕР±РЅРѕРІРёС‚Рµ С„Р°Р№Р» `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://lyuxhqhusukvpvwtkkum.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzM0MjAsImV4cCI6MjA3NDc0OTQyMH0.JidO0voYsPldgFiaUYwAp-HmtOGLZnldW5Gyn0CMsYo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE3MzQyMCwiZXhwIjoyMDc0NzQ5NDIwfQ.LkxzPWN_T0jMmwJGwdkYs1Pkw01cYzf_4g4oSdxQcaE
```

## РЁР°Рі 2: РџРµСЂРµР·Р°РїСѓСЃС‚РёС‚Рµ СЃРµСЂРІРµСЂ

```bash
npm run dev
```

## РЁР°Рі 3: РСЃРїРѕР»СЊР·СѓР№С‚Рµ Supabase

### Р’ РєР»РёРµРЅС‚СЃРєРёС… РєРѕРјРїРѕРЅРµРЅС‚Р°С…:

```typescript
import { useSupabaseAuth, useSupabaseQuery } from '@/lib/hooks/useSupabase';

export default function MyComponent() {
  const { user } = useSupabaseAuth();
  const { data, loading } = useSupabaseQuery('my_table');
  
  return <div>{/* РІР°С€ РєРѕРґ */}</div>;
}
```

### Р’ API routes:

```typescript
import { executeServerOperation } from '@/lib/supabase-helpers';

export async function GET() {
  const data = await executeServerOperation(async (client) => {
    const { data } = await client.from('my_table').select('*');
    return data;
  });
  
  return Response.json(data);
}
```

## РЁР°Рі 4: РЎРѕР·РґР°Р№С‚Рµ С‚Р°Р±Р»РёС†С‹ РІ Supabase

РџРµСЂРµР№РґРёС‚Рµ РІ [Supabase Dashboard](https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum) Рё СЃРѕР·РґР°Р№С‚Рµ С‚Р°Р±Р»РёС†С‹ С‡РµСЂРµР· SQL Editor:

```sql
-- РџСЂРёРјРµСЂ С‚Р°Р±Р»РёС†С‹ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Р’РєР»СЋС‡РёС‚СЊ RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- РџРѕР»РёС‚РёРєР° РґРѕСЃС‚СѓРїР°
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

## рџ“љ РџРѕР»РЅР°СЏ РґРѕРєСѓРјРµРЅС‚Р°С†РёСЏ

РЎРј. `SUPABASE_SETUP.md` РґР»СЏ РїРѕРґСЂРѕР±РЅС‹С… РїСЂРёРјРµСЂРѕРІ Рё РІСЃРµС… РґРѕСЃС‚СѓРїРЅС‹С… С„СѓРЅРєС†РёР№.

## рџ§Є РўРµСЃС‚РёСЂРѕРІР°РЅРёРµ РїРѕРґРєР»СЋС‡РµРЅРёСЏ

РћС‚РєСЂРѕР№С‚Рµ РІ Р±СЂР°СѓР·РµСЂРµ:
```
http://localhost:3000/api/supabase-example
```

РР»Рё РёСЃРїРѕР»СЊР·СѓР№С‚Рµ РїСЂРёРјРµСЂ РєРѕРјРїРѕРЅРµРЅС‚Р°:
```typescript
import SupabaseExample from '@/components/SupabaseExample';
```

## рџ”— РџРѕР»РµР·РЅС‹Рµ СЃСЃС‹Р»РєРё

- **Р’Р°С€ РїСЂРѕРµРєС‚**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum
- **Р”РѕРєСѓРјРµРЅС‚Р°С†РёСЏ**: https://supabase.com/docs
- **SQL Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
