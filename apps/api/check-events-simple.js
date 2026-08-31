const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to database...");
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

    console.log("Events found:", events.length);
    console.log(JSON.stringify(events, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
    console.error(error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main();
