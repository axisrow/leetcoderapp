# LeetCoder App

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
