// D:\tudulu\apps\api\prisma\seeds\countries.seed.ts
import { PrismaClient } from "@prisma/client";

export async function seedCountries(prisma: PrismaClient) {
  console.log("Seeding all African countries...");

  // Ensure regions exist for foreign key relations
  const regions = [
    { name: "East Africa", slug: "east-africa" },
    { name: "West Africa", slug: "west-africa" },
    { name: "North Africa", slug: "north-africa" },
    { name: "Central Africa", slug: "central-africa" },
    { name: "Southern Africa", slug: "southern-africa" },
  ];

  const regionMap: Record<string, string> = {};

  for (const reg of regions) {
    const upsertedReg = await prisma.region.upsert({
      where: { slug: reg.slug },
      update: {
        name: reg.name,
      },
      create: {
        name: reg.name,
        slug: reg.slug,
      },
    });
    regionMap[reg.slug] = upsertedReg.id;
  }

  // Complete list of sovereign African countries mapped to their regions
  const countries = [
    // East Africa
    { name: "Burundi", code: "BI", regionSlug: "east-africa" },
    { name: "Comoros", code: "KM", regionSlug: "east-africa" },
    { name: "Djibouti", code: "DJ", regionSlug: "east-africa" },
    { name: "Eritrea", code: "ER", regionSlug: "east-africa" },
    { name: "Ethiopia", code: "ET", regionSlug: "east-africa" },
    { name: "Kenya", code: "KE", regionSlug: "east-africa" },
    { name: "Madagascar", code: "MG", regionSlug: "east-africa" },
    { name: "Malawi", code: "MW", regionSlug: "east-africa" },
    { name: "Mauritius", code: "MU", regionSlug: "east-africa" },
    { name: "Mozambique", code: "MZ", regionSlug: "east-africa" },
    { name: "Rwanda", code: "RW", regionSlug: "east-africa" },
    { name: "Seychelles", code: "SC", regionSlug: "east-africa" },
    { name: "Somalia", code: "SO", regionSlug: "east-africa" },
    { name: "South Sudan", code: "SS", regionSlug: "east-africa" },
    { name: "Tanzania", code: "TZ", regionSlug: "east-africa" },
    { name: "Uganda", code: "UG", regionSlug: "east-africa" },
    { name: "Zambia", code: "ZM", regionSlug: "east-africa" },
    { name: "Zimbabwe", code: "ZW", regionSlug: "east-africa" },

    // West Africa
    { name: "Benin", code: "BJ", regionSlug: "west-africa" },
    { name: "Burkina Faso", code: "BF", regionSlug: "west-africa" },
    { name: "Cape Verde", code: "CV", regionSlug: "west-africa" },
    { name: "Côte d'Ivoire", code: "CI", regionSlug: "west-africa" },
    { name: "Gambia", code: "GM", regionSlug: "west-africa" },
    { name: "Ghana", code: "GH", regionSlug: "west-africa" },
    { name: "Guinea", code: "GN", regionSlug: "west-africa" },
    { name: "Guinea-Bissau", code: "GW", regionSlug: "west-africa" },
    { name: "Liberia", code: "LR", regionSlug: "west-africa" },
    { name: "Mali", code: "ML", regionSlug: "west-africa" },
    { name: "Mauritania", code: "MR", regionSlug: "west-africa" },
    { name: "Niger", code: "NE", regionSlug: "west-africa" },
    { name: "Nigeria", code: "NG", regionSlug: "west-africa" },
    { name: "Senegal", code: "SN", regionSlug: "west-africa" },
    { name: "Sierra Leone", code: "SL", regionSlug: "west-africa" },
    { name: "Togo", code: "TG", regionSlug: "west-africa" },

    // North Africa
    { name: "Algeria", code: "DZ", regionSlug: "north-africa" },
    { name: "Egypt", code: "EG", regionSlug: "north-africa" },
    { name: "Libya", code: "LY", regionSlug: "north-africa" },
    { name: "Morocco", code: "MA", regionSlug: "north-africa" },
    { name: "Sudan", code: "SD", regionSlug: "north-africa" },
    { name: "Tunisia", code: "TN", regionSlug: "north-africa" },

    // Central Africa
    { name: "Cameroon", code: "CM", regionSlug: "central-africa" },
    {
      name: "Central African Republic",
      code: "CF",
      regionSlug: "central-africa",
    },
    { name: "Chad", code: "TD", regionSlug: "central-africa" },
    { name: "Congo", code: "CG", regionSlug: "central-africa" },
    {
      name: "Democratic Republic of the Congo",
      code: "CD",
      regionSlug: "central-africa",
    },
    { name: "Equatorial Guinea", code: "GQ", regionSlug: "central-africa" },
    { name: "Gabon", code: "GA", regionSlug: "central-africa" },
    { name: "Sao Tome and Principe", code: "ST", regionSlug: "central-africa" },

    // Southern Africa
    { name: "Angola", code: "AO", regionSlug: "southern-africa" },
    { name: "Botswana", code: "BW", regionSlug: "southern-africa" },
    { name: "Eswatini", code: "SZ", regionSlug: "southern-africa" },
    { name: "Lesotho", code: "LS", regionSlug: "southern-africa" },
    { name: "Namibia", code: "NA", regionSlug: "southern-africa" },
    { name: "South Africa", code: "ZA", regionSlug: "southern-africa" },
  ];

  for (const country of countries) {
    const slug = country.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const regionId = regionMap[country.regionSlug];

    await prisma.country.upsert({
      where: { code: country.code },
      update: {
        name: country.name,
        slug: slug,
        regionId: regionId,
      },
      create: {
        code: country.code,
        name: country.name,
        slug: slug,
        regionId: regionId,
      },
    });
  }

  console.log("All African countries successfully seeded!");
}
