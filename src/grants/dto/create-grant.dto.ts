import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
  IsDateString,
} from "class-validator";
import { CreateOpportunityDto } from "../../common/dto/create-opportunity.dto";

export class CreateGrantDto extends CreateOpportunityDto {
  // Note: 'title', 'description', 'titleTranslations', and 'descriptionTranslations'
  // are inherited from CreateOpportunityDto

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  qualifications?: string[]; // Used for Eligibility criteria

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
