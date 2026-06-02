"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface AboutSectionProps {
  t: {
    label: string;
    heading: string;
    bio: string;
    domains: string[];
    availability: string;
  };
}

export function AboutSection({ t }: AboutSectionProps) {
  return (
    <Section id="about" className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-10 max-w-[860px]">
            {/* Label */}
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
              {t.label}
            </span>

            {/* Heading */}
            <h2
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--foreground)] whitespace-pre-line"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)" }}
            >
              {t.heading}
            </h2>

            {/* Bio + availability row */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-16">
              <p className="text-[16px] leading-relaxed text-[var(--fg-50)] max-w-[520px]">
                {t.bio}
              </p>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                className="shrink-0 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 self-start"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="font-mono text-[11px] tracking-wider text-[var(--fg-50)]">
                  {t.availability}
                </span>
              </motion.div>
            </div>

            {/* Domain tags */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {t.domains.map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center rounded-lg border border-[var(--border-7)] bg-[var(--surface-2)] px-4 py-2 font-mono text-[12px] tracking-wide text-[var(--fg-50)]"
                >
                  {domain}
                </span>
              ))}
            </motion.div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
