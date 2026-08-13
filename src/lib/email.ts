import nodemailer from "nodemailer";

const SMTP_ENABLED = process.env.SMTP_ENABLED === "true";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!SMTP_ENABLED) return null;
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.yandex.ru",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_USE_SSL ?? "true") === "true",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
}

export async function sendLoginCodeEmail(email: string, code: string) {
  const fromName = process.env.SMTP_FROM_NAME ?? "GdeTech";
  const fromEmail = process.env.SMTP_FROM_EMAIL ?? "noreply@gdetech.ru";

  const client = getTransporter();

  if (!client) {
    // SMTP отключён (например, в локальном MVP-превью) — код только логируется.
    console.log(`[dev email] Код входа для ${email}: ${code}`);
    return { delivered: false as const };
  }

  await client.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: email,
    subject: `${code} — код входа в GdeTech`,
    text: `Ваш код для входа в GdeTech: ${code}\n\nКод действителен 10 минут. Если это были не вы — просто игнорируйте это письмо.`,
    html: `<p>Ваш код для входа в <strong>GdeTech</strong>:</p><p style="font-size:28px;font-weight:700;letter-spacing:4px;">${code}</p><p>Код действителен 10 минут. Если это были не вы — просто игнорируйте это письмо.</p>`,
  });

  return { delivered: true as const };
}
