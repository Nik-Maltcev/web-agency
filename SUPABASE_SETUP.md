# Supabase Integration Setup

## 📋 Конфигурация

Ваш проект настроен для работы с Supabase. Добавьте следующие переменные окружения в `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://lyuxhqhusukvpvwtkkum.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzM0MjAsImV4cCI6MjA3NDc0OTQyMH0.JidO0voYsPldgFiaUYwAp-HmtOGLZnldW5Gyn0CMsYo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXhocWh1c3VrdnB2d3Rra3VtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTE3MzQyMCwiZXhwIjoyMDc0NzQ5NDIwfQ.LkxzPWN_T0jMmwJGwdkYs1Pkw01cYzf_4g4oSdxQcaE
```

## 🚀 Установка

Пакет `@supabase/supabase-js` уже установлен. Если нужно переустановить:

```bash
npm install @supabase/supabase-js
```

## 📁 Файлы

### `lib/supabase.ts`
Основной клиент Supabase с конфигурацией для client-side и server-side операций.

### `lib/supabase-helpers.ts`
Набор готовых helper-функций для работы с Supabase:
- **Authentication**: sign up, sign in, sign out, get user
- **Database**: CRUD операции
- **Storage**: upload, download, delete файлов
- **Realtime**: подписка на изменения в таблицах

## 💡 Примеры использования

### 1. Аутентификация

```typescript
import { signUp, signIn, signOut, getCurrentUser } from '@/lib/supabase-helpers';

// Регистрация
const user = await signUp('user@example.com', 'password123', {
  full_name: 'John Doe'
});

// Вход
const session = await signIn('user@example.com', 'password123');

// Получить текущего пользователя
const currentUser = await getCurrentUser();

// Выход
await signOut();
```

### 2. Работа с базой данных

```typescript
import { 
  fetchFromTable, 
  insertIntoTable, 
  updateInTable, 
  deleteFromTable 
} from '@/lib/supabase-helpers';

// Получить данные
const users = await fetchFromTable('users', {
  select: 'id, name, email',
  filters: { status: 'active' },
  orderBy: { column: 'created_at', ascending: false },
  limit: 10
});

// Вставить данные
const newUser = await insertIntoTable('users', {
  name: 'John Doe',
  email: 'john@example.com',
  status: 'active'
});

// Обновить данные
await updateInTable('users', 
  { id: 1 }, 
  { name: 'Jane Doe' }
);

// Удалить данные
await deleteFromTable('users', { id: 1 });
```

### 3. Работа с файлами (Storage)

```typescript
import { 
  uploadFile, 
  getPublicUrl, 
  downloadFile, 
  deleteFile 
} from '@/lib/supabase-helpers';

// Загрузить файл
const file = document.querySelector('input[type="file"]').files[0];
await uploadFile('avatars', `user-${userId}.png`, file);

// Получить публичный URL
const url = getPublicUrl('avatars', `user-${userId}.png`);

// Скачать файл
const blob = await downloadFile('avatars', `user-${userId}.png`);

// Удалить файл
await deleteFile('avatars', `user-${userId}.png`);
```

### 4. Realtime подписки

```typescript
import { subscribeToTable, unsubscribe } from '@/lib/supabase-helpers';

// Подписаться на изменения
const channel = subscribeToTable('messages', (payload) => {
  console.log('Change received!', payload);
}, {
  event: 'INSERT', // или 'UPDATE', 'DELETE', '*'
  filter: 'room_id=eq.1'
});

// Отписаться
await unsubscribe(channel);
```

### 5. Server-side операции (API Routes)

```typescript
import { executeServerOperation } from '@/lib/supabase-helpers';

// В API route
export async function POST(request: Request) {
  const result = await executeServerOperation(async (serverClient) => {
    // Используем serverClient с service_role правами
    const { data, error } = await serverClient
      .from('admin_data')
      .select('*');
    
    return data;
  });
  
  return Response.json(result);
}
```

### 6. Прямое использование клиента

```typescript
import { supabase } from '@/lib/supabase';

// Для более сложных запросов
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

## 🔐 Безопасность

- **NEXT_PUBLIC_SUPABASE_ANON_KEY** - безопасно использовать на клиенте (публичный ключ)
- **SUPABASE_SERVICE_ROLE_KEY** - использовать ТОЛЬКО на сервере (API routes)
- Настройте Row Level Security (RLS) в Supabase для защиты данных

## 📚 Дополнительные ресурсы

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🎯 Следующие шаги

1. Создайте таблицы в Supabase Dashboard
2. Настройте Row Level Security (RLS) политики
3. Создайте Storage buckets если нужно работать с файлами
4. Интегрируйте аутентификацию в ваше приложение
5. Используйте helper-функции для работы с данными

## 🔄 Миграции

Для создания таблиц можно использовать SQL Editor в Supabase Dashboard или создать миграции:

```sql
-- Пример создания таблицы users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включить RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Создать политику (пользователи видят только свои данные)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);
```
