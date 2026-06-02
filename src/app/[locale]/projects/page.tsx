import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContentPageHero } from "@/components/content/ContentPageHero";
import { ContentSection } from "@/components/content/ContentSection";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { localizeProjects } from "@/data/projects";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");
  const projects = localizeProjects(t);

  return (
    <>
      <ContentPageHero
        eyebrow={t("label")}
        title={t("heading")}
        description={t("description")}
      />
      <ContentSection size="sm">
        <ProjectsGrid
          projects={projects}
          locale={locale}
          filters={{
            all: t("filterAll"),
            aiAgent: t("filterAiAgent"),
            dataPlatform: t("filterDataPlatform"),
            realtime: t("filterRealtime"),
            analytics: t("filterAnalytics"),
            telemetry: t("filterTelemetry"),
            research: t("filterResearch"),
          }}
        />
      </ContentSection>
    </>
  );
}
