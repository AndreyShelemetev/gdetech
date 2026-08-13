import { randomBytes, randomInt, pbkdf2Sync, timingSafeEqual, createHash } from "crypto";

const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEYLEN = 32;
const PBKDF2_DIGEST = "sha256";

export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function generateNumericCode(digits = 6): string {
  const max = 10 ** digits;
  const value = randomInt(0, max);
  return value.toString().padStart(digits, "0");
}

export function hashSecret(secret: string): string {
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(secret, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST);
  return `pbkdf2-${PBKDF2_DIGEST}:${PBKDF2_ITERATIONS}:${salt.toString("base64url")}:${hash.toString("base64url")}`;
}

export function verifySecret(secret: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 4) return false;
  const [, iterationsRaw, saltB64, hashB64] = parts;
  const iterations = Number(iterationsRaw);
  if (!Number.isFinite(iterations) || iterations <= 0) return false;

  try {
    const salt = Buffer.from(saltB64 ?? "", "base64url");
    const expected = Buffer.from(hashB64 ?? "", "base64url");
    const actual = pbkdf2Sync(secret, salt, iterations, expected.length, PBKDF2_DIGEST);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
