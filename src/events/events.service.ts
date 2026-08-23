import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      include: {
        organization: {
          select: { id: true, name: true, slug: true, logoUrl: true },
        },
      },
      orderBy: { startDate: "asc" },
    });
  }

  async findBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: {
        organization: {
          select: { id: true, name: true, slug: true, logoUrl: true },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with slug '${slug}' not found`);
    }

    return event;
  }

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });
  }

  async update(id: string, dto: UpdateEventDto) {
    await this.ensureEventExists(id);

    return this.prisma.event.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.startDate && { startDate: new Date(dto.startDate) }),
        ...(dto.endDate && { endDate: new Date(dto.endDate) }),
      },
    });
  }

  async remove(id: string) {
    await this.ensureEventExists(id);
    return this.prisma.event.delete({ where: { id } });
  }

  private async ensureEventExists(id: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID '${id}' not found`);
    }
  }
}
