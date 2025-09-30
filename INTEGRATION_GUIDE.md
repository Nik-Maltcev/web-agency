# 🔧 Инструкция по интеграции кнопки входа/регистрации

## ✅ Что уже готово:

1. ✅ Создан компонент `HomeScreenHeader` с кнопкой входа
2. ✅ Создан компонент `UserButton` с функционалом аутентификации
3. ✅ Все необходимые импорты добавлены

## 📝 Что нужно сделать:

### Шаг 1: Откройте файл `app/page.tsx`

### Шаг 2: Найдите строку 27 и добавьте импорт:

**Добавьте после строки 27:**
```tsx
import HomeScreenHeader from '@/components/HomeScreenHeader';
```

Должно получиться:
```tsx
import { ThemeLogo } from '@/app/components/theme-logo';
import UserButton from '@/components/auth/UserButton';
import HomeScreenHeader from '@/components/HomeScreenHeader';
```

### Шаг 3: Найдите строки 3032-3044 (хедер на home screen)

**Найдите этот блок:**
```tsx
{/* Header */}
<div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between animate-[fadeIn_0.8s_ease-out]">
  <ThemeLogo />
  <a 
    href="https://github.com/mendableai/open-lovable" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-[#36322F] text-white px-3 py-2 rounded-[10px] text-sm font-medium [box-shadow:inset_0px_-2px_0px_0px_#171310,_0px_1px_6px_0px_rgba(58,_33,_8,_58%)] hover:translate-y-[1px] hover:scale-[0.98] hover:[box-shadow:inset_0px_-1px_0px_0px_#171310,_0px_1px_3px_0px_rgba(58,_33,_8,_40%)] active:translate-y-[2px] active:scale-[0.97] active:[box-shadow:inset_0px_1px_1px_0px_#171310,_0px_1px_2px_0px_rgba(58,_33,_8,_30%)] transition-all duration-200"
  >
    <FiGithub className="w-4 h-4" />
    <span>Использовать этот шаблон</span>
  </a>
</div>
```

**Замените на:**
```tsx
{/* Header */}
<HomeScreenHeader />
```

### Шаг 4: Сохраните файл

### Шаг 5: Проверьте результат

Теперь в правом верхнем углу главного экрана должна появиться кнопка "Войти" (или аватар пользователя, если вы уже авторизованы).

## 🎯 Результат:

- **Для неавторизованных пользователей**: кнопка "Войти"
- **Для авторизованных пользователей**: аватар с выпадающим меню

## 🔍 Где найти нужные строки:

### Способ 1: Поиск по тексту
Нажмите `Ctrl+F` и найдите текст: `Использовать этот шаблон`

### Способ 2: Переход к строке
Нажмите `Ctrl+G` и введите номер строки: `3032`

### Способ 3: Поиск по комментарию
Найдите комментарий: `{/* Header */}` на главном экране (home screen)

## ⚠️ Важно:

Убедитесь, что вы редактируете правильный хедер - тот, который находится внутри блока `{showHomeScreen && (...)}`

## 🆘 Если что-то пошло не так:

1. Убедитесь, что импорт `HomeScreenHeader` добавлен в начале файла
2. Проверьте, что вы заменили правильный блок (на home screen, а не в основном интерфейсе)
3. Сохраните файл и перезапустите dev сервер: `npm run dev`

## ✅ После интеграции:

Закоммитьте изменения:
```bash
git add .
git commit -m "feat: Replace GitHub button with auth button on home screen"
git push origin main
```

---

**Готово!** Теперь пользователи смогут войти или зарегистрироваться прямо с главного экрана! 🎉
