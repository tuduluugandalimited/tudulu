// D:\tudulu\apps\api\prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node prisma/seed.ts", // Added seed execution path
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
