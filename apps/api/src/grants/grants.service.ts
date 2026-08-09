import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGrantDto } from "./dto/create-grant.dto";

@Injectable()
export class GrantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.opportunity.findMany({
      where: { type: "GRANT" },
      include: {
        organization: true,
        sector: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const grant = await this.prisma.opportunity.findUnique({
      where: { id, type: "GRANT" },
      include: {
        organization: true,
        sector: true,
        category: true,
      },
    });

    if (!grant) {
      throw new NotFoundException(`Grant opportunity with ID ${id} not found`);
    }

    return grant;
  }

  async create(createGrantDto: CreateGrantDto) {
    return this.prisma.opportunity.create({
      data: {
        title: createGrantDto.title,
        slug:
          createGrantDto.slug ||
          createGrantDto.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
        type: "GRANT",
        summary: createGrantDto.summary,
        description: createGrantDto.description,
        location: createGrantDto.location,
        qualifications: createGrantDto.qualifications || [],
        applicationEmail: createGrantDto.applicationEmail,
        applicationUrl: createGrantDto.applicationUrl,
        verified: createGrantDto.verified ?? false,
        deadline: createGrantDto.deadline
          ? new Date(createGrantDto.deadline)
          : null,
        amountUSD: createGrantDto.amountUSD,
        organizationId: createGrantDto.organizationId,
        categoryId: createGrantDto.categoryId,
        sectorId: createGrantDto.sectorId,
      },
      include: {
        organization: true,
        sector: true,
        category: true,
      },
    });
  }
}
