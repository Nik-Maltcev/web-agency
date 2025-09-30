# 🔐 Система аутентификации

## ✅ Что было создано

### 1. Компоненты аутентификации
- **`components/auth/AuthModal.tsx`** - модальное окно входа/регистрации
- **`components/auth/UserButton.tsx`** - кнопка пользователя с выпадающим меню
- **`components/PageHeader.tsx`** - хедер страницы с кнопкой пользователя

### 2. Контекст пользователя
- **`contexts/AuthContext.tsx`** - управление состоянием аутентификации
- Автоматическое отслеживание сессии
- Глобальный доступ к данным пользователя

### 3. Страница личного кабинета
- **`app/dashboard/page.tsx`** - личный кабинет пользователя
- Список проектов
- Статистика
- Управление проектами

### 4. Интеграция
- **`app/layout.tsx`** - обернут в `AuthProvider`
- Готово к использованию во всем приложении

## 🚀 Как использовать

### Вариант 1: Использовать готовый компонент PageHeader

В `app/page.tsx` замените существующий хедер на:

```tsx
import PageHeader from '@/components/PageHeader';

// В компоненте:
<PageHeader
  status={status}
  aiModel={aiModel}
  onModelChange={(model) => {
    setAiModel(model);
    // обновить URL параметры
  }}
  availableModels={appConfig.ai.availableModels}
  modelDisplayNames={appConfig.ai.modelDisplayNames}
  onCreateSandbox={createSandbox}
  onReapply={reapplyLastGeneration}
  onDownloadZip={downloadZip}
  canReapply={!!conversationContext.lastGeneratedCode && !!sandboxData}
  hasSandbox={!!sandboxData}
/>
```

### Вариант 2: Добавить только кнопку пользователя

Просто добавьте в нужное место:

```tsx
import UserButton from '@/components/auth/UserButton';

// В JSX:
<UserButton />
```

## 📱 Функционал

### Для неавторизованных пользователей:
- Кнопка "Войти"
- Модальное окно с формами входа/регистрации
- Переключение между входом и регистрацией
- Валидация email и пароля

### Для авторизованных пользователей:
- Аватар с первой буквой email
- Выпадающее меню с:
  - Email пользователя
  - Ссылка на личный кабинет
  - Кнопка выхода

## 🏠 Личный кабинет

Доступен по адресу: `/dashboard`

**Функции:**
- Просмотр всех проектов пользователя
- Статистика (всего, активных, в архиве)
- Ссылки на preview проектов
- Информация о sandbox'ах
- Кнопка создания нового проекта

## 🔒 Защита роутов

Личный кабинет автоматически перенаправляет неавторизованных пользователей на главную страницу.

## 🎨 Стилизация

Все компоненты используют:
- Tailwind CSS
- Dark mode support
- Адаптивный дизайн
- Анимации и transitions

## 📝 Использование в коде

### Получить текущего пользователя:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, signOut } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) {
    return <div>Пожалуйста, войдите</div>;
  }
  
  return (
    <div>
      <p>Привет, {user.email}!</p>
      <button onClick={signOut}>Выйти</button>
    </div>
  );
}
```

### Работа с проектами:

```tsx
import { getUserProjects, createProject } from '@/lib/supabase-projects';

// Получить проекты пользователя
const projects = await getUserProjects({ status: 'active' });

// Создать новый проект
const newProject = await createProject({
  name: 'My Project',
  description: 'Project description',
  sandbox_id: 'sandbox-123'
});
```

## 🔧 Настройка

### Email подтверждение

По умолчанию Supabase требует подтверждение email. Чтобы отключить:

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard/project/lyuxhqhusukvpvwtkkum/auth/users)
2. Перейдите в **Authentication → Settings**
3. Отключите **Enable email confirmations**

### Кастомизация email шаблонов

1. Откройте **Authentication → Email Templates**
2. Настройте шаблоны для:
   - Подтверждение регистрации
   - Сброс пароля
   - Изменение email

## 🎯 Следующие шаги

1. **Замените хедер** в `app/page.tsx` на `PageHeader` компонент
2. **Примените миграцию** из `supabase/migrations/001_initial_schema.sql`
3. **Настройте email** в Supabase Dashboard
4. **Протестируйте** регистрацию и вход

## 🐛 Troubleshooting

### Ошибка "User already registered"
- Пользователь уже существует, используйте вход вместо регистрации

### Не приходит email подтверждения
- Проверьте настройки SMTP в Supabase
- Проверьте папку спам
- Отключите email подтверждение для тестирования

### Не работает вход
- Убедитесь, что переменные окружения Supabase установлены
- Проверьте консоль браузера на ошибки
- Убедитесь, что RLS политики настроены правильно

## 📚 Дополнительные ресурсы

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

---

**Готово!** Система аутентификации полностью настроена и готова к использованию. 🎉
