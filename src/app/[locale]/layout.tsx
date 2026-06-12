import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { locales, type Locale } from "@/lib/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dataden.digital";

const localeTitles: Record<string, string> = {
  en: "Denis Il — AI-Native Data Platform Engineer",
  ru: "Денис Илющихин — Data Engineer, Data Analyst и AI Automation",
  es: "Denis Il — Ingeniero de Datos y Automatización con IA",
};

const localeDescriptions: Record<string, string> = {
  en: "Data Engineer specializing in analytics platforms, BI dashboards, ETL pipelines and AI automation solutions.",
  ru: "Data Engineer и Data Analyst. Создаю аналитические платформы, BI-решения, ETL-процессы и AI-автоматизацию для бизнеса.",
  es: "Ingeniero de datos especializado en plataformas analíticas, BI, ETL y automatización con inteligencia artificial.",
};

const ogLocale: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  es: "es_ES",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = localeTitles[locale] ?? localeTitles.en;
  const description = localeDescriptions[locale] ?? localeDescriptions.en;
  const url = `${SITE_URL}/${locale}`;

  return {
    title: {
      default: title,
      template: `%s | ${locale === "ru" ? "Денис Илющихин" : "Denis Il"}`,
    },
    description,
    keywords: [
      "AI analytics",
      "data platform",
      "ClickHouse",
      "dbt",
      "Airflow",
      "LangChain",
      "data engineering",
      "analytics engineering",
      "AI-native BI",
      "data warehouse",
    ],
    authors: [{ name: "Denis IL" }],
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Denis IL",
      title,
      description,
      locale: ogLocale[locale] ?? "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  // Required in next-intl v4 for server components to resolve the correct locale
  setRequestLocale(locale);

  const messages = await getMessages();

  type Messages = Record<string, Record<string, string>>;
  const nav = (messages as Messages).nav as {
    home: string;
    about: string;
    projects: string;
    insights: string;
    labs: string;
    expertise: string;
    architectures: string;
    roadmap: string;
  };
  const footer = (messages as Messages).footer;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: locale === "ru" ? "Денис Илющихин" : "Denis Il",
    jobTitle: locale === "ru" ? "Data Engineer, Data Analyst и AI Automation" : localeTitles[locale]?.split(" — ")[1] ?? "AI-Native Data Platform Engineer",
    description: localeDescriptions[locale] ?? localeDescriptions.en,
    url: `${SITE_URL}/${locale}`,
    email: "deniks.il88@gmail.com",
    knowsAbout: [
      "Data Engineering",
      "Analytics Engineering",
      "AI-Native Systems",
      "Data Warehousing",
      "ClickHouse",
      "dbt",
      "Apache Airflow",
      "LangChain",
      "Apache Iceberg",
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <Script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale={locale as Locale} t={nav} />
      <main>{children}</main>
      <Footer
        locale={locale as Locale}
        tagline={footer.tagline}
        rights={footer.rights}
      />
    </NextIntlClientProvider>
  );
}
