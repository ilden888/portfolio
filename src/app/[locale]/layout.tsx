import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { locales, type Locale } from "@/lib/i18n/config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://denisil.dev";

const localeDescriptions: Record<string, string> = {
  en: "I build AI-native analytics systems — from scalable data platforms to autonomous AI agents.",
  ru: "Строю AI-native аналитические системы — от масштабируемых data-платформ до автономных AI-агентов.",
  es: "Construyo sistemas analíticos AI-native — desde plataformas de datos escalables hasta agentes IA autónomos.",
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
  const description = localeDescriptions[locale] ?? localeDescriptions.en;
  const title = "Denis IL — AI-Native Data Platform Engineer";
  const url = `${SITE_URL}/${locale}`;

  return {
    title: {
      default: title,
      template: "%s | Denis IL",
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
    labs: string;
    expertise: string;
    architectures: string;
    roadmap: string;
  };
  const footer = (messages as Messages).footer;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Denis IL",
    jobTitle: "AI-Native Data Platform Engineer",
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
