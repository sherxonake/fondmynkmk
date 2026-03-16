import { cookies } from "next/headers";

import type { AdminJwtPayload } from "./admin-auth";
import { ADMIN_COOKIE_NAME, verifyAdminJwt } from "./admin-auth";

export class AdminAuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AdminAuthError";
  }
}

export async function requireAdminSession(): Promise<AdminJwtPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    throw new AdminAuthError("Missing admin session");
  }

  const payload = await verifyAdminJwt(token);
  if (!payload) {
    throw new AdminAuthError("Invalid admin token");
  }

  return payload;
}
