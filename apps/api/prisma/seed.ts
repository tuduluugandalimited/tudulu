// D:\tudulu\apps\api\prisma\seed.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

// Import individual seed modules
import { seedCountries } from "./seeds/countries.seed";
import { seedSectors } from "./seeds/sectors.seed";
import { seedOrganizations } from "./seeds/organizations.seed";
import { seedOpportunities } from "./seeds/opportunities.seed";
import { seedJobs } from "./seeds/jobs.seed";
import { seedUsers } from "./seeds/users.seed"; // Added users seed

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting comprehensive database seeding suite...");

  // Execute seeders in proper dependency order (Foreign Keys First)
  await seedCountries(prisma);
  await seedSectors(prisma);
  await seedOrganizations(prisma);
  await seedOpportunities(prisma);
  await seedJobs(prisma);
  await seedUsers(prisma); // Run users and admin seeding last

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
