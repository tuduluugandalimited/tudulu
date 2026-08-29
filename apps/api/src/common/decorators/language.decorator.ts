import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const DEFAULT_LANGUAGE = "en";

export const Language = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const defaultFallback = data || DEFAULT_LANGUAGE;

    // 1. Check for explicit ?lang= query parameter (highest priority)
    const langQuery = request.query?.lang;
    if (typeof langQuery === "string" && langQuery.trim() !== "") {
      return langQuery.trim().toLowerCase();
    }

    // 2. Check for Accept-Language header (e.g. "fr-FR,fr;q=0.9,en;q=0.8")
    const acceptLanguageHeader = request.headers["accept-language"];
    if (acceptLanguageHeader && acceptLanguageHeader.trim() !== "") {
      const primaryLang = acceptLanguageHeader
        .split(",")[0]
        .split(";")[0]
        .trim();
      const isoCode = primaryLang.split("-")[0].toLowerCase();
      if (isoCode) return isoCode;
    }

    // 3. Fallback to default language ('en' or provided fallback argument)
    return defaultFallback;
  },
);
