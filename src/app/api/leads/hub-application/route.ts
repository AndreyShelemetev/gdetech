import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hubApplicationSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendLeadNotificationEmail } from "@/lib/email";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!rateLimit(`hub-application:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Слишком много заявок. Попробуйте позже." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = hubApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы" },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    // Похоже на бота — тихо принимаем без записи в БД.
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, projectDescription } = parsed.data;
  const user = await getCurrentUser();
  await prisma.hubApplication.create({
    data: { name, email, phone, projectDescription, userId: user?.id },
  });

  sendLeadNotificationEmail(`Новая заявка на вступление — ${name}`, [
    ["Имя", name],
    ["E-mail", email],
    ["Телефон", phone],
    ["Проект", projectDescription],
  ]).catch((error) => console.error("Не удалось отправить уведомление о заявке", error));

  return NextResponse.json({ ok: true });
}
