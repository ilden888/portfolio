"use client";

import { motion } from "framer-motion";
import { ContentPreviewCard, type ContentPreview } from "@/components/content/ContentPreviewCard";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface FeaturedWorkProps {
  t: {
    label: string;
    heading: string;
    description: string;
    comingSoon: string;
    items: ContentPreview[];
  };
}

export function FeaturedWork({ t }: FeaturedWorkProps) {
  return (
    <Section id="projects" className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-12">
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

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6">
              {t.items.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                  className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}
                >
                  <ContentPreviewCard item={project} status={t.comingSoon} />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
