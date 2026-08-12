FROM node:22-alpine

WORKDIR /app

# Required by Prisma runtime engines on Alpine
RUN apk add --no-cache openssl

# Copy package manifests from apps/api
COPY package*.json ./

# Install dependencies directly inside the context
RUN npm install --legacy-peer-deps

# Copy Prisma schema & generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code and config files
COPY src ./src
COPY tsconfig.json ./
COPY nest-cli.json ./

# Build NestJS output to /app/dist
RUN npm run build

EXPOSE 3001

# Start the built NestJS server
CMD ["node", "dist/main.js"]