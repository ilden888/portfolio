import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseStudyShell, type CaseStudySection } from "@/components/projects/CaseStudyShell";
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

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");

  const localized = localizeProjects(t);
  const project = localized.find((p) => p.slug === slug);

  if (!project) notFound();

  const sections: CaseStudySection[] = [
    { key: "overview", title: t("caseStudy.sections.overview") },
    { key: "problem", title: t("caseStudy.sections.problem") },
    { key: "architecture", title: t("caseStudy.sections.architecture") },
    { key: "dataFlow", title: t("caseStudy.sections.dataFlow") },
    { key: "technologies", title: t("caseStudy.sections.technologies") },
    { key: "results", title: t("caseStudy.sections.results") },
    { key: "lessons", title: t("caseStudy.sections.lessons") },
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
