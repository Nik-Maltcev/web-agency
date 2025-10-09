# Open Lovable

РћР±С‰Р°Р№С‚РµСЃСЊ СЃ РР РґР»СЏ РјРіРЅРѕРІРµРЅРЅРѕРіРѕ СЃРѕР·РґР°РЅРёСЏ React РїСЂРёР»РѕР¶РµРЅРёР№. РџСЂРёРјРµСЂ РїСЂРёР»РѕР¶РµРЅРёСЏ РѕС‚ РєРѕРјР°РЅРґС‹ [Firecrawl](https://firecrawl.dev/?ref=open-lovable-github). Р”Р»СЏ РїРѕР»РЅРѕРіРѕ РѕР±Р»Р°С‡РЅРѕРіРѕ СЂРµС€РµРЅРёСЏ, РїРѕСЃРµС‚РёС‚Рµ [Lovable.dev вќ¤пёЏ](https://lovable.dev/).

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZtaHFleGRsMTNlaWNydGdianI4NGQ4dHhyZjB0d2VkcjRyeXBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZFVLWMa6dVskQX0qu1/giphy.gif" alt="Open Lovable Demo" width="100%"/>



## РќР°СЃС‚СЂРѕР№РєР°

1. **РљР»РѕРЅРёСЂРѕРІР°С‚СЊ Рё СѓСЃС‚Р°РЅРѕРІРёС‚СЊ**
```bash
git clone https://github.com/mendableai/open-lovable.git
cd open-lovable
npm install
```

2. **Р”РѕР±Р°РІРёС‚СЊ `.env.local`**
```env
# РћР±СЏР·Р°С‚РµР»СЊРЅС‹Рµ
E2B_API_KEY=your_e2b_api_key  # РџРѕР»СѓС‡РёС‚СЊ СЃ https://e2b.dev (РџРµСЃРѕС‡РЅРёС†С‹)
FIRECRAWL_API_KEY=your_firecrawl_api_key  # РџРѕР»СѓС‡РёС‚СЊ СЃ https://firecrawl.dev (РџР°СЂСЃРёРЅРі РІРµР±-СЃР°Р№С‚РѕРІ)

# Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ (РЅСѓР¶РµРЅ РјРёРЅРёРјСѓРј РѕРґРёРЅ РР РїСЂРѕРІР°Р№РґРµСЂ)
ANTHROPIC_API_KEY=your_anthropic_api_key  # РџРѕР»СѓС‡РёС‚СЊ СЃ https://console.anthropic.com
OPENAI_API_KEY=your_openai_api_key  # РџРѕР»СѓС‡РёС‚СЊ СЃ https://platform.openai.com (GPT-5)
GEMINI_API_KEY=your_gemini_api_key  # РџРѕР»СѓС‡РёС‚СЊ СЃ https://aistudio.google.com/app/apikey
GROQ_API_KEY=your_groq_api_key  # РџРѕР»СѓС‡РёС‚СЊ СЃ https://console.groq.com (Р‘С‹СЃС‚СЂС‹Р№ РІС‹РІРѕРґ - СЂРµРєРѕРјРµРЅРґСѓРµС‚СЃСЏ Kimi K2)

# Supabase (РѕРїС†РёРѕРЅР°Р»СЊРЅРѕ)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url  # URL РїСЂРѕРµРєС‚Р° Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key  # РџСѓР±Р»РёС‡РЅС‹Р№ РєР»СЋС‡
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # РљР»СЋС‡ РґР»СЏ СЃРµСЂРІРµСЂРЅС‹С… РѕРїРµСЂР°С†РёР№
```

3. **Р—Р°РїСѓСЃС‚РёС‚СЊ**
```bash
npm run dev
```

РћС‚РєСЂС‹С‚СЊ [http://localhost:3000](http://localhost:3000)

## Р”РµРїР»РѕР№ РЅР° Railway

1. **РЎРѕР·РґР°С‚СЊ Р°РєРєР°СѓРЅС‚ РЅР° [Railway](https://railway.app/)**

2. **РџРѕРґРєР»СЋС‡РёС‚СЊ РІР°С€ GitHub СЂРµРїРѕР·РёС‚РѕСЂРёР№**
   - РќР°Р¶Р°С‚СЊ "New Project"
   - Р’С‹Р±СЂР°С‚СЊ "Deploy from GitHub repo"
   - Р’С‹Р±СЂР°С‚СЊ РІР°С€ С„РѕСЂРє СЌС‚РѕРіРѕ СЂРµРїРѕР·РёС‚РѕСЂРёСЏ

3. **РќР°СЃС‚СЂРѕРёС‚СЊ РїРµСЂРµРјРµРЅРЅС‹Рµ РѕРєСЂСѓР¶РµРЅРёСЏ**
   Р’ СЂР°Р·РґРµР»Рµ Variables РґРѕР±Р°РІРёС‚СЊ:
   ```
   E2B_API_KEY=your_e2b_api_key
   FIRECRAWL_API_KEY=your_firecrawl_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   NODE_ENV=production
   ```

4. **Р”РµРїР»РѕР№ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РЅР°С‡РЅС‘С‚СЃСЏ**
   Railway Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РѕР±РЅР°СЂСѓР¶РёС‚ Next.js РїСЂРёР»РѕР¶РµРЅРёРµ Рё СЂР°Р·РІРµСЂРЅС‘С‚ РµРіРѕ.

5. **РџРѕР»СѓС‡РёС‚СЊ URL**
   РџРѕСЃР»Рµ СѓСЃРїРµС€РЅРѕРіРѕ РґРµРїР»РѕСЏ РІС‹ РїРѕР»СѓС‡РёС‚Рµ РїСѓР±Р»РёС‡РЅС‹Р№ URL РґР»СЏ РІР°С€РµРіРѕ РїСЂРёР»РѕР¶РµРЅРёСЏ.

### Р¤Р°Р№Р»С‹ РґР»СЏ Railway

- `railway.json` - РєРѕРЅС„РёРіСѓСЂР°С†РёСЏ Railway
- `.env.example` - РїСЂРёРјРµСЂ РїРµСЂРµРјРµРЅРЅС‹С… РѕРєСЂСѓР¶РµРЅРёСЏ
- `package.json` - СѓР¶Рµ СЃРѕРґРµСЂР¶РёС‚ РЅРµРѕР±С…РѕРґРёРјС‹Рµ СЃРєСЂРёРїС‚С‹ РґР»СЏ Railway

## Р›РёС†РµРЅР·РёСЏ

MIT
