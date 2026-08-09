import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: { search?: string }) {
    const { search } = query || {};

    // Utilizing articles table or custom static pages depending on CMS structure
    return this.prisma.article.findMany({
      where: {
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        sector: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const content = await this.prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        sector: true,
        tags: true,
      },
    });

    if (!content) {
      throw new NotFoundException(
        `Content resource with ID "${id}" not found.`,
      );
    }

    return content;
  }
}
