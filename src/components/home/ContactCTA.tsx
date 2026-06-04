"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

interface ContactCTAProps {
  t: {
    label: string;
    heading: string;
    description: string;
    email: string;
    linkedin: string;
  };
}

export function ContactCTA({ t }: ContactCTAProps) {
  return (
    <Section id="contact" className="border-t border-[var(--border-subtle)]">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border-7)] bg-[var(--surface-2)] px-8 py-16 md:px-16 md:py-20 text-center">

          {/* Glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 600,
                height: 600,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <div
              className="absolute top-0 left-[10%] right-[10%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
              {t.label}
            </span>
            <h2
              className="font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {t.heading}
            </h2>
            <p className="max-w-[400px] text-[15px] leading-relaxed text-[var(--fg-40)]">
              {t.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
              <a
                href="mailto:deniks.il88@gmail.com"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-all duration-200 hover:opacity-90"
              >
                <Mail size={14} />
                {t.email}
              </a>
              <a
                href="https://www.linkedin.com/in/denis-iliushchikhin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-10)] bg-[var(--surface-3)] px-6 py-2.5 text-sm font-medium text-[var(--fg-60)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--border-20)] hover:text-[var(--fg-90)]"
              >
                {t.linkedin}
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
