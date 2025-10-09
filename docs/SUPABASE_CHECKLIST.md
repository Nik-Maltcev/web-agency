# вњ… Supabase Integration Checklist

## РЈСЃС‚Р°РЅРѕРІРєР° Рё РєРѕРЅС„РёРіСѓСЂР°С†РёСЏ

- [x] РЈСЃС‚Р°РЅРѕРІР»РµРЅ РїР°РєРµС‚ `@supabase/supabase-js`
- [x] РЎРѕР·РґР°РЅС‹ С„Р°Р№Р»С‹ РєРѕРЅС„РёРіСѓСЂР°С†РёРё:
  - `lib/supabase.ts` - РѕСЃРЅРѕРІРЅРѕР№ РєР»РёРµРЅС‚
  - `lib/supabase-helpers.ts` - helper С„СѓРЅРєС†РёРё
  - `lib/hooks/useSupabase.ts` - React hooks
- [x] РћР±РЅРѕРІР»РµРЅ `.env.example` СЃ РїРµСЂРµРјРµРЅРЅС‹РјРё Supabase
- [ ] Р”РѕР±Р°РІР»РµРЅС‹ РїРµСЂРµРјРµРЅРЅС‹Рµ РІ `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://lyuxhqhusukvpvwtkkum.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```

## РќР°СЃС‚СЂРѕР№РєР° Р±Р°Р·С‹ РґР°РЅРЅС‹С…

- [ ] РЎРѕР·РґР°РЅС‹ РЅРµРѕР±С…РѕРґРёРјС‹Рµ С‚Р°Р±Р»РёС†С‹ РІ Supabase Dashboard
- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ Row Level Security (RLS) РїРѕР»РёС‚РёРєРё
- [ ] РЎРѕР·РґР°РЅС‹ РёРЅРґРµРєСЃС‹ РґР»СЏ РѕРїС‚РёРјРёР·Р°С†РёРё Р·Р°РїСЂРѕСЃРѕРІ
- [ ] РћР±РЅРѕРІР»РµРЅС‹ С‚РёРїС‹ РІ `types/supabase.ts` РїРѕРґ РІР°С€Сѓ СЃС…РµРјСѓ

## РђСѓС‚РµРЅС‚РёС„РёРєР°С†РёСЏ

- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ РїСЂРѕРІР°Р№РґРµСЂС‹ Р°СѓС‚РµРЅС‚РёС„РёРєР°С†РёРё РІ Supabase Dashboard
- [ ] Р”РѕР±Р°РІР»РµРЅС‹ redirect URLs РґР»СЏ OAuth
- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ email templates (РµСЃР»Рё РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ email auth)
- [ ] РџСЂРѕС‚РµСЃС‚РёСЂРѕРІР°РЅР° СЂРµРіРёСЃС‚СЂР°С†РёСЏ Рё РІС…РѕРґ

## Storage (РµСЃР»Рё РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ)

- [ ] РЎРѕР·РґР°РЅС‹ РЅРµРѕР±С…РѕРґРёРјС‹Рµ buckets
- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ РїРѕР»РёС‚РёРєРё РґРѕСЃС‚СѓРїР° РґР»СЏ buckets
- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ CORS РїСЂР°РІРёР»Р° (РµСЃР»Рё РЅСѓР¶РЅРѕ)

## РўРµСЃС‚РёСЂРѕРІР°РЅРёРµ

- [ ] РџСЂРѕС‚РµСЃС‚РёСЂРѕРІР°РЅРѕ РїРѕРґРєР»СЋС‡РµРЅРёРµ С‡РµСЂРµР· `/api/supabase-example`
- [ ] РџСЂРѕС‚РµСЃС‚РёСЂРѕРІР°РЅР° Р°СѓС‚РµРЅС‚РёС„РёРєР°С†РёСЏ
- [ ] РџСЂРѕС‚РµСЃС‚РёСЂРѕРІР°РЅС‹ CRUD РѕРїРµСЂР°С†РёРё
- [ ] РџСЂРѕС‚РµСЃС‚РёСЂРѕРІР°РЅС‹ realtime РїРѕРґРїРёСЃРєРё (РµСЃР»Рё РёСЃРїРѕР»СЊР·СѓСЋС‚СЃСЏ)
- [ ] РџСЂРѕС‚РµСЃС‚РёСЂРѕРІР°РЅ upload С„Р°Р№Р»РѕРІ (РµСЃР»Рё РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ)

## Р”РµРїР»РѕР№

- [ ] Р”РѕР±Р°РІР»РµРЅС‹ РїРµСЂРµРјРµРЅРЅС‹Рµ РѕРєСЂСѓР¶РµРЅРёСЏ РЅР° Railway/Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] РћР±РЅРѕРІР»РµРЅС‹ Allowed URLs РІ Supabase Dashboard
- [ ] РџСЂРѕС‚РµСЃС‚РёСЂРѕРІР°РЅР° СЂР°Р±РѕС‚Р° РЅР° production

## Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ

- [ ] вњ… Service Role Key РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ РўРћР›Р¬РљРћ РЅР° СЃРµСЂРІРµСЂРµ
- [ ] вњ… Anon Key Р±РµР·РѕРїР°СЃРµРЅ РґР»СЏ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ РЅР° РєР»РёРµРЅС‚Рµ
- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ RLS РїРѕР»РёС‚РёРєРё РґР»СЏ РІСЃРµС… С‚Р°Р±Р»РёС†
- [ ] РџСЂРѕРІРµСЂРµРЅС‹ РїСЂР°РІР° РґРѕСЃС‚СѓРїР° РґР»СЏ РІСЃРµС… РѕРїРµСЂР°С†РёР№
- [ ] РќР°СЃС‚СЂРѕРµРЅ rate limiting (РµСЃР»Рё РЅСѓР¶РЅРѕ)

## Р”РѕРєСѓРјРµРЅС‚Р°С†РёСЏ

- [x] РЎРѕР·РґР°РЅР° РґРѕРєСѓРјРµРЅС‚Р°С†РёСЏ `SUPABASE_SETUP.md`
- [x] РЎРѕР·РґР°РЅ quick start `SUPABASE_QUICKSTART.md`
- [x] РЎРѕР·РґР°РЅ РїСЂРёРјРµСЂ РєРѕРјРїРѕРЅРµРЅС‚Р° `components/SupabaseExample.tsx`
- [x] РЎРѕР·РґР°РЅ РїСЂРёРјРµСЂ API endpoint `app/api/supabase-example/route.ts`

## Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ

- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ database webhooks (РµСЃР»Рё РЅСѓР¶РЅРѕ)
- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ edge functions (РµСЃР»Рё РЅСѓР¶РЅРѕ)
- [ ] РќР°СЃС‚СЂРѕРµРЅ РјРѕРЅРёС‚РѕСЂРёРЅРі Рё Р»РѕРіРёСЂРѕРІР°РЅРёРµ
- [ ] РќР°СЃС‚СЂРѕРµРЅС‹ Р±СЌРєР°РїС‹ Р±Р°Р·С‹ РґР°РЅРЅС‹С…

## рџ“љ РџРѕР»РµР·РЅС‹Рµ РєРѕРјР°РЅРґС‹

```bash
# Р“РµРЅРµСЂР°С†РёСЏ TypeScript С‚РёРїРѕРІ РёР· СЃС…РµРјС‹
npx supabase gen types typescript --project-id lyuxhqhusukvpvwtkkum > types/supabase.ts

# Р—Р°РїСѓСЃРє Р»РѕРєР°Р»СЊРЅРѕРіРѕ Supabase (РµСЃР»Рё РёСЃРїРѕР»СЊР·СѓРµС‚Рµ)
npx supabase start

# РџСЂРёРјРµРЅРµРЅРёРµ РјРёРіСЂР°С†РёР№
npx supabase db push

# РЎР±СЂРѕСЃ Р»РѕРєР°Р»СЊРЅРѕР№ Р±Р°Р·С‹
npx supabase db reset
```

## рџ”— РЎСЃС‹Р»РєРё

- **Dashboard**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum
- **SQL Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Table Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Auth Settings**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/auth/users
- **Storage**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/storage/buckets
- **API Docs**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/api

## рџ† Troubleshooting

### РћС€РёР±РєР° РїРѕРґРєР»СЋС‡РµРЅРёСЏ
- РџСЂРѕРІРµСЂСЊС‚Рµ РїСЂР°РІРёР»СЊРЅРѕСЃС‚СЊ URL Рё РєР»СЋС‡РµР№
- РЈР±РµРґРёС‚РµСЃСЊ, С‡С‚Рѕ РїРµСЂРµРјРµРЅРЅС‹Рµ РѕРєСЂСѓР¶РµРЅРёСЏ Р·Р°РіСЂСѓР¶РµРЅС‹ (РїРµСЂРµР·Р°РїСѓСЃС‚РёС‚Рµ СЃРµСЂРІРµСЂ)

### RLS РѕС€РёР±РєРё
- РџСЂРѕРІРµСЂСЊС‚Рµ РїРѕР»РёС‚РёРєРё РґРѕСЃС‚СѓРїР° РІ Supabase Dashboard
- РЈР±РµРґРёС‚РµСЃСЊ, С‡С‚Рѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ Р°СѓС‚РµРЅС‚РёС„РёС†РёСЂРѕРІР°РЅ РґР»СЏ Р·Р°С‰РёС‰РµРЅРЅС‹С… РѕРїРµСЂР°С†РёР№

### CORS РѕС€РёР±РєРё
- Р”РѕР±Р°РІСЊС‚Рµ РІР°С€ РґРѕРјРµРЅ РІ Allowed URLs РІ Supabase Dashboard
- Р”Р»СЏ Р»РѕРєР°Р»СЊРЅРѕР№ СЂР°Р·СЂР°Р±РѕС‚РєРё РґРѕР±Р°РІСЊС‚Рµ `http://localhost:3000`

### Realtime РЅРµ СЂР°Р±РѕС‚Р°РµС‚
- РЈР±РµРґРёС‚РµСЃСЊ, С‡С‚Рѕ Realtime РІРєР»СЋС‡РµРЅ РґР»СЏ С‚Р°Р±Р»РёС†С‹ РІ Supabase Dashboard
- РџСЂРѕРІРµСЂСЊС‚Рµ RLS РїРѕР»РёС‚РёРєРё РґР»СЏ realtime РѕРїРµСЂР°С†РёР№
