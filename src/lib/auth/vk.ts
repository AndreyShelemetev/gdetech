import { createHash } from "crypto";
import { randomToken } from "@/lib/auth/crypto";

export const VK_AUTH_ENABLED = process.env.VK_AUTH_ENABLED === "true";

const AUTHORIZE_URL = "https://id.vk.com/authorize";
const TOKEN_URL = "https://id.vk.com/oauth2/auth";
const USER_INFO_URL = "https://id.vk.com/oauth2/user_info";

function getConfig() {
  const clientId = process.env.VK_CLIENT_ID ?? "";
  const redirectUri = process.env.VK_REDIRECT_URI ?? "";
  return { clientId, redirectUri };
}

export function generatePkcePair() {
  const codeVerifier = randomToken(48);
  const codeChallenge = createHash("sha256").update(codeVerifier).digest("base64url");
  return { codeVerifier, codeChallenge };
}

export function generateDeviceId(): string {
  return randomToken(16);
}

export function getVkAuthorizeUrl(params: {
  state: string;
  codeChallenge: string;
  deviceId: string;
}): string {
  const { clientId, redirectUri } = getConfig();
  const url = new URL(AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "email");
  url.searchParams.set("state", params.state);
  url.searchParams.set("code_challenge", params.codeChallenge);
  url.searchParams.set("code_challenge_method", "s256");
  url.searchParams.set("device_id", params.deviceId);
  return url.toString();
}

interface VkTokenResponse {
  access_token: string;
  user_id: number;
  expires_in: number;
}

export async function exchangeVkCode(params: {
  code: string;
  codeVerifier: string;
  deviceId: string;
}): Promise<VkTokenResponse> {
  const { clientId, redirectUri } = getConfig();

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: params.code,
      code_verifier: params.codeVerifier,
      client_id: clientId,
      device_id: params.deviceId,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`VK token exchange failed: ${response.status}`);
  }

  return (await response.json()) as VkTokenResponse;
}

interface VkUserInfoResponse {
  user: {
    user_id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  };
}

export interface VkProfile {
  id: string;
  email: string | null;
  displayName: string | null;
}

export async function fetchVkProfile(accessToken: string): Promise<VkProfile> {
  const { clientId } = getConfig();

  const response = await fetch(USER_INFO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: clientId, access_token: accessToken }),
  });

  if (!response.ok) {
    throw new Error(`VK profile fetch failed: ${response.status}`);
  }

  const data = (await response.json()) as VkUserInfoResponse;
  const name = [data.user.first_name, data.user.last_name].filter(Boolean).join(" ").trim();

  return {
    id: data.user.user_id,
    email: data.user.email ?? null,
    displayName: name || null,
  };
}
