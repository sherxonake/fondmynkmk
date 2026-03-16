import { NextResponse } from "next/server";
import { z } from "zod";

import { buildAuthCookie, signAdminJwt, verifyAdminPassword } from "@/lib/admin-auth";

const loginSchema = z.object({
  password: z.string().min(1, "Пароль обязателен"),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Неверный формат данных" }, { status: 400 });
  }

  const isValid = await verifyAdminPassword(parsed.data.password);

  if (!isValid) {
    return NextResponse.json({ success: false, error: "Неверный пароль" }, { status: 401 });
  }

  const token = await signAdminJwt({ role: "admin" });
  const response = NextResponse.json({ success: true });
  response.cookies.set(buildAuthCookie(token));
  return response;
}
