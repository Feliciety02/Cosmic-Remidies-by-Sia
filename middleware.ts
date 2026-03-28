import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/?auth=login", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/?auth=login", request.url));
  }

  if (token.role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
};
