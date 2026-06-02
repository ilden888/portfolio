"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// ── Shared types ──────────────────────────────────────────────────────────────

export interface NodeProps {
  label: string;
  sublabel?: string;
  detail?: string;
  className?: string;
  animate?: boolean;
  delay?: number;
}

// ── Base node builder ─────────────────────────────────────────────────────────

interface NodeConfig {
  tag: string;
  dot: string;
  border: string;
  bg: string;
  labelColor: string;
  metaColor: string;
  tagColor: string;
}

function BaseNode({
  cfg,
  label,
  sublabel,
  detail,
  className = "",
  animate = true,
  delay = 0,
}: NodeProps & { cfg: NodeConfig }) {
  const content = (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} px-5 py-4 ${className}`}>
      <div className="mb-2.5 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
        <span className={`font-mono text-[9px] tracking-[0.22em] uppercase ${cfg.tagColor}`}>
          {cfg.tag}
        </span>
      </div>
      <div className={`text-[14px] font-semibold tracking-[-0.015em] ${cfg.labelColor}`}>
        {label}
      </div>
      {sublabel && (
        <div className={`mt-1 font-mono text-[11px] leading-relaxed tracking-wide ${cfg.metaColor}`}>
          {sublabel}
        </div>
      )}
      {detail && (
        <div className={`mt-2 text-[12px] leading-relaxed ${cfg.metaColor}`}>{detail}</div>
      )}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease, delay }}
    >
      {content}
    </motion.div>
  );
}

// ── Node configs ──────────────────────────────────────────────────────────────

const configs = {
  source: {
    tag: "SOURCE",
    dot: "bg-[var(--fg-30)]",
    border: "border-[var(--border-10)]",
    bg: "bg-[var(--surface-2)]",
    labelColor: "text-[var(--fg-60)]",
    metaColor: "text-[var(--fg-25)]",
    tagColor: "text-[var(--fg-25)]",
  },
  pipeline: {
    tag: "PIPELINE",
    dot: "bg-cyan-400/70",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/[0.04]",
    labelColor: "text-cyan-300/90",
    metaColor: "text-cyan-400/45",
    tagColor: "text-cyan-400/45",
  },
  airflow: {
    tag: "AIRFLOW",
    dot: "bg-amber-400/70",
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.04]",
    labelColor: "text-amber-300/90",
    metaColor: "text-amber-400/45",
    tagColor: "text-amber-400/45",
  },
  dbt: {
    tag: "DBT",
    dot: "bg-violet-400/70",
    border: "border-violet-500/20",
    bg: "bg-violet-500/[0.04]",
    labelColor: "text-violet-300/90",
    metaColor: "text-violet-400/45",
    tagColor: "text-violet-400/45",
  },
  warehouse: {
    tag: "WAREHOUSE",
    dot: "bg-indigo-400/80",
    border: "border-indigo-500/25",
    bg: "bg-indigo-500/[0.06]",
    labelColor: "text-indigo-300/90",
    metaColor: "text-indigo-400/50",
    tagColor: "text-indigo-400/50",
  },
  semantic: {
    tag: "SEMANTIC",
    dot: "bg-purple-400/70",
    border: "border-purple-500/20",
    bg: "bg-purple-500/[0.04]",
    labelColor: "text-purple-300/90",
    metaColor: "text-purple-400/45",
    tagColor: "text-purple-400/45",
  },
  aiAgent: {
    tag: "AI AGENT",
    dot: "bg-rose-400/70",
    border: "border-rose-500/20",
    bg: "bg-rose-500/[0.04]",
    labelColor: "text-rose-300/90",
    metaColor: "text-rose-400/45",
    tagColor: "text-rose-400/45",
  },
  dashboard: {
    tag: "REPORTING",
    dot: "bg-emerald-400/70",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/[0.04]",
    labelColor: "text-emerald-300/90",
    metaColor: "text-emerald-400/45",
    tagColor: "text-emerald-400/45",
  },
} as const;

// ── Individual node exports ───────────────────────────────────────────────────

export function SourceNode(props: NodeProps) {
  return <BaseNode cfg={configs.source} {...props} />;
}

export function PipelineNode(props: NodeProps) {
  return <BaseNode cfg={configs.pipeline} {...props} />;
}

export function AirflowNode(props: NodeProps) {
  return <BaseNode cfg={configs.airflow} {...props} />;
}

export function DBTNode(props: NodeProps) {
  return <BaseNode cfg={configs.dbt} {...props} />;
}

export function WarehouseNode(props: NodeProps) {
  return <BaseNode cfg={configs.warehouse} {...props} />;
}

export function SemanticLayerNode(props: NodeProps) {
  return <BaseNode cfg={configs.semantic} {...props} />;
}

export function AIAgentNode(props: NodeProps) {
  return <BaseNode cfg={configs.aiAgent} {...props} />;
}

export function DashboardNode(props: NodeProps) {
  return <BaseNode cfg={configs.dashboard} {...props} />;
}

// ── FlowConnector ─────────────────────────────────────────────────────────────

interface FlowConnectorProps {
  index?: number;
  label?: string;
}

export function FlowConnector({ index = 0, label }: FlowConnectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, ease, delay: index * 0.07 + 0.04 }}
      style={{ transformOrigin: "top" }}
      className="flex flex-col items-center gap-1"
    >
      <div className="h-4 w-px bg-gradient-to-b from-[var(--border-12)] to-[var(--border-5)]" />
      {label && (
        <span className="px-2 font-mono text-[9px] tracking-wider text-[var(--fg-18)] uppercase">
          {label}
        </span>
      )}
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="text-[var(--fg-20)]">
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

// ── PipelineDiagram ───────────────────────────────────────────────────────────

export type PipelineNodeType =
  | "source"
  | "pipeline"
  | "airflow"
  | "dbt"
  | "warehouse"
  | "semantic"
  | "ai-agent"
  | "dashboard";

export interface PipelineStep {
  type: PipelineNodeType;
  label: string;
  sublabel?: string;
  detail?: string;
  connectorLabel?: string;
}

interface PipelineDiagramProps {
  steps: PipelineStep[];
  className?: string;
}

const nodeByType: Record<PipelineNodeType, (props: NodeProps) => React.ReactElement> = {
  source: (p) => <SourceNode {...p} />,
  pipeline: (p) => <PipelineNode {...p} />,
  airflow: (p) => <AirflowNode {...p} />,
  dbt: (p) => <DBTNode {...p} />,
  warehouse: (p) => <WarehouseNode {...p} />,
  semantic: (p) => <SemanticLayerNode {...p} />,
  "ai-agent": (p) => <AIAgentNode {...p} />,
  dashboard: (p) => <DashboardNode {...p} />,
};

export function PipelineDiagram({ steps, className = "" }: PipelineDiagramProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {steps.map((step, i) => {
        const NodeComponent = nodeByType[step.type];
        return (
          <div key={i}>
            <NodeComponent
              label={step.label}
              sublabel={step.sublabel}
              detail={step.detail}
              delay={i * 0.07}
            />
            {i < steps.length - 1 && (
              <FlowConnector index={i} label={step.connectorLabel} />
            )}
          </div>
        );
      })}
    </div>
  );
}
