import { NextRequest, NextResponse } from "next/server";
import { emailVerifySchema } from "@/lib/validation";
import { verifyEmailCode, OtpError } from "@/lib/auth/otp";
import { attachSessionCookie } from "@/lib/auth/session";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!rateLimit(`email-verify:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Слишком много попыток. Попробуйте позже." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = emailVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  try {
    const { user, token, expiresAt } = await verifyEmailCode(parsed.data.email, parsed.data.code, {
      userAgent: req.headers.get("user-agent"),
      ip,
    });

    const response = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, displayName: user.displayName, role: user.role },
    });
    attachSessionCookie(response, token, expiresAt);
    return response;
  } catch (error) {
    if (error instanceof OtpError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Не удалось подтвердить код" }, { status: 500 });
  }
}
