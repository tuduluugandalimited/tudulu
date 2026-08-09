// D:\tudulu\apps\api\src\jobs\jobs.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.opportunity.findMany({
      where: { type: "JOB" },
      include: {
        organization: true,
        sector: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const job = await this.prisma.opportunity.findUnique({
      where: { id, type: "JOB" },
      include: {
        organization: true,
        sector: true,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job opportunity with ID ${id} not found`);
    }

    return job;
  }

  async create(createJobDto: CreateJobDto) {
    return this.prisma.opportunity.create({
      data: {
        title: createJobDto.title,
        slug:
          createJobDto.slug ||
          createJobDto.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, ""),
        type: "JOB",
        summary: createJobDto.summary,
        description: createJobDto.description,
        location: createJobDto.location,
        employmentType: createJobDto.employmentType,
        experienceLevel: createJobDto.experienceLevel,
        responsibilities: createJobDto.responsibilities || [],
        qualifications: createJobDto.qualifications || [],
        applicationEmail: createJobDto.applicationEmail,
        applicationUrl: createJobDto.applicationUrl,
        verified: createJobDto.verified ?? false,
        deadline: createJobDto.deadline
          ? new Date(createJobDto.deadline)
          : null,
        organizationId: createJobDto.organizationId,
        categoryId: createJobDto.categoryId,
        sectorId: createJobDto.sectorId,
      },
      include: {
        organization: true,
        sector: true,
      },
    });
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    await this.findOne(id);

    return this.prisma.opportunity.update({
      where: { id },
      data: {
        ...(updateJobDto.title && { title: updateJobDto.title }),
        ...(updateJobDto.slug && { slug: updateJobDto.slug }),
        ...(updateJobDto.summary && { summary: updateJobDto.summary }),
        ...(updateJobDto.description && {
          description: updateJobDto.description,
        }),
        ...(updateJobDto.location && { location: updateJobDto.location }),
        ...(updateJobDto.employmentType && {
          employmentType: updateJobDto.employmentType,
        }),
        ...(updateJobDto.experienceLevel && {
          experienceLevel: updateJobDto.experienceLevel,
        }),
        ...(updateJobDto.responsibilities && {
          responsibilities: updateJobDto.responsibilities,
        }),
        ...(updateJobDto.qualifications && {
          qualifications: updateJobDto.qualifications,
        }),
        ...(updateJobDto.applicationEmail !== undefined && {
          applicationEmail: updateJobDto.applicationEmail,
        }),
        ...(updateJobDto.applicationUrl !== undefined && {
          applicationUrl: updateJobDto.applicationUrl,
        }),
        ...(updateJobDto.verified !== undefined && {
          verified: updateJobDto.verified,
        }),
        ...(updateJobDto.deadline !== undefined && {
          deadline: updateJobDto.deadline
            ? new Date(updateJobDto.deadline)
            : null,
        }),
        ...(updateJobDto.organizationId && {
          organizationId: updateJobDto.organizationId,
        }),
        ...(updateJobDto.categoryId && { categoryId: updateJobDto.categoryId }),
        ...(updateJobDto.sectorId && { sectorId: updateJobDto.sectorId }),
      },
      include: {
        organization: true,
        sector: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.opportunity.delete({
      where: { id },
    });
  }
}
