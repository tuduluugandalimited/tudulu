FROM node:22-alpine

WORKDIR /app

# Required by Prisma on Alpine
RUN apk add --no-cache openssl

# Copy package manifests
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install --legacy-peer-deps

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source files and TypeScript build configurations
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Build NestJS output
RUN npm run build

EXPOSE 3001

# Updated final command in apps/api/Dockerfile
#CMD ["sh", "-c", "npx prisma db push --skip-generate && if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]
#CMD ["sh", "-c", "npx prisma db push && if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]
#CMD ["sh", "-c", "npx prisma db push --url=\"$DATABASE_URL\" && if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]
CMD ["sh", "-c", "npx prisma db push --url=\"$DATABASE_URL\" --accept-data-loss && if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]