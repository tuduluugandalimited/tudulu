import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsEmail,
  IsDateString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApplicationMethod, OpportunityType } from "@prisma/client";
import { TranslationMapDto } from "../../common/types/i18n.type";

export class CreateOpportunityDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationMapDto)
  titleTranslations?: TranslationMapDto;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationMapDto)
  summaryTranslations?: TranslationMapDto;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationMapDto)
  descriptionTranslations?: TranslationMapDto;

  @IsEnum(OpportunityType)
  type: OpportunityType;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  sectorId: string;

  // Provenance & Direct Application Routing
  @IsEnum(ApplicationMethod)
  @IsOptional()
  applicationMethod?: ApplicationMethod = ApplicationMethod.EXTERNAL_URL;

  @IsUrl()
  @IsOptional()
  applicationUrl?: string;

  @IsEmail()
  @IsOptional()
  applicationEmail?: string;

  @IsUrl()
  @IsOptional()
  sourceUrl?: string;

  // Deadline (expiresAt is explicitly NOT accepted here - managed server-side)
  @IsDateString()
  @IsOptional()
  deadline?: string;
}
