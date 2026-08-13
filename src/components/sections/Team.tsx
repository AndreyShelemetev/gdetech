import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { team } from "@/content/team";

export function Team() {
  return (
    <section id="team" className="scroll-mt-28 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Команда"
          title="Десять экспертов вместо одного лица компании"
          description="У каждого резидента хаба есть доступ к штатной команде специалистов — не нужно искать подрядчиков на стороне."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.slug} delay={(index % 3) * 0.08}>
              <GlassCard className="flex h-full flex-col">
                {member.photo ? (
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[color:var(--color-border)]">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <Avatar name={member.name} className="w-full" />
                )}
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-[color:var(--color-accent-3)]">{member.role}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                  {member.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <Link
                  href={`/?expert=${member.slug}#join`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[color:var(--color-accent-3)]"
                >
                  Записаться на встречу →
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
