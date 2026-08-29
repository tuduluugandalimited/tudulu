// D:\tudulu\apps\api\prisma\seeds/news.seed.ts
import { PrismaClient, Status } from "@prisma/client";

export async function seedNews(prisma: PrismaClient) {
  console.log("Seeding initial news articles...");

  let category = await prisma.category.findFirst();
  if (!category) {
    category = await prisma.category.create({
      data: { name: "General News", slug: "general-news" },
    });
  }

  let sector = await prisma.sector.findFirst();
  if (!sector) {
    sector = await prisma.sector.create({
      data: { name: "Technology", slug: "technology" },
    });
  }

  const articleData = {
    title: "East Africa Tech Innovation Hub Launches 2026 Cohort",
    slug: "east-africa-tech-innovation-hub-launches-2026",
    excerpt:
      "New initiative launched to support regional tech startups with funding and mentorship.",
    content:
      "The East Africa Tech Innovation Hub has officially opened applications for its 2026 cohort, targeting high-impact digital solutions across the region.",
    status: Status.ACTIVE,
    publishedAt: new Date(),
    isTrending: true,
    category: {
      connect: { id: category.id },
    },
    sector: {
      connect: { id: sector.id },
    },
  };

  await prisma.article.upsert({
    where: { slug: articleData.slug },
    update: {},
    create: articleData,
  });

  console.log("News articles successfully seeded!");
}
