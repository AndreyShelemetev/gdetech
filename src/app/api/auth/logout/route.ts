import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, clearSessionCookie, revokeSessionByToken } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (token) await revokeSessionByToken(token);

  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
