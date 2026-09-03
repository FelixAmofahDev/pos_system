FROM node:20-bookworm-slim

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

WORKDIR /app
COPY . .

WORKDIR /app/backend
ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]
