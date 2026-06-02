"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const ease = [0.22, 1, 0.36, 1] as const;

interface AboutVisionProps {
  t: {
    label: string;
    heading: string;
    text: string;
    cta: string;
  };
  email: string;
}

export function AboutVision({ t, email }: AboutVisionProps) {
  return (
    <Section size="lg" className="relative border-t border-[var(--border-subtle)] overflow-hidden">
      {/* Subtle glow behind content */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: 700,
            height: 500,
            background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <Container variant="narrow">
        <FadeIn>
          <div className="flex flex-col gap-10">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
              {t.label}
            </span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease }}
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)" }}
            >
              {t.heading.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.heading.split("\n").length - 1 && <br />}
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
              className="border-l-2 border-indigo-500/30 pl-6 text-[16px] leading-relaxed text-[var(--fg-45)]"
            >
              {t.text}
            </motion.p>

            <motion.a
              href={`mailto:${email}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.2 }}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-2.5 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-90"
            >
              <Mail size={14} />
              {t.cta}
            </motion.a>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
