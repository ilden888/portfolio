"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const ease = [0.22, 1, 0.36, 1] as const;

interface EvolutionStep {
  title: string;
  note: string;
}

interface AboutEvolutionProps {
  t: {
    label: string;
    steps: EvolutionStep[];
  };
}

function StepNode({ isCurrent, index }: { isCurrent: boolean; index: number }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
        isCurrent
          ? "border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
          : "border-[var(--border-10)] bg-[var(--surface-2)]"
      }`}
    >
      {isCurrent ? (
        <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.9)]" />
      ) : (
        <span className="font-mono text-[10px] text-[var(--fg-25)]">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

export function AboutEvolution({ t }: AboutEvolutionProps) {
  const lastIndex = t.steps.length - 1;

  return (
    <Section className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <span className="mb-14 block font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
            {t.label}
          </span>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:flex lg:items-start">
            {t.steps.map((step, i) => {
              const isCurrent = i === lastIndex;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  className="flex flex-1 flex-col"
                >
                  {/* Track row */}
                  <div className="mb-6 flex items-center">
                    <StepNode isCurrent={isCurrent} index={i} />

                    {/* Connector */}
                    {!isCurrent && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, ease, delay: 0.2 + i * 0.1 }}
                        style={{ transformOrigin: "left" }}
                        className="ml-2 h-px flex-1 bg-gradient-to-r from-[var(--border-12)] to-transparent"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pr-6">
                    <p
                      className={`mb-1.5 text-[15px] font-semibold tracking-[-0.02em] transition-colors duration-200 ${
                        isCurrent ? "text-[var(--foreground)]" : "text-[var(--fg-55)]"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="font-mono text-[11px] leading-relaxed tracking-wide text-[var(--fg-25)]">
                      {step.note}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="flex flex-col lg:hidden">
            {t.steps.map((step, i) => {
              const isCurrent = i === lastIndex;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.09 }}
                  className="relative flex gap-6"
                >
                  {/* Spine */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`relative mt-[2px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                        isCurrent
                          ? "border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_16px_rgba(99,102,241,0.2)]"
                          : "border-[var(--border-10)] bg-[var(--surface-2)]"
                      }`}
                    >
                      {isCurrent ? (
                        <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                      ) : (
                        <span className="font-mono text-[10px] text-[var(--fg-25)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    {!isCurrent && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.09 }}
                        style={{ transformOrigin: "top" }}
                        className="mt-1 min-h-[36px] w-px flex-1 bg-gradient-to-b from-[var(--border-10)] to-transparent"
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className={`${isCurrent ? "pb-0" : "pb-8"}`}>
                    <p
                      className={`mb-1 text-[1rem] font-semibold tracking-[-0.02em] ${
                        isCurrent ? "text-[var(--foreground)]" : "text-[var(--fg-50)]"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="font-mono text-[11px] leading-relaxed tracking-wide text-[var(--fg-25)]">
                      {step.note}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
