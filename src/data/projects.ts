export type ProjectStatus = "live" | "in-progress" | "planned";
export type ProjectCategory = "ai-agent" | "data-platform" | "realtime" | "analytics" | "telemetry";

export interface ProjectDefinition {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tags: string[];
  featured: boolean;
  coverImage?: string;
  copyKey: string;
}

export interface ProjectCardData extends Omit<ProjectDefinition, "copyKey"> {
  title: string;
  description: string;
  categoryLabel: string;
  statusLabel: string;
}

export const projects: ProjectDefinition[] = [
  {
    slug: "gaming-club-data-platform",
    category: "data-platform",
    status: "in-progress",
    tags: ["Airflow", "dbt", "ClickHouse"],
    featured: true,
    copyKey: "gamingClubDataPlatform",
  },
  {
    slug: "ai-analytics-assistant",
    category: "ai-agent",
    status: "in-progress",
    tags: ["RAG", "LangChain", "Claude"],
    featured: true,
    copyKey: "aiAnalyticsAssistant",
  },
  {
    slug: "tournament-intelligence",
    category: "realtime",
    status: "planned",
    tags: ["Kafka", "PostgreSQL", "OpenAI"],
    featured: true,
    copyKey: "tournamentIntelligence",
  },
  {
    slug: "sports-analytics",
    category: "analytics",
    status: "planned",
    tags: ["DuckDB", "Parquet", "Claude"],
    featured: false,
    copyKey: "sportsAnalytics",
  },
  {
    slug: "iss-analytics",
    category: "telemetry",
    status: "planned",
    tags: ["Iceberg", "S3", "Kafka"],
    featured: false,
    copyKey: "issAnalytics",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

type Translator = (key: string) => string;

export function localizeProjects(t: Translator, source = projects): ProjectCardData[] {
  return source.map(({ copyKey, ...project }) => ({
    ...project,
    title: t(`items.${copyKey}.title`),
    description: t(`items.${copyKey}.description`),
    categoryLabel: t(`categories.${project.category}`),
    statusLabel: t(`statuses.${project.status}`),
  }));
}
