import { NextRequest, NextResponse } from "next/server";
import { YANDEX_AUTH_ENABLED, getYandexAuthorizeUrl } from "@/lib/auth/yandex";
import { randomState } from "@/lib/auth/oauth";

const STATE_COOKIE = "yandex_oauth_state";

export async function GET(req: NextRequest) {
  if (!YANDEX_AUTH_ENABLED) {
    return NextResponse.redirect(new URL("/?auth_error=yandex_disabled", req.url));
  }

  const state = randomState();
  const response = NextResponse.redirect(getYandexAuthorizeUrl(state));
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return response;
}
