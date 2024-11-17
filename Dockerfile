# Базовый образ Node.js
FROM node:20

# Создаем рабочую директорию
WORKDIR /app

# Копируем файл db.json в контейнер
COPY db.json /app/db.json

# Устанавливаем json-server
RUN npm install -g json-server

# Команда запуска сервера
CMD ["json-server", "db.json", "-p", "3001"]

# Указываем порт
EXPOSE 3001