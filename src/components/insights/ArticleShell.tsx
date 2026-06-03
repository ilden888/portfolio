"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { type InsightCardData, type ArticleSection } from "@/data/insights";

const ease = [0.22, 1, 0.36, 1] as const;

interface ArticleShellProps {
  article: InsightCardData;
  sections: ArticleSection[];
  backHref: string;
  backLabel: string;
  readTimeLabel: string;
}

// ── Section renderers ─────────────────────────────────────────────────────────

function ProseSection({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[15px] leading-relaxed text-[var(--fg-50)]">
          {p}
        </p>
      ))}
    </div>
  );
}

function KeyPointsSection({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/60" />
          <span className="text-[14px] leading-relaxed text-[var(--fg-45)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TakeawaySection({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/[0.04] px-6 py-6">
      <p className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-indigo-300/90">
        {heading}
      </p>
      <p className="mt-3 text-[13px] leading-relaxed text-[var(--fg-45)]">{body}</p>
    </div>
  );
}

function renderSection(section: ArticleSection) {
  switch (section.type) {
    case "prose":
      return <ProseSection paragraphs={section.paragraphs ?? []} />;
    case "key-points":
      return <KeyPointsSection items={section.items ?? []} />;
    case "takeaway":
      return <TakeawaySection heading={section.heading ?? ""} body={section.body ?? ""} />;
    default:
      return null;
  }
}

function SectionBlock({ section, index }: { section: ArticleSection; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.04 }}
      className="border-t border-[var(--border-subtle)] py-10"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
        {section.title && (
          <div className="flex shrink-0 flex-col gap-1 sm:w-[200px]">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--fg-20)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--fg-60)]">
              {section.title}
            </h2>
          </div>
        )}
        <div className="flex-1">{renderSection(section)}</div>
      </div>
    </motion.div>
  );
}

// ── Shell ─────────────────────────────────────────────────────────────────────

export function ArticleShell({
  article,
  sections,
  backHref,
  backLabel,
  readTimeLabel,
}: ArticleShellProps) {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-[120px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/4 top-0 h-[500px] w-[700px]"
            style={{
              background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-12"
          >
            <Link
              href={backHref}
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-[var(--fg-30)] transition-colors duration-200 hover:text-[var(--fg-70)]"
            >
              <ArrowLeft
                size={12}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              {backLabel}
            </Link>
          </motion.div>

          <div className="flex max-w-[760px] flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.05 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-30)]">
                Engineering Insights
              </span>
              <span className="h-px w-4 bg-[var(--border-10)]" />
              <span className="font-mono text-[11px] tracking-wide text-[var(--fg-25)]">
                {article.readTime} {readTimeLabel}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.1 }}
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {article.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 }}
              className="text-[16px] leading-relaxed text-[var(--fg-45)]"
            >
              {article.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-[var(--border-7)] bg-[var(--surface-2)] px-3 py-1 font-mono text-[12px] text-[var(--fg-40)]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Sections ── */}
      <Container>
        <div className="pb-24">
          {sections.map((section, i) => (
            <SectionBlock key={section.key} section={section} index={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
