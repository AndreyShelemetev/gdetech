import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProfileNameForm } from "@/components/account/ProfileNameForm";
import { team } from "@/content/team";

const PROVIDER_LABEL: Record<string, string> = {
  email: "E-mail",
  yandex_id: "Yandex ID",
  vk_id: "VK ID",
};

const STATUS_LABEL: Record<string, string> = {
  new: "Новая",
  contacted: "Связались",
  done: "Готово",
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const [identities, hubApplications, expertMeetings] = await Promise.all([
    prisma.authIdentity.findMany({ where: { userId: user.id } }),
    prisma.hubApplication.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    prisma.expertMeetingRequest.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
  ]);

  const requests = [
    ...hubApplications.map((item) => ({
      id: item.id,
      kind: "Заявка на вступление" as const,
      detail: item.projectDescription,
      status: item.status,
      createdAt: item.createdAt,
    })),
    ...expertMeetings.map((item) => {
      const expert = team.find((member) => member.slug === item.expertSlug);
      return {
        id: item.id,
        kind: "Встреча с экспертом" as const,
        detail: expert ? `${expert.name} — ${expert.role}` : item.expertSlug,
        status: item.status,
        createdAt: item.createdAt,
      };
    }),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <section className="scroll-mt-28 py-24 sm:py-32">
      <Container className="max-w-3xl">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent-3)]">
          Личный кабинет
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl">
          {user.displayName || user.email.split("@")[0]}
        </h1>

        <GlassCard className="mt-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-[color:var(--color-text-muted)]">{user.email}</p>
              <p className="mt-1 text-xs text-[color:var(--color-text-faint)]">
                В GdeTech с {user.createdAt.toLocaleDateString("ru-RU")}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {identities.map((identity) => (
                <Badge key={identity.id}>{PROVIDER_LABEL[identity.provider] ?? identity.provider}</Badge>
              ))}
              {user.role === "admin" ? <Badge>Админ</Badge> : null}
            </div>
          </div>

          <div className="mt-5 border-t border-[color:var(--color-border)] pt-5">
            <ProfileNameForm initialName={user.displayName ?? ""} />
          </div>
        </GlassCard>

        <h2 className="mt-12 mb-4 font-[family-name:var(--font-display)] text-lg font-semibold">
          Мои заявки
        </h2>

        {requests.length === 0 ? (
          <GlassCard>
            <p className="text-sm text-[color:var(--color-text-muted)]">
              Заявок пока нет. Можно{" "}
              <Link href="/?expert=pavel-pm#join" className="text-white underline underline-offset-2">
                подать заявку на вступление
              </Link>{" "}
              или записаться на встречу с экспертом.
            </p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {requests.map((item) => (
              <GlassCard key={item.id} hoverable={false} className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{item.kind}</p>
                  <p className="mt-1 max-w-md text-sm text-[color:var(--color-text-muted)]">{item.detail}</p>
                  <p className="mt-1 text-xs text-[color:var(--color-text-faint)]">
                    {item.createdAt.toLocaleString("ru-RU")}
                  </p>
                </div>
                <Badge>{STATUS_LABEL[item.status] ?? item.status}</Badge>
              </GlassCard>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
