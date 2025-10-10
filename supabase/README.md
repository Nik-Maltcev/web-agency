# Supabase Migrations

Эта папка содержит SQL миграции для базы данных Supabase.

## 📖 Структура

```
supabase/
├── migrations/
│   └── 001_initial_schema.sql    # Начальная схема БД
└── README.md                      # Этот файл
```

## 🚀 Применение миграций

### Вариант 1: Через Supabase Dashboard (рекомендуется)

1. Откройте [SQL Editor](https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor)
2. Скопируйте содержимое файла миграции
3. Вставьте в редактор и нажмите "Run"

### Вариант 2: Через Supabase CLI

```bash
# Установите Supabase CLI (если еще не установлен)
npm install -g supabase

# Инициализируйте проект
supabase init

# Примените миграции
supabase db push
```

## 💾 Схема базы данных

### Таблицы

#### `profiles`
Профили пользователей, связанные с `auth.users`
- `id` (UUID) - Primary Key, ссылка на auth.users
- `email` (TEXT) - Email пользователя
- `full_name` (TEXT) - Полное имя
- `avatar_url` (TEXT) - URL аватара
- `created_at`, `updated_at` - Временные метки

#### `projects`
AI-генерируемые проекты
- `id` (UUID) - Primary Key
- `user_id` (UUID) - Владелец проекта
- `name` (TEXT) - Название проекта
- `description` (TEXT) - Описание
- `sandbox_id` (TEXT) - ID E2B песочницы
- `preview_url` (TEXT) - URL превью
- `status` (TEXT) - Статус: active, archived, deleted
- `metadata` (JSONB) - Дополнительные данные
- `created_at`, `updated_at` - Временные метки

#### `project_files`
Файлы проектов
- `id` (UUID) - Primary Key
- `project_id` (UUID) - Ссылка на проект
- `file_path` (TEXT) - Путь к файлу
- `content` (TEXT) - Содержимое файла
- `file_type` (TEXT) - Тип файла
- `size_bytes` (INTEGER) - Размер в байтах
- `created_at`, `updated_at` - Временные метки

#### `generation_history`
История генерации кода
- `id` (UUID) - Primary Key
- `project_id` (UUID) - Ссылка на проект
- `user_id` (UUID) - Пользователь
- `prompt` (TEXT) - Промпт для генерации
- `model` (TEXT) - Используемая модель
- `generated_files` (JSONB) - Список сгенерированных файлов
- `status` (TEXT) - Статус: pending, completed, failed
- `error_message` (TEXT) - Сообщение об ошибке
- `metadata` (JSONB) - Дополнительные данные
- `created_at` - Временная метка

## 🔐 Row Level Security (RLS)

Все таблицы защищены RLS политиками:
- Пользователи видят только свои данные
- Автоматическая проверка прав доступа
- Безопасность на уровне базы данных

## 🔄 Триггеры

### `handle_new_user()`
Автоматически создает профиль при регистрации нового пользователя.

### `update_updated_at_column()`
Автоматически обновляет поле `updated_at` при изменении записи.

## 📈 Индексы

Созданы индексы для оптимизации запросов:
- По `user_id` для быстрого поиска данных пользователя
- По `created_at` для сортировки по дате
- По `status` для фильтрации проектов
- По `file_path` для поиска файлов

## 🆕 Создание новых миграций

1. Создайте новый файл в `supabase/migrations/`
2. Используйте формат: `00X_description.sql`
3. Добавьте SQL код миграции
4. Примените через Dashboard или CLI

Пример:
```sql
-- 002_add_tags_table.sql
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔗 Полезные ссылки

- **SQL Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Table Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Database Settings**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/settings/database
- **Supabase Docs**: https://supabase.com/docs/guides/database