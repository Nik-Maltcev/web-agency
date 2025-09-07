# Используем официальный Node.js образ
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости (включая devDependencies для сборки)
RUN npm ci

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
