import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block Keystatic admin routes in production
  // Redirect to homepage — silent, no information disclosure
  if (
    process.env.NODE_ENV === "production" &&
    (pathname.startsWith("/keystatic") || pathname.startsWith("/api/keystatic"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
};
