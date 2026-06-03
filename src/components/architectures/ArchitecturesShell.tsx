"use client";

import { motion } from "framer-motion";
import { PipelineDiagram, type PipelineStep } from "@/components/architecture";
import { Container } from "@/components/layout/Container";

const ease = [0.22, 1, 0.36, 1] as const;

interface DiagramData {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  steps: PipelineStep[];
}

interface ArchitecturesShellProps {
  eyebrow: string;
  title: string;
  description: string;
  diagramLabel: string;
  diagrams: DiagramData[];
}

function DiagramCard({
  diagram,
  index,
  diagramLabel,
}: {
  diagram: DiagramData;
  index: number;
  diagramLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease, delay: index * 0.06 }}
      className="border-t border-[var(--border-subtle)] py-12"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        {/* Left: info */}
        <div className="flex shrink-0 flex-col gap-4 lg:w-[280px]">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-20)]">
              {diagramLabel} {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] leading-snug text-[var(--fg-80)]">
              {diagram.title}
            </h2>
          </div>
          <p className="text-[13px] leading-relaxed text-[var(--fg-40)]">
            {diagram.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {diagram.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-[var(--border-7)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg-40)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: diagram */}
        <div className="flex-1 min-w-0">
          <PipelineDiagram steps={diagram.steps} className="max-w-[480px]" />
        </div>
      </div>
    </motion.div>
  );
}

export function ArchitecturesShell({
  eyebrow,
  title,
  description,
  diagramLabel,
  diagrams,
}: ArchitecturesShellProps) {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-[120px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/4 top-0 h-[400px] w-[600px]"
            style={{
              background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
        <Container>
          <div className="max-w-[680px]">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-30)]"
            >
              {eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.06 }}
              className="mt-3 font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.12 }}
              className="mt-4 text-[15px] leading-relaxed text-[var(--fg-45)]"
            >
              {description}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ── Diagrams ── */}
      <Container>
        <div className="pb-24">
          {diagrams.map((diagram, i) => (
            <DiagramCard
              key={diagram.slug}
              diagram={diagram}
              index={i}
              diagramLabel={diagramLabel}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
