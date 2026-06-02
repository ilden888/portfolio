import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { PhilosophyBlock } from "@/components/home/PhilosophyBlock";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { TechStack } from "@/components/home/TechStack";
import { LabsPreview } from "@/components/home/LabsPreview";
import { CurrentFocus } from "@/components/home/CurrentFocus";
import { ContactCTA } from "@/components/home/ContactCTA";
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

  const [tHero, tAbout, tPhilosophy, tProjects, tStack, tLabs, tFocus, tContact] =
    await Promise.all([
      getTranslations("hero"),
      getTranslations("about"),
      getTranslations("philosophy"),
      getTranslations("projects"),
      getTranslations("stack"),
      getTranslations("labs"),
      getTranslations("focus"),
      getTranslations("contact"),
    ]);

  return (
    <>
      <Hero
        locale={locale}
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
          statement: tAbout("statement"),
          description: tAbout("description"),
          expertise: [
            tAbout("expertise.0"),
            tAbout("expertise.1"),
            tAbout("expertise.2"),
            tAbout("expertise.3"),
            tAbout("expertise.4"),
          ],
        }}
      />

      <PhilosophyBlock
        t={{
          label: tPhilosophy("label"),
          heading: tPhilosophy("heading"),
          description: tPhilosophy("description"),
          traditional: {
            label: tPhilosophy("traditional.label"),
            flow: [
              tPhilosophy("traditional.flow.0"),
              tPhilosophy("traditional.flow.1"),
              tPhilosophy("traditional.flow.2"),
            ],
          },
          ainative: {
            label: tPhilosophy("ainative.label"),
            flow: [
              tPhilosophy("ainative.flow.0"),
              tPhilosophy("ainative.flow.1"),
              tPhilosophy("ainative.flow.2"),
              tPhilosophy("ainative.flow.3"),
              tPhilosophy("ainative.flow.4"),
            ],
          },
        }}
      />

      <FeaturedWork
        locale={locale}
        t={{
          label: tProjects("label"),
          heading: tProjects("heading"),
          description: tProjects("description"),
          comingSoon: tProjects("comingSoon"),
          viewAll: tProjects("viewAll"),
          items: [0, 1, 2, 3, 4].map((i) => ({
            title: tProjects(`items.${i}.title`),
            description: tProjects(`items.${i}.description`),
            tags: [
              tProjects(`items.${i}.tags.0`),
              tProjects(`items.${i}.tags.1`),
              tProjects(`items.${i}.tags.2`),
            ],
            category: tProjects(`items.${i}.category`),
          })),
        }}
      />

      <TechStack
        t={{
          label: tStack("label"),
          heading: tStack("heading"),
          description: tStack("description"),
          categories: {
            data: tStack("categories.data"),
            ai: tStack("categories.ai"),
            orchestration: tStack("categories.orchestration"),
          },
        }}
      />

      <LabsPreview
        locale={locale}
        t={{
          label: tLabs("label"),
          heading: tLabs("heading"),
          description: tLabs("description"),
          items: [0, 1, 2].map((i) => ({
            title: tLabs(`items.${i}.title`),
            description: tLabs(`items.${i}.description`),
            tag: tLabs(`items.${i}.tag`),
          })),
        }}
      />

      <CurrentFocus
        t={{
          label: tFocus("label"),
          heading: tFocus("heading"),
          items: [
            tFocus("items.0"),
            tFocus("items.1"),
            tFocus("items.2"),
          ],
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
