import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    // You can query your Prisma models here to return platform overview metrics
    return {
      message: "Admin dashboard metrics retrieved successfully",
      timestamp: new Date().toISOString(),
    };
  }
}
