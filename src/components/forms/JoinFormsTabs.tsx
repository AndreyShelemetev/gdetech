"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HubApplicationForm } from "@/components/forms/HubApplicationForm";
import { ExpertMeetingForm } from "@/components/forms/ExpertMeetingForm";

type Tab = "hub" | "expert";

export function JoinFormsTabs() {
  const searchParams = useSearchParams();
  const expertParam = searchParams.get("expert") ?? undefined;
  const [tab, setTab] = useState<Tab>(expertParam ? "expert" : "hub");

  useEffect(() => {
    if (expertParam) setTab("expert");
  }, [expertParam]);

  return (
    <div className="glass-panel mx-auto max-w-xl rounded-3xl p-2">
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-black/20 p-1">
        <TabButton active={tab === "hub"} onClick={() => setTab("hub")}>
          Заявка на вступление
        </TabButton>
        <TabButton active={tab === "expert"} onClick={() => setTab("expert")}>
          Встреча с экспертом
        </TabButton>
      </div>

      <div className="p-5 sm:p-6">
        {tab === "hub" ? <HubApplicationForm /> : <ExpertMeetingForm initialExpertSlug={expertParam} />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-3 py-2.5 text-xs font-semibold transition sm:text-sm ${
        active ? "bg-white/10 text-white" : "text-[color:var(--color-text-muted)] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
