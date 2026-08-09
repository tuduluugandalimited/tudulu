// D:\tudulu\apps\api\src\auth\auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { GoogleAuthGuard } from "./guards/google-auth.guard";
import { Response } from "express";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Log in an existing user and return a JWT access token",
  })
  async login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: "Initiate Google OAuth login" })
  async googleAuth(@Req() req) {
    // Guard redirects to Google
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: "Google OAuth callback handler" })
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const authResult = await this.authService.validateGoogleUser(req.user);

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";
    return res.redirect(
      `${frontendUrl}/auth/callback?token=${authResult.access_token}`,
    );
  }
}
