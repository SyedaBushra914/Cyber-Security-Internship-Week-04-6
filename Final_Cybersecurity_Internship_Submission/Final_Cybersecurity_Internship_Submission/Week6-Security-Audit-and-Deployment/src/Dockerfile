
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production || npm install --omit=dev
COPY . .
USER node
EXPOSE 4200
CMD ["node", "server.js"]
