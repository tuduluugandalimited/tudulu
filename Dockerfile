FROM node:22-alpine

WORKDIR /app

# Required by Prisma on Alpine
RUN apk add --no-cache openssl

# Copy root or monorepo package manifests if applicable, or target apps/api directly
COPY apps/api/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy Prisma schema from apps/api/prisma and generate client
COPY apps/api/prisma ./prisma
RUN npx prisma generate

# Copy source files and TypeScript build configurations from apps/api
COPY apps/api/src ./src
COPY apps/api/tsconfig*.json ./
COPY apps/api/nest-cli.json ./

# Build NestJS output
RUN npm run build

EXPOSE 3001

# Fallback runner: execute main.js directly regardless of folder nesting
CMD ["sh", "-c", "if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]