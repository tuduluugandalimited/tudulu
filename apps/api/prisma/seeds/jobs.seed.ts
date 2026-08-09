import { PrismaClient, OpportunityType, Status } from "@prisma/client";

export async function seedJobs(prisma: PrismaClient) {
  console.log("Seeding jobs as opportunities...");

  const organization = await prisma.organization.findUnique({
    where: { slug: "straight-talk-foundation" },
  });

  if (!organization) {
    throw new Error(
      "Organization 'straight-talk-foundation' must be seeded before jobs.",
    );
  }

  // Fetch a default category and sector to satisfy required relations on Opportunity
  const category = await prisma.category.findFirst();
  const sector = await prisma.sector.findFirst();

  if (!category || !sector) {
    throw new Error("Categories and sectors must be seeded before jobs.");
  }

  const jobs = [
    {
      title: "Senior Biomedical & Edge AI Engineer",
      slug: "senior-biomedical-edge-ai-engineer",
      type: OpportunityType.JOB,
      summary:
        "Lead the integration of offline-first HIMS medical records and caching layers.",
      description:
        "Lead the integration of offline-first HIMS medical records, caching layers, and diagnostic hardware maintenance protocols across regional health centers.",
      location: "Kampala, Uganda",
      status: Status.ACTIVE,
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
