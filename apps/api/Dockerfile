FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache openssl

# Copy package files
COPY apps/api/package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code and config files
COPY apps/api/prisma ./prisma
COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./
COPY apps/api/nest-cli.json ./

# Generate Prisma and Build NestJS
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

# NestJS compiles to ./dist inside the workspace directory
CMD ["node", "dist/main.js"]