import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseStudyShell, type CaseStudySection, type SectionContent } from "@/components/projects/CaseStudyShell";
import { type DiagramNode } from "@/components/projects/ArchitectureDiagram";
import { projects, localizeProjects } from "@/data/projects";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

interface DwhModel {
  name: string;
  description: string;
}

interface DwhLayer {
  name: string;
  tag: string;
  description: string;
  models: DwhModel[];
}

interface GamingClubContent {
  overview: string[];
  businessContext: { description: string; items: string[] };
  dataChallenges: { context: string; items: string[] };
  architecture: { description: string; layers: { label: string; detail: string }[] };
  dataFlow: { streams: { name: string; desc: string }[] };
  analyticsLayer: { description: string; items: { name: string; desc: string }[] };
  automationLayer: { description: string; steps: { title: string; body: string }[] };
  dwhModeling: { description: string; layers: DwhLayer[] };
  reportingLayer: { streams: { name: string; desc: string }[] };
  results: string[];
  lessons: { title: string; body: string }[];
  futureImprovements: { title: string; description: string; priority: "high" | "medium" | "low" }[];
}

interface AiPlatformContent {
  overview: string[];
  problem: { context: string; challenges: string[] };
  architecture: { description: string; layers: { label: string; detail: string }[] };
  dataFlow: { streams: { name: string; desc: string }[] };
  aiLayer: { description: string; items: { name: string; desc: string }[] };
  comparison: {
    scenarioA: { label: string; description: string; problems: string[] };
    scenarioB: { label: string; description: string; benefits: string[] };
  };
  results: string[];
  lessons: { title: string; body: string }[];
  futureVision: string[];
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");

  const localized = localizeProjects(t);
  const project = localized.find((p) => p.slug === slug);

  if (!project) notFound();

  const flagshipLabel = project.projectType === "flagship" ? t("caseStudy.flagship") : undefined;

  let sectionContents: Partial<Record<string, SectionContent>> = {};
  let sections: CaseStudySection[] = [];

  // ── Gaming Club Data Platform ──────────────────────────────────────────────

  if (slug === "gaming-club-data-platform") {
    const cs = t.raw("caseStudy.gamingClubDataPlatform") as GamingClubContent;

    const gamingClubDiagram: DiagramNode[] = [
      { type: "source", label: "Operational Systems", sublabel: "POS · Booking System · CRM · Subscription Service" },
      { type: "ingestion", label: "Ingestion Layer", sublabel: "Airflow DAGs · Python extractors · nightly schedule" },
      { type: "warehouse", label: "Raw Data", sublabel: "Insert-only · Full history · No transformations" },
      { type: "warehouse", label: "PostgreSQL DWH", sublabel: "Raw → Staging → Mart layer separation" },
      { type: "transform", label: "DBT Models", sublabel: "Business logic · metric definitions · data contracts" },
      { type: "semantic", label: "Business Metrics", sublabel: "Aggregated KPIs · revenue attribution · cohort metrics" },
      { type: "dashboard", label: "Dashboards", sublabel: "Metabase · operational reporting · management views" },
    ];

    sectionContents = {
      overview: { type: "prose", paragraphs: cs.overview },
      businessContext: { type: "challenges", context: cs.businessContext.description, items: cs.businessContext.items },
      dataChallenges: { type: "challenges", context: cs.dataChallenges.context, items: cs.dataChallenges.items },
      architecture: {
        type: "architecture",
        description: cs.architecture.description,
        layers: cs.architecture.layers,
        diagram: gamingClubDiagram,
      },
      dataFlow: { type: "dataflows", streams: cs.dataFlow.streams },
      analyticsLayer: { type: "kpi-streams", description: cs.analyticsLayer.description, items: cs.analyticsLayer.items },
      automationLayer: { type: "implementation", steps: cs.automationLayer.steps },
      dwhModeling: { type: "dwh-modeling", description: cs.dwhModeling.description, layers: cs.dwhModeling.layers },
      reportingLayer: { type: "dataflows", streams: cs.reportingLayer.streams },
      results: { type: "results", items: cs.results },
      lessons: { type: "lessons", items: cs.lessons },
      futureImprovements: { type: "future", items: cs.futureImprovements },
    };

    sections = [
      { key: "overview", title: t("caseStudy.sections.overview"), content: sectionContents.overview },
      { key: "businessContext", title: t("caseStudy.sections.businessContext"), content: sectionContents.businessContext },
      { key: "dataChallenges", title: t("caseStudy.sections.dataChallenges"), content: sectionContents.dataChallenges },
      { key: "architecture", title: t("caseStudy.sections.architecture"), content: sectionContents.architecture },
      { key: "dataFlow", title: t("caseStudy.sections.dataFlow"), content: sectionContents.dataFlow },
      { key: "analyticsLayer", title: t("caseStudy.sections.analyticsLayer"), content: sectionContents.analyticsLayer },
      { key: "automationLayer", title: t("caseStudy.sections.automationLayer"), content: sectionContents.automationLayer },
      { key: "dwhModeling", title: t("caseStudy.sections.dwhModeling"), content: sectionContents.dwhModeling },
      { key: "reportingLayer", title: t("caseStudy.sections.reportingLayer"), content: sectionContents.reportingLayer },
      { key: "technologies", title: t("caseStudy.sections.technologies") },
      { key: "results", title: t("caseStudy.sections.results"), content: sectionContents.results },
      { key: "lessons", title: t("caseStudy.sections.lessons"), content: sectionContents.lessons },
      { key: "futureImprovements", title: t("caseStudy.sections.futureImprovements"), content: sectionContents.futureImprovements },
    ];
  }

  // ── AI-Native Analytics Platform ──────────────────────────────────────────

  else if (slug === "ai-native-analytics-platform") {
    const cs = t.raw("caseStudy.aiNativeAnalyticsPlatform") as AiPlatformContent;

    const aiPlatformDiagram: DiagramNode[] = [
      { type: "source", label: "Raw Data", sublabel: "Operational Systems · Event Streams · APIs" },
      { type: "ingestion", label: "S3 / Object Store", sublabel: "Scalable storage · decoupled from compute" },
      { type: "warehouse", label: "Apache Iceberg", sublabel: "ACID transactions · schema evolution · time travel" },
      { type: "transform", label: "DBT", sublabel: "Medallion layers · metric contracts · tests" },
      { type: "semantic", label: "Semantic Layer", sublabel: "Business context · governed metrics · NL mappings" },
      { type: "dashboard", label: "AI Analyst", sublabel: "Claude · governed queries · explainable answers" },
    ];

    sectionContents = {
      overview: { type: "prose", paragraphs: cs.overview },
      problem: { type: "challenges", context: cs.problem.context, items: cs.problem.challenges },
      architecture: {
        type: "architecture",
        description: cs.architecture.description,
        layers: cs.architecture.layers,
        diagram: aiPlatformDiagram,
      },
      dataFlow: { type: "dataflows", streams: cs.dataFlow.streams },
      aiLayer: { type: "kpi-streams", description: cs.aiLayer.description, items: cs.aiLayer.items },
      comparison: {
        type: "comparison",
        scenarioA: cs.comparison.scenarioA,
        scenarioB: cs.comparison.scenarioB,
      },
      results: { type: "results", items: cs.results },
      lessons: { type: "lessons", items: cs.lessons },
      futureVision: { type: "results", items: cs.futureVision },
    };

    sections = [
      { key: "overview", title: t("caseStudy.sections.overview"), content: sectionContents.overview },
      { key: "problem", title: t("caseStudy.sections.problem"), content: sectionContents.problem },
      { key: "architecture", title: t("caseStudy.sections.architecture"), content: sectionContents.architecture },
      { key: "dataFlow", title: t("caseStudy.sections.dataFlow"), content: sectionContents.dataFlow },
      { key: "aiLayer", title: t("caseStudy.sections.aiLayer"), content: sectionContents.aiLayer },
      { key: "comparison", title: t("caseStudy.sections.comparison"), content: sectionContents.comparison },
      { key: "technologies", title: t("caseStudy.sections.technologies") },
      { key: "results", title: t("caseStudy.sections.results"), content: sectionContents.results },
      { key: "lessons", title: t("caseStudy.sections.lessons"), content: sectionContents.lessons },
      { key: "futureVision", title: t("caseStudy.sections.futureVision"), content: sectionContents.futureVision },
    ];
  }

  // ── Other projects — placeholder sections ──────────────────────────────────

  else {
    sections = [
      { key: "overview", title: t("caseStudy.sections.overview") },
      { key: "architecture", title: t("caseStudy.sections.architecture") },
      { key: "dataFlow", title: t("caseStudy.sections.dataFlow") },
      { key: "technologies", title: t("caseStudy.sections.technologies") },
      { key: "results", title: t("caseStudy.sections.results") },
    ];
  }

  return (
    <CaseStudyShell
      project={project}
      backHref={`/${locale}/projects`}
      backLabel={t("caseStudy.back")}
      inProgressLabel={t("caseStudy.inProgress")}
      inProgressSub={t("caseStudy.inProgressSub")}
      flagshipLabel={flagshipLabel}
      sections={sections}
    />
  );
}
