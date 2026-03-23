import createMiddleware from 'next-intl/middleware';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { ADMIN_COOKIE_NAME, verifyAdminJwt } from "@/lib/admin-auth";

const LOGIN_PATH = "/admin/login";
const DASHBOARD_PATH = "/admin";
const SHOULD_ENFORCE_PAGE_REDIRECT = process.env.NEXT_PUBLIC_ENFORCE_ADMIN_REDIRECT === "true";

const handleI18nRouting = createMiddleware(routing);

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyAdminJwt(token);
  return Boolean(payload);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginApi = pathname === "/api/admin/login";
  const isLoginPage = pathname === LOGIN_PATH;
  const isStaticFile = pathname.startsWith("/_next") || pathname.includes(".") || pathname.startsWith("/api/news") || pathname.startsWith("/api/telegram");

  if (isAdminPage || isAdminApi || isLoginPage || isLoginApi || isStaticFile) {
    const authenticated = await hasValidSession(request);

    if (isLoginApi) {
      return NextResponse.next();
    }

    if (isLoginPage) {
      if (authenticated) {
        const url = request.nextUrl.clone();
        url.pathname = DASHBOARD_PATH;
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    if (pathname.includes("login")) {
      return NextResponse.next();
    }

    if (isAdminApi && !authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isAdminPage && !authenticated && SHOULD_ENFORCE_PAGE_REDIRECT) {
      const url = request.nextUrl.clone();
      url.pathname = LOGIN_PATH;
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};