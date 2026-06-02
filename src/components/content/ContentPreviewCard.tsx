import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface ContentPreview {
  title: string;
  description: string;
  category: string;
  tags: string[];
}

interface ContentPreviewCardProps {
  item: ContentPreview;
  status?: string;
  className?: string;
}

export function ContentPreviewCard({ item, status, className }: ContentPreviewCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-[var(--border-6)] bg-[var(--surface-2)] p-6",
        "transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/25 hover:bg-[var(--surface-3)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.09] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-25)]">
          {item.category}
        </span>
        <div className="flex items-center gap-2">
          {status && (
            <Badge variant="outline" className="text-[10px] text-[var(--fg-30)]">
              {status}
            </Badge>
          )}
          <ArrowUpRight
            size={14}
            className="text-[var(--fg-20)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-400/80"
          />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-2">
        <h3 className="text-base font-semibold leading-snug tracking-[-0.01em] text-[var(--fg-90)]">
          {item.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-[var(--fg-40)]">{item.description}</p>
      </div>

      <div className="relative flex flex-wrap gap-1.5 border-t border-[var(--border-5)] pt-4">
        {item.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="rounded-md text-[11px] text-[var(--fg-35)]">
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}
