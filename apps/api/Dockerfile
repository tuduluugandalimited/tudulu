# ==========================================
# 1. BASE STAGE (Shared Node setup)
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

# Copy root and app package manifest files for optimal caching
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# Install ALL dependencies (including devDependencies like Next, Nest CLI, and Prisma)
RUN npm ci --legacy-peer-deps


# ==========================================
# 3. BUILDER STAGE
# ==========================================
FROM base AS builder
WORKDIR /app

# Copy complete project state from dependencies (preserves node_modules/.bin symlinks)
COPY --from=dependencies /app /app

# Copy full application source files
COPY . .

# Build ONLY the NestJS API workspace
RUN npm run build --workspace=tudulu-api


# ==========================================
# 4. RUNNER STAGE (Production Image)
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy package manifests for production install
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/

# Install ONLY production dependencies across workspaces
RUN npm ci --omit=dev --legacy-peer-deps --workspaces

# Copy generated Prisma binaries, schemas, and compiled dist files
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

# Start the NestJS API
CMD ["node", "apps/api/dist/main.js"]