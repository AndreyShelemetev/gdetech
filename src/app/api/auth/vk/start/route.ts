import { NextRequest, NextResponse } from "next/server";
import { VK_AUTH_ENABLED, getVkAuthorizeUrl, generatePkcePair, generateDeviceId } from "@/lib/auth/vk";
import { randomState } from "@/lib/auth/oauth";

const STATE_COOKIE = "vk_oauth_state";

export async function GET(req: NextRequest) {
  if (!VK_AUTH_ENABLED) {
    return NextResponse.redirect(new URL("/?auth_error=vk_disabled", req.url));
  }

  const state = randomState();
  const { codeVerifier, codeChallenge } = generatePkcePair();
  const deviceId = generateDeviceId();

  const authorizeUrl = getVkAuthorizeUrl({ state, codeChallenge, deviceId });

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(STATE_COOKIE, JSON.stringify({ state, codeVerifier, deviceId }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return response;
}
