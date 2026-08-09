// D:\tudulu\apps\api\src\users\dto\change-password.dto.ts
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({ description: "Current active password" })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: "New password (min 6 characters)", minimum: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
