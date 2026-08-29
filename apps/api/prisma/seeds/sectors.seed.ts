// D:\tudulu\apps\api\prisma\seeds\sectors.seed.ts
import { PrismaClient } from "@prisma/client";

export async function seedSectors(prisma: PrismaClient) {
  console.log("Seeding sectors...");

  const sectors = [
    {
      id: "32cedb88-ecfc-4778-8088-5c05f046234d",
      slug: "health-and-medicine",
      name: "Health & Medicine",
      description:
        "Public health, healthcare delivery, clinical services, medical equipment management, and epidemiological research.",
      isActive: true,
    },
    {
      id: "0754728f-0197-4d4d-b7a9-ceca1e82e47b",
      slug: "poverty-reduction-and-livelihoods",
      name: "Poverty Reduction & Livelihoods",
      description:
        "Economic empowerment, microfinance, community development, and poverty alleviation programs.",
      isActive: true,
    },
    {
      id: "bcf548dc-228b-4075-a637-aeb52bba0803",
      slug: "environment-and-conservation",
      name: "Environment & Conservation",
      description:
        "Water, sanitation, and hygiene (WASH), wildlife conservation, climate resilience, and natural resource management.",
      isActive: true,
    },
    {
      id: "5d4968e6-8dd5-493f-9456-f75207659d39",
      slug: "humanitarian-and-emergency-relief",
      name: "Humanitarian & Emergency Relief",
      description:
        "Disaster response, food security, nutritional support, and emergency medical humanitarian assistance.",
      isActive: true,
    },
    {
      id: "2b844466-40b6-44f6-8ed9-3a3b936d5e8b",
      slug: "sports-and-youth-development",
      name: "Sports & Youth Development",
      description:
        "Grassroots sports initiatives, youth mentorship, leadership programs, and social inclusion activities.",
      isActive: true,
    },
    {
      id: "c8fb10ae-3e9e-41de-b86a-6c30458f9334",
      slug: "education-and-advocacy",
      name: "Education & Advocacy",
      description:
        "Formal and informal education, human rights advocacy, communication-for-development, and adolescent health outreach.",
      isActive: true,
    },
  ];

  for (const sector of sectors) {
    await prisma.sector.upsert({
      where: { slug: sector.slug },
      update: sector,
      create: sector,
    });
  }

  console.log("Sectors successfully seeded!");
}
