// D:\tudulu\apps\api\src\taxonomy\taxonomy.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TaxonomyService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: { articles: true, opportunities: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const sectors = await this.prisma.sector.findMany({
      include: {
        _count: {
          select: { opportunities: true, articles: true },
        },
      },
      orderBy: { name: "asc" },
    });

    const regions = await this.prisma.region.findMany({
      include: {
        countries: {
          include: {
            _count: { select: { organizations: true, articles: true } },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return {
      categories,
      sectors,
      regions,
    };
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        articles: { select: { id: true, title: true, slug: true } },
        opportunities: { select: { id: true, title: true, slug: true } },
      },
    });

    if (category) return { type: "category", data: category };

    const sector = await this.prisma.sector.findUnique({
      where: { id },
      include: {
        opportunities: { select: { id: true, title: true, slug: true } },
        articles: { select: { id: true, title: true, slug: true } },
      },
    });

    if (sector) return { type: "sector", data: sector };

    throw new NotFoundException(`Taxonomy entity with ID "${id}" not found.`);
  }

  async create(createTaxonomyDto: {
    type: "category" | "sector";
    name: string;
    slug: string;
    description?: string;
  }) {
    try {
      if (createTaxonomyDto.type === "category") {
        return await this.prisma.category.create({
          data: {
            name: createTaxonomyDto.name,
            slug: createTaxonomyDto.slug,
          },
        });
      } else {
        return await this.prisma.sector.create({
          data: {
            name: createTaxonomyDto.name,
            slug: createTaxonomyDto.slug,
            description: createTaxonomyDto.description,
          },
        });
      }
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException(
          `Taxonomy term with this name or slug already exists.`,
        );
      }
      throw error;
    }
  }

  async update(
    id: string,
    updateTaxonomyDto: { name?: string; slug?: string; description?: string },
  ) {
    try {
      const category = await this.prisma.category.findUnique({ where: { id } });
      if (category) {
        return await this.prisma.category.update({
          where: { id },
          data: {
            name: updateTaxonomyDto.name,
            slug: updateTaxonomyDto.slug,
          },
        });
      }

      const sector = await this.prisma.sector.findUnique({ where: { id } });
      if (sector) {
        return await this.prisma.sector.update({
          where: { id },
          data: {
            name: updateTaxonomyDto.name,
            slug: updateTaxonomyDto.slug,
            description: updateTaxonomyDto.description,
          },
        });
      }

      throw new NotFoundException(`Taxonomy term with ID "${id}" not found.`);
    } catch (error) {
      if (error.code === "P2002") {
        throw new ConflictException(
          `Taxonomy term with this name or slug already exists.`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (category) {
      return await this.prisma.category.delete({ where: { id } });
    }

    const sector = await this.prisma.sector.findUnique({ where: { id } });
    if (sector) {
      return await this.prisma.sector.delete({ where: { id } });
    }

    throw new NotFoundException(`Taxonomy term with ID "${id}" not found.`);
  }
}
