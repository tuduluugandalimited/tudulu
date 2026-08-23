// D:\tudulu\apps\api\prisma\seed.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

import { seedCountries } from "./seeds/countries.seed";
import { seedSectors } from "./seeds/sectors.seed";
import { seedOrganizations } from "./seeds/organizations.seed";
import { seedOpportunities } from "./seeds/opportunities.seed";
import { seedJobs } from "./seeds/jobs.seed";
import { seedUsers } from "./seeds/users.seed";
import { seedNews } from "./seeds/news.seed";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting comprehensive database seeding suite...");

  await seedCountries(prisma);
  await seedSectors(prisma);
  await seedOrganizations(prisma);
  await seedOpportunities(prisma);
  await seedJobs(prisma);
  await seedUsers(prisma);
  await seedNews(prisma);

  console.log("All database seeds completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during comprehensive seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
