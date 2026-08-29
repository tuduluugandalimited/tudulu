"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedJobs = seedJobs;
const client_1 = require("@prisma/client");
async function seedJobs(prisma) {
    console.log("Seeding jobs as opportunities...");
    const organization = await prisma.organization.findUnique({
        where: { slug: "straight-talk-foundation" },
    });
    if (!organization) {
        throw new Error("Organization 'straight-talk-foundation' must be seeded before jobs.");
    }
    const category = await prisma.category.findFirst();
    const sector = await prisma.sector.findFirst();
    if (!category || !sector) {
        throw new Error("Categories and sectors must be seeded before jobs.");
    }
    const jobs = [
        {
            title: "Senior Biomedical & Edge AI Engineer",
            slug: "senior-biomedical-edge-ai-engineer",
            type: client_1.OpportunityType.JOB,
            summary: "Lead the integration of offline-first HIMS medical records and caching layers.",
            description: "Lead the integration of offline-first HIMS medical records, caching layers, and diagnostic hardware maintenance protocols across regional health centers.",
            location: "Kampala, Uganda",
            status: client_1.Status.ACTIVE,
            verified: true,
            organizationId: organization.id,
            categoryId: category.id,
            sectorId: sector.id,
        },
    ];
    for (const job of jobs) {
        await prisma.opportunity.upsert({
            where: { slug: job.slug },
            update: {},
            create: job,
        });
    }
    console.log("Jobs seeded successfully.");
}
//# sourceMappingURL=jobs.seed.js.map