// D:\tudulu\apps\api\src\users\dto\create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "The email address of the user",
    example: "user@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The full name of the user",
    example: "Asaph Musan",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "The password for the user account", minimum: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
