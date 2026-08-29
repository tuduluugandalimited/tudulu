// D:\tudulu\apps\api\prisma\seeds\users.seed.ts
import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
  console.log("Seeding admin and default users...");

  const adminEmail = process.env.ADMIN_EMAIL || "tuduluugandalimited@gmail.com";
  // Force hardcoded fallback to Crucial2011! to match your login credentials
  const adminPassword = process.env.ADMIN_PASSWORD || "Crucial2011!";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
      role: Role.ADMIN,
    },
    create: {
      email: adminEmail,
      fullName: "Tudulu Admin",
      passwordHash: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("Users seed completed.");
}
