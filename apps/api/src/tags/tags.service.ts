import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: { articles: true, opportunities: true },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        articles: { select: { id: true, title: true, slug: true } },
        opportunities: { select: { id: true, title: true, slug: true } },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID "${id}" not found.`);
    }

    return tag;
  }

  async create(createTagDto: { name: string; slug: string }) {
    try {
      return await this.prisma.tag.create({
        data: {
          name: createTagDto.name,
          slug: createTagDto.slug,
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException(
          `A tag with this name or slug already exists.`,
        );
      }
      throw error;
    }
  }

  async update(id: string, updateTagDto: { name?: string; slug?: string }) {
    await this.findOne(id); // Ensure tag exists

    try {
      return await this.prisma.tag.update({
        where: { id },
        data: updateTagDto,
      });
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException(
          `A tag with this name or slug already exists.`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure tag exists

    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
