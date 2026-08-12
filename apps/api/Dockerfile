# ================================
# Build stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace manifests
COPY package.json package-lock.json ./

# Copy API workspace manifest
COPY apps/api/package.json ./apps/api/package.json

# Copy Prisma schema/config required by the API
COPY apps/api/prisma ./apps/api/prisma

# Install workspace dependencies
RUN npm install --legacy-peer-deps

# Copy the API source
COPY apps/api ./apps/api

# Build ONLY the tudulu-api workspace
RUN npm run build --workspace=tudulu-api


# ================================
# Production stage
# ================================
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy root workspace manifests
COPY package.json package-lock.json ./

# Copy API workspace manifest
COPY apps/api/package.json ./apps/api/package.json

# Copy Prisma schema
COPY apps/api/prisma ./apps/api/prisma

# Install production dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Generate Prisma client for the API
RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

# Copy compiled API
COPY --from=builder /app/apps/api/dist ./apps/api/dist

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]