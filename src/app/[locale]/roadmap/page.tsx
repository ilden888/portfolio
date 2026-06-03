import { getTranslations, setRequestLocale } from "next-intl/server";
import { RoadmapShell } from "@/components/roadmap/RoadmapShell";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

interface StageRaw {
  label: string;
  sublabel: string;
  description: string;
  items: { name: string; note: string }[];
}

interface RoadmapRaw {
  label: string;
  heading: string;
  description: string;
  philosophy: string;
  stages: {
    current: StageRaw;
    learning: StageRaw;
    future: StageRaw;
  };
}

export default async function RoadmapPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("roadmapPage");
  const raw = t.raw("stages") as RoadmapRaw["stages"];

  return (
    <RoadmapShell
      eyebrow={t("label")}
      title={t("heading")}
      description={t("description")}
      philosophy={t("philosophy")}
      stages={raw}
    />
  );
}
