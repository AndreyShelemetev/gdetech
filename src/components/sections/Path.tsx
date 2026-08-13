import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { startupPath } from "@/content/path";

export function Path() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Как это работает"
          title="Путь стартапа — от идеи до масштабирования"
          description="Первый продукт — за 3 месяца, полноценный продукт с брендом — за полгода."
        />

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[color:var(--color-accent)] via-[color:var(--color-accent-2)] to-transparent sm:block" />
          <ol className="space-y-8 sm:space-y-10">
            {startupPath.map((stage, index) => (
              <Reveal key={stage.step} delay={index * 0.06}>
                <li className="relative flex gap-5 sm:gap-8">
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] text-sm font-bold text-white sm:h-9 sm:w-9">
                    {stage.step}
                  </div>
                  <div className="glass-panel flex-1 rounded-2xl p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                        {stage.title}
                      </h3>
                      {stage.timeframe ? (
                        <span className="text-xs font-medium uppercase tracking-wide text-[color:var(--color-accent-3)]">
                          {stage.timeframe}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                      {stage.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
