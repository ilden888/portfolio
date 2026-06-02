import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseStudyShell, type CaseStudySection, type SectionContent } from "@/components/projects/CaseStudyShell";
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

interface GamingClubContent {
  overview: string[];
  problem: { context: string; challenges: string[] };
  architecture: { description: string; layers: { label: string; detail: string }[] };
  dataFlow: { streams: { name: string; desc: string }[] };
  results: string[];
  lessons: { title: string; body: string }[];
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");

  const localized = localizeProjects(t);
  const project = localized.find((p) => p.slug === slug);

  if (!project) notFound();

  let sectionContents: Partial<Record<string, SectionContent>> = {};

  if (slug === "gaming-club-data-platform") {
    const cs = t.raw("caseStudy.gamingClubDataPlatform") as GamingClubContent;
    sectionContents = {
      overview: { type: "prose", paragraphs: cs.overview },
      problem: { type: "challenges", context: cs.problem.context, items: cs.problem.challenges },
      architecture: {
        type: "architecture",
        description: cs.architecture.description,
        layers: cs.architecture.layers,
      },
      dataFlow: { type: "dataflows", streams: cs.dataFlow.streams },
      results: { type: "results", items: cs.results },
      lessons: { type: "lessons", items: cs.lessons },
    };
  }

  const sections: CaseStudySection[] = [
    { key: "overview", title: t("caseStudy.sections.overview"), content: sectionContents.overview },
    { key: "problem", title: t("caseStudy.sections.problem"), content: sectionContents.problem },
    { key: "architecture", title: t("caseStudy.sections.architecture"), content: sectionContents.architecture },
    { key: "dataFlow", title: t("caseStudy.sections.dataFlow"), content: sectionContents.dataFlow },
    { key: "technologies", title: t("caseStudy.sections.technologies") },
    { key: "results", title: t("caseStudy.sections.results"), content: sectionContents.results },
    { key: "lessons", title: t("caseStudy.sections.lessons"), content: sectionContents.lessons },
  ];

  return (
    <CaseStudyShell
      project={project}
      backHref={`/${locale}/projects`}
      backLabel={t("caseStudy.back")}
      inProgressLabel={t("caseStudy.inProgress")}
      inProgressSub={t("caseStudy.inProgressSub")}
      sections={sections}
    />
  );
}
