import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if route is marked as protected / confidential
  if (pathname.startsWith("/work/confidential-") || pathname.startsWith("/protected")) {
    const authCookie = request.cookies.get("portfolio_auth")?.value;
    const expectedSecret = process.env.GATED_PASSWORD_SECRET || "authorized_preview_access";

    if (!authCookie || authCookie !== expectedSecret) {
      // Redirect to contact page with request-access query param
      const accessUrl = new URL("/contact", request.url);
      accessUrl.searchParams.set("access_required", pathname);
      return NextResponse.redirect(accessUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/work/confidential-:path*",
    "/protected/:path*",
  ],
};
