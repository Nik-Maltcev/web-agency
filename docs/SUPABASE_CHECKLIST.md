# ✅ Supabase Integration Checklist

## Установка и конфигурация

- [x] Установлен пакет `@supabase/supabase-js`
- [x] Созданы файлы конфигурации:
  - `lib/supabase.ts` - основной клиент
  - `lib/supabase-helpers.ts` - helper функции
  - `lib/hooks/useSupabase.ts` - React hooks
- [x] Обновлен `.env.example` с переменными Supabase
- [ ] Добавлены переменные в `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://lyuxhqhusukvpvwtkkum.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```

## Настройка базы данных

- [ ] Созданы необходимые таблицы в Supabase Dashboard
- [ ] Настроены Row Level Security (RLS) политики
- [ ] Созданы индексы для оптимизации запросов
- [ ] Обновлены типы в `types/supabase.ts` под вашу схему

## Аутентификация

- [ ] Настроены провайдеры аутентификации в Supabase Dashboard
- [ ] Добавлены redirect URLs для OAuth
- [ ] Настроены email templates (если используется email auth)
- [ ] Протестирована регистрация и вход

## Storage (если используется)

- [ ] Созданы необходимые buckets
- [ ] Настроены политики доступа для buckets
- [ ] Настроены CORS правила (если нужно)

## Тестирование

- [ ] Протестировано подключение через `/api/supabase-example`
- [ ] Протестирована аутентификация
- [ ] Протестированы CRUD операции
- [ ] Протестированы realtime подписки (если используются)
- [ ] Протестирован upload файлов (если используется)

## Деплой

- [ ] Добавлены переменные окружения на Railway/Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Обновлены Allowed URLs в Supabase Dashboard
- [ ] Протестирована работа на production

## Безопасность

- [ ] ✅ Service Role Key используется ТОЛЬКО на сервере
- [ ] ✅ Anon Key безопасен для использования на клиенте
- [ ] Настроены RLS политики для всех таблиц
- [ ] Проверены права доступа для всех операций
- [ ] Настроен rate limiting (если нужно)

## Документация

- [x] Создана документация `SUPABASE_SETUP.md`
- [x] Создан quick start `SUPABASE_QUICKSTART.md`
- [x] Создан пример компонента `components/SupabaseExample.tsx`
- [x] Создан пример API endpoint `app/api/supabase-example/route.ts`

## Дополнительно

- [ ] Настроены database webhooks (если нужно)
- [ ] Настроены edge functions (если нужно)
- [ ] Настроен мониторинг и логирование
- [ ] Настроены бэкапы базы данных

## 📚 Полезные команды

```bash
# Генерация TypeScript типов из схемы
npx supabase gen types typescript --project-id lyuxhqhusukvpvwtkkum > types/supabase.ts

# Запуск локального Supabase (если используете)
npx supabase start

# Применение миграций
npx supabase db push

# Сброс локальной базы
npx supabase db reset
```

## 🔗 Ссылки

- **Dashboard**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum
- **SQL Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Table Editor**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/editor
- **Auth Settings**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/auth/users
- **Storage**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/storage/buckets
- **API Docs**: https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/api

## 🆘 Troubleshooting

### Ошибка подключения
- Проверьте правильность URL и ключей
- Убедитесь, что переменные окружения загружены (перезапустите сервер)

### RLS ошибки
- Проверьте политики доступа в Supabase Dashboard
- Убедитесь, что пользователь аутентифицирован для защищенных операций

### CORS ошибки
- Добавьте ваш домен в Allowed URLs в Supabase Dashboard
- Для локальной разработки добавьте `http://localhost:3000`

### Realtime не работает
- Убедитесь, что Realtime включен для таблицы в Supabase Dashboard
- Проверьте RLS политики для realtime операций
