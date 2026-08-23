// D:\tudulu\apps\api\src\auth\strategies\google.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID") || "",
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET") || "",
      callbackURL:
        configService.get<string>("GOOGLE_CALLBACK_URL") ||
        "http://localhost:3000/api/v1/auth/google/callback",
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Record<string, unknown>,
    done: VerifyCallback,
  ): Promise<void> {
    const name = profile.name as { givenName?: string; familyName?: string };
    const emails = profile.emails as Array<{ value: string }>;
    const photos = profile.photos as Array<{ value: string }>;
    const id = profile.id as string;
    const displayName = profile.displayName as string;

    const googleUser = {
      email: emails[0].value,
      fullName:
        `${name?.givenName || ""} ${name?.familyName || ""}`.trim() ||
        displayName,
      googleId: id,
      avatarUrl: photos && photos[0] ? photos[0].value : undefined,
    };

    done(null, googleUser);
  }
}
