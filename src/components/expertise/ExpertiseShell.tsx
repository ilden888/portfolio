"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const ease = [0.22, 1, 0.36, 1] as const;

interface Domain {
  key: string;
  label: string;
  description: string;
  capabilities: string[];
}

interface ExpertiseShellProps {
  label: string;
  heading: string;
  description: string;
  domains: Domain[];
}

const domainStyles: Record<string, { border: string; bg: string; dot: string; accent: string; numColor: string }> = {
  dataEngineering: {
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/[0.04]",
    dot: "bg-cyan-400/70",
    accent: "text-cyan-300/85",
    numColor: "text-cyan-400/40",
  },
  analyticsEngineering: {
    border: "border-violet-500/20",
    bg: "bg-violet-500/[0.04]",
    dot: "bg-violet-400/70",
    accent: "text-violet-300/85",
    numColor: "text-violet-400/40",
  },
  dataPlatforms: {
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/[0.05]",
    dot: "bg-indigo-400/70",
    accent: "text-indigo-300/85",
    numColor: "text-indigo-400/40",
  },
  aiSystems: {
    border: "border-rose-500/20",
    bg: "bg-rose-500/[0.04]",
    dot: "bg-rose-400/70",
    accent: "text-rose-300/85",
    numColor: "text-rose-400/40",
  },
};

const fallbackStyle = {
  border: "border-[var(--border-10)]",
  bg: "bg-[var(--surface-2)]",
  dot: "bg-[var(--fg-30)]",
  accent: "text-[var(--fg-60)]",
  numColor: "text-[var(--fg-20)]",
};

function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  const style = domainStyles[domain.key] ?? fallbackStyle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, ease, delay: index * 0.08 }}
      className={`rounded-2xl border ${style.border} ${style.bg} overflow-hidden`}
    >
      {/* Header */}
      <div className="border-b border-[var(--border-5)] px-6 py-5">
        <div className="flex items-start gap-3">
          <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
          <div className="flex flex-col gap-1">
            <h2 className={`text-[15px] font-semibold tracking-[-0.015em] ${style.accent}`}>
              {domain.label}
            </h2>
            <p className="text-[13px] leading-relaxed text-[var(--fg-38)]">
              {domain.description}
            </p>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="grid gap-0 divide-y divide-[var(--border-5)]">
        {domain.capabilities.map((cap, i) => (
          <div key={i} className="flex items-start gap-4 px-6 py-3.5">
            <span className={`shrink-0 font-mono text-[10px] tracking-wider ${style.numColor} mt-[3px]`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[13px] leading-relaxed text-[var(--fg-50)]">{cap}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ExpertiseShell({ label, heading, description, domains }: ExpertiseShellProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-[120px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/3 top-0"
            style={{
              width: 700,
              height: 500,
              background:
                "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="flex max-w-[640px] flex-col gap-5"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-25)]">
              {label}
            </span>
            <h1
              className="font-semibold leading-[1.0] tracking-[-0.04em] text-[var(--foreground)]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              {heading}
            </h1>
            <p className="text-[16px] leading-relaxed text-[var(--fg-40)]">{description}</p>
          </motion.div>
        </Container>
      </section>

      {/* Domains grid */}
      <Section size="sm" className="border-t border-[var(--border-5)]">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {domains.map((domain, i) => (
              <DomainCard key={domain.key} domain={domain} index={i} />
            ))}
          </div>

          {/* Footer philosophy line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="mt-16 border-t border-[var(--border-5)] pt-10"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-16">
              <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--fg-20)] sm:w-[200px]">
                Stack Philosophy
              </span>
              <p className="max-w-[560px] text-[14px] leading-relaxed text-[var(--fg-35)]">
                Every capability listed above exists in service of a single goal: turning raw data into trusted, governed, decision-ready intelligence. The engineering stack is a means. The outcome is autonomous, AI-native analytics.
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
