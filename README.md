# Open Lovable

Общайтесь с ИИ для мгновенного создания React приложений. Пример приложения от команды [Firecrawl](https://firecrawl.dev/?ref=open-lovable-github). Для полного облачного решения, посетите [Lovable.dev ❤️](https://lovable.dev/).

<img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZtaHFleGRsMTNlaWNydGdianI4NGQ4dHhyZjB0d2VkcjRyeXBucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZFVLWMa6dVskQX0qu1/giphy.gif" alt="Open Lovable Demo" width="100%"/>



## Настройка

1. **Клонировать и установить**
```bash
git clone https://github.com/mendableai/open-lovable.git
cd open-lovable
npm install
```

2. **Добавить `.env.local`**
```env
# Обязательные
E2B_API_KEY=your_e2b_api_key  # Получить с https://e2b.dev (Песочницы)
FIRECRAWL_API_KEY=your_firecrawl_api_key  # Получить с https://firecrawl.dev (Парсинг веб-сайтов)

# Дополнительные (нужен минимум один ИИ провайдер)
ANTHROPIC_API_KEY=your_anthropic_api_key  # Получить с https://console.anthropic.com
OPENAI_API_KEY=your_openai_api_key  # Получить с https://platform.openai.com (GPT-5)
GEMINI_API_KEY=your_gemini_api_key  # Получить с https://aistudio.google.com/app/apikey
GROQ_API_KEY=your_groq_api_key  # Получить с https://console.groq.com (Быстрый вывод - рекомендуется Kimi K2)
```

3. **Запустить**
```bash
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000)

## Деплой на Railway

1. **Создать аккаунт на [Railway](https://railway.app/)**

2. **Подключить ваш GitHub репозиторий**
   - Нажать "New Project"
   - Выбрать "Deploy from GitHub repo"
   - Выбрать ваш форк этого репозитория

3. **Настроить переменные окружения**
   В разделе Variables добавить:
   ```
   E2B_API_KEY=your_e2b_api_key
   FIRECRAWL_API_KEY=your_firecrawl_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   NODE_ENV=production
   ```

4. **Деплой автоматически начнётся**
   Railway автоматически обнаружит Next.js приложение и развернёт его.

5. **Получить URL**
   После успешного деплоя вы получите публичный URL для вашего приложения.

### Файлы для Railway

- `railway.json` - конфигурация Railway
- `.env.example` - пример переменных окружения
- `package.json` - уже содержит необходимые скрипты для Railway

## Лицензия

MIT
