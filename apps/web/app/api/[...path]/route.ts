import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tudulu-api.fly.dev/api/v1";

async function proxyRequest(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  try {
    const pathSegments = params.path || [];
    const joinedPath = pathSegments.join("/");

    // Clean base URL to prevent duplicate /api/v1 prefixes
    const cleanBase = API_BASE_URL.replace(/\/+$/, "");
    const targetPath = joinedPath.replace(/^api\/v1\/?/, "");

    // Preserve query parameters (e.g. ?sector=health&search=ngo)
    const searchParams = request.nextUrl.searchParams.toString();
    const targetUrl = `${cleanBase}/${targetPath}${searchParams ? `?${searchParams}` : ""}`;

    const headers = new Headers(request.headers);
    headers.delete("host");

    const body = ["GET", "HEAD"].includes(request.method)
      ? undefined
      : await request.text();

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error: any) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service", details: error.message },
      { status: 502 },
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
