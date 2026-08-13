import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TelegramIcon } from "@/components/ui/icons";
import { telegramCommunities } from "@/content/legal";

export function TelegramCommunity() {
  return (
    <section id="telegram" className="scroll-mt-28 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Сообщество"
          title="Присоединяйтесь в Telegram"
          description="Общайтесь с IT-предпринимателями Йошкар-Олы, делитесь опытом и находите партнёров ещё до заявки в хаб."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {telegramCommunities.map((community, index) => (
            <Reveal key={community.slug} delay={index * 0.08}>
              <a
                href={community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel group flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent)]/50"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#2AABEE] to-[#229ED9] text-white">
                  <TelegramIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold">
                  {community.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                  {community.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--color-accent-3)] group-hover:gap-2.5">
                  Вступить в чат →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
