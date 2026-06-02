export type ProjectStatus = "live" | "wip" | "archived";
export type ProjectCategory = "ai-agent" | "data-platform" | "realtime" | "analytics" | "telemetry";

export interface Project {
  slug: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  tags: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "ai-analytics-assistant",
    category: "ai-agent",
    status: "wip",
    year: 2024,
    tags: ["ClickHouse", "LangChain", "RAG", "Claude"],
    featured: true,
  },
  {
    slug: "gaming-club-dwh",
    category: "data-platform",
    status: "live",
    year: 2023,
    tags: ["Airflow", "dbt", "ClickHouse", "PostgreSQL"],
    featured: true,
  },
  {
    slug: "tournament-intelligence",
    category: "realtime",
    status: "wip",
    year: 2024,
    tags: ["Kafka", "PostgreSQL", "OpenAI", "dbt"],
    featured: true,
  },
  {
    slug: "sports-analytics-lab",
    category: "analytics",
    status: "wip",
    year: 2024,
    tags: ["DuckDB", "dbt", "Claude", "Python"],
    featured: false,
  },
  {
    slug: "iss-telemetry-analytics",
    category: "telemetry",
    status: "wip",
    year: 2024,
    tags: ["Kafka", "Apache Iceberg", "S3", "Airflow"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
