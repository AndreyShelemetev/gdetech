import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { Reveal } from "@/components/ui/Reveal";
import { legal } from "@/content/legal";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-32 pb-20">
      <HeroBackground />
      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[color:var(--color-text-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Стартап-хаб в {legal.city}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              Пространство и команда, где <span className="text-gradient">IT-идеи становятся бизнесом</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--color-text-muted)]">
              Коворкинг и девять штатных экспертов рядом: продакт-менеджмент, AI, SEO, юрист, DevOps и frontend.
              Приходите с идеей — уходите с продуктом.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="#join">Подать заявку</ButtonLink>
              <ButtonLink href="#telegram" variant="secondary">
                Сообщество в Telegram
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
