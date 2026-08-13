import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { comparisonRows } from "@/content/why-us";

export function WhyUs() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Сравнение"
          title="Почему мы, а не обычный коворкинг"
          description="Типовой коворкинг даёт стол и Wi-Fi. GdeTech даёт стол и команду, которая закрывает большинство вопросов запуска."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-x-auto rounded-2xl border border-[color:var(--color-border)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[color:var(--color-border)] bg-white/5">
                  <th className="px-5 py-4 font-semibold text-[color:var(--color-text-muted)]">Параметр</th>
                  <th className="px-5 py-4 font-semibold text-[color:var(--color-text-muted)]">
                    Типовой коворкинг / акселератор
                  </th>
                  <th className="px-5 py-4 font-semibold text-[color:var(--color-accent-3)]">GdeTech</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.aspect}
                    className={index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}
                  >
                    <td className="px-5 py-4 font-medium text-white">{row.aspect}</td>
                    <td className="px-5 py-4 text-[color:var(--color-text-faint)]">{row.others}</td>
                    <td className="px-5 py-4 text-[color:var(--color-text)]">{row.gdetech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
