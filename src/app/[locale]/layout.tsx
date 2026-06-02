import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { locales, type Locale } from "@/lib/i18n/config";

export const metadata: Metadata = {
  title: {
    default: "Denis IL — AI-Native Data Platform Engineer",
    template: "%s | Denis IL",
  },
  description:
    "Building analytics systems where AI makes decisions, not just dashboards. AI-native data platform engineering.",
  keywords: [
    "AI analytics",
    "data platform",
    "ClickHouse",
    "dbt",
    "LangChain",
    "data engineering",
    "AI-native BI",
  ],
};

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
    lab: string;
    blog: string;
  };
  const footer = (messages as Messages).footer;

  return (
    <NextIntlClientProvider messages={messages}>
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
