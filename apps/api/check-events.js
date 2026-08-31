const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        startDate: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    console.log("Events in database:");
    console.log(JSON.stringify(events, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
