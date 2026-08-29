// D:\tudulu\apps\api\src\news\news.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: { isTrending?: boolean; search?: string }) {
    const { isTrending, search } = query || {};

    return this.prisma.article.findMany({
      where: {
        ...(isTrending !== undefined && { isTrending }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { content: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        category: { select: { id: true, name: true } },
        sector: { select: { id: true, name: true } },
      },
      orderBy: { publishedAt: "desc" },
    });
  }

  async findOne(identifier: string) {
    const article = await this.prisma.article.findFirst({
      where: {
        OR: [{ slug: identifier }, { id: identifier }],
      },
      include: {
        category: true,
        sector: true,
        country: true,
        tags: true,
      },
    });

    if (!article) {
      throw new NotFoundException(
        `News article with identifier "${identifier}" not found.`,
      );
    }
    return article;
  }
}
