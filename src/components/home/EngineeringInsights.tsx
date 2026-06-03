"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { type InsightCardData } from "@/data/insights";

const ease = [0.22, 1, 0.36, 1] as const;

interface EngineeringInsightsProps {
  locale: string;
  articles: InsightCardData[];
  t: {
    label: string;
    heading: string;
    description: string;
    viewAll: string;
    readTime: string;
  };
}

function InsightCard({
  article,
  locale,
  readTimeLabel,
  index,
}: {
  article: InsightCardData;
  locale: string;
  readTimeLabel: string;
  index: number;
}) {
  const href = `/${locale}/insights/${article.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.07 }}
    >
      <Link href={href} className="group block rounded-xl border border-[var(--border-7)] bg-[var(--surface-2)] p-6 transition-all duration-300 hover:border-[var(--border-10)] hover:bg-[var(--surface-3)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--fg-20)]">
              {article.date}
            </span>
            <span className="font-mono text-[10px] tracking-wide text-[var(--fg-20)]">
              {article.readTime} {readTimeLabel}
            </span>
          </div>

          <h3 className="text-[15px] font-semibold tracking-[-0.015em] leading-snug text-[var(--fg-75)] transition-colors duration-200 group-hover:text-[var(--foreground)]">
            {article.title}
          </h3>

          <p className="text-[13px] leading-relaxed text-[var(--fg-38)]">
            {article.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border-7)] px-2 py-0.5 font-mono text-[10px] text-[var(--fg-30)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--fg-30)] transition-all duration-200 group-hover:gap-2.5 group-hover:text-[var(--fg-60)]">
            <span>Read</span>
            <ArrowRight size={10} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function EngineeringInsights({ locale, articles, t }: EngineeringInsightsProps) {
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
                href={`/${locale}/insights`}
                className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-[var(--fg-35)] transition-all duration-200 hover:gap-3 hover:text-[var(--fg-70)]"
              >
                {t.viewAll}
                <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article, i) => (
              <InsightCard
                key={article.slug}
                article={article}
                locale={locale}
                readTimeLabel={t.readTime}
                index={i}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
