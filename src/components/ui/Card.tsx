import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

export function Card({ children, className, hover = false, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6",
        "transition-all duration-300",
        hover && [
          "hover:border-[var(--color-border)] hover:bg-[var(--color-bg-elevated)]",
          "hover:shadow-[0_0_0_1px_var(--color-border)]",
          "cursor-pointer",
        ],
        className
      )}
    >
      {children}
    </Tag>
  );
}
