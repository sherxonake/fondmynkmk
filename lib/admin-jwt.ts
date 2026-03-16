import { SignJWT, jwtVerify } from "jose";

export const ADMIN_JWT_SECRET = "demo-secret-key-12345";
export const ADMIN_COOKIE_NAME = "admin_token";
export const ADMIN_JWT_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type AdminJwtPayload = {
  role: "admin";
  iat?: number;
  exp?: number;
};

const secretKey = new TextEncoder().encode(ADMIN_JWT_SECRET);

export async function signAdminJwt(payload: Omit<AdminJwtPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_JWT_TTL_SECONDS}s`)
    .sign(secretKey);
}

export async function verifyAdminJwt(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as AdminJwtPayload;
  } catch (error) {
    console.error("verifyAdminJwt", error);
    return null;
  }
}

export function buildAuthCookie(token: string) {
  return {
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_JWT_TTL_SECONDS,
    path: "/",
  };
}

export function buildLogoutCookie() {
  return {
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  };
}
