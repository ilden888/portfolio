"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { PipelineDiagram, type PipelineStep } from "@/components/architecture";

const ease = [0.22, 1, 0.36, 1] as const;

interface ArchitecturePreview {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  steps: PipelineStep[];
}

interface FeaturedArchitecturesProps {
  locale: string;
  architectures: ArchitecturePreview[];
  t: {
    label: string;
    heading: string;
    description: string;
    viewAll: string;
  };
}

function ArchCard({
  arch,
  index,
}: {
  arch: ArchitecturePreview;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.08 }}
      className="flex flex-col gap-6 rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] p-6"
    >
      {/* Info */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[15px] font-semibold tracking-[-0.015em] text-[var(--fg-75)]">
          {arch.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-[var(--fg-38)]">
          {arch.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {arch.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--border-7)] px-2 py-0.5 font-mono text-[10px] text-[var(--fg-30)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Diagram */}
      <div className="border-t border-[var(--border-subtle)] pt-5">
        <PipelineDiagram steps={arch.steps} className="max-w-full" />
      </div>
    </motion.div>
  );
}

export function FeaturedArchitectures({ locale, architectures, t }: FeaturedArchitecturesProps) {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease }}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-30)]"
              >
                {t.label}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease, delay: 0.05 }}
                className="text-[28px] font-semibold tracking-[-0.025em] text-[var(--foreground)]"
              >
                {t.heading}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.08 }}
                className="max-w-[480px] text-[14px] leading-relaxed text-[var(--fg-40)]"
              >
                {t.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease, delay: 0.12 }}
            >
              <Link
                href={`/${locale}/architectures`}
                className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-[var(--fg-35)] transition-all duration-200 hover:gap-3 hover:text-[var(--fg-70)]"
              >
                {t.viewAll}
                <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>

          {/* Architecture cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {architectures.slice(0, 2).map((arch, i) => (
              <ArchCard key={arch.slug} arch={arch} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
