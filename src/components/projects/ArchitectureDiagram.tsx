"use client";

import { motion } from "framer-motion";

export type DiagramNodeType =
  | "source"
  | "ingestion"
  | "orchestration"
  | "warehouse"
  | "transform"
  | "semantic"
  | "dashboard"
  | "agent";

export interface DiagramNode {
  type: DiagramNodeType;
  label: string;
  sublabel?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const nodeConfig: Record<
  DiagramNodeType,
  { tag: string; dot: string; border: string; bg: string; labelColor: string; metaColor: string }
> = {
  source: {
    tag: "SOURCES",
    dot: "bg-[var(--fg-30)]",
    border: "border-[var(--border-10)]",
    bg: "bg-[var(--surface-2)]",
    labelColor: "text-[var(--fg-60)]",
    metaColor: "text-[var(--fg-25)]",
  },
  ingestion: {
    tag: "INGEST",
    dot: "bg-cyan-400/70",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/[0.04]",
    labelColor: "text-cyan-300/90",
    metaColor: "text-cyan-400/45",
  },
  orchestration: {
    tag: "ORCHESTRATE",
    dot: "bg-amber-400/70",
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.04]",
    labelColor: "text-amber-300/90",
    metaColor: "text-amber-400/45",
  },
  warehouse: {
    tag: "WAREHOUSE",
    dot: "bg-indigo-400/80",
    border: "border-indigo-500/25",
    bg: "bg-indigo-500/[0.06]",
    labelColor: "text-indigo-300/90",
    metaColor: "text-indigo-400/50",
  },
  transform: {
    tag: "TRANSFORM",
    dot: "bg-violet-400/70",
    border: "border-violet-500/20",
    bg: "bg-violet-500/[0.04]",
    labelColor: "text-violet-300/90",
    metaColor: "text-violet-400/45",
  },
  semantic: {
    tag: "SEMANTIC",
    dot: "bg-purple-400/70",
    border: "border-purple-500/20",
    bg: "bg-purple-500/[0.04]",
    labelColor: "text-purple-300/90",
    metaColor: "text-purple-400/45",
  },
  dashboard: {
    tag: "REPORTING",
    dot: "bg-emerald-400/70",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/[0.04]",
    labelColor: "text-emerald-300/90",
    metaColor: "text-emerald-400/45",
  },
  agent: {
    tag: "AI AGENT",
    dot: "bg-rose-400/70",
    border: "border-rose-500/20",
    bg: "bg-rose-500/[0.04]",
    labelColor: "text-rose-300/90",
    metaColor: "text-rose-400/45",
  },
};

function DiagramNodeCard({ node, index }: { node: DiagramNode; index: number }) {
  const cfg = nodeConfig[node.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease, delay: index * 0.07 }}
      className={`rounded-xl border ${cfg.border} ${cfg.bg} px-5 py-4`}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
        <span className={`font-mono text-[9px] tracking-[0.22em] uppercase ${cfg.metaColor}`}>
          {cfg.tag}
        </span>
      </div>
      <div className={`text-[14px] font-semibold tracking-[-0.015em] ${cfg.labelColor}`}>
        {node.label}
      </div>
      {node.sublabel && (
        <div className={`mt-1 font-mono text-[11px] leading-relaxed tracking-wide ${cfg.metaColor}`}>
          {node.sublabel}
        </div>
      )}
    </motion.div>
  );
}

function Connector({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, ease, delay: index * 0.07 + 0.04 }}
      style={{ transformOrigin: "top" }}
      className="flex flex-col items-center"
    >
      <div className="h-4 w-px bg-gradient-to-b from-[var(--border-12)] to-[var(--border-5)]" />
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
        className="text-[var(--fg-20)]"
      >
        <path
          d="M0.5 0.5L4 4.5L7.5 0.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export function ArchitectureDiagram({ nodes }: { nodes: DiagramNode[] }) {
  return (
    <div className="flex flex-col">
      {nodes.map((node, i) => (
        <div key={i}>
          <DiagramNodeCard node={node} index={i} />
          {i < nodes.length - 1 && <Connector index={i} />}
        </div>
      ))}
    </div>
  );
}
