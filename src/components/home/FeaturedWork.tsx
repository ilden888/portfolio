"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { type Locale } from "@/lib/i18n/config";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
}

interface FeaturedWorkProps {
  locale: Locale;
  t: {
    label: string;
    heading: string;
    description: string;
    comingSoon: string;
    viewAll: string;
    items: Project[];
  };
}

const accentColors = [
  "from-indigo-500/10 to-transparent",
  "from-violet-500/8 to-transparent",
  "from-cyan-500/8 to-transparent",
  "from-indigo-400/6 to-transparent",
  "from-purple-500/8 to-transparent",
];

export function FeaturedWork({ locale, t }: FeaturedWorkProps) {
  const featured = t.items.slice(0, 3);
  const rest = t.items.slice(3);

  return (
    <Section className="border-t border-white/[0.04]">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex flex-col gap-5 max-w-[480px]">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/25">
                  {t.label}
                </span>
                <h2
                  className="font-semibold leading-[1.1] tracking-[-0.03em] text-white"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                >
                  {t.heading}
                </h2>
                <p className="text-[15px] leading-relaxed text-white/40">{t.description}</p>
              </div>
              <Link
                href={`/${locale}/projects`}
                className="group flex items-center gap-2 shrink-0 text-sm text-white/30 hover:text-white/70 transition-colors duration-200"
              >
                {t.viewAll}
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Featured grid — 3 primary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {featured.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                >
                  <div className="group relative flex flex-col gap-5 rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 overflow-hidden cursor-default hover:border-white/[0.1] hover:bg-white/[0.025] transition-all duration-300 h-full">
                    {/* Gradient accent */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${accentColors[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="relative flex flex-col gap-4 flex-1">
                      {/* Top row */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25">
                          {project.category}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-white/30">
                          {t.comingSoon}
                        </span>
                      </div>
                      {/* Title */}
                      <h3 className="text-base font-semibold tracking-[-0.01em] text-white/90 leading-snug">
                        {project.title}
                      </h3>
                      {/* Description */}
                      <p className="text-[13px] leading-relaxed text-white/35 flex-1">
                        {project.description}
                      </p>
                    </div>
                    {/* Tags */}
                    <div className="relative flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-white/35"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rest — 2 smaller horizontal cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rest.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                >
                  <div className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.05] bg-white/[0.01] px-5 py-4 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-200 cursor-default">
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/20">
                        {project.category}
                      </span>
                      <span className="text-sm font-medium text-white/70 truncate">{project.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="hidden sm:inline-flex font-mono text-[11px] text-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                      <ArrowUpRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
