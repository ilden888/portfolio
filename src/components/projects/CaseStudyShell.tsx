"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { type ProjectCardData } from "@/data/projects";
import { Container } from "@/components/layout/Container";

const ease = [0.22, 1, 0.36, 1] as const;

const statusStyle: Record<string, { dot: string; label: string }> = {
  live: {
    dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]",
    label: "text-emerald-400/80",
  },
  "in-progress": {
    dot: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]",
    label: "text-amber-400/80",
  },
  planned: { dot: "bg-[var(--fg-20)]", label: "text-[var(--fg-35)]" },
};

export interface CaseStudySection {
  key: string;
  title: string;
}

interface CaseStudyShellProps {
  project: ProjectCardData;
  backHref: string;
  backLabel: string;
  inProgressLabel: string;
  inProgressSub: string;
  sections: CaseStudySection[];
}

function SectionPlaceholder({
  index,
  title,
  inProgressLabel,
  inProgressSub,
}: {
  index: number;
  title: string;
  inProgressLabel: string;
  inProgressSub: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.04 }}
      className="border-t border-[var(--border-subtle)] py-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
        {/* Section label */}
        <div className="flex shrink-0 flex-col gap-1 sm:w-[200px]">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-20)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--fg-60)]">
            {title}
          </h2>
        </div>

        {/* Placeholder body */}
        <div className="flex-1">
          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-[var(--border-7)] p-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg-20)]" />
            <p className="text-[13px] font-medium text-[var(--fg-40)]">{inProgressLabel}</p>
            <p className="text-[12px] leading-relaxed text-[var(--fg-25)]">{inProgressSub}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TechnologiesSection({
  index,
  title,
  tags,
}: {
  index: number;
  title: string;
  tags: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.04 }}
      className="border-t border-[var(--border-subtle)] py-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
        <div className="flex shrink-0 flex-col gap-1 sm:w-[200px]">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-20)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--fg-60)]">
            {title}
          </h2>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[var(--border-7)] bg-[var(--surface-2)] px-3.5 py-1.5 font-mono text-[13px] text-[var(--fg-50)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudyShell({
  project,
  backHref,
  backLabel,
  inProgressLabel,
  inProgressSub,
  sections,
}: CaseStudyShellProps) {
  const status = statusStyle[project.status] ?? statusStyle.planned;

  return (
    <div className="min-h-screen">
      {/* ── Page hero ── */}
      <section className="relative overflow-hidden pb-16 pt-[120px]">
        {/* Atmosphere */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/4 top-0 h-[500px] w-[700px]"
            style={{
              background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <Container>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-12"
          >
            <Link
              href={backHref}
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-[var(--fg-30)] transition-colors duration-200 hover:text-[var(--fg-70)]"
            >
              <ArrowLeft
                size={12}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              {backLabel}
            </Link>
          </motion.div>

          <div className="flex max-w-[760px] flex-col gap-6">
            {/* Category + status */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.05 }}
              className="flex items-center gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-30)]">
                {project.categoryLabel}
              </span>
              <span className="h-px w-4 bg-[var(--border-10)]" />
              <div className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                <span className={`font-mono text-[11px] tracking-wide ${status.label}`}>
                  {project.statusLabel}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              {project.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className="text-[16px] leading-relaxed text-[var(--fg-45)]"
              style={{ "--fg-45": "rgba(240, 240, 240, 0.45)" } as React.CSSProperties}
            >
              {project.description}
            </motion.p>

            {/* Tag pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[var(--border-7)] bg-[var(--surface-2)] px-3 py-1 font-mono text-[12px] text-[var(--fg-40)]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* External links */}
            {project.links && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease, delay: 0.25 }}
                className="flex items-center gap-4"
              >
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[13px] text-[var(--fg-40)] transition-colors duration-200 hover:text-[var(--fg-80)]"
                  >
                    <ExternalLink size={12} />
                    Demo
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[13px] text-[var(--fg-40)] transition-colors duration-200 hover:text-[var(--fg-80)]"
                  >
                    <GitBranch size={12} />
                    GitHub
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Sections ── */}
      <Container>
        <div className="pb-24">
          {sections.map((section, i) =>
            section.key === "technologies" ? (
              <TechnologiesSection
                key={section.key}
                index={i}
                title={section.title}
                tags={project.tags}
              />
            ) : (
              <SectionPlaceholder
                key={section.key}
                index={i}
                title={section.title}
                inProgressLabel={inProgressLabel}
                inProgressSub={inProgressSub}
              />
            )
          )}
        </div>
      </Container>
    </div>
  );
}
