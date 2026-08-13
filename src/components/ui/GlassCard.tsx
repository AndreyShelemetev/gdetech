import { clsx } from "clsx";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className,
  hoverable = true,
}: {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}) {
  return (
    <div
      className={clsx(
        "glass-panel rounded-2xl p-6 transition-all duration-300",
        hoverable && "hover:-translate-y-1 hover:border-[color:var(--color-accent)]/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
