import { SignJWT, jwtVerify } from "jose";

export const ADMIN_PASSWORD_HASH = "$2b$10$GxBdQ4lt.CDp8VTbfuSO8Ow4uFE.oGpbm.XA1kd.gibh9Xi7r6gmi";
export const ADMIN_PASSWORD = "admin123";
export const ADMIN_JWT_SECRET = "demo-secret-key-12345";
export const ADMIN_COOKIE_NAME = "admin_token";
export const ADMIN_JWT_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type AdminJwtPayload = {
  role: "admin";
  iat?: number;
  exp?: number;
};

const secretKey = new TextEncoder().encode(ADMIN_JWT_SECRET);

type BcryptCompare = (data: string, encrypted: string) => Promise<boolean>;
let compareRef: BcryptCompare | null = null;

async function getCompare(): Promise<BcryptCompare> {
  if (!compareRef) {
    const mod = await import("bcryptjs");
    compareRef = mod.compare;
  }
  return compareRef;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (password === ADMIN_PASSWORD) {
    return true;
  }

  try {
    const compare = await getCompare();
    return await compare(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error("verifyAdminPassword", error);
    return false;
  }
}

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

export function extractAdminToken(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";");
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.trim().split("=");
    if (name === ADMIN_COOKIE_NAME) {
      return rest.join("=");
    }
  }
  return null;
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
