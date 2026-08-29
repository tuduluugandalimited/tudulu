import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OpportunityCronService {
  private readonly logger = new Logger(OpportunityCronService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Hourly automated runner
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.log("Triggered automatic hourly expiration run.");
    await this.processExpiredOpportunities();
  }

  /**
   * Core execution logic (callable manually via Admin API or via Cron)
   */
  async processExpiredOpportunities(): Promise<{ count: number }> {
    const now = new Date();

    try {
      const result = await this.prisma.opportunity.updateMany({
        where: {
          status: "ACTIVE",
          deletedAt: null,
          expiresAt: {
            lte: now,
          },
        },
        data: {
          status: "EXPIRED",
        },
      });

      this.logger.log(
        `Processed expiry. Marked ${result.count} opportunity(ies) as EXPIRED.`,
      );

      return { count: result.count };
    } catch (error) {
      this.logger.error(
        "Error executing opportunity expiration cleanup",
        error,
      );
      throw error;
    }
  }
}
