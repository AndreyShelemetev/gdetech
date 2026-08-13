"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

export function AdminTopBar() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center gap-4 text-sm text-[color:var(--color-text-muted)]">
      <Link href="/" className="hover:text-white">
        На сайт
      </Link>
      {user ? (
        <>
          <span>{user.email}</span>
          <button onClick={() => void signOut()} className="hover:text-white">
            Выйти
          </button>
        </>
      ) : null}
    </div>
  );
}
