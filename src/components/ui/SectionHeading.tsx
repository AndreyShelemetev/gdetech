import { clsx } from "clsx";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center")}>
        {eyebrow ? (
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent-3)]">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[color:var(--color-text)] sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-[color:var(--color-text-muted)] sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
