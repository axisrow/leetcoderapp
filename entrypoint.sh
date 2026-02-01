#!/bin/sh
set -e

PGDATA="/var/lib/postgresql/data"
DB_USER="${DB_USER:-testuser}"
DB_PASS="${DB_PASS:-testpass}"
DB_NAME="${DB_NAME:-leetcoder}"

# Инициализация PostgreSQL (если первый запуск)
if [ ! -d "$PGDATA" ] || [ -z "$(ls -A $PGDATA 2>/dev/null)" ]; then
    echo "Initializing PostgreSQL..."
    mkdir -p "$PGDATA"
    chown postgres:postgres "$PGDATA"
    chmod 700 "$PGDATA"
    su postgres -c "initdb -D $PGDATA"

    # Настройка аутентификации
    echo "host all all 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"
    echo "local all all trust" >> "$PGDATA/pg_hba.conf"
fi

# Запуск PostgreSQL в фоне
echo "Starting PostgreSQL..."
su postgres -c "pg_ctl -D $PGDATA -l $PGDATA/postgresql.log start"

# Ожидание готовности PostgreSQL
echo "Waiting for PostgreSQL..."
until su postgres -c "pg_isready" > /dev/null 2>&1; do
    sleep 1
done

# Создание пользователя и БД (если не существуют)
su postgres -c "psql -tc \"SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'\" | grep -q 1" || \
    su postgres -c "psql -c \"CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';\""

su postgres -c "psql -tc \"SELECT 1 FROM pg_database WHERE datname='$DB_NAME'\" | grep -q 1" || \
    su postgres -c "psql -c \"CREATE DATABASE $DB_NAME OWNER $DB_USER;\""

su postgres -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;\""

# Выполнить init.sql
if [ -f /app/server/init.sql ]; then
    echo "Running init.sql..."
    su postgres -c "psql -d $DB_NAME -f /app/server/init.sql" || true
fi

echo "PostgreSQL ready!"

# Запуск Node.js сервера
echo "Starting Node.js server..."
cd /app/server
exec node server.js
