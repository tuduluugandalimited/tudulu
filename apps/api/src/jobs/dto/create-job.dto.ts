import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsEnum,
  IsNumber,
  IsDateString,
} from "class-validator";
import { EmploymentType, ExperienceLevel } from "@prisma/client";
import { CreateOpportunityDto } from "../../common/dto/create-opportunity.dto";
import { Type } from "class-transformer";

export class CreateJobDto extends CreateOpportunityDto {
  // Note: 'title', 'description', 'titleTranslations', and 'descriptionTranslations'
  // are automatically inherited from CreateOpportunityDto

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(EmploymentType)
  @IsOptional()
  employmentType?: EmploymentType;

  @IsEnum(ExperienceLevel)
  @IsOptional()
  experienceLevel?: ExperienceLevel;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  responsibilities?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  qualifications?: string[];

  @IsString()
  @IsOptional()
  applicationEmail?: string;

  @IsString()
  @IsOptional()
  applicationUrl?: string;

  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @IsDateString()
  @IsOptional()
  deadline?: string;

  @IsNumber()
  @IsOptional()
  amountUSD?: number;

  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  sectorId: string;
}
