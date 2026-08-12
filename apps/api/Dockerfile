# ================================
# Build stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY apps/api/prisma ./prisma/
COPY tsconfig*.json ./

# Bypass strict peer dependency checks
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

# Install production dependencies and generate Prisma binaries
RUN npm install --omit=dev --legacy-peer-deps && npx prisma generate

# Copy compiled NestJS code from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]