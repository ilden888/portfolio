import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-[10px] uppercase tracking-widest",
        "text-[var(--color-content-muted)] px-2 py-1",
        "border border-[var(--color-border-subtle)] rounded-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
