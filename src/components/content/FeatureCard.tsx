import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: "neutral" | "cyan" | "indigo" | "amber";
}

const accents = {
  neutral: "border-[var(--border-7)] bg-[var(--surface-3)] text-[var(--fg-40)]",
  cyan: "border-cyan-400/[0.12] bg-cyan-400/[0.04] text-cyan-400/60",
  indigo: "border-indigo-400/[0.15] bg-indigo-400/[0.05] text-indigo-400/70",
  amber: "border-amber-400/[0.12] bg-amber-400/[0.04] text-amber-400/60",
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  accent = "neutral",
}: FeatureCardProps) {
  return (
    <article className="group flex h-full flex-col gap-5 rounded-xl border border-[var(--border-6)] bg-[var(--surface-2)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-12)] hover:bg-[var(--surface-3)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.1)]">
      <div
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105",
          accents[accent]
        )}
      >
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--fg-90)]">{title}</h3>
        <p className="text-[13px] leading-relaxed text-[var(--fg-40)]">{description}</p>
      </div>
    </article>
  );
}
