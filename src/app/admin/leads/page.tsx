import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { LeadsTable } from "@/components/admin/LeadsTable";

export default async function AdminLeadsPage() {
  const admin = await requireAdminUser();
  if (!admin) redirect("/admin/login");

  const [hubApplications, expertMeetings] = await Promise.all([
    prisma.hubApplication.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.expertMeetingRequest.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Лиды GdeTech</h1>
      <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">Вошли как {admin.email}</p>

      <LeadsTable
        hubApplications={hubApplications.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }))}
        expertMeetings={expertMeetings.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }))}
      />
    </div>
  );
}
