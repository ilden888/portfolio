"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface AboutSectionProps {
  t: {
    label: string;
    statement: string;
    description: string;
    expertise: string[];
  };
}

export function AboutSection({ t }: AboutSectionProps) {
  return (
    <Section className="border-t border-white/[0.04]">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-start">
            {/* Left — statement */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/25">
                {t.label}
              </span>
              <p
                className="font-semibold leading-[1.15] tracking-[-0.02em] text-white"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
              >
                {t.statement}
              </p>
              <p className="max-w-[480px] text-[15px] leading-relaxed text-white/40">
                {t.description}
              </p>
            </div>

            {/* Right — expertise list */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="flex flex-col gap-2 md:min-w-[200px]"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20 mb-2">
                Focus Areas
              </span>
              {t.expertise.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5">
                  <span className="h-px w-4 bg-white/20 shrink-0" />
                  <span className="text-sm text-white/50 whitespace-nowrap">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
