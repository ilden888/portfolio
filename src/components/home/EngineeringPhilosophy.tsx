"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const ease = [0.22, 1, 0.36, 1] as const;

const pillarAccents = [
  {
    bar: "bg-amber-400/40",
    num: "text-amber-400/40",
    hover: "hover:border-amber-400/20 hover:bg-amber-400/[0.03]",
  },
  {
    bar: "bg-cyan-400/40",
    num: "text-cyan-400/40",
    hover: "hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]",
  },
  {
    bar: "bg-indigo-400/50",
    num: "text-indigo-400/50",
    hover: "hover:border-indigo-400/20 hover:bg-indigo-400/[0.03]",
  },
  {
    bar: "bg-emerald-400/40",
    num: "text-emerald-400/40",
    hover: "hover:border-emerald-400/20 hover:bg-emerald-400/[0.03]",
  },
] as const;

interface PhilosophyPillar {
  title: string;
  body: string;
}

interface EngineeringPhilosophyProps {
  t: {
    label: string;
    axiom: string;
    axiomSub: string;
    pillars: PhilosophyPillar[];
  };
}

export function EngineeringPhilosophy({ t }: EngineeringPhilosophyProps) {
  return (
    <Section id="philosophy" className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          {/* Section label */}
          <span className="mb-14 block font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
            {t.label}
          </span>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">

            {/* ── Left: Axiom ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease }}
              className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start"
            >
              {/* Accent bar */}
              <div className="h-px w-12 bg-indigo-400/50" />

              {/* Axiom statement */}
              <p
                className="font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--foreground)]"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
              >
                {t.axiom}
              </p>

              {/* Sub-line */}
              <p className="max-w-[300px] text-[14px] leading-relaxed text-[var(--fg-35)]">
                {t.axiomSub}
              </p>
            </motion.div>

            {/* ── Right: Pillars ── */}
            <div className="flex flex-col gap-3">
              {t.pillars.map((pillar, i) => {
                const accent = pillarAccents[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                    className={`group relative flex gap-5 rounded-xl border border-[var(--border-6)] bg-[var(--surface-2)] p-6 transition-all duration-300 ${accent.hover}`}
                  >
                    {/* Animated left accent bar */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.08 }}
                      style={{ transformOrigin: "top" }}
                      className={`absolute left-0 top-4 bottom-4 w-[2px] rounded-full ${accent.bar}`}
                    />

                    {/* Number */}
                    <span
                      className={`mt-[3px] shrink-0 font-mono text-[11px] font-medium tracking-wider transition-opacity duration-200 group-hover:opacity-70 ${accent.num}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Text */}
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.015em] text-[var(--fg-80)]">
                        {pillar.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-[var(--fg-40)]">
                        {pillar.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
