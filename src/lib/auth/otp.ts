import { prisma } from "@/lib/db";
import { generateNumericCode, hashSecret, verifySecret } from "@/lib/auth/crypto";
import { sendLoginCodeEmail } from "@/lib/email";
import { createSessionForUser, type SessionMeta } from "@/lib/auth/session";

const CODE_TTL_MINUTES = Number(process.env.AUTH_CODE_TTL_MINUTES ?? 10);
const MAX_ATTEMPTS = Number(process.env.AUTH_MAX_CODE_ATTEMPTS ?? 5);
const PURPOSE = "login";

export class OtpError extends Error {}

export async function requestEmailCode(rawEmail: string) {
  const email = rawEmail.trim().toLowerCase();

  // Инвалидируем старые неиспользованные коды для этого email, чтобы не копились.
  await prisma.emailAuthCode.updateMany({
    where: { email, purpose: PURPOSE, consumedAt: null },
    data: { consumedAt: new Date() },
  });

  const code = generateNumericCode(6);
  const codeHash = hashSecret(code);
  const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

  await prisma.emailAuthCode.create({
    data: { email, codeHash, purpose: PURPOSE, expiresAt },
  });

  const result = await sendLoginCodeEmail(email, code);

  return {
    expiresInMinutes: CODE_TTL_MINUTES,
    // Код возвращаем в ответе только когда реальная отправка почты выключена —
    // это осознанное упрощение для локального MVP-превью без настроенного SMTP.
    devCode: result.delivered ? undefined : code,
  };
}

export async function verifyEmailCode(rawEmail: string, code: string, meta: SessionMeta = {}) {
  const email = rawEmail.trim().toLowerCase();

  const record = await prisma.emailAuthCode.findFirst({
    where: { email, purpose: PURPOSE, consumedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    throw new OtpError("Код не найден или истёк. Запросите новый.");
  }

  if (record.attemptCount >= MAX_ATTEMPTS) {
    throw new OtpError("Превышено число попыток. Запросите новый код.");
  }

  const isValid = verifySecret(code, record.codeHash);

  if (!isValid) {
    await prisma.emailAuthCode.update({
      where: { id: record.id },
      data: { attemptCount: { increment: 1 } },
    });
    throw new OtpError("Неверный код.");
  }

  await prisma.emailAuthCode.update({
    where: { id: record.id },
    data: { consumedAt: new Date() },
  });

  const user = await prisma.$transaction(async (tx) => {
    const existingIdentity = await tx.authIdentity.findUnique({
      where: { provider_providerUserId: { provider: "email", providerUserId: email } },
      include: { user: true },
    });

    if (existingIdentity) return existingIdentity.user;

    const existingUser = await tx.user.findUnique({ where: { email } });

    const linkedUser =
      existingUser ??
      (await tx.user.create({
        data: { email, displayName: email.split("@")[0] },
      }));

    await tx.authIdentity.create({
      data: {
        userId: linkedUser.id,
        provider: "email",
        providerUserId: email,
        email,
      },
    });

    return linkedUser;
  });

  if (user.status !== "active") {
    throw new OtpError("Аккаунт заблокирован. Свяжитесь с нами.");
  }

  const session = await createSessionForUser(user.id, meta);

  return { user, ...session };
}
