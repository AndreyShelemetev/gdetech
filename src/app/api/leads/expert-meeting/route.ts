import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { expertMeetingSchema } from "@/lib/validation";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendLeadNotificationEmail } from "@/lib/email";
import { team } from "@/content/team";
import { getCurrentUser } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!rateLimit(`expert-meeting:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Слишком много заявок. Попробуйте позже." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = expertMeetingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Проверьте поля формы" },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, expertSlug, message } = parsed.data;
  const user = await getCurrentUser();
  await prisma.expertMeetingRequest.create({
    data: { name, email, phone, expertSlug, message: message || null, userId: user?.id },
  });

  const expert = team.find((member) => member.slug === expertSlug);
  const expertLabel = expert ? `${expert.name} — ${expert.role}` : expertSlug;

  sendLeadNotificationEmail(`Новая заявка на встречу с экспертом — ${name}`, [
    ["Имя", name],
    ["E-mail", email],
    ["Телефон", phone],
    ["Эксперт", expertLabel],
    ["Сообщение", message || "—"],
  ]).catch((error) => console.error("Не удалось отправить уведомление о заявке", error));

  return NextResponse.json({ ok: true });
}
