import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArticleShell } from "@/components/insights/ArticleShell";
import { insights, localizeInsights, type ArticleSection } from "@/data/insights";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    insights.map((insight) => ({ locale, slug: insight.slug }))
  );
}

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

interface RawArticle {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  sections: ArticleSection[];
}

export default async function InsightPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("insightsPage");

  const articles = localizeInsights(
    (key) => t(key),
    (key) => t.raw(key),
    insights
  );

  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const insight = insights.find((i) => i.slug === slug);
  if (!insight) notFound();

  const raw = t.raw(`articles.${insight.copyKey}`) as RawArticle;

  return (
    <ArticleShell
      article={article}
      sections={raw.sections}
      backHref={`/${locale}/insights`}
      backLabel={t("backLabel")}
      readTimeLabel={t("readTime")}
    />
  );
}
