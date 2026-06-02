import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { type ProjectCardData, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

// Per-category accent used in the placeholder cover and hover glow
const categoryStyle: Record<
  ProjectCategory,
  { gradient: string; dot: string; hoverBorder: string; hoverShadow: string }
> = {
  "data-platform": {
    gradient: "from-indigo-500/[0.14] via-indigo-500/[0.04]",
    dot: "bg-indigo-400/70",
    hoverBorder: "hover:border-indigo-400/25",
    hoverShadow: "hover:shadow-[0_18px_50px_rgba(99,102,241,0.08)]",
  },
  "ai-agent": {
    gradient: "from-violet-500/[0.14] via-violet-500/[0.04]",
    dot: "bg-violet-400/70",
    hoverBorder: "hover:border-violet-400/25",
    hoverShadow: "hover:shadow-[0_18px_50px_rgba(139,92,246,0.08)]",
  },
  realtime: {
    gradient: "from-amber-500/[0.12] via-amber-500/[0.03]",
    dot: "bg-amber-400/70",
    hoverBorder: "hover:border-amber-400/20",
    hoverShadow: "hover:shadow-[0_18px_50px_rgba(245,158,11,0.07)]",
  },
  analytics: {
    gradient: "from-cyan-500/[0.12] via-cyan-500/[0.03]",
    dot: "bg-cyan-400/70",
    hoverBorder: "hover:border-cyan-400/20",
    hoverShadow: "hover:shadow-[0_18px_50px_rgba(6,182,212,0.07)]",
  },
  telemetry: {
    gradient: "from-emerald-500/[0.12] via-emerald-500/[0.03]",
    dot: "bg-emerald-400/70",
    hoverBorder: "hover:border-emerald-400/20",
    hoverShadow: "hover:shadow-[0_18px_50px_rgba(16,185,129,0.07)]",
  },
  research: {
    gradient: "from-rose-500/[0.12] via-rose-500/[0.03]",
    dot: "bg-rose-400/70",
    hoverBorder: "hover:border-rose-400/20",
    hoverShadow: "hover:shadow-[0_18px_50px_rgba(244,63,94,0.07)]",
  },
};

const statusStyle: Record<string, { dot: string; label: string }> = {
  live: { dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]", label: "text-emerald-400/80" },
  production: { dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]", label: "text-emerald-400/80" },
  "in-progress": { dot: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]", label: "text-amber-400/80" },
  "active-development": { dot: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]", label: "text-amber-400/80" },
  research: { dot: "bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.55)]", label: "text-violet-400/80" },
  planned: { dot: "bg-[var(--fg-20)]", label: "text-[var(--fg-35)]" },
  concept: { dot: "bg-[var(--fg-20)]", label: "text-[var(--fg-35)]" },
};

interface ProjectCardProps {
  project: ProjectCardData;
  href?: string;
  size?: "default" | "lg";
  className?: string;
}

function CoverPlaceholder({
  category,
  size,
}: {
  category: ProjectCategory;
  size: "default" | "lg";
}) {
  const { gradient } = categoryStyle[category];
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-[var(--border-5)] bg-[var(--surface-3)]",
        size === "lg" ? "aspect-video" : "aspect-[16/8]"
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(var(--border-5)_1px,transparent_1px),linear-gradient(90deg,var(--border-5)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className={cn("absolute inset-0 bg-gradient-to-br to-transparent", gradient)} />
      <ImageIcon
        className="absolute bottom-3 right-3 text-[var(--fg-15)]"
        size={16}
        strokeWidth={1.5}
      />
    </div>
  );
}

function ProjectCardBody({
  project,
  size,
}: {
  project: ProjectCardData;
  size: "default" | "lg";
}) {
  const cat = categoryStyle[project.category];
  const status = statusStyle[project.status] ?? statusStyle.planned;

  return (
    <>
      {/* Cover */}
      {project.coverImage ? (
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-[var(--border-5)]",
            size === "lg" ? "aspect-video" : "aspect-[16/8]"
          )}
        >
          <Image src={project.coverImage} alt="" fill className="object-cover" />
        </div>
      ) : (
        <CoverPlaceholder category={project.category} size={size} />
      )}

      {/* Meta row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", cat.dot)} />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-30)]">
            {project.categoryLabel}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", status.dot)} />
          <span className={cn("font-mono text-[10px] tracking-wide", status.label)}>
            {project.statusLabel}
          </span>
        </div>
      </div>

      {/* Title + description */}
      <div className="flex flex-1 flex-col gap-2">
        <h3
          className={cn(
            "font-semibold leading-snug tracking-[-0.015em] text-[var(--fg-90)]",
            size === "lg" ? "text-[1.05rem]" : "text-[0.9375rem]"
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            "leading-relaxed text-[var(--fg-40)]",
            size === "lg" ? "text-[14px]" : "text-[13px]"
          )}
        >
          {project.description}
        </p>
      </div>

      {/* Footer: tags + arrow */}
      <div className="flex items-end justify-between gap-3 border-t border-[var(--border-5)] pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--border-7)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[10px] tracking-wide text-[var(--fg-30)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight
          size={14}
          className="shrink-0 text-[var(--fg-20)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg-60)]"
        />
      </div>
    </>
  );
}

export function ProjectCard({ project, href, size = "default", className }: ProjectCardProps) {
  const { hoverBorder, hoverShadow } = categoryStyle[project.category];

  const cardClassName = cn(
    "group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-[var(--border-6)] bg-[var(--surface-2)] p-4",
    "transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--surface-3)]",
    hoverBorder,
    hoverShadow,
    className
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName} data-project-slug={project.slug}>
        <ProjectCardBody project={project} size={size} />
      </Link>
    );
  }

  return (
    <article className={cardClassName} data-project-slug={project.slug}>
      <ProjectCardBody project={project} size={size} />
    </article>
  );
}
