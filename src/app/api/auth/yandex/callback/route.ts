import { NextRequest, NextResponse } from "next/server";
import { exchangeYandexCode, fetchYandexProfile } from "@/lib/auth/yandex";
import { loginWithOAuthProfile } from "@/lib/auth/oauth";
import { attachSessionCookie } from "@/lib/auth/session";
import { getClientIp } from "@/lib/rate-limit";

const STATE_COOKIE = "yandex_oauth_state";
const SUCCESS_URL = process.env.YANDEX_SUCCESS_URL ?? "/";
const ERROR_URL = process.env.YANDEX_ERROR_URL ?? "/?auth_error=yandex";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = req.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL(ERROR_URL, req.url));
  }

  try {
    const accessToken = await exchangeYandexCode(code);
    const profile = await fetchYandexProfile(accessToken);

    const { token, expiresAt } = await loginWithOAuthProfile(
      {
        provider: "yandex_id",
        providerUserId: profile.id,
        email: profile.email,
        displayName: profile.displayName,
      },
      { userAgent: req.headers.get("user-agent"), ip: getClientIp(req.headers) },
    );

    const response = NextResponse.redirect(new URL(SUCCESS_URL, req.url));
    attachSessionCookie(response, token, expiresAt);
    response.cookies.set(STATE_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  } catch (error) {
    console.error("Yandex OAuth error", error);
    return NextResponse.redirect(new URL(ERROR_URL, req.url));
  }
}
