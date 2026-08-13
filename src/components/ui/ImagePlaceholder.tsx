import { clsx } from "clsx";

export function ImagePlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className,
}: {
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-center",
        aspect,
        className,
      )}
    >
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <div className="relative z-10 px-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-faint)]">
          Изображение
        </p>
        <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">{label}</p>
        <p className="mt-1 text-[10px] text-[color:var(--color-text-faint)]">
          промпт — в docs/image-prompts.md
        </p>
      </div>
    </div>
  );
}
