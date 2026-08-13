import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { baseStats } from "@/content/stats";
import { team } from "@/content/team";
import { residents } from "@/content/portfolio";

export function Stats() {
  const items = [
    ...baseStats,
    { value: residents.length, suffix: "", label: "проектов-резидентов в портфолио" },
    { value: team.length, suffix: "", label: "экспертов в штате хаба" },
  ];

  return (
    <section className="relative border-y border-[color:var(--color-border-soft)] bg-[color:var(--color-bg-elevated)] py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {items.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.06}>
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-gradient sm:text-4xl">
                  <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.value % 1 !== 0 ? 1 : 0} />
                </p>
                <p className="mt-2 text-sm leading-snug text-[color:var(--color-text-muted)]">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
