# ==========================================
# 1. BASE STAGE
# ==========================================
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl

# ==========================================
# 2. DEPENDENCIES & BUILD STAGE
# ==========================================
FROM base AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# Install dependencies for the monorepo
RUN npm ci --legacy-peer-deps

# Copy full application code
COPY . .

# Build the NestJS API
RUN npm run build --workspace=tudulu-api

# ==========================================
# 3. RUNNER STAGE
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built artifacts and workspace config
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/apps/api/package*.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Install production dependencies directly
RUN npm ci --omit=dev --legacy-peer-deps

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]