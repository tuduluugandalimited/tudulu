FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code and config files directly
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
COPY nest-cli.json ./

# Generate Prisma and Build NestJS
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main.js"]