export type LabStatus = "research" | "prototype" | "experiment";

export interface LabItem {
  slug: string;
  status: LabStatus;
  year: number;
  tags: string[];
}

export const labItems: LabItem[] = [
  {
    slug: "semantic-sql-layer",
    status: "research",
    year: 2024,
    tags: ["LLM", "SQL", "DWH", "Semantic Layer"],
  },
  {
    slug: "autonomous-report-agent",
    status: "prototype",
    year: 2024,
    tags: ["Claude", "LangChain", "KPI", "Alerting"],
  },
  {
    slug: "vector-dwh-index",
    status: "experiment",
    year: 2024,
    tags: ["Embeddings", "ClickHouse", "Anomaly Detection"],
  },
];
