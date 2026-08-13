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
    // Resolve params whether Next.js 14 (sync) or Next.js 15 (Promise)
    const resolvedParams = await paramsPromise;
    const pathSegments = resolvedParams.path || [];

    // Construct backend URL safely
    const path = pathSegments.join("/");
    const search = request.nextUrl.search;
    const targetUrl = `${BACKEND_URL}/${path}${search}`;

    // Forward incoming headers while removing host headers
    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("connection");

    // Extract request body for non-GET/HEAD methods
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
