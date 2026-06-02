"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { type ProjectCardData } from "@/data/projects";
import { type Locale } from "@/lib/i18n/config";

const ease = [0.22, 1, 0.36, 1] as const;

interface FeaturedWorkProps {
  locale: Locale;
  projects: ProjectCardData[];
  t: {
    label: string;
    heading: string;
    description: string;
    viewAll: string;
  };
}

export function FeaturedWork({ locale, projects, t }: FeaturedWorkProps) {
  const [hero, ...rest] = projects;

  return (
    <Section id="projects" className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          {/* ── Header ── */}
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex max-w-[540px] flex-col gap-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fg-25)]">
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
              href={`/${locale}/projects`}
              className="group flex shrink-0 items-center gap-2 text-sm text-[var(--fg-40)] transition-colors duration-200 hover:text-[var(--fg-80)]"
            >
              {t.viewAll}
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* ── Grid ── */}
          <div className="flex flex-col gap-4">
            {/* Row 1: hero card (2/3) + second card (1/3) */}
            {hero && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Hero card — spans 2 columns */}
                <motion.div
                  className="md:col-span-2"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, ease }}
                >
                  <ProjectCard
                    project={hero}
                    href={`/${locale}/projects/${hero.slug}`}
                    size="lg"
                  />
                </motion.div>

                {/* Second card */}
                {rest[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, ease, delay: 0.07 }}
                  >
                    <ProjectCard
                      project={rest[0]}
                      href={`/${locale}/projects/${rest[0].slug}`}
                    />
                  </motion.div>
                )}
              </div>
            )}

            {/* Row 2: remaining cards (up to 3) */}
            {rest.length > 1 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {rest.slice(1).map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease, delay: 0.05 + i * 0.06 }}
                  >
                    <ProjectCard
                      project={project}
                      href={`/${locale}/projects/${project.slug}`}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
