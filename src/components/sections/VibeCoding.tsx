import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BoltIcon, ChipIcon, MegaphoneIcon } from "@/components/ui/icons";
import { vibeCodingServices } from "@/content/services";

const ICONS = {
  bolt: BoltIcon,
  chip: ChipIcon,
  megaphone: MegaphoneIcon,
};

export function VibeCoding() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[color:var(--color-accent)] via-[#4c1d95] to-[color:var(--color-accent-3)] p-8 shadow-[0_0_80px_rgba(99,102,241,0.35)] sm:p-12">
            <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                Новое
              </span>

              <h2 className="mt-5 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-white sm:text-4xl">
                Вайб-кодинг и продвижение
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Помогаем не только с идеей и офисом, но и с современными AI-инструментами разработки и первым
                притоком пользователей.
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {vibeCodingServices.map((item, index) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <Reveal key={item.title} delay={index * 0.08}>
                      <div className="h-full rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
                          <Icon className="h-5 w-5 text-white" />
                        </span>
                        <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/80">{item.description}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
