import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGrantDto } from "./dto/create-grant.dto";
import { UpdateGrantDto } from "./dto/update-grant.dto";
import { FindGrantsQueryDto } from "./dto/find-grants-query.dto";

@Injectable()
export class GrantsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper method to calculate exact 24-hour grace period expiry
   */
  private computeExpiry(deadline?: Date | string | null): Date | null {
    if (!deadline) return null;
    const date = new Date(deadline);
    if (Number.isNaN(date.getTime())) return null;
    return new Date(date.getTime() + 24 * 60 * 60 * 1000);
  }

  /**
   * Helper method to resolve localized string with fallback
   */
  private resolveTranslation(
    defaultText: string,
    translations: Record<string, any> | null | undefined,
    lang?: string,
  ): string {
    if (!translations || !lang) return defaultText;
    return translations[lang] || translations["en"] || defaultText;
  }

  /**
   * Map database object to return requested localized fields
   */
  private localizeOpportunity(opportunity: any, lang?: string) {
    if (!opportunity) return opportunity;

    return {
      ...opportunity,
      title: this.resolveTranslation(
        opportunity.title,
        opportunity.titleTranslations,
        lang,
      ),
      summary: this.resolveTranslation(
        opportunity.summary,
        opportunity.summaryTranslations,
        lang,
      ),
      description: this.resolveTranslation(
        opportunity.description,
        opportunity.descriptionTranslations,
        lang,
      ),
    };
  }

  /**
   * Query all grants with search, filtering, funding range, and pagination support
   */
  async findAll(query: FindGrantsQueryDto) {
    const {
      search,
      sectorId,
      categoryId,
      organizationId,
      minAmount,
      maxAmount,
      lang,
      page = 1,
      limit = 10,
    } = query;

    const now = new Date();
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // Build standard Prisma filters
    const where: any = {
      type: "GRANT",
      status: "ACTIVE",
      deletedAt: null,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: now } }, // Hides grants immediately once 24h grace period ends
      ],
      ...(sectorId && { sectorId }),
      ...(categoryId && { categoryId }),
      ...(organizationId && { organizationId }),
    };

    // Filter by USD funding amount
    if (minAmount !== undefined || maxAmount !== undefined) {
      where.amountUSD = {
        ...(minAmount !== undefined && { gte: Number(minAmount) }),
        ...(maxAmount !== undefined && { lte: Number(maxAmount) }),
      };
    }

    // Append search conditions across title, summary, and description
    if (search) {
      where.AND = [
        {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { summary: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        },
      ];
    }

    const [grants, total] = await Promise.all([
      this.prisma.opportunity.findMany({
        where,
        skip,
        take,
        include: {
          organization: true,
          sector: true,
          category: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.opportunity.count({ where }),
    ]);

    const localizedGrants = grants.map((grant) =>
      this.localizeOpportunity(grant, lang),
    );

    return {
      data: localizedGrants,
      meta: {
        total,
        page: Number(page),
        limit: take,
        lastPage: Math.ceil(total / take) || 1,
      },
    };
  }

  async findOne(id: string, lang?: string) {
    const now = new Date();

    const grant = await this.prisma.opportunity.findFirst({
      where: {
        id,
        type: "GRANT",
        status: "ACTIVE",
        deletedAt: null,
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
      include: {
        organization: true,
        sector: true,
        category: true,
      },
    });

    if (!grant) {
      throw new NotFoundException(
        `Grant opportunity with ID ${id} not found or expired`,
      );
    }

    return this.localizeOpportunity(grant, lang);
  }

  async create(createGrantDto: CreateGrantDto) {
    const {
      title,
      description,
      titleTranslations,
      summaryTranslations,
      descriptionTranslations,
      slug,
      summary,
      location,
      qualifications,
      applicationEmail,
      applicationUrl,
      verified,
      deadline,
      amountUSD,
      organizationId,
      categoryId,
      sectorId,
    } = createGrantDto;

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const deadlineDate = deadline ? new Date(deadline) : null;
    const computedExpiry = this.computeExpiry(deadlineDate);

    return this.prisma.opportunity.create({
      data: {
        title,
        description,
        type: "GRANT",
        slug: generatedSlug,
        summary,
        location,
        responsibilities: [],
        qualifications: qualifications || [],
        applicationEmail,
        applicationUrl,
        verified: verified ?? false,
        deadline: deadlineDate,
        expiresAt: computedExpiry,
        amountUSD,

        titleTranslations: titleTranslations
          ? (titleTranslations as Record<string, any>)
          : undefined,
        summaryTranslations: summaryTranslations
          ? (summaryTranslations as Record<string, any>)
          : undefined,
        descriptionTranslations: descriptionTranslations
          ? (descriptionTranslations as Record<string, any>)
          : undefined,

        organization: { connect: { id: organizationId } },
        category: { connect: { id: categoryId } },
        sector: { connect: { id: sectorId } },
      },
      include: {
        organization: true,
        sector: true,
        category: true,
      },
    });
  }

  async update(id: string, updateGrantDto: UpdateGrantDto) {
    await this.findOne(id);

    const {
      titleTranslations,
      summaryTranslations,
      descriptionTranslations,
      deadline,
      organizationId,
      categoryId,
      sectorId,
      ...directFields
    } = updateGrantDto;

    const deadlineDate =
      deadline !== undefined
        ? deadline
          ? new Date(deadline)
          : null
        : undefined;
    const computedExpiry =
      deadlineDate !== undefined ? this.computeExpiry(deadlineDate) : undefined;

    return this.prisma.opportunity.update({
      where: { id },
      data: {
        ...directFields,
        ...(deadlineDate !== undefined && {
          deadline: deadlineDate,
          expiresAt: computedExpiry,
        }),
        ...(titleTranslations && {
          titleTranslations: titleTranslations as Record<string, any>,
        }),
        ...(summaryTranslations && {
          summaryTranslations: summaryTranslations as Record<string, any>,
        }),
        ...(descriptionTranslations && {
          descriptionTranslations: descriptionTranslations as Record<
            string,
            any
          >,
        }),
        ...(organizationId && {
          organization: { connect: { id: organizationId } },
        }),
        ...(categoryId && {
          category: { connect: { id: categoryId } },
        }),
        ...(sectorId && {
          sector: { connect: { id: sectorId } },
        }),
      },
      include: {
        organization: true,
        sector: true,
        category: true,
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
