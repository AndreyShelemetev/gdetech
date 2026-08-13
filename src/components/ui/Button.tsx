import { clsx } from "clsx";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent-3)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-accent-2)] text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_45px_rgba(99,102,241,0.55)] hover:-translate-y-0.5",
  secondary:
    "border border-[color:var(--color-border)] bg-white/5 text-[color:var(--color-text)] hover:bg-white/10 hover:-translate-y-0.5",
  ghost: "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
}: CommonProps & { href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(base, variants[variant], className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={clsx(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
