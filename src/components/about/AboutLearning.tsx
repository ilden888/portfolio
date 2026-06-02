"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const ease = [0.22, 1, 0.36, 1] as const;

interface AboutLearningProps {
  t: {
    label: string;
    intro: string;
    topics: string[];
  };
}

export function AboutLearning({ t }: AboutLearningProps) {
  return (
    <Section className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:items-start">
            {/* Left: label + intro */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
                {t.label}
              </span>
              <p className="text-[15px] leading-relaxed text-[var(--fg-40)]">{t.intro}</p>
            </div>

            {/* Right: topic pills */}
            <div className="flex flex-wrap gap-3">
              {t.topics.map((topic, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-5 py-2.5 transition-all duration-200 hover:border-indigo-500/30 hover:bg-indigo-500/[0.05]"
                >
                  <span className="h-1 w-1 rounded-full bg-indigo-400/60" />
                  <span className="text-[13px] font-medium text-[var(--fg-55)]">{topic}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
