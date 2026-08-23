import { ExecutionContext } from "@nestjs/common";
import { RouteParamtypes } from "@nestjs/common/enums/route-paramtypes.enum";
import { Language, DEFAULT_LANGUAGE } from "./language.decorator";

/**
 * Helper function to extract the factory function from NestJS param decorator
 */
function getLanguageDecoratorFactory() {
  // Create a dummy class to trigger metadata registration
  class TestController {
    testMethod(@Language() lang: string) {}
  }

  // Retrieve the metadata key where Nest stores param decorator factories
  const metadata = Reflect.getMetadata(
    "__customRouteParamsProperties__",
    TestController,
    "testMethod",
  );

  // Extract the factory function
  const key = Object.keys(metadata)[0];
  return metadata[key].factory;
}

/**
 * Helper to construct a mock ExecutionContext
 */
function createMockContext(
  query: Record<string, any> = {},
  headers: Record<string, any> = {},
): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        query,
        headers,
      }),
    }),
  } as unknown as ExecutionContext;
}

describe("Language Decorator", () => {
  let factory: (data: string | undefined, ctx: ExecutionContext) => string;

  beforeEach(() => {
    factory = getLanguageDecoratorFactory();
  });

  it("should extract language from ?lang query parameter (highest priority)", () => {
    const context = createMockContext(
      { lang: "fr" },
      { "accept-language": "es-ES,es;q=0.9" },
    );

    const result = factory(undefined, context);
    expect(result).toBe("fr");
  });

  it("should trim and lowercase the query parameter", () => {
    const context = createMockContext({ lang: "  PT  " });

    const result = factory(undefined, context);
    expect(result).toBe("pt");
  });

  it("should extract primary language from Accept-Language header when query is missing", () => {
    const context = createMockContext(
      {},
      { "accept-language": "fr-FR,fr;q=0.9,en;q=0.8" },
    );

    const result = factory(undefined, context);
    expect(result).toBe("fr");
  });

  it("should handle ISO country codes in Accept-Language header correctly", () => {
    const context = createMockContext({}, { "accept-language": "pt-BR" });

    const result = factory(undefined, context);
    expect(result).toBe("pt");
  });

  it("should return default 'en' when neither query nor header is provided", () => {
    const context = createMockContext({}, {});

    const result = factory(undefined, context);
    expect(result).toBe(DEFAULT_LANGUAGE);
  });

  it("should return custom fallback if passed to the decorator and no request data exists", () => {
    const context = createMockContext({}, {});

    const result = factory("ar", context);
    expect(result).toBe("ar");
  });

  it("should ignore empty query parameter and fall back to header", () => {
    const context = createMockContext(
      { lang: "   " },
      { "accept-language": "es-ES" },
    );

    const result = factory(undefined, context);
    expect(result).toBe("es");
  });
});

// run npm run test -- apps/api/src/common/decorators/language.decorator.spec.ts
