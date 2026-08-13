import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MailIcon, TelegramIcon, VkIcon } from "@/components/ui/icons";
import { legal } from "@/content/legal";

const mapSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(legal.addressFull)}&z=16`;

export function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-28 py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Контакты" title="Приходите в гости" />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-[color:var(--color-border)]">
              <iframe
                title="GdeTech на карте"
                src={mapSrc}
                width="100%"
                height="420"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-panel h-full rounded-2xl p-7 sm:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">Как связаться</h3>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[color:var(--color-text-faint)]">📍</span>
                  <span className="text-[color:var(--color-text-muted)]">{legal.addressFull}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MailIcon className="h-4 w-4 text-[color:var(--color-text-faint)]" />
                  <a href={`mailto:${legal.email}`} className="text-[color:var(--color-text-muted)] hover:text-white">
                    {legal.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[color:var(--color-text-faint)]">☎</span>
                  <a href={`tel:${legal.phoneHref}`} className="text-[color:var(--color-text-muted)] hover:text-white">
                    {legal.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <TelegramIcon className="h-4 w-4 text-[color:var(--color-text-faint)]" />
                  <a
                    href={legal.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--color-text-muted)] hover:text-white"
                  >
                    {legal.telegramHandle}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <VkIcon className="h-4 w-4 text-[color:var(--color-text-faint)]" />
                  <a
                    href={legal.vkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--color-text-muted)] hover:text-white"
                  >
                    vk.ru/gdetech
                  </a>
                </li>
              </ul>

              <div className="mt-7 border-t border-[color:var(--color-border)] pt-6 text-xs leading-relaxed text-[color:var(--color-text-faint)]">
                <p className="font-semibold text-[color:var(--color-text-muted)]">Юридическая информация</p>
                <p className="mt-2">{legal.entityName}</p>
                <p>ИНН {legal.inn}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
