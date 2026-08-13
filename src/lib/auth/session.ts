import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { randomToken, sha256Hex } from "@/lib/auth/crypto";

export const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "gdetech_auth";
const SESSION_TTL_DAYS = 30;

export interface SessionMeta {
  userAgent?: string | null;
  ip?: string | null;
}

export async function createSessionForUser(userId: string, meta: SessionMeta = {}) {
  const token = randomToken(32);
  const tokenHash = sha256Hex(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await prisma.authSession.create({
    data: {
      userId,
      tokenHash,
      userAgent: meta.userAgent ?? null,
      ip: meta.ip ?? null,
      expiresAt,
    },
  });

  return { token, expiresAt };
}

export function attachSessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function revokeSessionByToken(token: string) {
  const tokenHash = sha256Hex(token);
  await prisma.authSession.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const tokenHash = sha256Hex(token);
  const session = await prisma.authSession.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session) return null;
  if (session.revokedAt) return null;
  if (session.expiresAt.getTime() < Date.now()) return null;
  if (session.user.status !== "active") return null;

  return session.user;
}

export async function requireAdminUser() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
