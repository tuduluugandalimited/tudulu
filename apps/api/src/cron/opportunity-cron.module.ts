import { Module } from "@nestjs/common";
import { OpportunityCronService } from "./opportunity-cron.service";
import { OpportunityCronController } from "./opportunity-cron.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [OpportunityCronController],
  providers: [OpportunityCronService],
})
export class OpportunityCronModule {}
