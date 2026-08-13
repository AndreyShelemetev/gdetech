import { clsx } from "clsx";

const GRADIENTS = [
  "from-indigo-500/40 to-fuchsia-500/30",
  "from-cyan-500/40 to-indigo-500/30",
  "from-fuchsia-500/40 to-cyan-500/30",
  "from-violet-500/40 to-emerald-400/25",
];

function hashIndex(input: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 997;
  }
  return hash % mod;
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name.trim().charAt(0).toUpperCase() || "?";
  const gradient = GRADIENTS[hashIndex(name, GRADIENTS.length)];

  return (
    <div
      className={clsx(
        "relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-gradient-to-br text-3xl font-semibold text-[color:var(--color-text)]",
        gradient,
        className,
      )}
    >
      <span className="grid-overlay absolute inset-0 opacity-30" />
      <span className="relative">{initials}</span>
    </div>
  );
}
