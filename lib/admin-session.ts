import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AdminJwtPayload } from "./admin-auth";
import { ADMIN_COOKIE_NAME, verifyAdminJwt } from "./admin-auth";

const LOGIN_PATH = "/admin/login";

export interface RequireAdminSessionOptions {
  redirectOnFail?: boolean;
}

export class AdminAuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AdminAuthError";
  }
}

function handleAuthFailure(redirectOnFail: boolean, message: string): never {
  if (redirectOnFail) {
    redirect(LOGIN_PATH);
  }
  throw new AdminAuthError(message);
}

export async function requireAdminSession(options?: RequireAdminSessionOptions): Promise<AdminJwtPayload> {
  const redirectOnFail = options?.redirectOnFail ?? true;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    handleAuthFailure(redirectOnFail, "Missing admin session");
  }

  const payload = await verifyAdminJwt(token);
  if (!payload) {
    handleAuthFailure(redirectOnFail, "Invalid admin token");
  }

  return payload;
}
