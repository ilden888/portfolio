"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const ease = [0.22, 1, 0.36, 1] as const;

const focusAccents = [
  {
    dot: "bg-cyan-400/70",
    border: "border-cyan-400/[0.12]",
    bg: "bg-cyan-400/[0.025]",
    hover: "hover:border-cyan-400/25 hover:bg-cyan-400/[0.05]",
  },
  {
    dot: "bg-indigo-400/70",
    border: "border-indigo-400/[0.12]",
    bg: "bg-indigo-400/[0.025]",
    hover: "hover:border-indigo-400/25 hover:bg-indigo-400/[0.05]",
  },
  {
    dot: "bg-amber-400/70",
    border: "border-amber-400/[0.12]",
    bg: "bg-amber-400/[0.025]",
    hover: "hover:border-amber-400/25 hover:bg-amber-400/[0.05]",
  },
  {
    dot: "bg-emerald-400/70",
    border: "border-emerald-400/[0.12]",
    bg: "bg-emerald-400/[0.025]",
    hover: "hover:border-emerald-400/25 hover:bg-emerald-400/[0.05]",
  },
] as const;

interface AboutBackgroundProps {
  t: {
    label: string;
    current: string;
    company: string;
    role: string;
    focusLabel: string;
    focus: string[];
    story?: string;
  };
}

export function AboutBackground({ t }: AboutBackgroundProps) {
  return (
    <Section className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <span className="mb-14 block font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
            {t.label}
          </span>

          {t.story && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.65, ease }}
              className="mb-12 max-w-[700px] border-l-2 border-indigo-500/25 pl-5 text-[15px] leading-relaxed text-[var(--fg-40)]"
            >
              {t.story}
            </motion.p>
          )}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            {/* Current Role Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col justify-between gap-8 rounded-2xl border border-[var(--border-10)] bg-[var(--surface-2)] p-7 backdrop-blur-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-25)]">
                    {t.current}
                  </span>
                  <p className="text-[13px] font-medium text-[var(--fg-40)]">{t.company}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-3)] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span className="font-mono text-[10px] tracking-wider text-[var(--fg-40)]">Active</span>
                </div>
              </div>

              {/* Role title */}
              <h3
                className="font-semibold leading-tight tracking-[-0.025em] text-[var(--foreground)]"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)" }}
              >
                {t.role}
              </h3>
            </motion.div>

            {/* Focus Areas */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-25)]">
                {t.focusLabel}
              </span>
              <div className="grid grid-cols-2 gap-3">
                {t.focus.map((area, i) => {
                  const accent = focusAccents[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: i * 0.07 }}
                      className={`flex items-center gap-3 rounded-xl border ${accent.border} ${accent.bg} ${accent.hover} px-5 py-4 transition-all duration-200`}
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />
                      <span className="text-[14px] font-medium text-[var(--fg-60)]">{area}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
