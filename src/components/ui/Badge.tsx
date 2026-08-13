import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-[color:var(--color-border)] bg-white/5 px-3 py-1 text-xs font-medium text-[color:var(--color-text-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
