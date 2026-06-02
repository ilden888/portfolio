"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const ease = [0.22, 1, 0.36, 1] as const;

interface JourneyStep {
  title: string;
  note: string;
}

interface ProfessionalJourneyProps {
  t: {
    label: string;
    current: string;
    company: string;
    role: string;
    responsibilities: string[];
    evolutionLabel: string;
    steps: JourneyStep[];
  };
}

export function ProfessionalJourney({ t }: ProfessionalJourneyProps) {
  const lastIndex = t.steps.length - 1;

  return (
    <Section id="journey" className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          {/* Section label */}
          <span className="mb-14 block font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
            {t.label}
          </span>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">

            {/* ── Left: Current Role ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-col gap-6"
            >
              {/* Company card */}
              <div className="rounded-2xl border border-[var(--border-10)] bg-[var(--surface-2)] p-6 backdrop-blur-sm">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-25)]">
                      {t.current}
                    </span>
                    <p className="text-[13px] font-medium text-[var(--fg-40)]">{t.company}</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-3)] px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    <span className="font-mono text-[10px] tracking-wider text-[var(--fg-40)]">Active</span>
                  </div>
                </div>

                {/* Role title */}
                <h3 className="mb-6 text-[1.35rem] font-semibold leading-tight tracking-[-0.025em] text-[var(--foreground)]">
                  {t.role}
                </h3>

                {/* Divider */}
                <div className="mb-5 h-px bg-[var(--border-subtle)]" />

                {/* Responsibilities */}
                <ul className="flex flex-col gap-2.5">
                  {t.responsibilities.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, ease, delay: 0.05 + i * 0.055 }}
                      className="flex items-center gap-3"
                    >
                      <span className="h-px w-3 shrink-0 bg-[var(--border-20)]" />
                      <span className="text-[13px] leading-snug text-[var(--fg-50)]">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Right: Career Evolution ── */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-25)]">
                {t.evolutionLabel}
              </span>

              <div className="relative flex flex-col">
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
                      {/* Timeline spine */}
                      <div className="flex flex-col items-center">
                        {/* Node */}
                        <div
                          className={`relative mt-[2px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
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

                        {/* Connector */}
                        {!isCurrent && (
                          <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.09 }}
                            style={{ transformOrigin: "top" }}
                            className="mt-1 w-px flex-1 bg-gradient-to-b from-[var(--border-10)] to-transparent"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className={`pb-8 ${isCurrent ? "pb-0" : ""}`}>
                        <p
                          className={`mb-1 text-[1rem] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-200 ${
                            isCurrent ? "text-[var(--foreground)]" : "text-[var(--fg-50)]"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="font-mono text-[11px] leading-relaxed tracking-wide text-[var(--fg-25)]">
                          {step.note}
                        </p>

                        {/* Arrow label between steps */}
                        {!isCurrent && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--fg-15)]">
                              →
                            </span>
                          </div>
                        )}
                      </div>
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
