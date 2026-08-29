// D:\tudulu\apps\web\app\api\[...path]\route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (
  process.env.BACKEND_URL || "https://api.tudulu.org"
).replace(/\/$/, "");

async function proxyRequest(
  request: NextRequest,
  paramsPromise: { path: string[] } | Promise<{ path: string[] }>,
) {
  try {
    // 1. Next.js 15 requires awaiting params
    const resolvedParams = await paramsPromise;
    const pathSegments = resolvedParams.path || [];

    // 2. Filter out all leading or nested 'api' and 'v1' segments
    // to prevent any double-prefixing issues completely.
    const cleanSegments = pathSegments.filter(
      (segment) => segment !== "api" && segment !== "v1",
    );

    const cleanPath = cleanSegments.join("/");
    const search = request.nextUrl.search;

    // 3. Explicitly target NestJS global prefix (/api/v1/)
    const targetUrl = `${BACKEND_URL}/api/v1/${cleanPath}${search}`;

    // 4. Forward request headers while stripping host and connection headers
    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("connection");

    // 5. Extract body for non-GET/HEAD methods
    let body: any = null;
    if (request.method !== "GET" && request.method !== "HEAD") {
      try {
        body = await request.text();
      } catch (_) {
        body = null;
      }
    }

    const res = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: body ? body : undefined,
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }

    const textData = await res.text();
    return new NextResponse(textData, {
      status: res.status,
      headers: { "content-type": contentType || "text/plain" },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to connect to backend service",
        details: error?.message || "Unknown proxy error",
      },
      { status: 502 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } | Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: { path: string[] } | Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: { path: string[] } | Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { path: string[] } | Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: { path: string[] } | Promise<{ path: string[] }> },
) {
  return proxyRequest(request, context.params);
}
