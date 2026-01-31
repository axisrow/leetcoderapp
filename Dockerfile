FROM node:20-alpine

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Install client dependencies and build web
COPY package*.json ./
RUN npm install

COPY . .
RUN npx expo install @expo/metro-runtime react-dom react-native-web
RUN npx expo export --platform web

# Copy server code (after build to avoid overwriting)
COPY server/ ./server/

EXPOSE 3001

WORKDIR /app/server
CMD ["node", "server.js"]
