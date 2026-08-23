import { IsString, IsEmail, IsOptional } from "class-validator";

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  headquarters?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
