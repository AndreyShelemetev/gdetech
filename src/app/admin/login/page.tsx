"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function AdminLoginPage() {
  const { user, isLoading, openLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role === "admin") {
      router.replace("/admin/leads");
    }
  }, [isLoading, user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel w-full max-w-sm rounded-3xl p-8 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold">Вход в админку</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
          Войдите по e-mail, привязанному к аккаунту администратора.
        </p>
        {!isLoading && user && user.role !== "admin" ? (
          <p className="mt-4 text-xs text-rose-400">У этого аккаунта нет прав администратора.</p>
        ) : null}
        <button
          onClick={openLogin}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          Войти
        </button>
      </div>
    </div>
  );
}
