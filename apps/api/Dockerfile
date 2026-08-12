# ==========================================
# 1. BASE STAGE (Shared Node setup)
# ==========================================
FROM node:20-alpine AS base
WORKDIR /app

# Install openssl for Prisma runtime engines on Alpine
RUN apk add --no-cache openssl


# ==========================================
# 2. DEPENDENCIES STAGE
# ==========================================
FROM base AS dependencies
WORKDIR /app

# Copy root and app package manifest files for optimal caching
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# Install ALL dependencies (including devDependencies like Next, Nest CLI, and Prisma)
RUN npm ci

# ==========================================
# 3. BUILDER STAGE
# ==========================================
FROM base AS builder
WORKDIR /app

# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/api/node_modules ./apps/api/node_modules

# Copy full application source
COPY . .

# Generate Prisma Client (if schema is located in apps/api/prisma/schema.prisma)
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma

# Build ONLY the NestJS API workspace
RUN npm run build --workspace=tudulu-api

# ==========================================
# 4. RUNNER STAGE (Production Image)
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy root package files and install ONLY production dependencies
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
RUN npm ci --omit=dev --legacy-peer-deps

# Copy generated Prisma engine/client and built dist folder
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

# Start the NestJS API
CMD ["node", "apps/api/dist/main.js"]