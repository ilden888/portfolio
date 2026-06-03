import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArchitecturesShell } from "@/components/architectures/ArchitecturesShell";
import { locales, type Locale } from "@/lib/i18n/config";
import { type PipelineStep } from "@/components/architecture";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

interface DiagramStepRaw {
  type: string;
  label: string;
  sublabel?: string;
  connectorLabel?: string;
}

interface DiagramRaw {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  steps: DiagramStepRaw[];
}

export default async function ArchitecturesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("architecturesPage");
  const raw = t.raw("diagrams") as DiagramRaw[];

  const diagrams = raw.map((d) => ({
    ...d,
    steps: d.steps.map((s) => ({
      type: s.type as PipelineStep["type"],
      label: s.label,
      sublabel: s.sublabel,
      connectorLabel: s.connectorLabel,
    })),
  }));

  return (
    <ArchitecturesShell
      eyebrow={t("label")}
      title={t("heading")}
      description={t("description")}
      diagramLabel={t("diagramLabel")}
      diagrams={diagrams}
    />
  );
}
