"use client";

import { motion } from "framer-motion";
import { Database, LineChart, Bot, Zap } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const icons = [Database, LineChart, Bot, Zap];

const iconColors = [
  "text-[var(--fg-40)] bg-[var(--surface-3)] border-[var(--border-7)]",
  "text-cyan-400/60 bg-cyan-400/[0.04] border-cyan-400/[0.12]",
  "text-indigo-400/70 bg-indigo-400/[0.05] border-indigo-400/[0.15]",
  "text-amber-400/60 bg-amber-400/[0.04] border-amber-400/[0.12]",
];

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
    <Section className="border-t border-[var(--border-subtle)]">
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
                    className="group flex flex-col gap-5 rounded-xl border border-[var(--border-6)] bg-[var(--surface-2)] p-7 transition-all duration-300 hover:border-[var(--border-10)] hover:bg-[var(--surface-3)]"
                  >
                    {/* Icon */}
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${iconColors[i]}`}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--fg-90)]">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-[var(--fg-40)]">
                        {item.description}
                      </p>
                    </div>
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
