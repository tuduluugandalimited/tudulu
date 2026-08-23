// D:\tudulu\apps\api\prisma\seeds\main.seed.ts
import { PrismaClient } from "@prisma/client";
import { seedCountries } from "./countries.seed";
import { seedSectors } from "./sectors.seed";
import { seedOrganizations } from "./organizations.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  await seedCountries(prisma);
  await seedSectors(prisma);
  await seedOrganizations(prisma);

  console.log("All seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
