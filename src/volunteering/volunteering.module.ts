import { Module } from "@nestjs/common";
import { VolunteeringController } from "./volunteering.controller";
import { VolunteeringService } from "./volunteering.service";

@Module({
  controllers: [VolunteeringController],
  providers: [VolunteeringService],
  exports: [VolunteeringService],
})
export class VolunteeringModule {}
