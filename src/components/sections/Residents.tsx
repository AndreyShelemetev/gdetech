import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { residents } from "@/content/portfolio";

export function Residents() {
  return (
    <section id="residents" className="scroll-mt-28 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Резиденты"
          title="Стартапы, в которые мы инвестировали"
          description="Часть команд прошла через GdeTech и запустила собственные продукты в разных нишах."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {residents.map((company, index) => (
            <Reveal key={company.name} delay={(index % 3) * 0.06}>
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent)]/50"
              >
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--color-accent)]/30 to-[color:var(--color-accent-2)]/30 text-sm font-bold">
                  {company.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{company.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                  {company.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
