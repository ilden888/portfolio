export type ProjectStatus =
  | "live"
  | "in-progress"
  | "planned"
  | "production"
  | "active-development"
  | "research"
  | "concept";

export type ProjectCategory =
  | "ai-agent"
  | "data-platform"
  | "realtime"
  | "analytics"
  | "telemetry"
  | "research";

export type ProjectDomain =
  | "data-engineering"
  | "analytics-engineering"
  | "ai-systems"
  | "sports-analytics"
  | "research";

export type ProjectType = "flagship" | "standard";

export interface ProjectLinks {
  demo?: string;
  github?: string;
  article?: string;
}

export interface ProjectDefinition {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  domain: ProjectDomain;
  projectType?: ProjectType;
  tags: string[];
  featured: boolean;
  featuredPriority?: number;
  coverImage?: string;
  links?: ProjectLinks;
  copyKey: string;
}

export interface ProjectCardData extends Omit<ProjectDefinition, "copyKey"> {
  title: string;
  description: string;
  categoryLabel: string;
  statusLabel: string;
  domainLabel: string;
}

export const projects: ProjectDefinition[] = [
  {
    slug: "ai-native-analytics-platform",
    category: "ai-agent",
    status: "active-development",
    domain: "ai-systems",
    projectType: "flagship",
    tags: ["Apache Iceberg", "dbt", "Semantic Layer", "Claude", "S3"],
    featured: true,
    featuredPriority: 1,
    copyKey: "aiNativeAnalyticsPlatform",
  },
  {
    slug: "gaming-club-data-platform",
    category: "data-platform",
    status: "active-development",
    domain: "data-engineering",
    projectType: "flagship",
    tags: ["PostgreSQL", "ClickHouse", "Airflow", "dbt", "Metabase", "Python"],
    featured: true,
    featuredPriority: 2,
    copyKey: "gamingClubDataPlatform",
  },
  {
    slug: "ai-analytics-assistant",
    category: "ai-agent",
    status: "active-development",
    domain: "ai-systems",
    tags: ["RAG", "LangChain", "Claude", "ClickHouse"],
    featured: true,
    featuredPriority: 3,
    copyKey: "aiAnalyticsAssistant",
  },
  {
    slug: "tournament-intelligence",
    category: "realtime",
    status: "concept",
    domain: "sports-analytics",
    tags: ["Kafka", "PostgreSQL", "OpenAI"],
    featured: true,
    featuredPriority: 4,
    copyKey: "tournamentIntelligence",
  },
  {
    slug: "sports-analytics",
    category: "analytics",
    status: "concept",
    domain: "sports-analytics",
    tags: ["DuckDB", "Parquet", "Claude"],
    featured: true,
    featuredPriority: 5,
    copyKey: "sportsAnalytics",
  },
  {
    slug: "iss-analytics",
    category: "telemetry",
    status: "research",
    domain: "data-engineering",
    tags: ["Iceberg", "S3", "Kafka"],
    featured: true,
    featuredPriority: 6,
    copyKey: "issAnalytics",
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.featuredPriority ?? 99) - (b.featuredPriority ?? 99));

type Translator = (key: string) => string;

export function localizeProjects(t: Translator, source = projects): ProjectCardData[] {
  return source.map(({ copyKey, ...project }) => ({
    ...project,
    title: t(`items.${copyKey}.title`),
    description: t(`items.${copyKey}.description`),
    categoryLabel: t(`categories.${project.category}`),
    statusLabel: t(`statuses.${project.status}`),
    domainLabel: t(`domains.${project.domain}`),
  }));
}
