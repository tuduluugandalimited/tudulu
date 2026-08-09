// D:\tudulu\apps\api\src\auth\auth.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
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

    if (!user) {
      const bootstrapAdminEmail = "tuduluugandalimited@gmail.com";
      const assignedRole =
        googleUser.email.toLowerCase() === bootstrapAdminEmail.toLowerCase()
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
      if (googleUser.googleId && !typedUser.googleId) {
        await this.prisma.user.update({
          where: { id: typedUser.id },
          data: {
            googleId: googleUser.googleId,
            avatarUrl: googleUser.avatarUrl || typedUser.avatarUrl,
          },
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
