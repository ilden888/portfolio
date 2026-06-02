import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExpertiseShell } from "@/components/expertise/ExpertiseShell";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const domainKeys = [
  "dataEngineering",
  "analyticsEngineering",
  "dataPlatforms",
  "aiSystems",
] as const;

export default async function ExpertisePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("expertisePage");

  const domains = domainKeys.map((key) => ({
    key,
    label: t(`domains.${key}.label`),
    description: t(`domains.${key}.description`),
    capabilities: (t.raw(`domains.${key}.capabilities`) as string[]),
  }));

  return (
    <ExpertiseShell
      label={t("label")}
      heading={t("heading")}
      description={t("description")}
      domains={domains}
    />
  );
}
