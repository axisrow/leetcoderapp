# LeetCoder App

## Быстрый старт (разработка)

```bash
npm run dev
```

Эта команда одновременно запускает:
- Локальный сервер на http://localhost:3001
- Web-клиент на http://localhost:19006

---

## Окружения

Приложение поддерживает два окружения, управляемых переменной `EXPO_PUBLIC_ENV` в файле `.env`:

| Окружение | API URL | Команда |
|-----------|---------|---------|
| `local` | http://localhost:3001 | `npm run dev` |
| `production` | https://leetcoderx.onrender.com | `npm run dev:prod` |

### Переключение окружения

**Вариант 1: Через .env файл**
```bash
# .env
EXPO_PUBLIC_ENV=local      # или production
```

**Вариант 2: Через npm-скрипты**
```bash
npm run dev        # local (сервер + клиент)
npm run dev:prod   # production (только клиент)
```

---

## Клиент (React Native / Expo)

### Запуск в web-режиме

```bash
npm run web
```

Откройте http://localhost:19006/ в браузере.

### Запуск на мобильных

```bash
npm run ios      # iOS
npm run android  # Android
```

---

## Сервер (Node.js + PostgreSQL + Docker)

### Требования
- Docker
- Docker Compose

### Запуск

```bash
docker-compose up -d
```

API доступен на http://localhost:3001

### Проверка работы

```bash
curl http://localhost:3001/api/easy
```

### Команды Docker

| Команда | Описание |
|---------|----------|
| `docker-compose ps` | Статус контейнеров |
| `docker-compose logs -f` | Просмотр логов |
| `docker-compose down` | Остановить |
| `docker-compose down -v` | Остановить + удалить данные |
| `docker-compose up -d --build` | Пересборка |
