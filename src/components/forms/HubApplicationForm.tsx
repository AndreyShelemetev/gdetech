"use client";

import { useState, type FormEvent } from "react";

export function HubApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads/hub-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Не удалось отправить заявку");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-300">Заявка отправлена!</p>
        <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
          Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" />

      <Field label="Имя" name="name" placeholder="Как к вам обращаться" required />
      <Field label="E-mail" name="email" type="email" placeholder="you@example.com" required />
      <Field label="Телефон" name="phone" type="tel" placeholder="+7 900 000-00-00" required />

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[color:var(--color-text-muted)]">
          Расскажите о своём проекте или идее
        </label>
        <textarea
          name="projectDescription"
          required
          rows={4}
          placeholder="Хочу сделать... хочу получить идею от вас..."
          className="w-full rounded-xl border border-[color:var(--color-border)] bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-[color:var(--color-text-faint)] focus:border-[color:var(--color-accent)]"
        />
      </div>

      {error ? <p className="text-xs text-rose-400">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50"
      >
        {status === "submitting" ? "Отправляем..." : "Подать заявку"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[color:var(--color-text-muted)]">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-[color:var(--color-border)] bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-[color:var(--color-text-faint)] focus:border-[color:var(--color-accent)]"
      />
    </div>
  );
}
