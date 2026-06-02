import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { type ProjectCardData } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectCardData;
  href?: string;
  className?: string;
}

function ProjectCardBody({ project }: Pick<ProjectCardProps, "project">) {
  return (
    <>
      <div className="relative aspect-[16/8] overflow-hidden rounded-lg border border-[var(--border-5)] bg-[var(--surface-3)]">
        {project.coverImage ? (
          <Image src={project.coverImage} alt="" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(var(--border-5)_1px,transparent_1px),linear-gradient(90deg,var(--border-5)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.12] via-transparent to-transparent" />
            <ImageIcon className="absolute bottom-4 right-4 text-[var(--fg-20)]" size={18} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-25)]">
          {project.categoryLabel}
        </span>
        <div className="flex items-center gap-2">
          {project.featured && <Star aria-label="Featured" size={13} className="text-amber-400/70" />}
          <Badge variant="outline" className="text-[10px] text-[var(--fg-35)]">
            {project.statusLabel}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-base font-semibold leading-snug tracking-[-0.01em] text-[var(--fg-90)]">
          {project.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-[var(--fg-40)]">{project.description}</p>
      </div>

      <div className="flex items-end justify-between gap-3 border-t border-[var(--border-5)] pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-md text-[11px] text-[var(--fg-35)]">
              {tag}
            </Badge>
          ))}
        </div>
        <ArrowUpRight
          size={14}
          className="shrink-0 text-[var(--fg-20)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-400/80"
        />
      </div>
    </>
  );
}

export function ProjectCard({ project, href, className }: ProjectCardProps) {
  const cardClassName = cn(
    "group relative flex h-full flex-col gap-5 overflow-hidden rounded-xl border border-[var(--border-6)] bg-[var(--surface-2)] p-4",
    "transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/25 hover:bg-[var(--surface-3)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName} data-project-slug={project.slug}>
        <ProjectCardBody project={project} />
      </Link>
    );
  }

  return (
    <article className={cardClassName} data-project-slug={project.slug}>
      <ProjectCardBody project={project} />
    </article>
  );
}
