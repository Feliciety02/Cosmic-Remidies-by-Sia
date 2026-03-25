import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_EMAIL, AUTH_COOKIE_NAME, parseSessionEmail } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};

export const middleware = (request: NextRequest) => {
  const sessionEmail = parseSessionEmail(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (sessionEmail !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!sessionEmail) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (sessionEmail === ADMIN_EMAIL) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
};
