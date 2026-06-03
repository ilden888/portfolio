"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const ease = [0.22, 1, 0.36, 1] as const;

interface RoadmapItem {
  name: string;
  note: string;
}

interface RoadmapStage {
  label: string;
  sublabel: string;
  description: string;
  items: RoadmapItem[];
}

interface RoadmapShellProps {
  eyebrow: string;
  title: string;
  description: string;
  philosophy: string;
  stages: {
    current: RoadmapStage;
    learning: RoadmapStage;
    future: RoadmapStage;
  };
}

const stageConfig = {
  current: {
    dot: "bg-emerald-400/80",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/[0.04]",
    tagColor: "text-emerald-400/60",
    tagBorder: "border-emerald-500/25",
    labelColor: "text-emerald-300/90",
    connectorColor: "from-emerald-500/25 to-emerald-500/10",
  },
  learning: {
    dot: "bg-amber-400/80",
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.04]",
    tagColor: "text-amber-400/60",
    tagBorder: "border-amber-500/25",
    labelColor: "text-amber-300/90",
    connectorColor: "from-amber-500/25 to-amber-500/10",
  },
  future: {
    dot: "bg-violet-400/70",
    border: "border-violet-500/20",
    bg: "bg-violet-500/[0.04]",
    tagColor: "text-violet-400/60",
    tagBorder: "border-violet-500/25",
    labelColor: "text-violet-300/90",
    connectorColor: "from-violet-500/20 to-violet-500/08",
  },
} as const;

type StageKey = keyof typeof stageConfig;

function StageCard({
  stageKey,
  stage,
  index,
  isLast,
}: {
  stageKey: StageKey;
  stage: RoadmapStage;
  index: number;
  isLast: boolean;
}) {
  const cfg = stageConfig[stageKey];

  return (
    <div className="flex gap-6">
      {/* Timeline column */}
      <div className="flex shrink-0 flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease, delay: index * 0.08 }}
          className={`h-3 w-3 rounded-full border-2 ${cfg.border} ${cfg.dot} mt-5`}
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: index * 0.08 + 0.2 }}
            style={{ transformOrigin: "top" }}
            className={`mt-2 w-px flex-1 min-h-[60px] bg-gradient-to-b ${cfg.connectorColor}`}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, ease, delay: index * 0.08 + 0.04 }}
        className={`mb-10 flex-1 rounded-xl border ${cfg.border} ${cfg.bg} overflow-hidden`}
      >
        {/* Header */}
        <div className={`flex items-center gap-3 border-b border-[var(--border-5)] px-5 py-3`}>
          <span className={`font-mono text-[10px] tracking-[0.18em] uppercase ${cfg.tagColor}`}>
            {stage.sublabel}
          </span>
          <span className={`text-[14px] font-semibold tracking-[-0.015em] ${cfg.labelColor}`}>
            {stage.label}
          </span>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--fg-38)]">{stage.description}</p>
          <div className="flex flex-col gap-2.5">
            {stage.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease, delay: index * 0.08 + i * 0.04 + 0.1 }}
                className="flex items-start gap-3"
              >
                <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-[12px] font-semibold text-[var(--fg-60)]">
                    {item.name}
                  </span>
                  <span className="ml-2 text-[12px] leading-relaxed text-[var(--fg-30)]">
                    — {item.note}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function RoadmapShell({
  eyebrow,
  title,
  description,
  philosophy,
  stages,
}: RoadmapShellProps) {
  const stageEntries: { key: StageKey; stage: RoadmapStage }[] = [
    { key: "current", stage: stages.current },
    { key: "learning", stage: stages.learning },
    { key: "future", stage: stages.future },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-[120px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute right-1/4 top-0 h-[400px] w-[600px]"
            style={{
              background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)",
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

      {/* ── Philosophy block ── */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mb-12 rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] px-6 py-5"
        >
          <p className="text-[14px] leading-relaxed text-[var(--fg-45)] italic">
            {philosophy}
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="max-w-[680px] pb-24">
          {stageEntries.map(({ key, stage }, i) => (
            <StageCard
              key={key}
              stageKey={key}
              stage={stage}
              index={i}
              isLast={i === stageEntries.length - 1}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
