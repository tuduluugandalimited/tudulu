import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateVolunteeringDto } from "./dto/create-volunteering.dto";
import { UpdateVolunteeringDto } from "./dto/update-volunteering.dto";

@Injectable()
export class VolunteeringService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVolunteeringDto) {
    return this.prisma.volunteering.create({
      data: dto,
      include: {
        organization: { select: { id: true, name: true, logoUrl: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.volunteering.findMany({
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(idOrSlug: string) {
    const item = await this.prisma.volunteering.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        organization: true,
      },
    });

    if (!item) {
      throw new NotFoundException("Volunteering opportunity not found");
    }

    return item;
  }

  async update(id: string, dto: UpdateVolunteeringDto) {
    await this.findOne(id);
    return this.prisma.volunteering.update({
      where: { id },
      data: dto,
      include: {
        organization: { select: { id: true, name: true, logoUrl: true } },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.volunteering.delete({
      where: { id },
    });
  }
}
