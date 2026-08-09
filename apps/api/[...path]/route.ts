// D:\tudulu\apps\web\app\api\[...path]\route.ts
import { NextRequest, NextResponse } from "next/server";

// Ensure this points cleanly to http://localhost:3001 without trailing slashes
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

async function proxyHandler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const pathString = path ? path.join("/") : "";

  // Construct the target URL maintaining the /api/v1 structure
  const targetUrl = `${API_BASE_URL}/${pathString}`;

  try {
    const body = ["POST", "PUT", "PATCH"].includes(req.method)
      ? await req.text()
      : undefined;

    // Forward incoming headers (such as Authorization Bearer tokens)
    const headers = new Headers();
    headers.set(
      "Content-Type",
      req.headers.get("content-type") || "application/json",
    );
    headers.set("Accept", "application/json");

    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      headers.set("Authorization", authHeader);
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Proxy error connecting to backend service.",
      },
      { status: 500 },
    );
  }
}

export {
  proxyHandler as GET,
  proxyHandler as POST,
  proxyHandler as PUT,
  proxyHandler as PATCH,
  proxyHandler as DELETE,
};
