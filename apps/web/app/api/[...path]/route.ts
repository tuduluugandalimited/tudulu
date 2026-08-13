// apps/web/app/api/[...path]/route.ts
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
    let pathSegments = resolvedParams.path || [];

    // 2. Strip leading 'v1' or 'api' segments to match NestJS root routes
    if (pathSegments[0] === "v1") {
      pathSegments = pathSegments.slice(1);
    } else if (pathSegments[0] === "api" && pathSegments[1] === "v1") {
      pathSegments = pathSegments.slice(2);
    }

    const path = pathSegments.join("/");
    const search = request.nextUrl.search;
    const targetUrl = `${BACKEND_URL}/${path}${search}`;

    // 3. Forward request headers while stripping host headers
    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("connection");

    // 4. Extract body for non-GET/HEAD methods
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
