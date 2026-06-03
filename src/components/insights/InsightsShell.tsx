"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { type InsightCardData } from "@/data/insights";

const ease = [0.22, 1, 0.36, 1] as const;

interface InsightsShellProps {
  locale: string;
  articles: InsightCardData[];
  t: {
    label: string;
    heading: string;
    description: string;
    readTime: string;
  };
}

function ArticleCard({
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
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      className="border-t border-[var(--border-subtle)] py-10"
    >
      <Link href={href} className="group block">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-16">
          {/* Left: meta */}
          <div className="flex shrink-0 flex-col gap-2 sm:w-[200px]">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-20)]">
              {article.date}
            </span>
            <span className="font-mono text-[10px] tracking-wide text-[var(--fg-20)]">
              {article.readTime} {readTimeLabel}
            </span>
          </div>

          {/* Right: content */}
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-[18px] font-semibold tracking-[-0.02em] leading-snug text-[var(--fg-80)] transition-colors duration-200 group-hover:text-[var(--foreground)]">
              {article.title}
            </h2>
            <p className="text-[14px] leading-relaxed text-[var(--fg-40)]">
              {article.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[var(--border-7)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg-35)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-mono text-[var(--fg-30)] transition-all duration-200 group-hover:text-[var(--fg-70)] group-hover:gap-2.5">
              <span>Read article</span>
              <ArrowRight size={11} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function InsightsShell({ locale, articles, t }: InsightsShellProps) {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-[120px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/4 top-0 h-[400px] w-[600px]"
            style={{
              background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
        <Container>
          <div className="max-w-[680px]">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-30)]"
            >
              {t.label}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.06 }}
              className="mt-3 font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
            >
              {t.heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.12 }}
              className="mt-4 text-[15px] leading-relaxed text-[var(--fg-45)]"
            >
              {t.description}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ── Articles ── */}
      <Container>
        <div className="pb-24">
          {articles.map((article, i) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              readTimeLabel={t.readTime}
              index={i}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
