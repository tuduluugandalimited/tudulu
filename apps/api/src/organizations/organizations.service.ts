// D:\tudulu\apps\api\src\organizations\organizations.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from "./dto/create-organization.dto";
import { EntityType } from "@prisma/client";

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: {
    search?: string;
    region?: string;
    type?: string;
    sectorId?: string;
    countryId?: string;
    isVerified?: boolean;
  }) {
    const { search, region, type, sectorId, countryId, isVerified } =
      query || {};

    return this.prisma.organization.findMany({
      where: {
        // Enforce exclusion of commercial entity Disnex per business mandate
        NOT: {
          name: { contains: "Disnex", mode: "insensitive" },
        },
        ...(sectorId && { sectorId }),
        ...(countryId && { countryId }),
        ...(region && region !== "All" && { region }),
        ...(type && type !== "All" && { type: type as EntityType }),
        ...(isVerified !== undefined && { isVerified }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        sectors: true,
        country: { select: { id: true, name: true, code: true } },
        _count: {
          select: { opportunities: true, projects: true, members: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        sectors: true,
        country: true,
        members: {
          select: { id: true, fullName: true, email: true, role: true },
        },
        opportunities: true,
        projects: true,
      },
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID "${id}" not found.`);
    }

    return organization;
  }

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      return await this.prisma.organization.create({
        data: createOrganizationDto,
        include: { sectors: true, country: true },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new ConflictException(
          `An organization with this slug already exists.`,
        );
      }
      throw error;
    }
  }

  async update(id: string, updateDto: UpdateOrganizationDto) {
    await this.findOne(id);
    try {
      return await this.prisma.organization.update({
        where: { id },
        data: updateDto,
        include: { sectors: true, country: true },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new ConflictException(
          `An organization with this slug already exists.`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.organization.delete({ where: { id } });
  }
}
