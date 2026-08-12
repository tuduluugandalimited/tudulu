# ==========================================
# 1. BASE STAGE
# ==========================================
FROM node:22-alpine AS base
WORKDIR /app

# Install openssl for Prisma runtime engines on Alpine
RUN apk add --no-cache openssl

# ==========================================
# 2. DEPENDENCIES STAGE
# ==========================================
FROM base AS dependencies
WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# Install all dependencies across workspaces
RUN npm ci --legacy-peer-deps

# ==========================================
# 3. BUILDER STAGE
# ==========================================
FROM base AS builder
WORKDIR /app

# Copy all node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build the NestJS API workspace
RUN npm run build --workspace=tudulu-api

# ==========================================
# 4. RUNNER STAGE (Production Image)
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

# Install production dependencies for all workspaces
RUN npm ci --omit=dev --legacy-peer-deps --workspaces

# Copy built dist files, prisma schemas, and generated clients
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]