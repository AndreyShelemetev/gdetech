/**
 * Строит абсолютный URL для редиректов в OAuth-роутах. За несколькими
 * прокси (imba.host edge → nginx → контейнер) заголовок Host не всегда
 * долетает надёжно, поэтому базой служит явный NEXT_PUBLIC_SITE_URL,
 * а не request.url — иначе редирект может улететь на internal-адрес
 * вроде http://localhost:3000.
 */
export function absoluteUrl(path: string, request: Request): URL {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return new URL(path, base ?? request.url);
}
