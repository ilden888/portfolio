import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { WhatIBuild } from "@/components/home/WhatIBuild";
import { TechStack } from "@/components/home/TechStack";
import { CurrentFocus } from "@/components/home/CurrentFocus";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ContactCTA } from "@/components/home/ContactCTA";
import { featuredProjects, localizeProjects } from "@/data/projects";
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

  const [tHero, tAbout, tBuild, tStack, tFocus, tProjects, tContact] = await Promise.all([
    getTranslations("hero"),
    getTranslations("about"),
    getTranslations("build"),
    getTranslations("stack"),
    getTranslations("focus"),
    getTranslations("projects"),
    getTranslations("contact"),
  ]);

  return (
    <>
      <Hero
        t={{
          label: tHero("label"),
          title: tHero("title"),
          subtitle: tHero("subtitle"),
          cta: tHero("cta"),
          ctaSecondary: tHero("ctaSecondary"),
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
        projects={localizeProjects(tProjects, featuredProjects)}
        t={{
          label: tProjects("previewLabel"),
          heading: tProjects("previewHeading"),
          description: tProjects("previewDescription"),
          viewAll: tProjects("viewAll"),
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
