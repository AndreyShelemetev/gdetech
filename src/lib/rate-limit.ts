interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Простой in-memory rate limiter на процесс. Для MVP с одним контейнером этого
 * достаточно; при масштабировании на несколько инстансов нужно вынести в Redis.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  return true;
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}
