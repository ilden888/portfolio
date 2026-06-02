import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("projects");

  const items = [0, 1, 2, 3, 4].map((i) => ({
    slug: t(`items.${i}.slug`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    tags: [t(`items.${i}.tags.0`), t(`items.${i}.tags.1`), t(`items.${i}.tags.2`)],
    category: t(`items.${i}.category`),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[120px] pb-16 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/4 top-0"
            style={{
              width: 600,
              height: 400,
              background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
        <Container>
          <div className="flex flex-col gap-5 max-w-[600px]">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/25">
              {t("label")}
            </span>
            <h1
              className="font-semibold leading-[1.0] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              {t("heading")}
            </h1>
            <p className="text-[16px] leading-relaxed text-white/40">{t("description")}</p>
          </div>
        </Container>
      </section>

      {/* Projects grid with filter */}
      <Section size="sm" className="border-t border-white/[0.04]">
        <Container>
          <ProjectsGrid
            items={items}
            comingSoon={t("comingSoon")}
            filters={{
              all: t("filterAll"),
              aiAgent: t("filterAiAgent"),
              dataPlatform: t("filterDataPlatform"),
              realtime: t("filterRealtime"),
              analytics: t("filterAnalytics"),
              telemetry: t("filterTelemetry"),
            }}
          />
        </Container>
      </Section>
    </>
  );
}
