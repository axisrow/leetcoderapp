FROM node:20-alpine

WORKDIR /app

# Build arguments для Expo (передаются при сборке)
ARG EXPO_PUBLIC_ENV=local
ARG EXPO_PUBLIC_API_KEY

# Установить как ENV для процесса сборки expo export
ENV EXPO_PUBLIC_ENV=$EXPO_PUBLIC_ENV
ENV EXPO_PUBLIC_API_KEY=$EXPO_PUBLIC_API_KEY

# Установить PostgreSQL
RUN apk add --no-cache postgresql postgresql-contrib

# Install client dependencies
COPY package*.json ./
RUN npm install

# Copy source and build web
COPY . .
RUN npx expo install @expo/metro-runtime react-dom react-native-web
RUN npx expo export --platform web

# Install server dependencies (after build)
RUN cd server && npm install --production

# Скопировать entrypoint скрипт
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]
