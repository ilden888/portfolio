"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface CurrentFocusProps {
  t: {
    label: string;
    heading: string;
    items: string[];
  };
}

export function CurrentFocus({ t }: CurrentFocusProps) {
  return (
    <Section size="sm" className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 items-start">
            {/* Left label */}
            <div className="flex flex-col gap-2 shrink-0 sm:w-[180px]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
                  {t.label}
                </span>
              </div>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--fg-60)]">
                {t.heading}
              </h2>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-0 flex-1">
              {t.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  className="flex items-start gap-3 py-3 border-b border-[var(--border-subtle)] last:border-0"
                >
                  <span className="font-mono text-[11px] text-[var(--fg-20)] mt-0.5 shrink-0 w-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] text-[var(--fg-50)] leading-snug">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
