"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { type ProjectCardData, type ProjectCategory } from "@/data/projects";

interface FilterLabel {
  all: string;
  aiAgent: string;
  dataPlatform: string;
  realtime: string;
  analytics: string;
  telemetry: string;
}

interface ProjectsGridProps {
  projects: ProjectCardData[];
  filters: FilterLabel;
}

export function ProjectsGrid({ projects, filters }: ProjectsGridProps) {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");
  const filtered = active === "all" ? projects : projects.filter((project) => project.category === active);

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
      <div className="flex flex-wrap gap-2">
        {filterButtons.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[12px] tracking-wider transition-all duration-200 ${
              active === key
                ? "border-[var(--border-20)] bg-[var(--surface-5)] text-[var(--fg-80)]"
                : "border-[var(--border-7)] bg-transparent text-[var(--fg-30)] hover:border-[var(--border-12)] hover:text-[var(--fg-60)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
