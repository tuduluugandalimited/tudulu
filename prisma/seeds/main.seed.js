"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const countries_seed_1 = require("./countries.seed");
const sectors_seed_1 = require("./sectors.seed");
const organizations_seed_1 = require("./organizations.seed");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("Starting database seeding...");
    await (0, countries_seed_1.seedCountries)(prisma);
    await (0, sectors_seed_1.seedSectors)(prisma);
    await (0, organizations_seed_1.seedOrganizations)(prisma);
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
//# sourceMappingURL=main.seed.js.map