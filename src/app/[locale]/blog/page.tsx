import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-content-primary)]">
          Blog
        </h1>
        <p className="mt-4 text-[var(--color-content-secondary)]">Coming soon.</p>
      </Container>
    </Section>
  );
}
