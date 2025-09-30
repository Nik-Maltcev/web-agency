# 📊 Система ограничений по тарифам

## ✅ Что было создано

### 1. База данных
- **`supabase/migrations/002_add_usage_limits.sql`** - миграция с таблицами и функциями
- Таблицы:
  - `usage_history` - история использования запросов
  - `subscription_history` - история подписок
- Функции:
  - `get_remaining_requests()` - получить оставшиеся запросы
  - `increment_usage()` - увеличить счетчик использования
  - `set_subscription_tier()` - установить тариф
  - `reset_monthly_usage()` - сбросить месячное использование
  - `expire_subscriptions()` - истечь просроченные подписки

### 2. TypeScript библиотека
- **`lib/supabase-usage.ts`** - функции для работы с лимитами
- **`lib/hooks/useUsageLimits.ts`** - React hook для отображения лимитов

### 3. Компоненты
- **`components/UsageLimitBadge.tsx`** - бейдж с оставшимися запросами

### 4. API Endpoints
- **`/api/check-usage`** - проверка лимитов (GET) и использование запроса (POST)
- **`/api/set-subscription`** - установка подписки (для тестирования)

## 💰 Тарифные планы

| Тариф | Запросов | Стоимость |
|-------|----------|-----------|
| **Бесплатный** | 0 | Бесплатно |
| **Базовый** | 5 | По вашей цене |
| **Профессиональный** | 15 | По вашей цене |

## 🚀 Установка

### Шаг 1: Примените миграцию

Откройте [Supabase SQL Editor](https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor) и выполните содержимое файла:
```
supabase/migrations/002_add_usage_limits.sql
```

### Шаг 2: Добавьте бейдж с лимитами

В нужное место добавьте компонент:

```tsx
import UsageLimitBadge from '@/components/UsageLimitBadge';

// В JSX:
<UsageLimitBadge />
```

**Рекомендуемые места:**
- В хедере рядом с кнопкой пользователя
- В личном кабинете
- Перед кнопкой отправки запроса

### Шаг 3: Проверяйте лимиты перед запросами

В вашем API endpoint для генерации кода:

```typescript
import { checkUserLimit, incrementUsage } from '@/lib/supabase-usage';

export async function POST(request: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Проверить лимит
  const usage = await checkUserLimit(user.id);
  
  if (usage.requests_remaining <= 0) {
    return NextResponse.json({ 
      error: 'Request limit reached',
      ...usage
    }, { status: 429 });
  }
  
  // Выполнить запрос к AI
  const result = await generateCode(prompt);
  
  // Увеличить счетчик
  await incrementUsage(user.id, 'ai_generation', result.tokens);
  
  return NextResponse.json({ success: true, ...result });
}
```

## 📱 Использование в компонентах

### Отображение лимитов

```tsx
import { useUsageLimits } from '@/lib/hooks/useUsageLimits';

function MyComponent() {
  const { usage, loading, hasRequestsRemaining, isLimitReached } = useUsageLimits();
  
  if (loading) return <div>Загрузка...</div>;
  
  if (isLimitReached) {
    return (
      <div className="alert alert-error">
        <p>Лимит запросов исчерпан!</p>
        <p>Обновите подписку для продолжения.</p>
      </div>
    );
  }
  
  return (
    <div>
      <p>Осталось запросов: {usage?.requests_remaining}</p>
      <button disabled={!hasRequestsRemaining}>
        Отправить запрос
      </button>
    </div>
  );
}
```

### Проверка перед отправкой

```tsx
import { getUserUsage } from '@/lib/supabase-usage';

async function handleSubmit() {
  const usage = await getUserUsage();
  
  if (!usage || usage.requests_remaining <= 0) {
    alert('Лимит запросов исчерпан!');
    return;
  }
  
  // Отправить запрос через API
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
  
  // Продолжить с генерацией
  await generateCode();
}
```

## 🧪 Тестирование

### Установить подписку для тестирования

```bash
# Базовый тариф (5 запросов)
curl -X POST http://localhost:3000/api/set-subscription \
  -H "Content-Type: application/json" \
  -d '{"tier": "basic", "durationDays": 30}'

# Профессиональный тариф (15 запросов)
curl -X POST http://localhost:3000/api/set-subscription \
  -H "Content-Type: application/json" \
  -d '{"tier": "professional", "durationDays": 30}'
```

### Проверить текущее использование

```bash
curl http://localhost:3000/api/check-usage
```

### Использовать запрос

```bash
curl -X POST http://localhost:3000/api/check-usage \
  -H "Content-Type": "application/json" \
  -d '{"requestType": "ai_generation", "tokens": 1000}'
```

## 🔄 Автоматические задачи

### Сброс месячного использования

Создайте cron job или используйте Supabase Edge Functions:

```sql
-- Вызывать раз в месяц
SELECT public.reset_monthly_usage();
```

### Истечение подписок

```sql
-- Вызывать ежедневно
SELECT public.expire_subscriptions();
```

## 💳 Интеграция с платежами

После успешной оплаты в вашем payment webhook:

```typescript
import { setSubscriptionTier } from '@/lib/supabase-usage';

// В webhook обработчике
const userId = payment.metadata.user_id;
const tier = payment.metadata.tier; // 'basic' или 'professional'

await setSubscriptionTier(userId, tier, 30);
```

## 📊 Отображение в личном кабинете

Добавьте в `app/dashboard/page.tsx`:

```tsx
import { useUsageLimits } from '@/lib/hooks/useUsageLimits';
import { getTierName } from '@/lib/supabase-usage';

function Dashboard() {
  const { usage } = useUsageLimits();
  
  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-title">Тариф</div>
        <div className="stat-value">{getTierName(usage?.subscription_tier || 'free')}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Использовано</div>
        <div className="stat-value">{usage?.requests_used} / {usage?.requests_limit}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Осталось</div>
        <div className="stat-value">{usage?.requests_remaining}</div>
      </div>
    </div>
  );
}
```

## 🎨 Стилизация бейджа

Бейдж автоматически меняет цвет:
- 🟢 **Зеленый** - много запросов осталось
- 🟡 **Желтый** - осталось 2 или меньше
- 🔴 **Красный** - лимит исчерпан

## ⚠️ Важные замечания

1. **Безопасность**: Всегда проверяйте лимиты на сервере, не только на клиенте
2. **Производительность**: Используйте кеширование для частых проверок
3. **UX**: Показывайте пользователю сколько запросов осталось ДО отправки
4. **Уведомления**: Предупреждайте когда остается мало запросов

## 🔗 Полезные ссылки

- **Supabase Dashboard**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum
- **SQL Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Table Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor

---

**Готово!** Система ограничений по тарифам полностью настроена! 🎉
