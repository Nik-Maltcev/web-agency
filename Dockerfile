# Используем стандартный Node.js образ (не Alpine) для совместимости с lightningcss
FROM node:20-slim

# Устанавливаем необходимые системные пакеты для нативных модулей
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости и пересобираем нативные модули
RUN npm ci && npm rebuild

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Удаляем devDependencies после сборки
RUN npm ci --omit=dev && npm cache clean --force

# Указываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
