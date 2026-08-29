# Step 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy root lockfiles & packages
COPY package*.json ./
COPY tsconfig*.json ./
COPY apps/api/package*.json ./apps/api/

# Install dependencies
RUN npm ci

# Copy full source
COPY . .

# Generate Prisma client and build API
RUN npx prisma generate
RUN npm run build --prefix apps/api

# Step 2: Production runner stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./package.json

EXPOSE 3000

# Start NestJS server from dist/main
CMD ["node", "dist/main"]