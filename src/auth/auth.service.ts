// D:\tudulu\apps\api\src\auth\auth.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(email);
    const passwordField =
      (user as any)?.passwordHash || (user as any)?.password;
    if (user && passwordField && (await bcrypt.compare(pass, passwordField))) {
      const { passwordHash, password, ...result } = user as any;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      access_token: accessToken,
      user,
    };
  }

  async validateGoogleUser(googleUser: {
    email: string;
    fullName: string;
    googleId?: string;
    avatarUrl?: string;
  }) {
    let user = await this.usersService.findByEmailWithPassword(
      googleUser.email,
    );

    // Read super admin email dynamically from environment or fallback to default
    const superAdminEmail =
      this.configService.get<string>("SUPER_ADMIN_EMAIL") ||
      "tuduluugandalimited@gmail.com";

    const isSuperAdminEmail =
      googleUser.email.toLowerCase() === superAdminEmail.toLowerCase();

    if (!user) {
      const assignedRole = isSuperAdminEmail
        ? Role.SUPER_ADMIN
        : Role.REGISTERED_USER;

      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const newUser = await this.prisma.user.create({
        data: {
          email: googleUser.email,
          fullName: googleUser.fullName,
          googleId: googleUser.googleId,
          avatarUrl: googleUser.avatarUrl,
          passwordHash: hashedPassword,
          role: assignedRole,
          isActive: true,
        },
      });
      user = await this.usersService.findByEmailWithPassword(newUser.email);
    } else {
      const typedUser = user as any;
      const updateData: Record<string, any> = {};

      // Link Google ID and Avatar if missing
      if (googleUser.googleId && !typedUser.googleId) {
        updateData.googleId = googleUser.googleId;
        updateData.avatarUrl = googleUser.avatarUrl || typedUser.avatarUrl;
      }

      // Automatically promote user to SUPER_ADMIN if email matches env setting and role isn't already set
      if (isSuperAdminEmail && typedUser.role !== Role.SUPER_ADMIN) {
        updateData.role = Role.SUPER_ADMIN;
      }

      if (Object.keys(updateData).length > 0) {
        await this.prisma.user.update({
          where: { id: typedUser.id },
          data: updateData,
        });
        user = await this.usersService.findByEmailWithPassword(typedUser.email);
      }
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      access_token: accessToken,
      user,
    };
  }
}
