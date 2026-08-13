import { NextRequest, NextResponse } from "next/server";

// Target NestJS backend URL hosted on Render
const BACKEND_URL = (
  process.env.BACKEND_URL || "https://api.tudulu.org"
).replace(/\/$/, "");

/**
 * Helper function to handle forwarding API requests to the NestJS backend.
 */
async function handleProxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  try {
    // Next.js 15/16 async params resolution
    const { path } = await context.params;
    const pathString = path ? path.join("/") : "";

    // Retain query parameters from the incoming URL
    const searchParams = request.nextUrl.search;
    const targetUrl = `${BACKEND_URL}/${pathString}${searchParams}`;

    // Forward original headers, stripping 'host' to avoid proxy header conflicts
    const headers = new Headers(request.headers);
    headers.delete("host");

    // Read payload body for state-changing requests
    let body: BodyInit | null = null;
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      body = await request.arrayBuffer();
    }

    const backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });

    // Mirror the backend response headers back to the client
    const responseHeaders = new Headers(backendResponse.headers);

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("API Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Gateway Error proxying to backend" },
      { status: 502 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxy(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxy(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxy(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxy(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxy(request, context);
}
