import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ownProjects } from "@/content/portfolio";

export function OwnProjects() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Наши проекты"
          title="Мы сами строим продукты, а не только консультируем"
          description="Собственные сервисы команды GdeTech — в проде и с реальными пользователями."
        />

        <div className="mt-14 grid gap-7 sm:grid-cols-2">
          {ownProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel group flex h-full flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--color-accent)]/50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">{project.name}</h3>
                  <span className="text-[color:var(--color-text-faint)] transition group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-[color:var(--color-text-muted)]">
                  {project.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
