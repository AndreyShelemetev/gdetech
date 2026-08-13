export const YANDEX_AUTH_ENABLED = process.env.YANDEX_AUTH_ENABLED === "true";

const AUTHORIZE_URL = "https://oauth.yandex.ru/authorize";
const TOKEN_URL = "https://oauth.yandex.ru/token";
const PROFILE_URL = "https://login.yandex.ru/info?format=json";

function getConfig() {
  const clientId = process.env.YANDEX_CLIENT_ID ?? "";
  const clientSecret = process.env.YANDEX_CLIENT_SECRET ?? "";
  const redirectUri = process.env.YANDEX_REDIRECT_URI ?? "";
  return { clientId, clientSecret, redirectUri };
}

export function getYandexAuthorizeUrl(state: string): string {
  const { clientId, redirectUri } = getConfig();
  const url = new URL(AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "login:email login:info");
  url.searchParams.set("state", state);
  return url.toString();
}

interface YandexTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function exchangeYandexCode(code: string): Promise<string> {
  const { clientId, clientSecret, redirectUri } = getConfig();

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`Yandex token exchange failed: ${response.status}`);
  }

  const data = (await response.json()) as YandexTokenResponse;
  return data.access_token;
}

interface YandexProfileResponse {
  id: string;
  login: string;
  default_email?: string;
  emails?: string[];
  real_name?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
}

export interface YandexProfile {
  id: string;
  email: string | null;
  displayName: string | null;
}

export async function fetchYandexProfile(accessToken: string): Promise<YandexProfile> {
  const response = await fetch(PROFILE_URL, {
    headers: { Authorization: `OAuth ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Yandex profile fetch failed: ${response.status}`);
  }

  const data = (await response.json()) as YandexProfileResponse;

  return {
    id: data.id,
    email: data.default_email ?? data.emails?.[0] ?? null,
    displayName: data.display_name ?? data.real_name ?? data.login ?? null,
  };
}
