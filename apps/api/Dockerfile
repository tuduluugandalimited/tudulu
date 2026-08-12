FROM node:22-alpine

WORKDIR /app

# Required by Prisma on Alpine
RUN apk add --no-cache openssl

# Copy package manifests
COPY package*.json ./

# Install dependencies (including devDependencies so @nestjs/cli works)
RUN npm install --legacy-peer-deps

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source files and configuration
COPY src ./src
COPY tsconfig.json ./

# Build NestJS output to /app/dist
RUN npm run build

EXPOSE 3001

# Start using the package.json script
CMD ["npm", "run", "start:prod"]