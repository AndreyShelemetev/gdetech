import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { vibeCodingServices } from "@/content/services";

export function VibeCoding() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Новое"
          title="Вайб-кодинг и продвижение"
          description="Помогаем не только с идеей и офисом, но и с современными AI-инструментами разработки и первым притоком пользователей."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {vibeCodingServices.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <GlassCard className="h-full">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                  {item.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
