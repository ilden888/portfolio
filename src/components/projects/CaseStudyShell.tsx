"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { type ProjectCardData } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { ArchitectureDiagram, type DiagramNode } from "@/components/projects/ArchitectureDiagram";

const ease = [0.22, 1, 0.36, 1] as const;

const statusStyle: Record<string, { dot: string; label: string }> = {
  live: { dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]", label: "text-emerald-400/80" },
  production: { dot: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]", label: "text-emerald-400/80" },
  "in-progress": { dot: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]", label: "text-amber-400/80" },
  "active-development": { dot: "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]", label: "text-amber-400/80" },
  research: { dot: "bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.55)]", label: "text-violet-400/80" },
  planned: { dot: "bg-[var(--fg-20)]", label: "text-[var(--fg-35)]" },
  concept: { dot: "bg-[var(--fg-20)]", label: "text-[var(--fg-35)]" },
};

export type SectionContent =
  | { type: "prose"; paragraphs: string[] }
  | { type: "challenges"; context?: string; items: string[] }
  | { type: "architecture"; description?: string; layers: { label: string; detail: string }[]; diagram?: DiagramNode[] }
  | { type: "dataflows"; streams: { name: string; desc: string }[] }
  | { type: "results"; items: string[] }
  | { type: "lessons"; items: { title: string; body: string }[] }
  | { type: "dwh-modeling"; description?: string; layers: { name: string; tag: string; description: string; models: { name: string; description: string }[] }[] }
  | { type: "future"; items: { title: string; description: string; priority?: "high" | "medium" | "low" }[] }
  | { type: "implementation"; steps: { title: string; body: string }[] }
  | { type: "kpi-streams"; description?: string; items: { name: string; desc: string }[] }
  | { type: "comparison"; scenarioA: { label: string; description: string; problems: string[] }; scenarioB: { label: string; description: string; benefits: string[] } };

export interface CaseStudySection {
  key: string;
  title: string;
  content?: SectionContent;
}

interface CaseStudyShellProps {
  project: ProjectCardData;
  backHref: string;
  backLabel: string;
  inProgressLabel: string;
  inProgressSub: string;
  flagshipLabel?: string;
  sections: CaseStudySection[];
}

// ── Content renderers ──────────────────────────────────────────────────────

function ProseContent({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[14px] leading-relaxed text-[var(--fg-45)]">
          {p}
        </p>
      ))}
    </div>
  );
}

function ChallengesContent({ context, items }: { context?: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      {context && (
        <p className="text-[14px] leading-relaxed text-[var(--fg-45)]">{context}</p>
      )}
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--fg-20)]" />
            <span className="text-[14px] leading-relaxed text-[var(--fg-45)]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArchitectureContent({
  description,
  layers,
  diagram,
}: {
  description?: string;
  layers: { label: string; detail: string }[];
  diagram?: DiagramNode[];
}) {
  return (
    <div className="flex flex-col gap-5">
      {description && (
        <p className="text-[14px] leading-relaxed text-[var(--fg-40)]">{description}</p>
      )}
      {diagram ? (
        <ArchitectureDiagram nodes={diagram} />
      ) : (
        <div className="flex flex-col">
          {layers.map((layer, i) => (
            <div key={i} className="flex flex-col items-stretch">
              <div className="rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] px-5 py-4">
                <div className="text-[14px] font-semibold tracking-[-0.01em] text-[var(--fg-70)]">
                  {layer.label}
                </div>
                <div className="mt-1 font-mono text-[11px] tracking-wide text-[var(--fg-25)]">
                  {layer.detail}
                </div>
              </div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <ChevronDown size={14} className="text-[var(--fg-20)]" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DataflowsContent({ streams }: { streams: { name: string; desc: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {streams.map((stream, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] px-5 py-4"
        >
          <div className="font-mono text-[12px] font-semibold tracking-wide text-[var(--fg-60)]">
            {stream.name}
          </div>
          <div className="mt-2 text-[13px] leading-relaxed text-[var(--fg-40)]">{stream.desc}</div>
        </div>
      ))}
    </div>
  );
}

function ResultsContent({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/60" />
          <span className="text-[14px] leading-relaxed text-[var(--fg-45)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LessonsContent({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((lesson, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] px-5 py-4"
        >
          <div className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--fg-70)]">
            {lesson.title}
          </div>
          <div className="mt-2 text-[13px] leading-relaxed text-[var(--fg-40)]">{lesson.body}</div>
        </div>
      ))}
    </div>
  );
}

const layerTagColors: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  raw: {
    border: "border-[var(--border-7)]",
    bg: "bg-[var(--surface-2)]",
    text: "text-[var(--fg-35)]",
    dot: "bg-[var(--fg-20)]",
  },
  stg: {
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/[0.04]",
    text: "text-cyan-400/60",
    dot: "bg-cyan-400/60",
  },
  mart: {
    border: "border-indigo-500/25",
    bg: "bg-indigo-500/[0.06]",
    text: "text-indigo-400/70",
    dot: "bg-indigo-400/70",
  },
};

function DwhModelingContent({
  description,
  layers,
}: {
  description?: string;
  layers: { name: string; tag: string; description: string; models: { name: string; description: string }[] }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      {description && (
        <p className="text-[14px] leading-relaxed text-[var(--fg-40)]">{description}</p>
      )}
      <div className="flex flex-col gap-4">
        {layers.map((layer, i) => {
          const cfg = layerTagColors[layer.tag] ?? layerTagColors.raw;
          return (
            <div key={i} className={`rounded-xl border ${cfg.border} ${cfg.bg} overflow-hidden`}>
              <div className="flex items-center gap-3 border-b border-[var(--border-5)] px-5 py-3">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${cfg.text}`}>
                  {layer.tag}
                </span>
                <span className="font-mono text-[12px] font-semibold text-[var(--fg-55)]">
                  {layer.name}
                </span>
              </div>
              <div className="px-5 py-3">
                <p className="mb-3 text-[13px] leading-relaxed text-[var(--fg-35)]">{layer.description}</p>
                <div className="flex flex-col gap-2">
                  {layer.models.map((model, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <code className="mt-[1px] shrink-0 rounded-md border border-[var(--border-7)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--fg-45)]">
                        {model.name}
                      </code>
                      <span className="text-[12px] leading-relaxed text-[var(--fg-30)]">{model.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const priorityColors: Record<string, { dot: string; label: string }> = {
  high: { dot: "bg-amber-400/70", label: "text-amber-400/60" },
  medium: { dot: "bg-indigo-400/60", label: "text-indigo-400/50" },
  low: { dot: "bg-[var(--fg-20)]", label: "text-[var(--fg-25)]" },
};

function FutureContent({ items }: { items: { title: string; description: string; priority?: "high" | "medium" | "low" }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const p = item.priority ? priorityColors[item.priority] : priorityColors.low;
        return (
          <div
            key={i}
            className="rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] px-5 py-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.dot}`} />
              <span className={`font-mono text-[10px] tracking-[0.15em] uppercase ${p.label}`}>
                {item.priority ?? "roadmap"}
              </span>
            </div>
            <div className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--fg-65)]">
              {item.title}
            </div>
            <div className="mt-2 text-[13px] leading-relaxed text-[var(--fg-38)]">{item.description}</div>
          </div>
        );
      })}
    </div>
  );
}

function KpiStreamsContent({ description, items }: { description?: string; items: { name: string; desc: string }[] }) {
  return (
    <div className="flex flex-col gap-5">
      {description && (
        <p className="text-[14px] leading-relaxed text-[var(--fg-40)]">{description}</p>
      )}
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] px-5 py-4">
            <div className="font-mono text-[12px] font-semibold tracking-wide text-[var(--fg-60)]">{item.name}</div>
            <div className="mt-2 text-[13px] leading-relaxed text-[var(--fg-40)]">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonContent({
  scenarioA,
  scenarioB,
}: {
  scenarioA: { label: string; description: string; problems: string[] };
  scenarioB: { label: string; description: string; benefits: string[] };
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Scenario A */}
      <div className="flex flex-col gap-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] px-5 py-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/60" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-rose-400/55">Without DWH</span>
          </div>
          <div className="text-[13px] font-semibold tracking-[-0.01em] text-rose-300/80">{scenarioA.label}</div>
          <div className="text-[12px] leading-relaxed text-[var(--fg-35)]">{scenarioA.description}</div>
        </div>
        <ul className="flex flex-col gap-2.5">
          {scenarioA.problems.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-rose-400/40" />
              <span className="text-[12px] leading-relaxed text-[var(--fg-38)]">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Scenario B */}
      <div className="flex flex-col gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] px-5 py-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/60" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-400/55">With DWH</span>
          </div>
          <div className="text-[13px] font-semibold tracking-[-0.01em] text-emerald-300/80">{scenarioB.label}</div>
          <div className="text-[12px] leading-relaxed text-[var(--fg-35)]">{scenarioB.description}</div>
        </div>
        <ul className="flex flex-col gap-2.5">
          {scenarioB.benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-emerald-400/50" />
              <span className="text-[12px] leading-relaxed text-[var(--fg-38)]">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ImplementationContent({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex shrink-0 flex-col items-center gap-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-10)] bg-[var(--surface-2)] font-mono text-[10px] text-[var(--fg-35)]">
              {i + 1}
            </span>
            {i < steps.length - 1 && (
              <div className="w-px flex-1 bg-gradient-to-b from-[var(--border-10)] to-transparent" />
            )}
          </div>
          <div className="pb-4">
            <div className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--fg-65)]">
              {step.title}
            </div>
            <div className="mt-1.5 text-[13px] leading-relaxed text-[var(--fg-38)]">{step.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderContent(content: SectionContent) {
  switch (content.type) {
    case "prose":
      return <ProseContent paragraphs={content.paragraphs} />;
    case "challenges":
      return <ChallengesContent context={content.context} items={content.items} />;
    case "architecture":
      return <ArchitectureContent description={content.description} layers={content.layers} diagram={content.diagram} />;
    case "dataflows":
      return <DataflowsContent streams={content.streams} />;
    case "results":
      return <ResultsContent items={content.items} />;
    case "lessons":
      return <LessonsContent items={content.items} />;
    case "dwh-modeling":
      return <DwhModelingContent description={content.description} layers={content.layers} />;
    case "future":
      return <FutureContent items={content.items} />;
    case "implementation":
      return <ImplementationContent steps={content.steps} />;
    case "kpi-streams":
      return <KpiStreamsContent description={content.description} items={content.items} />;
    case "comparison":
      return <ComparisonContent scenarioA={content.scenarioA} scenarioB={content.scenarioB} />;
  }
}

// ── Section wrappers ───────────────────────────────────────────────────────

function SectionWrapper({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
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
        <div className="flex-1">{children}</div>
      </div>
    </motion.div>
  );
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
    <SectionWrapper index={index} title={title}>
      <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-[var(--border-7)] p-6">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg-20)]" />
        <p className="text-[13px] font-medium text-[var(--fg-40)]">{inProgressLabel}</p>
        <p className="text-[12px] leading-relaxed text-[var(--fg-25)]">{inProgressSub}</p>
      </div>
    </SectionWrapper>
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
    <SectionWrapper index={index} title={title}>
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
    </SectionWrapper>
  );
}

// ── Shell ──────────────────────────────────────────────────────────────────

export function CaseStudyShell({
  project,
  backHref,
  backLabel,
  inProgressLabel,
  inProgressSub,
  flagshipLabel,
  sections,
}: CaseStudyShellProps) {
  const status = statusStyle[project.status] ?? statusStyle.planned;

  return (
    <div className="min-h-screen">
      {/* ── Page hero ── */}
      <section className="relative overflow-hidden pb-16 pt-[120px]">
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
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.05 }}
              className="flex items-center gap-4 flex-wrap"
            >
              {flagshipLabel && (
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/[0.08] px-3 py-1 font-mono text-[10px] tracking-[0.15em] uppercase text-indigo-400/80">
                  {flagshipLabel}
                </span>
              )}
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

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className="text-[16px] leading-relaxed text-[var(--fg-45)]"
              style={{ "--fg-45": "rgba(240, 240, 240, 0.45)" } as React.CSSProperties}
            >
              {project.description}
            </motion.p>

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
            ) : section.content ? (
              <SectionWrapper key={section.key} index={i} title={section.title}>
                {renderContent(section.content)}
              </SectionWrapper>
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
