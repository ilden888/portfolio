"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const ease = [0.22, 1, 0.36, 1] as const;

const principleAccents = [
  {
    bar: "bg-amber-400/40",
    hover: "hover:border-amber-400/[0.15] hover:bg-amber-400/[0.025]",
    glow: "group-hover:shadow-[0_0_40px_rgba(251,191,36,0.06)]",
  },
  {
    bar: "bg-cyan-400/40",
    hover: "hover:border-cyan-400/[0.15] hover:bg-cyan-400/[0.025]",
    glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.06)]",
  },
  {
    bar: "bg-indigo-400/50",
    hover: "hover:border-indigo-400/[0.15] hover:bg-indigo-400/[0.025]",
    glow: "group-hover:shadow-[0_0_40px_rgba(99,102,241,0.07)]",
  },
] as const;

interface Principle {
  statement: string;
  sub: string;
}

interface AboutPhilosophyProps {
  t: {
    label: string;
    principles: Principle[];
  };
}

export function AboutPhilosophy({ t }: AboutPhilosophyProps) {
  return (
    <Section className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <span className="mb-14 block font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
            {t.label}
          </span>

          <div className="flex flex-col gap-4">
            {t.principles.map((p, i) => {
              const accent = principleAccents[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.55, ease, delay: i * 0.1 }}
                  className={`group relative overflow-hidden rounded-2xl border border-[var(--border-6)] bg-[var(--surface-2)] p-8 transition-all duration-300 ${accent.hover} ${accent.glow}`}
                >
                  {/* Animated left accent bar */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease, delay: 0.12 + i * 0.1 }}
                    style={{ transformOrigin: "top" }}
                    className={`absolute left-0 bottom-6 top-6 w-[2px] rounded-full ${accent.bar}`}
                  />

                  <div className="flex flex-col gap-2 pl-3">
                    <p
                      className="font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--fg-80)]"
                      style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.45rem)" }}
                    >
                      {p.statement}
                    </p>
                    <p className="max-w-[600px] text-[13px] leading-relaxed text-[var(--fg-35)]">
                      {p.sub}
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
