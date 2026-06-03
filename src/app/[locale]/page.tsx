import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { ProfessionalJourney } from "@/components/home/ProfessionalJourney";
import { AboutSection } from "@/components/home/AboutSection";
import { WhatIBuild } from "@/components/home/WhatIBuild";
import { EngineeringPhilosophy } from "@/components/home/EngineeringPhilosophy";
import { TechStack } from "@/components/home/TechStack";
import { CurrentFocus } from "@/components/home/CurrentFocus";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { EngineeringInsights } from "@/components/home/EngineeringInsights";
import { FeaturedArchitectures } from "@/components/home/FeaturedArchitectures";
import { ContactCTA } from "@/components/home/ContactCTA";
import { projects, localizeProjects } from "@/data/projects";
import { insights, localizeInsights } from "@/data/insights";
import { locales, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tHero, tJourney, tAbout, tBuild, tPhilosophy, tStack, tFocus, tProjects, tInsights, tArchitectures, tContact] = await Promise.all([
    getTranslations("hero"),
    getTranslations("journey"),
    getTranslations("about"),
    getTranslations("build"),
    getTranslations("philosophy"),
    getTranslations("stack"),
    getTranslations("focus"),
    getTranslations("projects"),
    getTranslations("insightsPage"),
    getTranslations("featuredArchitectures"),
    getTranslations("contact"),
  ]);

  return (
    <>
      <Hero
        t={{
          label: tHero("label"),
          greeting: tHero("greeting"),
          typed: tHero("typed"),
          rest: tHero("rest"),
          subtitle: tHero("subtitle"),
          cta: tHero("cta"),
          ctaSecondary: tHero("ctaSecondary"),
        }}
      />

      <ProfessionalJourney
        t={{
          label: tJourney("label"),
          current: tJourney("current"),
          company: tJourney("company"),
          role: tJourney("role"),
          responsibilities: [0, 1, 2, 3, 4, 5].map((i) => tJourney(`responsibilities.${i}`)),
          evolutionLabel: tJourney("evolutionLabel"),
          steps: [0, 1, 2, 3].map((i) => ({
            title: tJourney(`steps.${i}.title`),
            note: tJourney(`steps.${i}.note`),
          })),
        }}
      />

      <AboutSection
        t={{
          label: tAbout("label"),
          heading: tAbout("heading"),
          bio: tAbout("bio"),
          domains: [
            tAbout("domains.0"),
            tAbout("domains.1"),
            tAbout("domains.2"),
            tAbout("domains.3"),
          ],
          availability: tAbout("availability"),
        }}
      />

      <WhatIBuild
        t={{
          label: tBuild("label"),
          items: [0, 1, 2, 3].map((i) => ({
            title: tBuild(`items.${i}.title`),
            description: tBuild(`items.${i}.description`),
          })),
        }}
      />

      <EngineeringPhilosophy
        t={{
          label: tPhilosophy("label"),
          axiom: tPhilosophy("axiom"),
          axiomSub: tPhilosophy("axiomSub"),
          pillars: [0, 1, 2, 3].map((i) => ({
            title: tPhilosophy(`pillars.${i}.title`),
            body: tPhilosophy(`pillars.${i}.body`),
          })),
        }}
      />

      <TechStack
        t={{
          label: tStack("label"),
          heading: tStack("heading"),
          description: tStack("description"),
          categories: {
            dataEng: tStack("categories.dataEng"),
            lakehouse: tStack("categories.lakehouse"),
            ai: tStack("categories.ai"),
            analytics: tStack("categories.analytics"),
          },
        }}
      />

      <CurrentFocus
        t={{
          label: tFocus("label"),
          heading: tFocus("heading"),
          items: [0, 1, 2, 3, 4].map((i) => tFocus(`items.${i}`)),
        }}
      />

      <FeaturedWork
        locale={locale}
        projects={localizeProjects(tProjects, projects)}
        t={{
          label: tProjects("previewLabel"),
          heading: tProjects("previewHeading"),
          description: tProjects("previewDescription"),
          viewAll: tProjects("viewAll"),
        }}
      />

      <EngineeringInsights
        locale={locale}
        articles={localizeInsights(
          (key) => tInsights(key),
          (key) => tInsights.raw(key),
          insights
        )}
        t={{
          label: tInsights("label"),
          heading: tInsights("heading"),
          description: tInsights("description"),
          viewAll: "All Articles",
          readTime: tInsights("readTime"),
        }}
      />

      <FeaturedArchitectures
        locale={locale}
        architectures={[
          {
            slug: "ai-native-analytics-platform",
            title: "AI-Native Analytics Platform",
            description: "A governed data platform designed specifically for AI reasoning — semantic layer as the contract between data and AI.",
            tags: ["Apache Iceberg", "dbt", "Semantic Layer", "Claude"],
            steps: [
              { type: "source", label: "Raw Data", sublabel: "Operational Systems · Event Streams" },
              { type: "warehouse", label: "Apache Iceberg", sublabel: "ACID · Schema Evolution · Time Travel", connectorLabel: "transform" },
              { type: "dbt", label: "dbt", sublabel: "Medallion Layers · Metric Contracts", connectorLabel: "govern" },
              { type: "semantic", label: "Semantic Layer", sublabel: "Business Context · Governed Metrics", connectorLabel: "reason" },
              { type: "ai-agent", label: "AI Analyst", sublabel: "Claude · Explainable Answers", connectorLabel: "deliver" },
            ],
          },
          {
            slug: "medallion-architecture",
            title: "Medallion Architecture",
            description: "The dbt-enforced three-layer data model that separates raw ingestion from transformation from business logic.",
            tags: ["dbt", "Raw", "Staging", "Mart"],
            steps: [
              { type: "source", label: "Source Systems", sublabel: "Databases · APIs · Event Streams" },
              { type: "warehouse", label: "Raw Layer", sublabel: "Insert-only · Full history", connectorLabel: "clean" },
              { type: "dbt", label: "Staging Layer", sublabel: "Typed · Deduplicated", connectorLabel: "model" },
              { type: "semantic", label: "Mart Layer", sublabel: "Business logic · Governed metrics", connectorLabel: "serve" },
              { type: "dashboard", label: "Consumers", sublabel: "BI tools · AI agents" },
            ],
          },
        ]}
        t={{
          label: tArchitectures("label"),
          heading: tArchitectures("heading"),
          description: tArchitectures("description"),
          viewAll: tArchitectures("viewAll"),
        }}
      />

      <ContactCTA
        t={{
          label: tContact("label"),
          heading: tContact("heading"),
          description: tContact("description"),
          email: tContact("email"),
          linkedin: tContact("linkedin"),
        }}
      />
    </>
  );
}
