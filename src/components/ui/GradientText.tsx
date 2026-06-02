import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Preset = "accent" | "warm" | "cool" | "mono";

const presets: Record<Preset, string> = {
  accent: "from-[var(--color-accent)] to-[var(--color-accent-hover)]",
  warm: "from-amber-400 to-orange-500",
  cool: "from-cyan-400 to-[var(--color-accent)]",
  mono: "from-[var(--color-content-primary)] to-[var(--color-content-secondary)]",
};

interface GradientTextProps {
  children: ReactNode;
  preset?: Preset;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export function GradientText({
  children,
  preset = "accent",
  className,
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        presets[preset],
        className
      )}
    >
      {children}
    </Tag>
  );
}
