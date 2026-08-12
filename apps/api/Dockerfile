# ==========================================
# Single Stage Build for Monorepo API
# ==========================================
FROM node:22-alpine
WORKDIR /app

# Install openssl required by Prisma runtime
RUN apk add --no-cache openssl

# Copy root and workspace package files
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/web/package*.json ./apps/web/

# Install ALL dependencies inside the container
RUN npm ci --legacy-peer-deps

# Copy full application code
COPY . .

# Build the NestJS API workspace
RUN npm run build --workspace=tudulu-api

ENV NODE_ENV=production
EXPOSE 3000

# Start NestJS API directly
CMD ["node", "apps/api/dist/main.js"]