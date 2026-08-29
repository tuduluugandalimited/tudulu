"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
require("dotenv/config");
const countries_seed_1 = require("./seeds/countries.seed");
const sectors_seed_1 = require("./seeds/sectors.seed");
const organizations_seed_1 = require("./seeds/organizations.seed");
const opportunities_seed_1 = require("./seeds/opportunities.seed");
const jobs_seed_1 = require("./seeds/jobs.seed");
const users_seed_1 = require("./seeds/users.seed");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log("Starting comprehensive database seeding suite...");
    await (0, countries_seed_1.seedCountries)(prisma);
    await (0, sectors_seed_1.seedSectors)(prisma);
    await (0, organizations_seed_1.seedOrganizations)(prisma);
    await (0, opportunities_seed_1.seedOpportunities)(prisma);
    await (0, jobs_seed_1.seedJobs)(prisma);
    await (0, users_seed_1.seedUsers)(prisma);
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
//# sourceMappingURL=seed.js.map