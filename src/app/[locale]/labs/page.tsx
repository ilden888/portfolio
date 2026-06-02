import { getTranslations, setRequestLocale } from "next-intl/server";
import { LabsShell } from "@/components/labs/LabsShell";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const categoryKeys = [
  "dataEngineering",
  "aiAnalytics",
  "sportsAnalytics",
  "research",
  "experiments",
] as const;

const categoryItemSlugs: Record<string, string[]> = {
  dataEngineering: ["vector-dwh-index"],
  aiAnalytics: ["semantic-sql-layer", "autonomous-report-agent"],
  sportsAnalytics: [],
  research: [],
  experiments: [],
};

export default async function LabsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("labsPage");
  const labsT = await getTranslations("labs");

  const allItems = [0, 1, 2].map((i) => ({
    slug: labsT(`items.${i}.slug`),
    title: labsT(`items.${i}.title`),
    description: labsT(`items.${i}.description`),
    longDescription: labsT(`items.${i}.longDescription`),
    tag: labsT(`items.${i}.tag`),
    tags: [
      labsT(`items.${i}.tags.0`),
      labsT(`items.${i}.tags.1`),
      labsT(`items.${i}.tags.2`),
    ],
  }));

  const itemsBySlug = Object.fromEntries(allItems.map((item) => [item.slug, item]));

  const categories = categoryKeys.map((key) => ({
    key,
    label: t(`categories.${key}.label`),
    description: t(`categories.${key}.description`),
    items: (categoryItemSlugs[key] ?? [])
      .map((s) => itemsBySlug[s])
      .filter(Boolean),
  }));

  return (
    <LabsShell
      label={t("label")}
      heading={t("heading")}
      description={t("description")}
      comingSoon={t("comingSoon")}
      comingSoonSub={t("comingSoonSub")}
      categories={categories}
    />
  );
}
