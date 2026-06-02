"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { type Locale } from "@/lib/i18n/config";

interface LabItem {
  title: string;
  description: string;
  tag: string;
}

interface LabsPreviewProps {
  locale: Locale;
  t: {
    label: string;
    heading: string;
    description: string;
    items: LabItem[];
  };
}

const tagColors: Record<string, string> = {
  Research: "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  Prototype: "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  Experiment: "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
  // Russian
  "Исследование": "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  "Прототип": "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  "Эксперимент": "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
  // Spanish
  "Investigación": "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  "Prototipo": "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  "Experimento": "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
};

const fallbackTagColor = "text-[var(--fg-40)] border-[var(--border)] bg-[var(--surface-2)]";

export function LabsPreview({ locale, t }: LabsPreviewProps) {
  return (
    <Section className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex flex-col gap-5 max-w-[480px]">
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
              <Link
                href={`/${locale}/lab`}
                className="group flex items-center gap-2 shrink-0 text-sm text-[var(--fg-30)] hover:text-[var(--fg-70)] transition-colors duration-200"
              >
                View Lab
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Lab items */}
            <div className="flex flex-col divide-y divide-[var(--border-subtle)]">
              {t.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  className="group flex flex-col sm:flex-row sm:items-start justify-between gap-4 py-6 cursor-default"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-7)] bg-[var(--surface-2)]">
                      <FlaskConical size={14} className="text-[var(--fg-30)]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[15px] font-medium text-[var(--fg-80)] group-hover:text-[var(--foreground)] transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-[var(--fg-35)] max-w-[480px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {/* Tag */}
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider ${
                      tagColors[item.tag] ?? fallbackTagColor
                    }`}
                  >
                    {item.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
