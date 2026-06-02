"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface TechGroup {
  key: "dataEng" | "lakehouse" | "ai" | "analytics";
  items: string[];
  color: string;
  dot: string;
}

const techGroups: TechGroup[] = [
  {
    key: "dataEng",
    items: ["PostgreSQL", "ClickHouse", "Airflow", "DBT", "Kafka"],
    color: "text-[var(--fg-50)] border-[var(--border)] bg-[var(--surface-2)]",
    dot: "bg-[var(--fg-30)]",
  },
  {
    key: "lakehouse",
    items: ["S3", "Apache Iceberg", "DuckDB", "Parquet"],
    color: "text-cyan-400/70 border-cyan-400/[0.15] bg-cyan-400/[0.04]",
    dot: "bg-cyan-400/70",
  },
  {
    key: "analytics",
    items: ["Metabase", "Power BI"],
    color: "text-amber-400/70 border-amber-400/[0.15] bg-amber-400/[0.04]",
    dot: "bg-amber-400/70",
  },
  {
    key: "ai",
    items: ["OpenAI", "Claude", "LangChain", "RAG"],
    color: "text-indigo-400/80 border-indigo-400/[0.2] bg-indigo-400/[0.05]",
    dot: "bg-indigo-400",
  },
];

interface TechStackProps {
  t: {
    label: string;
    heading: string;
    description: string;
    categories: {
      dataEng: string;
      lakehouse: string;
      ai: string;
      analytics: string;
    };
  };
}

export function TechStack({ t }: TechStackProps) {
  return (
    <Section id="stack" className="border-t border-[var(--border-subtle)]">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-12">
            {/* Header */}
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

            {/* Groups */}
            <div className="flex flex-col gap-8">
              {techGroups.map(({ key, items, color, dot }, gi) => (
                <div key={key} className="flex flex-col gap-3">
                  {/* Category label */}
                  <div className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--fg-25)]">
                      {t.categories[key]}
                    </span>
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2">
                    {items.map((name, i) => (
                      <motion.span
                        key={name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                          delay: gi * 0.04 + i * 0.04,
                        }}
                        className={`inline-flex rounded-lg border px-3.5 py-1.5 font-mono text-[13px] font-medium transition-colors duration-200 hover:brightness-125 ${color}`}
                      >
                        {name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
