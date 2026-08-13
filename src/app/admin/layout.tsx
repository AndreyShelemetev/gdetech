import Link from "next/link";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-[color:var(--color-border-soft)] bg-[color:var(--color-bg-elevated)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/admin/leads" className="font-[family-name:var(--font-display)] text-sm font-bold">
            GdeTech · Админка
          </Link>
          <AdminTopBar />
        </div>
      </div>
      {children}
    </div>
  );
}
