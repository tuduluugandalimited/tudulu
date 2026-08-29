// D:\tudulu\apps\api\src\users\dto\login-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    description: "The registered user email",
    example: "user@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "The account password", minimum: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
