"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/components/auth/AuthProvider";

const NAV_LINKS = [
  { href: "#space", label: "Пространство" },
  { href: "#team", label: "Команда" },
  { href: "#residents", label: "Резиденты" },
  { href: "#hub", label: "Стартап-хаб" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const { user, openLogin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-3 mt-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] shadow-lg shadow-black/30 sm:mx-6 sm:mt-4">
        <Container className="flex h-16 items-center justify-between !max-w-none px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] text-white">
              G
            </span>
            GdeTech
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[color:var(--color-text-muted)] transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                <Link href="/account" className="text-sm text-[color:var(--color-text-muted)] hover:text-white">
                  Личный кабинет
                </Link>
                {user.role === "admin" ? (
                  <Link href="/admin/leads" className="text-sm text-[color:var(--color-accent-3)] hover:underline">
                    Админка
                  </Link>
                ) : null}
                <button onClick={() => void signOut()} className="text-sm text-[color:var(--color-text-muted)] hover:text-white">
                  Выйти
                </button>
              </>
            ) : (
              <button onClick={openLogin} className="text-sm text-[color:var(--color-text-muted)] hover:text-white">
                Войти
              </button>
            )}
            <a
              href="#join"
              className="rounded-full bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_25px_rgba(99,102,241,0.35)] transition hover:-translate-y-0.5"
            >
              Подать заявку
            </a>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--color-border)] text-white lg:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            <span className="text-lg">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel mx-3 mt-2 overflow-hidden rounded-2xl sm:mx-6 lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-[color:var(--color-text-muted)] hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="my-2 h-px bg-[color:var(--color-border)]" />
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-[color:var(--color-text-muted)] hover:bg-white/5 hover:text-white"
                  >
                    Личный кабинет
                  </Link>
                  {user.role === "admin" ? (
                    <Link href="/admin/leads" className="rounded-lg px-3 py-2.5 text-sm text-[color:var(--color-accent-3)]">
                      Админка
                    </Link>
                  ) : null}
                  <button
                    onClick={() => void signOut()}
                    className="rounded-lg px-3 py-2.5 text-left text-sm text-[color:var(--color-text-muted)] hover:bg-white/5"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    openLogin();
                    setIsMenuOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm text-[color:var(--color-text-muted)] hover:bg-white/5"
                >
                  Войти
                </button>
              )}
              <a
                href="#join"
                onClick={() => setIsMenuOpen(false)}
                className="mt-1 rounded-full bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] px-5 py-2.5 text-center text-sm font-semibold text-white"
              >
                Подать заявку
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
