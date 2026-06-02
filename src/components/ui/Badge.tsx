import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "accent" | "green" | "amber" | "outline";

const variants: Record<Variant, string> = {
  default:
    "bg-[var(--color-bg-elevated)] text-[var(--color-content-secondary)] border border-[var(--color-border)]",
  accent:
    "bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent)]/20",
  green:
    "bg-[var(--color-green)]/10 text-[var(--color-green)] border border-[var(--color-green)]/20",
  amber:
    "bg-[var(--color-amber)]/10 text-[var(--color-amber)] border border-[var(--color-amber)]/20",
  outline:
    "bg-transparent text-[var(--color-content-muted)] border border-[var(--color-border)]",
};

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium font-mono",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
