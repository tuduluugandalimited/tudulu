FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache openssl

# Copy package manifests from apps/api
COPY apps/api/package*.json ./
RUN npm install --legacy-peer-deps

# Copy Prisma schema and code from apps/api
COPY apps/api/prisma ./prisma
RUN npx prisma generate

COPY apps/api/src ./src
COPY apps/api/tsconfig*.json ./
COPY apps/api/nest-cli.json ./

RUN npm run build
EXPOSE 3001

CMD ["sh", "-c", "if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]