import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_COOKIE_NAME, verifyAdminJwt } from "@/lib/admin-auth";

const LOGIN_PATH = "/admin/login";
const DASHBOARD_PATH = "/admin";
const SHOULD_ENFORCE_PAGE_REDIRECT = process.env.NEXT_PUBLIC_ENFORCE_ADMIN_REDIRECT === "true";

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyAdminJwt(token);
  return Boolean(payload);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginApi = pathname === "/api/admin/login";
  const isLoginPage = pathname === LOGIN_PATH;
  const containsLogin = pathname.includes("login");

  const authenticated = await hasValidSession(request);

  if (isLoginApi) {
    return NextResponse.next();
  }

  if (isLoginPage) {
    if (authenticated) {
      const url = request.nextUrl.clone();
      url.pathname = DASHBOARD_PATH;
      console.log("[middleware] redirect authenticated login ->", url.pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (containsLogin) {
    console.log("[middleware] bypass for login path", pathname);
    return NextResponse.next();
  }

  if (isAdminApi && !authenticated) {
    console.log("[middleware] admin api unauthorized", pathname);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isAdminPage && !authenticated && SHOULD_ENFORCE_PAGE_REDIRECT) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("from", pathname);
    console.log("[middleware] redirect unauthenticated ->", url.pathname, "from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
