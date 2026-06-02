"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

interface TechItem {
  name: string;
  category: "data" | "ai" | "orchestration";
}

const techStack: TechItem[] = [
  { name: "PostgreSQL",     category: "data" },
  { name: "ClickHouse",     category: "data" },
  { name: "DuckDB",         category: "data" },
  { name: "Apache Iceberg", category: "data" },
  { name: "S3",             category: "data" },
  { name: "Airflow",        category: "orchestration" },
  { name: "dbt",            category: "orchestration" },
  { name: "Kafka",          category: "orchestration" },
  { name: "OpenAI",         category: "ai" },
  { name: "Claude",         category: "ai" },
  { name: "LangChain",      category: "ai" },
  { name: "RAG",            category: "ai" },
];

const groups: { key: "data" | "ai" | "orchestration"; color: string; dot: string }[] = [
  { key: "data",          color: "text-white/50 border-white/[0.08] bg-white/[0.02]",                   dot: "bg-white/30" },
  { key: "orchestration", color: "text-amber-400/70 border-amber-400/[0.15] bg-amber-400/[0.04]",       dot: "bg-amber-400/70" },
  { key: "ai",            color: "text-indigo-400/80 border-indigo-400/[0.2] bg-indigo-400/[0.05]",     dot: "bg-indigo-400" },
];

interface TechStackProps {
  t: {
    label: string;
    heading: string;
    description: string;
    categories: { data: string; ai: string; orchestration: string };
  };
}

export function TechStack({ t }: TechStackProps) {
  return (
    <Section className="border-t border-white/[0.04]">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-12">
            {/* Header */}
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

            {/* Grouped rows */}
            <div className="flex flex-col gap-8">
              {groups.map(({ key, color, dot }, gi) => {
                const items = techStack.filter((t) => t.category === key);
                return (
                  <div key={key} className="flex flex-col gap-3">
                    {/* Category label */}
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25">
                        {t.categories[key]}
                      </span>
                    </div>
                    {/* Items */}
                    <div className="flex flex-wrap gap-2">
                      {items.map((tech, i) => (
                        <motion.span
                          key={tech.name}
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
                          {tech.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
