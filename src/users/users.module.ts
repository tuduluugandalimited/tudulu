// D:\tudulu\apps\api\src\users\users.module.ts
import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaModule } from "../prisma/prisma.module"; // Adjust to your prisma module path

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exported in case your Auth module needs to verify users
})
export class UsersModule {}
