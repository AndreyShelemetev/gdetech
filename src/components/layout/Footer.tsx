import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { legal, telegramCommunities } from "@/content/legal";
import { TelegramIcon, VkIcon, MailIcon } from "@/components/ui/icons";

const NAV_LINKS = [
  { href: "#space", label: "Пространство" },
  { href: "#team", label: "Команда" },
  { href: "#residents", label: "Резиденты" },
  { href: "#hub", label: "Стартап-хаб" },
  { href: "#contacts", label: "Контакты" },
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border-soft)] bg-[color:var(--color-bg-elevated)]">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] text-white">
              G
            </span>
            GdeTech
          </Link>
          <p className="mt-4 max-w-xs text-sm text-[color:var(--color-text-muted)]">
            Стартап-хаб в Йошкар-Оле: пространство и команда экспертов, которые помогают запускать IT-проекты.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-faint)]">
            Навигация
          </p>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-[color:var(--color-text-muted)] hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-faint)]">
            Сообщества
          </p>
          <ul className="space-y-2.5">
            {telegramCommunities.map((community) => (
              <li key={community.slug}>
                <a
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[color:var(--color-text-muted)] hover:text-white"
                >
                  <TelegramIcon className="h-4 w-4" /> {community.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-faint)]">
            Контакты
          </p>
          <ul className="space-y-2.5 text-sm text-[color:var(--color-text-muted)]">
            <li>{legal.addressFull}</li>
            <li>
              <a href={`mailto:${legal.email}`} className="flex items-center gap-2 hover:text-white">
                <MailIcon className="h-4 w-4" /> {legal.email}
              </a>
            </li>
            <li>
              <a href={`tel:${legal.phoneHref}`} className="hover:text-white">
                {legal.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={legal.vkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <VkIcon className="h-4 w-4" /> VK
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-[color:var(--color-border-soft)] py-6">
        <Container className="flex flex-col gap-2 text-xs text-[color:var(--color-text-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} GdeTech. Все права защищены.</p>
          <p>
            {legal.entityName} · ИНН {legal.inn}
          </p>
        </Container>
      </div>
    </footer>
  );
}
