"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
async function seedUsers(prisma) {
    console.log("Seeding admin and default users...");
    const adminEmail = process.env.ADMIN_EMAIL || "tuduluugandalimited@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Crucial2011!";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            passwordHash: hashedPassword,
            role: client_1.Role.ADMIN,
        },
        create: {
            email: adminEmail,
            fullName: "Tudulu Admin",
            passwordHash: hashedPassword,
            role: client_1.Role.ADMIN,
        },
    });
    console.log("Users seed completed.");
}
//# sourceMappingURL=users.seed.js.map