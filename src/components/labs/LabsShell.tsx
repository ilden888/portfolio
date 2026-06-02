"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const ease = [0.22, 1, 0.36, 1] as const;

interface LabItem {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tag: string;
  tags: string[];
}

interface LabCategory {
  key: string;
  label: string;
  description: string;
  items: LabItem[];
}

interface LabsShellProps {
  label: string;
  heading: string;
  description: string;
  comingSoon: string;
  comingSoonSub: string;
  categories: LabCategory[];
}

const tagColors: Record<string, string> = {
  Research: "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  Prototype: "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  Experiment: "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
  Исследование: "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  Прототип: "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  Эксперимент: "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
  Investigación: "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  Prototipo: "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  Experimento: "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
};

const categoryStyles: Record<string, { border: string; bg: string; dot: string; label: string }> = {
  dataEngineering: { border: "border-cyan-500/15", bg: "bg-cyan-500/[0.03]", dot: "bg-cyan-400/50", label: "text-cyan-400/60" },
  aiAnalytics: { border: "border-violet-500/15", bg: "bg-violet-500/[0.03]", dot: "bg-violet-400/50", label: "text-violet-400/60" },
  sportsAnalytics: { border: "border-amber-500/15", bg: "bg-amber-500/[0.03]", dot: "bg-amber-400/50", label: "text-amber-400/60" },
  research: { border: "border-rose-500/15", bg: "bg-rose-500/[0.03]", dot: "bg-rose-400/50", label: "text-rose-400/60" },
  experiments: { border: "border-emerald-500/15", bg: "bg-emerald-500/[0.03]", dot: "bg-emerald-400/50", label: "text-emerald-400/60" },
};

const fallbackCatStyle = { border: "border-[var(--border-7)]", bg: "bg-[var(--surface-2)]", dot: "bg-[var(--fg-25)]", label: "text-[var(--fg-30)]" };

function LabCard({ item, index }: { item: LabItem; index: number }) {
  const colorClass = tagColors[item.tag] ?? "text-[var(--fg-40)] border-[var(--border-7)] bg-[var(--surface-2)]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease, delay: index * 0.06 }}
      className="flex flex-col gap-4 rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] p-6 transition-all duration-300 hover:border-[var(--border-12)] hover:bg-[var(--bg-elevated)]"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-[var(--fg-80)]">
          {item.title}
        </h3>
        <span className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider ${colorClass}`}>
          {item.tag}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed text-[var(--fg-40)]">{item.longDescription}</p>
      <div className="flex flex-wrap gap-1.5 border-t border-[var(--border-5)] pt-3">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-[var(--border-7)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--fg-35)]">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function EmptyState({ comingSoon, comingSoonSub }: { comingSoon: string; comingSoonSub: string }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-[var(--border-7)] px-5 py-6">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg-15)]" />
      <p className="text-[13px] font-medium text-[var(--fg-35)]">{comingSoon}</p>
      <p className="text-[12px] leading-relaxed text-[var(--fg-22)]">{comingSoonSub}</p>
    </div>
  );
}

export function LabsShell({ label, heading, description, comingSoon, comingSoonSub, categories }: LabsShellProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-[120px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute right-1/4 top-0"
            style={{
              width: 600,
              height: 500,
              background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="flex max-w-[640px] flex-col gap-5"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
              {label}
            </span>
            <h1
              className="font-semibold leading-[1.0] tracking-[-0.04em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              {heading}
            </h1>
            <p className="text-[16px] leading-relaxed text-[var(--fg-40)]">{description}</p>
          </motion.div>
        </Container>
      </section>

      {/* Categories */}
      <Section size="sm" className="border-t border-[var(--border-5)]">
        <Container>
          <div className="flex flex-col gap-12">
            {categories.map((cat, catIndex) => {
              const cfg = categoryStyles[cat.key] ?? fallbackCatStyle;
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, ease, delay: catIndex * 0.05 }}
                >
                  <div className={`mb-5 flex items-start gap-4 rounded-xl border ${cfg.border} ${cfg.bg} px-5 py-4`}>
                    <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
                    <div className="flex flex-col gap-1">
                      <h2 className={`font-mono text-[11px] tracking-[0.18em] uppercase ${cfg.label}`}>
                        {cat.label}
                      </h2>
                      <p className="text-[13px] leading-relaxed text-[var(--fg-38)]">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {cat.items.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {cat.items.map((item, j) => (
                        <LabCard key={item.slug} item={item} index={j} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState comingSoon={comingSoon} comingSoonSub={comingSoonSub} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
