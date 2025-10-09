# Supabase Migrations

Р­С‚Р° РїР°РїРєР° СЃРѕРґРµСЂР¶РёС‚ SQL РјРёРіСЂР°С†РёРё РґР»СЏ Р±Р°Р·С‹ РґР°РЅРЅС‹С… Supabase.

## рџ“Ѓ РЎС‚СЂСѓРєС‚СѓСЂР°

```
supabase/
в”њв”Ђв”Ђ migrations/
в”‚   в””в”Ђв”Ђ 001_initial_schema.sql    # РќР°С‡Р°Р»СЊРЅР°СЏ СЃС…РµРјР° Р‘Р”
в””в”Ђв”Ђ README.md                      # Р­С‚РѕС‚ С„Р°Р№Р»
```

## рџљЂ РџСЂРёРјРµРЅРµРЅРёРµ РјРёРіСЂР°С†РёР№

### Р’Р°СЂРёР°РЅС‚ 1: Р§РµСЂРµР· Supabase Dashboard (СЂРµРєРѕРјРµРЅРґСѓРµС‚СЃСЏ)

1. РћС‚РєСЂРѕР№С‚Рµ [SQL Editor](https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor)
2. РЎРєРѕРїРёСЂСѓР№С‚Рµ СЃРѕРґРµСЂР¶РёРјРѕРµ С„Р°Р№Р»Р° РјРёРіСЂР°С†РёРё
3. Р’СЃС‚Р°РІСЊС‚Рµ РІ СЂРµРґР°РєС‚РѕСЂ Рё РЅР°Р¶РјРёС‚Рµ "Run"

### Р’Р°СЂРёР°РЅС‚ 2: Р§РµСЂРµР· Supabase CLI

```bash
# РЈСЃС‚Р°РЅРѕРІРёС‚Рµ Supabase CLI (РµСЃР»Рё РµС‰Рµ РЅРµ СѓСЃС‚Р°РЅРѕРІР»РµРЅ)
npm install -g supabase

# РРЅРёС†РёР°Р»РёР·РёСЂСѓР№С‚Рµ РїСЂРѕРµРєС‚
supabase init

# РџСЂРёРјРµРЅРёС‚Рµ РјРёРіСЂР°С†РёРё
supabase db push
```

## рџ“Љ РЎС…РµРјР° Р±Р°Р·С‹ РґР°РЅРЅС‹С…

### РўР°Р±Р»РёС†С‹

#### `profiles`
РџСЂРѕС„РёР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№, СЃРІСЏР·Р°РЅРЅС‹Рµ СЃ `auth.users`
- `id` (UUID) - Primary Key, СЃСЃС‹Р»РєР° РЅР° auth.users
- `email` (TEXT) - Email РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
- `full_name` (TEXT) - РџРѕР»РЅРѕРµ РёРјСЏ
- `avatar_url` (TEXT) - URL Р°РІР°С‚Р°СЂР°
- `created_at`, `updated_at` - Р’СЂРµРјРµРЅРЅС‹Рµ РјРµС‚РєРё

#### `projects`
AI-РіРµРЅРµСЂРёСЂСѓРµРјС‹Рµ РїСЂРѕРµРєС‚С‹
- `id` (UUID) - Primary Key
- `user_id` (UUID) - Р’Р»Р°РґРµР»РµС† РїСЂРѕРµРєС‚Р°
- `name` (TEXT) - РќР°Р·РІР°РЅРёРµ РїСЂРѕРµРєС‚Р°
- `description` (TEXT) - РћРїРёСЃР°РЅРёРµ
- `sandbox_id` (TEXT) - ID E2B РїРµСЃРѕС‡РЅРёС†С‹
- `preview_url` (TEXT) - URL РїСЂРµРІСЊСЋ
- `status` (TEXT) - РЎС‚Р°С‚СѓСЃ: active, archived, deleted
- `metadata` (JSONB) - Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ
- `created_at`, `updated_at` - Р’СЂРµРјРµРЅРЅС‹Рµ РјРµС‚РєРё

#### `project_files`
Р¤Р°Р№Р»С‹ РїСЂРѕРµРєС‚РѕРІ
- `id` (UUID) - Primary Key
- `project_id` (UUID) - РЎСЃС‹Р»РєР° РЅР° РїСЂРѕРµРєС‚
- `file_path` (TEXT) - РџСѓС‚СЊ Рє С„Р°Р№Р»Сѓ
- `content` (TEXT) - РЎРѕРґРµСЂР¶РёРјРѕРµ С„Р°Р№Р»Р°
- `file_type` (TEXT) - РўРёРї С„Р°Р№Р»Р°
- `size_bytes` (INTEGER) - Р Р°Р·РјРµСЂ РІ Р±Р°Р№С‚Р°С…
- `created_at`, `updated_at` - Р’СЂРµРјРµРЅРЅС‹Рµ РјРµС‚РєРё

#### `generation_history`
РСЃС‚РѕСЂРёСЏ РіРµРЅРµСЂР°С†РёРё РєРѕРґР°
- `id` (UUID) - Primary Key
- `project_id` (UUID) - РЎСЃС‹Р»РєР° РЅР° РїСЂРѕРµРєС‚
- `user_id` (UUID) - РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ
- `prompt` (TEXT) - РџСЂРѕРјРїС‚ РґР»СЏ РіРµРЅРµСЂР°С†РёРё
- `model` (TEXT) - РСЃРїРѕР»СЊР·РѕРІР°РЅРЅР°СЏ РјРѕРґРµР»СЊ
- `generated_files` (JSONB) - РЎРїРёСЃРѕРє СЃРіРµРЅРµСЂРёСЂРѕРІР°РЅРЅС‹С… С„Р°Р№Р»РѕРІ
- `status` (TEXT) - РЎС‚Р°С‚СѓСЃ: pending, completed, failed
- `error_message` (TEXT) - РЎРѕРѕР±С‰РµРЅРёРµ РѕР± РѕС€РёР±РєРµ
- `metadata` (JSONB) - Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ
- `created_at` - Р’СЂРµРјРµРЅРЅР°СЏ РјРµС‚РєР°

## рџ”ђ Row Level Security (RLS)

Р’СЃРµ С‚Р°Р±Р»РёС†С‹ Р·Р°С‰РёС‰РµРЅС‹ RLS РїРѕР»РёС‚РёРєР°РјРё:
- РџРѕР»СЊР·РѕРІР°С‚РµР»Рё РІРёРґСЏС‚ С‚РѕР»СЊРєРѕ СЃРІРѕРё РґР°РЅРЅС‹Рµ
- РђРІС‚РѕРјР°С‚РёС‡РµСЃРєР°СЏ РїСЂРѕРІРµСЂРєР° РїСЂР°РІ РґРѕСЃС‚СѓРїР°
- Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ РЅР° СѓСЂРѕРІРЅРµ Р±Р°Р·С‹ РґР°РЅРЅС‹С…

## рџ”„ РўСЂРёРіРіРµСЂС‹

### `handle_new_user()`
РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРё СЃРѕР·РґР°РµС‚ РїСЂРѕС„РёР»СЊ РїСЂРё СЂРµРіРёСЃС‚СЂР°С†РёРё РЅРѕРІРѕРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ.

### `update_updated_at_column()`
РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРё РѕР±РЅРѕРІР»СЏРµС‚ РїРѕР»Рµ `updated_at` РїСЂРё РёР·РјРµРЅРµРЅРёРё Р·Р°РїРёСЃРё.

## рџ“€ РРЅРґРµРєСЃС‹

РЎРѕР·РґР°РЅС‹ РёРЅРґРµРєСЃС‹ РґР»СЏ РѕРїС‚РёРјРёР·Р°С†РёРё Р·Р°РїСЂРѕСЃРѕРІ:
- РџРѕ `user_id` РґР»СЏ Р±С‹СЃС‚СЂРѕРіРѕ РїРѕРёСЃРєР° РґР°РЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
- РџРѕ `created_at` РґР»СЏ СЃРѕСЂС‚РёСЂРѕРІРєРё РїРѕ РґР°С‚Рµ
- РџРѕ `status` РґР»СЏ С„РёР»СЊС‚СЂР°С†РёРё РїСЂРѕРµРєС‚РѕРІ
- РџРѕ `file_path` РґР»СЏ РїРѕРёСЃРєР° С„Р°Р№Р»РѕРІ

## рџ†• РЎРѕР·РґР°РЅРёРµ РЅРѕРІС‹С… РјРёРіСЂР°С†РёР№

1. РЎРѕР·РґР°Р№С‚Рµ РЅРѕРІС‹Р№ С„Р°Р№Р» РІ `supabase/migrations/`
2. РСЃРїРѕР»СЊР·СѓР№С‚Рµ С„РѕСЂРјР°С‚: `00X_description.sql`
3. Р”РѕР±Р°РІСЊС‚Рµ SQL РєРѕРґ РјРёРіСЂР°С†РёРё
4. РџСЂРёРјРµРЅРёС‚Рµ С‡РµСЂРµР· Dashboard РёР»Рё CLI

РџСЂРёРјРµСЂ:
```sql
-- 002_add_tags_table.sql
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## рџ”— РџРѕР»РµР·РЅС‹Рµ СЃСЃС‹Р»РєРё

- **SQL Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Table Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Database Settings**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/settings/database
- **Supabase Docs**: https://supabase.com/docs/guides/database
