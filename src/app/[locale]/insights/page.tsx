import { getTranslations, setRequestLocale } from "next-intl/server";
import { InsightsShell } from "@/components/insights/InsightsShell";
import { insights, localizeInsights } from "@/data/insights";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function InsightsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("insightsPage");

  const articles = localizeInsights(
    (key) => t(key),
    (key) => t.raw(key),
    insights
  );

  return (
    <InsightsShell
      locale={locale}
      articles={articles}
      t={{
        label: t("label"),
        heading: t("heading"),
        description: t("description"),
        readTime: t("readTime"),
      }}
    />
  );
}
