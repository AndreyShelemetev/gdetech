"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function ProfileNameForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError(null);

    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Не удалось сохранить");
      setIsEditing(false);
      setStatus("idle");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    }
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-text-muted)] hover:text-white"
      >
        Изменить имя
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        autoFocus
        maxLength={80}
        className="rounded-lg border border-[color:var(--color-border)] bg-white/5 px-3 py-1.5 text-sm text-white outline-none focus:border-[color:var(--color-accent)]"
      />
      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded-lg bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {status === "saving" ? "Сохраняем..." : "Сохранить"}
      </button>
      <button
        type="button"
        onClick={() => {
          setIsEditing(false);
          setName(initialName);
          setError(null);
        }}
        className="text-sm text-[color:var(--color-text-faint)] hover:text-white"
      >
        Отмена
      </button>
      {error ? <p className="w-full text-xs text-rose-400">{error}</p> : null}
    </form>
  );
}
