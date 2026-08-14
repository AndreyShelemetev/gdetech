import { NextRequest, NextResponse } from "next/server";
import { exchangeVkCode, fetchVkProfile } from "@/lib/auth/vk";
import { loginWithOAuthProfile } from "@/lib/auth/oauth";
import { attachSessionCookie } from "@/lib/auth/session";
import { getClientIp } from "@/lib/rate-limit";
import { absoluteUrl } from "@/lib/site-url";

const STATE_COOKIE = "vk_oauth_state";
const SUCCESS_URL = process.env.VK_SUCCESS_URL ?? "/";
const ERROR_URL = process.env.VK_ERROR_URL ?? "/?auth_error=vk";

interface StoredVkState {
  state: string;
  codeVerifier: string;
  deviceId: string;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const rawStoredState = req.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !rawStoredState) {
    return NextResponse.redirect(absoluteUrl(ERROR_URL, req));
  }

  let stored: StoredVkState;
  try {
    stored = JSON.parse(rawStoredState) as StoredVkState;
  } catch {
    return NextResponse.redirect(absoluteUrl(ERROR_URL, req));
  }

  if (state !== stored.state) {
    return NextResponse.redirect(absoluteUrl(ERROR_URL, req));
  }

  try {
    const tokenResponse = await exchangeVkCode({
      code,
      codeVerifier: stored.codeVerifier,
      deviceId: stored.deviceId,
      state: stored.state,
    });
    const profile = await fetchVkProfile(tokenResponse.access_token);

    const { token, expiresAt } = await loginWithOAuthProfile(
      {
        provider: "vk_id",
        providerUserId: profile.id,
        email: profile.email,
        displayName: profile.displayName,
      },
      { userAgent: req.headers.get("user-agent"), ip: getClientIp(req.headers) },
    );

    const response = NextResponse.redirect(absoluteUrl(SUCCESS_URL, req));
    attachSessionCookie(response, token, expiresAt);
    response.cookies.set(STATE_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  } catch (error) {
    console.error("VK OAuth error", error);
    return NextResponse.redirect(absoluteUrl(ERROR_URL, req));
  }
}
