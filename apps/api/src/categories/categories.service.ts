import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"; // Adjust path to your Prisma service
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { articles: true, opportunities: true },
        },
      },
    });
  }

  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException("A category with this slug already exists.");
    }

    return this.prisma.category.create({ data: dto });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: id.toString() },
    });
    if (!category) throw new NotFoundException("Category not found");

    return this.prisma.category.update({
      where: { id: id.toString() },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
