import { cn } from "@/lib/utils";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Separator({ className, orientation = "horizontal" }: SeparatorProps) {
  return (
    <div
      role="separator"
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-[var(--color-border-subtle)]"
          : "w-px self-stretch bg-[var(--color-border-subtle)]",
        className
      )}
    />
  );
}
