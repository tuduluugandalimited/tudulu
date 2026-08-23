/**
 * Extracts preferred language from query parameter or Accept-Language header.
 * Example headers: 'fr-FR,fr;q=0.9,en;q=0.8' -> returns 'fr'
 */
export function extractLanguage(
  langQuery?: string,
  acceptLanguageHeader?: string,
): string | undefined {
  if (langQuery && langQuery.trim() !== "") {
    return langQuery.trim().toLowerCase();
  }

  if (acceptLanguageHeader && acceptLanguageHeader.trim() !== "") {
    const primaryLang = acceptLanguageHeader.split(",")[0].split(";")[0].trim();
    const isoCode = primaryLang.split("-")[0].toLowerCase();
    return isoCode || undefined;
  }

  return undefined;
}
