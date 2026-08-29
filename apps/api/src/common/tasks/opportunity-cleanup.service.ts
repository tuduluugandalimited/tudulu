import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../../prisma/prisma.service";
import { Status } from "@prisma/client";

@Injectable()
export class OpportunityCleanupService {
  private readonly logger = new Logger(OpportunityCleanupService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Runs every day at 1:00 AM
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleExpiredOpportunities() {
    this.logger.log("Running daily opportunity expiration task...");

    // Cutoff: 1 day past deadline
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 1);

    const result = await this.prisma.opportunity.updateMany({
      where: {
        status: Status.ACTIVE,
        deadline: {
          lt: cutoffDate, // Deadline was more than 24 hours ago
        },
      },
      data: {
        status: Status.EXPIRED,
        deletedAt: new Date(),
      },
    });

    this.logger.log(`Soft-deleted ${result.count} expired opportunities.`);
  }
}
