"use client";

import { motion } from "framer-motion";
import { Database, LineChart, Bot, Zap } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { FeatureCard } from "@/components/content/FeatureCard";

const icons = [Database, LineChart, Bot, Zap];
const accents = ["neutral", "cyan", "indigo", "amber"] as const;

interface WhatIBuildItem {
  title: string;
  description: string;
}

interface WhatIBuildProps {
  t: {
    label: string;
    items: WhatIBuildItem[];
  };
}

export function WhatIBuild({ t }: WhatIBuildProps) {
  return (
    <Section id="build" className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-12">
            {/* Header */}
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
              {t.label}
            </span>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {t.items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                      delay: i * 0.06,
                    }}
                  >
                    <FeatureCard
                      title={item.title}
                      description={item.description}
                      icon={Icon}
                      accent={accents[i]}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
