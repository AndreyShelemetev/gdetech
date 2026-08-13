import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { amenities } from "@/content/space";

export function About() {
  return (
    <section id="space" className="scroll-mt-28 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Пространство"
          title="Первый в Йошкар-Оле коворкинг для IT-команд"
          description="Технологичное и комфортное пространство, где удобно и работать над кодом, и встречаться с командой, инвесторами и менторами."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {amenities.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="glass-panel overflow-hidden rounded-2xl">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
