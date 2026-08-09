// D:\tudulu\apps\api\prisma.config.ts
require("dotenv/config");

module.exports = {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: "ts-node prisma/seed.ts",
  },
};
