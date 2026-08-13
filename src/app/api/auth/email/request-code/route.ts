import { NextRequest, NextResponse } from "next/server";
import { emailRequestSchema } from "@/lib/validation";
import { requestEmailCode } from "@/lib/auth/otp";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!rateLimit(`email-request:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Слишком много попыток. Попробуйте позже." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = emailRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Некорректный e-mail" }, { status: 400 });
  }

  if (!rateLimit(`email-request:${parsed.data.email}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Слишком много попыток для этого e-mail. Попробуйте позже." },
      { status: 429 },
    );
  }

  const result = await requestEmailCode(parsed.data.email);
  return NextResponse.json({
    ok: true,
    expiresInMinutes: result.expiresInMinutes,
    devCode: result.devCode,
  });
}
