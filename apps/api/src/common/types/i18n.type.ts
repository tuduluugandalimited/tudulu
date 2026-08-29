import { IsOptional, IsString } from "class-validator";

// Supported language codes across Africa & global market
export type SupportedLanguage = "en" | "fr" | "es" | "pt" | "ar";

export type TranslationMap = Partial<Record<SupportedLanguage, string>>;

// DTO class for API payloads when creating/updating translations
export class TranslationMapDto implements TranslationMap {
  @IsOptional()
  @IsString()
  en?: string;

  @IsOptional()
  @IsString()
  fr?: string;

  @IsOptional()
  @IsString()
  es?: string;

  @IsOptional()
  @IsString()
  pt?: string;

  @IsOptional()
  @IsString()
  ar?: string;
}
