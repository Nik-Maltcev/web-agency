# 🚀 Supabase Quick Start

## Шаг 1: Добавьте переменные окружения

Создайте или обновите файл `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://lyuxhqhusukvpvwtkkum.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzM0MjAsImV4cCI6MjA3NDc0OTQyMH0.JidO0voYsPldgFiaUYwAp-HmtOGLZnldW5Gyn0CMsYo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE3MzQyMCwiZXhwIjoyMDc0NzQ5NDIwfQ.LkxzPWN_T0jMmwJGwdkYs1Pkw01cYzf_4g4oSdxQcaE
```

## Шаг 2: Перезапустите сервер

```bash
npm run dev
```

## Шаг 3: Используйте Supabase

### В клиентских компонентах:

```typescript
import { useSupabaseAuth, useSupabaseQuery } from '@/lib/hooks/useSupabase';

export default function MyComponent() {
  const { user } = useSupabaseAuth();
  const { data, loading } = useSupabaseQuery('my_table');
  
  return <div>{/* ваш код */}</div>;
}
```

### В API routes:

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

## Шаг 4: Создайте таблицы в Supabase

Перейдите в [Supabase Dashboard](https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum) и создайте таблицы через SQL Editor:

```sql
-- Пример таблицы пользователей
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включить RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Политика доступа
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

## 📚 Полная документация

См. `SUPABASE_SETUP.md` для подробных примеров и всех доступных функций.

## 🧪 Тестирование подключения

Откройте в браузере:
```
http://localhost:3000/api/supabase-example
```

Или используйте пример компонента:
```typescript
import SupabaseExample from '@/components/SupabaseExample';
```

## 🔗 Полезные ссылки

- **Ваш проект**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum
- **Документация**: https://supabase.com/docs
- **SQL Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
