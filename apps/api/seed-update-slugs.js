const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();

  try {
    // Get all events first
    const events = await prisma.event.findMany();
    console.log(`Found ${events.length} events`);

    // Define slug mappings
    const slugMap = {
      "Regional Data Protection and Cybersecurity Symposium for Humanitarian Actors":
        "regional-data-protection-cybersecurity-symposium-2026",
      "2nd Research Carnival on Mental Health and Psychosocial Support (MHPSS)":
        "mhpss-research-carnival-2026",
      "5th African Business and Human Rights Forum":
        "african-business-human-rights-forum-2026",
      "Open Source in Energy Access Symposium (OSEAS)": "oseas-2026",
      "PILnet Global Forum 2026": "pilnet-global-forum-2026",
      "African Evaluation Association 12th Conference": "afrea-2026",
      "POHER Medical Research and Mentorship Symposium": "poher-symposium-2026",
      "Internet Governance Forum 2026": "igf-2026",
      "Global Youth Summit for Climate Change":
        "global-youth-climate-summit-2026",
      "TEST EVENT - DO NOT DELETE": "test-event-do-not-delete",
    };

    // Update each event
    for (const event of events) {
      const newSlug = slugMap[event.title];
      if (newSlug && event.slug !== newSlug) {
        console.log(
          `Updating "${event.title}" from "${event.slug}" to "${newSlug}"`,
        );
        await prisma.event.update({
          where: { id: event.id },
          data: { slug: newSlug },
        });
      }
    }

    // Show final results
    const updatedEvents = await prisma.event.findMany({
      select: { id: true, title: true, slug: true, startDate: true },
      orderBy: { startDate: "asc" },
    });

    console.log("\nUpdated events:");
    console.log(JSON.stringify(updatedEvents, null, 2));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
