"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { MailIcon, YandexMonogram, VkMonogram } from "@/components/ui/icons";

const YANDEX_ENABLED = process.env.NEXT_PUBLIC_YANDEX_AUTH_ENABLED === "true";
const VK_ENABLED = process.env.NEXT_PUBLIC_VK_AUTH_ENABLED === "true";

type Step = "email" | "code";

export function AuthModal() {
  const { isModalOpen, closeLogin, setUser } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      setStep("email");
      setEmail("");
      setCode("");
      setDevCode(null);
      setError(null);
      setIsSubmitting(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLogin();
    }
    if (isModalOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen, closeLogin]);

  async function handleRequestCode(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/email/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Не удалось отправить код");
      setDevCode(data.devCode ?? null);
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyCode(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Не удалось подтвердить код");
      setUser(data.user);
      closeLogin();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {isModalOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLogin}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="glass-panel w-full max-w-sm rounded-3xl p-7"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">Вход в GdeTech</h3>
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                  {step === "email" ? "Войдите по e-mail или через соцсети" : `Код отправлен на ${email}`}
                </p>
              </div>
              <button
                onClick={closeLogin}
                aria-label="Закрыть"
                className="rounded-full p-1 text-[color:var(--color-text-muted)] hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {step === "email" ? (
              <form onSubmit={handleRequestCode} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[color:var(--color-text-muted)]">
                    E-mail
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white/5 px-3 py-2.5 focus-within:border-[color:var(--color-accent)]">
                    <MailIcon className="h-4 w-4 shrink-0 text-[color:var(--color-text-faint)]" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[color:var(--color-text-faint)]"
                    />
                  </div>
                </div>

                {error ? <p className="text-xs text-rose-400">{error}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? "Отправляем..." : "Получить код"}
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-[color:var(--color-border)]" />
                  <span className="text-[10px] uppercase tracking-wide text-[color:var(--color-text-faint)]">
                    или
                  </span>
                  <div className="h-px flex-1 bg-[color:var(--color-border)]" />
                </div>

                <a
                  href={YANDEX_ENABLED ? "/api/auth/yandex/start" : undefined}
                  aria-disabled={!YANDEX_ENABLED}
                  title={YANDEX_ENABLED ? undefined : "Скоро"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-white/5"
                >
                  <YandexMonogram /> Войти через Yandex ID {YANDEX_ENABLED ? "" : "(скоро)"}
                </a>
                <a
                  href={VK_ENABLED ? "/api/auth/vk/start" : undefined}
                  aria-disabled={!VK_ENABLED}
                  title={VK_ENABLED ? undefined : "Скоро"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:bg-white/5"
                >
                  <VkMonogram /> Войти через VK ID {VK_ENABLED ? "" : "(скоро)"}
                </a>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[color:var(--color-text-muted)]">
                    Код из письма
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    autoFocus
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="w-full rounded-xl border border-[color:var(--color-border)] bg-white/5 px-3 py-2.5 text-center text-lg tracking-[0.4em] text-white outline-none placeholder:text-[color:var(--color-text-faint)] focus:border-[color:var(--color-accent)]"
                  />
                  {devCode ? (
                    <p className="mt-2 text-xs text-[color:var(--color-accent-3)]">
                      Dev-режим (SMTP выключен): код — <span className="font-mono">{devCode}</span>
                    </p>
                  ) : null}
                </div>

                {error ? <p className="text-xs text-rose-400">{error}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? "Проверяем..." : "Войти"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="w-full text-center text-xs text-[color:var(--color-text-muted)] hover:text-white"
                >
                  Изменить e-mail или запросить код заново
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
