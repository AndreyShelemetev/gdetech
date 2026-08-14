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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendLeadNotificationEmail(subject: string, fields: Array<[string, string]>) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  const fromName = process.env.SMTP_FROM_NAME ?? "GdeTech";
  const fromEmail = process.env.SMTP_FROM_EMAIL ?? "noreply@gdetech.ru";

  const client = getTransporter();

  if (!client) {
    console.log(`[dev email] Уведомление "${subject}" для ${adminEmail}`);
    return;
  }

  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<table cellpadding="0" cellspacing="0">${fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#666;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  await client.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: adminEmail,
    subject,
    text,
    html,
  });
}
