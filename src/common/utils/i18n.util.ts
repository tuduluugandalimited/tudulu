import { Prisma } from "@prisma/client";

export function toPrismaJson(
  data: Record<string, string> | undefined | null,
): Prisma.InputJsonValue | undefined {
  if (!data) return undefined;
  return data as Prisma.InputJsonValue;
}

export function resolveTranslation(
  baseText: string,
  translationsJson: unknown,
  lang: string,
): string {
  if (!translationsJson || typeof translationsJson !== "object") {
    return baseText;
  }
  const translations = translationsJson as Record<string, string>;
  return translations[lang] || translations["en"] || baseText;
}
