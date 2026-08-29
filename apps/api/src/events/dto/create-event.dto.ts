import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsEnum,
  IsDateString,
  IsUUID,
} from "class-validator";

export enum EventType {
  WEBINAR = "WEBINAR",
  WORKSHOP = "WORKSHOP",
  CONFERENCE = "CONFERENCE",
  NETWORKING = "NETWORKING",
  SUMMIT = "SUMMIT",
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsBoolean()
  @IsOptional()
  isVirtual?: boolean;

  @IsUrl()
  @IsOptional()
  eventUrl?: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @IsUUID()
  @IsOptional()
  organizationId?: string;
}
