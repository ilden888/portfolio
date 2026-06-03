export interface InsightDefinition {
  slug: string;
  copyKey: string;
  featured: boolean;
  featuredPriority?: number;
}

export interface InsightCardData {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  featuredPriority?: number;
}

export type ArticleSectionContent =
  | { type: "prose"; paragraphs: string[] }
  | { type: "key-points"; items: string[] }
  | { type: "takeaway"; heading: string; body: string };

export interface ArticleSection {
  key: string;
  title: string;
  type: string;
  paragraphs?: string[];
  items?: string[];
  heading?: string;
  body?: string;
}

export const insights: InsightDefinition[] = [
  {
    slug: "why-ai-needs-a-semantic-layer",
    copyKey: "whyAiNeedsSemanticLayer",
    featured: true,
    featuredPriority: 1,
  },
  {
    slug: "why-dashboards-fail",
    copyKey: "whyDashboardsFail",
    featured: true,
    featuredPriority: 2,
  },
  {
    slug: "building-trustworthy-analytics",
    copyKey: "buildingTrustworthyAnalytics",
    featured: true,
    featuredPriority: 3,
  },
  {
    slug: "from-dwh-to-ai-agents",
    copyKey: "fromDwhToAiAgents",
    featured: false,
  },
];

export const featuredInsights = insights
  .filter((i) => i.featured)
  .sort((a, b) => (a.featuredPriority ?? 99) - (b.featuredPriority ?? 99));

type Translator = (key: string) => string;
type RawTranslator = (key: string) => unknown;

export function localizeInsights(t: Translator, tRaw: RawTranslator, source = insights): InsightCardData[] {
  return source.map(({ copyKey, featured, featuredPriority, slug }) => {
    const article = tRaw(`articles.${copyKey}`) as {
      title: string;
      description: string;
      date: string;
      readTime: string;
      tags: string[];
    };
    return {
      slug,
      title: article.title,
      description: article.description,
      date: article.date,
      readTime: article.readTime,
      tags: article.tags,
      featured,
      featuredPriority,
    };
  });
}
