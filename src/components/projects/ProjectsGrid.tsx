"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/projects";

interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

interface FilterLabel {
  all: string;
  aiAgent: string;
  dataPlatform: string;
  realtime: string;
  analytics: string;
  telemetry: string;
}

interface ProjectsGridProps {
  items: ProjectItem[];
  comingSoon: string;
  filters: FilterLabel;
}

const categoryMap: Record<ProjectCategory, keyof FilterLabel> = {
  "ai-agent": "aiAgent",
  "data-platform": "dataPlatform",
  "realtime": "realtime",
  "analytics": "analytics",
  "telemetry": "telemetry",
};

const accentColors: Record<ProjectCategory, string> = {
  "ai-agent": "border-indigo-500/25 bg-indigo-500/[0.06]",
  "data-platform": "border-violet-500/20 bg-violet-500/[0.05]",
  "realtime": "border-cyan-500/20 bg-cyan-500/[0.05]",
  "analytics": "border-amber-500/20 bg-amber-500/[0.05]",
  "telemetry": "border-emerald-500/20 bg-emerald-500/[0.05]",
};

export function ProjectsGrid({ items, comingSoon, filters }: ProjectsGridProps) {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered = active === "all"
    ? items
    : items.filter((_, i) => projects[i]?.category === active);

  const filterButtons: { key: "all" | ProjectCategory; label: string }[] = [
    { key: "all", label: filters.all },
    { key: "ai-agent", label: filters.aiAgent },
    { key: "data-platform", label: filters.dataPlatform },
    { key: "realtime", label: filters.realtime },
    { key: "analytics", label: filters.analytics },
    { key: "telemetry", label: filters.telemetry },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[12px] tracking-wider transition-all duration-200 ${
              active === key
                ? "border-white/20 bg-white/[0.06] text-white/80"
                : "border-white/[0.07] bg-transparent text-white/30 hover:text-white/60 hover:border-white/[0.12]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const meta = projects.find((p) => p.slug === project.slug);
            const colorClass = meta ? accentColors[meta.category] : "border-white/[0.06] bg-white/[0.015]";

            return (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              >
                <div
                  className={`group relative flex flex-col gap-5 rounded-xl border p-6 h-full cursor-default hover:brightness-110 transition-all duration-300 ${colorClass}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/25">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-white/[0.08] px-2.5 py-0.5 font-mono text-[10px] text-white/25">
                        {comingSoon}
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="text-white/15 group-hover:text-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white/85 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-white/35">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
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
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
