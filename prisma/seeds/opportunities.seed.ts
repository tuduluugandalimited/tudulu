import { PrismaClient, OpportunityType } from "@prisma/client";

// Data mirrored directly from D:\tudulu\apps\web\app\opportunities\data.ts
const OPPORTUNITIES_DATA = [
  {
    id: "1",
    title: "East Africa Digital Health & AI Innovation Fund 2026",
    type: "Grant" as const,
    amount: "$50,000 - $250,000",
    deadline: "2026-08-30",
    target: "HealthTech Startups, Hospitals & Clinics",
    description:
      "Funding for low-latency Health Information Systems (HIS), offline-first clinical tools, and Edge AI integrations tailored for East African health centers.",
    category: "HealthTech",
    sector: "Health & Medicine",
    eligibility: [
      "Registered entity operating within the East African Community (EAC).",
      "Demonstrated pilot deployment or functional software MVP.",
      "Clear data privacy & HIPAA / local health regulation compliance framework.",
    ],
    applicationSteps: [
      "Submit initial technical proposal and institutional background deck.",
      "Technical review by Tudulu's HealthTech review panel.",
      "Shortlisted candidates present live demo and financial audit readiness.",
    ],
    keyDates: [
      { label: "Applications Open", date: "June 1, 2026" },
      { label: "Submission Deadline", date: "August 30, 2026" },
      { label: "Grant Awards Announced", date: "October 15, 2026" },
    ],
    contactEmail: "tuduluugandalimited@gmail.com",
  },
  {
    id: "2",
    title: "Community Solar Resilience Equipment Grant",
    type: "Grant" as const,
    amount: "Up to 60% Subsidy",
    deadline: null, // Rolling Basis
    target: "Rural Clinics & Community Schools",
    description:
      "Subsidy program providing hybrid solar power systems, battery storage, and installation support for off-grid healthcare and education centers.",
    category: "Energy Resilience",
    sector: "Technology & Innovation",
    eligibility: [
      "Must be a licensed health clinic, school, or community hub.",
      "Located in off-grid or power-unstable peri-urban/rural zones.",
      "Willingness to co-fund 40% of hardware installation costs.",
    ],
    applicationSteps: [
      "Request on-site energy audit through our online portal.",
      "Receive customized solar system bill of materials and co-pay quote.",
      "Sign installation agreement and schedule hardware deployment.",
    ],
    keyDates: [
      { label: "Subsidies Open", date: "Rolling Basis" },
      { label: "Site Inspection Cycle", date: "Bi-Weekly" },
    ],
    contactEmail: "tuduluugandalimited@gmail.com",
  },
  {
    id: "3",
    title: "Grassroots Sports Analytics & Tournament Tech Sponsorship",
    type: "Grant" as const,
    amount: "Technical Support & Tools",
    deadline: "2026-09-15",
    target: "Youth Sports Foundations & Academies",
    description:
      "Providing tournament management software, player stat tracking, and digital scouting directories to grassroots sports organizations.",
    category: "Youth & Sports",
    sector: "Technology & Innovation",
    eligibility: [
      "Registered non-profit youth sports academy or league operator.",
      "Active engagement with youth age groups (U13 - U20).",
      "Dedicated coordinator for player statistics and schedule logging.",
    ],
    applicationSteps: [
      "Fill out organization profile and active team headcount.",
      "Attend 1-hour platform orientation session.",
      "Receive workspace credentials and hardware sponsorship equipment.",
    ],
    keyDates: [
      { label: "Partner Applications", date: "September 15, 2026" },
      { label: "Software Onboarding", date: "October 1, 2026" },
    ],
    contactEmail: "tuduluugandalimited@gmail.com",
  },
  {
    id: "4",
    title: "East Africa Open Data & Connectivity Fellowship",
    type: "Grant" as const,
    amount: "$15,000 + Mentorship",
    deadline: "2026-10-12",
    target: "Software Engineers & Data Scientists",
    description:
      "A 6-month hands-on fellowship focused on developing open-source APIs, public health data pipelines, and distributed connectivity solutions.",
    category: "Digital Tech",
    sector: "Technology & Innovation",
    eligibility: [
      "Proficiency in modern TypeScript, Rust, or Python.",
      "Commitment of 20 hours per week for 6 months.",
      "Demonstrated contributions to open-source software or public tools.",
    ],
    applicationSteps: [
      "Submit GitHub profile and sample project portfolio.",
      "Complete a 48-hour async technical code challenge.",
      "Final interview with engineering leads.",
    ],
    keyDates: [
      { label: "Applications Close", date: "October 12, 2026" },
      { label: "Fellowship Starts", date: "November 1, 2026" },
    ],
    contactEmail: "tuduluugandalimited@gmail.com",
  },
];

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapOpportunityType(type: string): OpportunityType {
  switch (type) {
    case "Grant":
      return OpportunityType.GRANT;
    case "Job":
      return OpportunityType.JOB;
    case "Scholarship":
      return OpportunityType.SCHOLARSHIP;
    case "Volunteer":
      return OpportunityType.VOLUNTEER;
    case "Tender":
      return OpportunityType.TENDER;
    default:
      return OpportunityType.GRANT;
  }
}

export async function seedOpportunities(prisma: PrismaClient) {
  console.log("Seeding opportunities data from frontend data file...");

  // Ensure default organization exists
  const defaultOrg = await prisma.organization.findFirst({
    where: { slug: "tudulu-uganda-limited" },
  });

  if (!defaultOrg) {
    throw new Error(
      "Default organization 'tudulu-uganda-limited' must be seeded before running opportunities seed.",
    );
  }

  // Ensure default sector exists for fallback
  const defaultSector = await prisma.sector.findFirst();
  if (!defaultSector) {
    throw new Error(
      "At least one sector must be seeded before running opportunities seed.",
    );
  }

  for (const opp of OPPORTUNITIES_DATA) {
    const categorySlug = toSlug(opp.category);
    const sectorSlug = toSlug(opp.sector);

    // Ensure Category exists safely
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: {
        name: opp.category,
        slug: categorySlug,
        isActive: true,
      },
    });

    // Ensure Sector exists safely without unique constraint collision
    let sector = await prisma.sector.findFirst({
      where: {
        OR: [{ slug: sectorSlug }, { name: opp.sector }],
      },
    });

    if (!sector) {
      sector = await prisma.sector.create({
        data: {
          name: opp.sector,
          slug: sectorSlug,
          isActive: true,
        },
      });
    }

    const oppSlug = toSlug(opp.title) + "-" + opp.id;

    await prisma.opportunity.upsert({
      where: { slug: oppSlug },
      update: {
        title: opp.title,
        type: mapOpportunityType(opp.type),
        summary: opp.description.substring(0, 180) + "...",
        description: opp.description,
        location: "Kampala, Uganda",
        applicationEmail: opp.contactEmail,
        deadline: opp.deadline ? new Date(opp.deadline) : null,
        categoryId: category.id,
        sectorId: sector.id,
        organizationId: defaultOrg.id,
        verified: true,
      },
      create: {
        title: opp.title,
        slug: oppSlug,
        type: mapOpportunityType(opp.type),
        summary: opp.description.substring(0, 180) + "...",
        description: opp.description,
        location: "Kampala, Uganda",
        applicationEmail: opp.contactEmail,
        deadline: opp.deadline ? new Date(opp.deadline) : null,
        categoryId: category.id,
        sectorId: sector.id,
        organizationId: defaultOrg.id,
        verified: true,
      },
    });

    console.log(`Synced opportunity: ${opp.title}`);
  }

  console.log(
    "All frontend opportunities successfully seeded into PostgreSQL database!",
  );
}
