"use client";

import { useState } from "react";

export interface HubApplicationRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectDescription: string;
  status: string;
  createdAt: string;
}

export interface ExpertMeetingRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  expertSlug: string;
  message: string | null;
  status: string;
  createdAt: string;
}

const STATUS_LABEL: Record<string, string> = {
  new: "Новая",
  contacted: "Связались",
  done: "Готово",
};

function StatusSelect({
  kind,
  id,
  status,
  onChange,
}: {
  kind: "hub" | "expert";
  id: string;
  status: string;
  onChange: (next: string) => void;
}) {
  const [isSaving, setIsSaving] = useState(false);

  async function handleChange(next: string) {
    setIsSaving(true);
    onChange(next);
    try {
      await fetch(`/api/admin/leads/${kind}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <select
      value={status}
      disabled={isSaving}
      onChange={(event) => void handleChange(event.target.value)}
      className="rounded-lg border border-[color:var(--color-border)] bg-white/5 px-2 py-1 text-xs text-white outline-none"
    >
      {Object.entries(STATUS_LABEL).map(([value, label]) => (
        <option key={value} value={value} className="bg-[#0e1326]">
          {label}
        </option>
      ))}
    </select>
  );
}

export function LeadsTable({
  hubApplications,
  expertMeetings,
}: {
  hubApplications: HubApplicationRow[];
  expertMeetings: ExpertMeetingRow[];
}) {
  const [hubRows, setHubRows] = useState(hubApplications);
  const [expertRows, setExpertRows] = useState(expertMeetings);

  return (
    <div className="mt-10 space-y-14">
      <section>
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
          Заявки на вступление ({hubRows.length})
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[color:var(--color-border)]">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-[color:var(--color-text-faint)]">
              <tr>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Имя</th>
                <th className="px-4 py-3">Контакты</th>
                <th className="px-4 py-3">Проект</th>
                <th className="px-4 py-3">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-border-soft)]">
              {hubRows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-[color:var(--color-text-faint)]">
                    {new Date(row.createdAt).toLocaleString("ru-RU")}
                  </td>
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-[color:var(--color-text-muted)]">
                    {row.email}
                    <br />
                    {row.phone}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-[color:var(--color-text-muted)]">
                    {row.projectDescription}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      kind="hub"
                      id={row.id}
                      status={row.status}
                      onChange={(next) =>
                        setHubRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: next } : r)))
                      }
                    />
                  </td>
                </tr>
              ))}
              {hubRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[color:var(--color-text-faint)]">
                    Заявок пока нет
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
          Заявки на встречу с экспертом ({expertRows.length})
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[color:var(--color-border)]">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-[color:var(--color-text-faint)]">
              <tr>
                <th className="px-4 py-3">Дата</th>
                <th className="px-4 py-3">Имя</th>
                <th className="px-4 py-3">Контакты</th>
                <th className="px-4 py-3">Эксперт</th>
                <th className="px-4 py-3">Сообщение</th>
                <th className="px-4 py-3">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-border-soft)]">
              {expertRows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-[color:var(--color-text-faint)]">
                    {new Date(row.createdAt).toLocaleString("ru-RU")}
                  </td>
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-[color:var(--color-text-muted)]">
                    {row.email}
                    <br />
                    {row.phone}
                  </td>
                  <td className="px-4 py-3 text-[color:var(--color-text-muted)]">{row.expertSlug}</td>
                  <td className="max-w-xs px-4 py-3 text-[color:var(--color-text-muted)]">
                    {row.message ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      kind="expert"
                      id={row.id}
                      status={row.status}
                      onChange={(next) =>
                        setExpertRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: next } : r)))
                      }
                    />
                  </td>
                </tr>
              ))}
              {expertRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[color:var(--color-text-faint)]">
                    Заявок пока нет
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
