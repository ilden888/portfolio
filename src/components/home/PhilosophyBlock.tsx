"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface PhilosophyBlockProps {
  t: {
    label: string;
    heading: string;
    description: string;
    traditional: { label: string; flow: string[] };
    ainative: { label: string; flow: string[] };
  };
}

function FlowNode({
  label,
  accent,
  delay,
  isLast,
}: {
  label: string;
  accent?: boolean;
  delay: number;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
        className={`w-full rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-colors ${
          accent
            ? "border-indigo-500/30 bg-indigo-500/[0.07] text-[var(--foreground)]"
            : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--fg-50)]"
        }`}
      >
        {label}
      </motion.div>
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
          style={{ transformOrigin: "top" }}
          className={`h-6 w-px ${accent ? "bg-indigo-500/30" : "bg-[var(--border-7)]"}`}
        />
      )}
    </div>
  );
}

export function PhilosophyBlock({ t }: PhilosophyBlockProps) {
  return (
    <Section className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-16">
            {/* Header */}
            <div className="flex flex-col gap-5 max-w-[520px]">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
                {t.label}
              </span>
              <h2
                className="font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--foreground)]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {t.heading}
              </h2>
              <p className="text-[15px] leading-relaxed text-[var(--fg-40)]">{t.description}</p>
            </div>

            {/* Flow diagrams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {/* Traditional */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--fg-20)]">
                  {t.traditional.label}
                </span>
                <div className="flex flex-col">
                  {t.traditional.flow.map((step, i) => (
                    <FlowNode
                      key={step}
                      label={step}
                      delay={0.05 * i}
                      isLast={i === t.traditional.flow.length - 1}
                    />
                  ))}
                </div>
              </div>

              {/* AI-Native */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-indigo-400/60">
                  {t.ainative.label}
                </span>
                <div className="flex flex-col">
                  {t.ainative.flow.map((step, i) => (
                    <FlowNode
                      key={step}
                      label={step}
                      accent
                      delay={0.07 * i + 0.1}
                      isLast={i === t.ainative.flow.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
