# ================================
# Build stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/api/prisma ./prisma/
COPY tsconfig*.json ./

RUN npm install --legacy-peer-deps

COPY apps ./apps

RUN npm run build

# ================================
# Production stage
# ================================
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY apps/api/prisma ./prisma/

RUN npm install --omit=dev --legacy-peer-deps && npx prisma generate

# Copy entire dist directory from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# NestJS monorepo builds place the main entrypoint under dist/apps/api/src/main.js
CMD ["node", "dist/apps/api/src/main.js"]