import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { OpportunityCronService } from "./opportunity-cron.service";

@Controller("admin/tasks")
export class OpportunityCronController {
  constructor(private readonly cronService: OpportunityCronService) {}

  @Post("trigger-expiry")
  @HttpCode(HttpStatus.OK)
  // Add your API auth guards here, e.g., @UseGuards(JwtAuthGuard, RolesGuard)
  async triggerExpiryManually() {
    const result = await this.cronService.processExpiredOpportunities();

    return {
      message: "Expired opportunities processing completed successfully.",
      timestamp: new Date().toISOString(),
      updatedCount: result.count,
    };
  }
}
