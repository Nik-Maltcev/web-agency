# рџ“Љ РЎРёСЃС‚РµРјР° РѕРіСЂР°РЅРёС‡РµРЅРёР№ РїРѕ С‚Р°СЂРёС„Р°Рј

## вњ… Р§С‚Рѕ Р±С‹Р»Рѕ СЃРѕР·РґР°РЅРѕ

### 1. Р‘Р°Р·Р° РґР°РЅРЅС‹С…
- **`supabase/migrations/002_add_usage_limits.sql`** - РјРёРіСЂР°С†РёСЏ СЃ С‚Р°Р±Р»РёС†Р°РјРё Рё С„СѓРЅРєС†РёСЏРјРё
- РўР°Р±Р»РёС†С‹:
  - `usage_history` - РёСЃС‚РѕСЂРёСЏ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ Р·Р°РїСЂРѕСЃРѕРІ
  - `subscription_history` - РёСЃС‚РѕСЂРёСЏ РїРѕРґРїРёСЃРѕРє
- Р¤СѓРЅРєС†РёРё:
  - `get_remaining_requests()` - РїРѕР»СѓС‡РёС‚СЊ РѕСЃС‚Р°РІС€РёРµСЃСЏ Р·Р°РїСЂРѕСЃС‹
  - `increment_usage()` - СѓРІРµР»РёС‡РёС‚СЊ СЃС‡РµС‚С‡РёРє РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ
  - `set_subscription_tier()` - СѓСЃС‚Р°РЅРѕРІРёС‚СЊ С‚Р°СЂРёС„
  - `reset_monthly_usage()` - СЃР±СЂРѕСЃРёС‚СЊ РјРµСЃСЏС‡РЅРѕРµ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ
  - `expire_subscriptions()` - РёСЃС‚РµС‡СЊ РїСЂРѕСЃСЂРѕС‡РµРЅРЅС‹Рµ РїРѕРґРїРёСЃРєРё

### 2. TypeScript Р±РёР±Р»РёРѕС‚РµРєР°
- **`lib/supabase-usage.ts`** - С„СѓРЅРєС†РёРё РґР»СЏ СЂР°Р±РѕС‚С‹ СЃ Р»РёРјРёС‚Р°РјРё
- **`lib/hooks/useUsageLimits.ts`** - React hook РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ Р»РёРјРёС‚РѕРІ

### 3. РљРѕРјРїРѕРЅРµРЅС‚С‹
- **`components/UsageLimitBadge.tsx`** - Р±РµР№РґР¶ СЃ РѕСЃС‚Р°РІС€РёРјРёСЃСЏ Р·Р°РїСЂРѕСЃР°РјРё

### 4. API Endpoints
- **`/api/check-usage`** - РїСЂРѕРІРµСЂРєР° Р»РёРјРёС‚РѕРІ (GET) Рё РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ Р·Р°РїСЂРѕСЃР° (POST)
- **`/api/set-subscription`** - СѓСЃС‚Р°РЅРѕРІРєР° РїРѕРґРїРёСЃРєРё (РґР»СЏ С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ)

## рџ’° РўР°СЂРёС„РЅС‹Рµ РїР»Р°РЅС‹

| РўР°СЂРёС„ | Р—Р°РїСЂРѕСЃРѕРІ | РЎС‚РѕРёРјРѕСЃС‚СЊ |
|-------|----------|-----------|
| **Р‘РµСЃРїР»Р°С‚РЅС‹Р№** | 0 | Р‘РµСЃРїР»Р°С‚РЅРѕ |
| **Р‘Р°Р·РѕРІС‹Р№** | 5 | РџРѕ РІР°С€РµР№ С†РµРЅРµ |
| **РџСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹Р№** | 15 | РџРѕ РІР°С€РµР№ С†РµРЅРµ |

## рџљЂ РЈСЃС‚Р°РЅРѕРІРєР°

### РЁР°Рі 1: РџСЂРёРјРµРЅРёС‚Рµ РјРёРіСЂР°С†РёСЋ

РћС‚РєСЂРѕР№С‚Рµ [Supabase SQL Editor](https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor) Рё РІС‹РїРѕР»РЅРёС‚Рµ СЃРѕРґРµСЂР¶РёРјРѕРµ С„Р°Р№Р»Р°:
```
supabase/migrations/002_add_usage_limits.sql
```

### РЁР°Рі 2: Р”РѕР±Р°РІСЊС‚Рµ Р±РµР№РґР¶ СЃ Р»РёРјРёС‚Р°РјРё

Р’ РЅСѓР¶РЅРѕРµ РјРµСЃС‚Рѕ РґРѕР±Р°РІСЊС‚Рµ РєРѕРјРїРѕРЅРµРЅС‚:

```tsx
import UsageLimitBadge from '@/components/UsageLimitBadge';

// Р’ JSX:
<UsageLimitBadge />
```

**Р РµРєРѕРјРµРЅРґСѓРµРјС‹Рµ РјРµСЃС‚Р°:**
- Р’ С…РµРґРµСЂРµ СЂСЏРґРѕРј СЃ РєРЅРѕРїРєРѕР№ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
- Р’ Р»РёС‡РЅРѕРј РєР°Р±РёРЅРµС‚Рµ
- РџРµСЂРµРґ РєРЅРѕРїРєРѕР№ РѕС‚РїСЂР°РІРєРё Р·Р°РїСЂРѕСЃР°

### РЁР°Рі 3: РџСЂРѕРІРµСЂСЏР№С‚Рµ Р»РёРјРёС‚С‹ РїРµСЂРµРґ Р·Р°РїСЂРѕСЃР°РјРё

Р’ РІР°С€РµРј API endpoint РґР»СЏ РіРµРЅРµСЂР°С†РёРё РєРѕРґР°:

```typescript
import { checkUserLimit, incrementUsage } from '@/lib/supabase-usage';

export async function POST(request: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // РџСЂРѕРІРµСЂРёС‚СЊ Р»РёРјРёС‚
  const usage = await checkUserLimit(user.id);
  
  if (usage.requests_remaining <= 0) {
    return NextResponse.json({ 
      error: 'Request limit reached',
      ...usage
    }, { status: 429 });
  }
  
  // Р’С‹РїРѕР»РЅРёС‚СЊ Р·Р°РїСЂРѕСЃ Рє AI
  const result = await generateCode(prompt);
  
  // РЈРІРµР»РёС‡РёС‚СЊ СЃС‡РµС‚С‡РёРє
  await incrementUsage(user.id, 'ai_generation', result.tokens);
  
  return NextResponse.json({ success: true, ...result });
}
```

## рџ“± РСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ РІ РєРѕРјРїРѕРЅРµРЅС‚Р°С…

### РћС‚РѕР±СЂР°Р¶РµРЅРёРµ Р»РёРјРёС‚РѕРІ

```tsx
import { useUsageLimits } from '@/lib/hooks/useUsageLimits';

function MyComponent() {
  const { usage, loading, hasRequestsRemaining, isLimitReached } = useUsageLimits();
  
  if (loading) return <div>Р—Р°РіСЂСѓР·РєР°...</div>;
  
  if (isLimitReached) {
    return (
      <div className="alert alert-error">
        <p>Р›РёРјРёС‚ Р·Р°РїСЂРѕСЃРѕРІ РёСЃС‡РµСЂРїР°РЅ!</p>
        <p>РћР±РЅРѕРІРёС‚Рµ РїРѕРґРїРёСЃРєСѓ РґР»СЏ РїСЂРѕРґРѕР»Р¶РµРЅРёСЏ.</p>
      </div>
    );
  }
  
  return (
    <div>
      <p>РћСЃС‚Р°Р»РѕСЃСЊ Р·Р°РїСЂРѕСЃРѕРІ: {usage?.requests_remaining}</p>
      <button disabled={!hasRequestsRemaining}>
        РћС‚РїСЂР°РІРёС‚СЊ Р·Р°РїСЂРѕСЃ
      </button>
    </div>
  );
}
```

### РџСЂРѕРІРµСЂРєР° РїРµСЂРµРґ РѕС‚РїСЂР°РІРєРѕР№

```tsx
import { getUserUsage } from '@/lib/supabase-usage';

async function handleSubmit() {
  const usage = await getUserUsage();
  
  if (!usage || usage.requests_remaining <= 0) {
    alert('Р›РёРјРёС‚ Р·Р°РїСЂРѕСЃРѕРІ РёСЃС‡РµСЂРїР°РЅ!');
    return;
  }
  
  // РћС‚РїСЂР°РІРёС‚СЊ Р·Р°РїСЂРѕСЃ С‡РµСЂРµР· API
  const response = await fetch('/api/check-usage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestType: 'ai_generation' })
  });
  
  const result = await response.json();
  
  if (!result.success) {
    alert(result.error);
    return;
  }
  
  // РџСЂРѕРґРѕР»Р¶РёС‚СЊ СЃ РіРµРЅРµСЂР°С†РёРµР№
  await generateCode();
}
```

## рџ§Є РўРµСЃС‚РёСЂРѕРІР°РЅРёРµ

### РЈСЃС‚Р°РЅРѕРІРёС‚СЊ РїРѕРґРїРёСЃРєСѓ РґР»СЏ С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ

```bash
# Р‘Р°Р·РѕРІС‹Р№ С‚Р°СЂРёС„ (5 Р·Р°РїСЂРѕСЃРѕРІ)
curl -X POST http://localhost:3000/api/set-subscription \
  -H "Content-Type: application/json" \
  -d '{"tier": "basic", "durationDays": 30}'

# РџСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹Р№ С‚Р°СЂРёС„ (15 Р·Р°РїСЂРѕСЃРѕРІ)
curl -X POST http://localhost:3000/api/set-subscription \
  -H "Content-Type: application/json" \
  -d '{"tier": "professional", "durationDays": 30}'
```

### РџСЂРѕРІРµСЂРёС‚СЊ С‚РµРєСѓС‰РµРµ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ

```bash
curl http://localhost:3000/api/check-usage
```

### РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ Р·Р°РїСЂРѕСЃ

```bash
curl -X POST http://localhost:3000/api/check-usage \
  -H "Content-Type": "application/json" \
  -d '{"requestType": "ai_generation", "tokens": 1000}'
```

## рџ”„ РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРёРµ Р·Р°РґР°С‡Рё

### РЎР±СЂРѕСЃ РјРµСЃСЏС‡РЅРѕРіРѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ

РЎРѕР·РґР°Р№С‚Рµ cron job РёР»Рё РёСЃРїРѕР»СЊР·СѓР№С‚Рµ Supabase Edge Functions:

```sql
-- Р’С‹Р·С‹РІР°С‚СЊ СЂР°Р· РІ РјРµСЃСЏС†
SELECT public.reset_monthly_usage();
```

### РСЃС‚РµС‡РµРЅРёРµ РїРѕРґРїРёСЃРѕРє

```sql
-- Р’С‹Р·С‹РІР°С‚СЊ РµР¶РµРґРЅРµРІРЅРѕ
SELECT public.expire_subscriptions();
```

## рџ’і РРЅС‚РµРіСЂР°С†РёСЏ СЃ РїР»Р°С‚РµР¶Р°РјРё

РџРѕСЃР»Рµ СѓСЃРїРµС€РЅРѕР№ РѕРїР»Р°С‚С‹ РІ РІР°С€РµРј payment webhook:

```typescript
import { setSubscriptionTier } from '@/lib/supabase-usage';

// Р’ webhook РѕР±СЂР°Р±РѕС‚С‡РёРєРµ
const userId = payment.metadata.user_id;
const tier = payment.metadata.tier; // 'basic' РёР»Рё 'professional'

await setSubscriptionTier(userId, tier, 30);
```

## рџ“Љ РћС‚РѕР±СЂР°Р¶РµРЅРёРµ РІ Р»РёС‡РЅРѕРј РєР°Р±РёРЅРµС‚Рµ

Р”РѕР±Р°РІСЊС‚Рµ РІ `app/dashboard/page.tsx`:

```tsx
import { useUsageLimits } from '@/lib/hooks/useUsageLimits';
import { getTierName } from '@/lib/supabase-usage';

function Dashboard() {
  const { usage } = useUsageLimits();
  
  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-title">РўР°СЂРёС„</div>
        <div className="stat-value">{getTierName(usage?.subscription_tier || 'free')}</div>
      </div>
      <div className="stat">
        <div className="stat-title">РСЃРїРѕР»СЊР·РѕРІР°РЅРѕ</div>
        <div className="stat-value">{usage?.requests_used} / {usage?.requests_limit}</div>
      </div>
      <div className="stat">
        <div className="stat-title">РћСЃС‚Р°Р»РѕСЃСЊ</div>
        <div className="stat-value">{usage?.requests_remaining}</div>
      </div>
    </div>
  );
}
```

## рџЋЁ РЎС‚РёР»РёР·Р°С†РёСЏ Р±РµР№РґР¶Р°

Р‘РµР№РґР¶ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РјРµРЅСЏРµС‚ С†РІРµС‚:
- рџџў **Р—РµР»РµРЅС‹Р№** - РјРЅРѕРіРѕ Р·Р°РїСЂРѕСЃРѕРІ РѕСЃС‚Р°Р»РѕСЃСЊ
- рџџЎ **Р–РµР»С‚С‹Р№** - РѕСЃС‚Р°Р»РѕСЃСЊ 2 РёР»Рё РјРµРЅСЊС€Рµ
- рџ”ґ **РљСЂР°СЃРЅС‹Р№** - Р»РёРјРёС‚ РёСЃС‡РµСЂРїР°РЅ

## вљ пёЏ Р’Р°Р¶РЅС‹Рµ Р·Р°РјРµС‡Р°РЅРёСЏ

1. **Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ**: Р’СЃРµРіРґР° РїСЂРѕРІРµСЂСЏР№С‚Рµ Р»РёРјРёС‚С‹ РЅР° СЃРµСЂРІРµСЂРµ, РЅРµ С‚РѕР»СЊРєРѕ РЅР° РєР»РёРµРЅС‚Рµ
2. **РџСЂРѕРёР·РІРѕРґРёС‚РµР»СЊРЅРѕСЃС‚СЊ**: РСЃРїРѕР»СЊР·СѓР№С‚Рµ РєРµС€РёСЂРѕРІР°РЅРёРµ РґР»СЏ С‡Р°СЃС‚С‹С… РїСЂРѕРІРµСЂРѕРє
3. **UX**: РџРѕРєР°Р·С‹РІР°Р№С‚Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ СЃРєРѕР»СЊРєРѕ Р·Р°РїСЂРѕСЃРѕРІ РѕСЃС‚Р°Р»РѕСЃСЊ Р”Рћ РѕС‚РїСЂР°РІРєРё
4. **РЈРІРµРґРѕРјР»РµРЅРёСЏ**: РџСЂРµРґСѓРїСЂРµР¶РґР°Р№С‚Рµ РєРѕРіРґР° РѕСЃС‚Р°РµС‚СЃСЏ РјР°Р»Рѕ Р·Р°РїСЂРѕСЃРѕРІ

## рџ”— РџРѕР»РµР·РЅС‹Рµ СЃСЃС‹Р»РєРё

- **Supabase Dashboard**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum
- **SQL Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Table Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor

---

**Р“РѕС‚РѕРІРѕ!** РЎРёСЃС‚РµРјР° РѕРіСЂР°РЅРёС‡РµРЅРёР№ РїРѕ С‚Р°СЂРёС„Р°Рј РїРѕР»РЅРѕСЃС‚СЊСЋ РЅР°СЃС‚СЂРѕРµРЅР°! рџЋ‰
