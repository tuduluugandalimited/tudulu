import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CountriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    // Implement Prisma query to fetch all countries or regions
    return { message: "Fetch all countries endpoint" };
  }

  async findOne(code: string) {
    return { message: `Fetch country details for code: ${code}` };
  }
}
