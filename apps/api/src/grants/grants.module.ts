import { Module } from "@nestjs/common";
import { GrantsController } from "./grants.controller";
import { GrantsService } from "./grants.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [GrantsController],
  providers: [GrantsService],
})
export class GrantsModule {}
