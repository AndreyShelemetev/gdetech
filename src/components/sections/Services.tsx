import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { services } from "@/content/services";

export function Services() {
  return (
    <section id="hub" className="scroll-mt-28 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Стартап-хаб"
          title="Чем поможем"
          description="Цель GdeTech — экосистема для создания и развития инновационных IT-проектов."
        />

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 0.08}>
              <GlassCard className="p-8">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">{service.title}</h3>
                <p className="mt-2.5 text-base leading-relaxed text-[color:var(--color-text-muted)]">
                  {service.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
