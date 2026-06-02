import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "@/lib/i18n/config";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBackground } from "@/components/about/AboutBackground";
import { AboutEvolution } from "@/components/about/AboutEvolution";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutLearning } from "@/components/about/AboutLearning";
import { AboutVision } from "@/components/about/AboutVision";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aboutPage");

  const hero = {
    eyebrow: t("hero.eyebrow"),
    tagline: t("hero.tagline"),
    availability: t("hero.availability"),
  };

  const background = {
    label: t("background.label"),
    current: t("background.current"),
    company: t("background.company"),
    role: t("background.role"),
    focusLabel: t("background.focusLabel"),
    focus: [0, 1, 2, 3].map((i) => t(`background.focus.${i}`)),
    story: t("background.story"),
  };

  const evolution = {
    label: t("evolution.label"),
    steps: [0, 1, 2, 3].map((i) => ({
      title: t(`evolution.steps.${i}.title`),
      note: t(`evolution.steps.${i}.note`),
    })),
  };

  const philosophy = {
    label: t("philosophy.label"),
    principles: [0, 1, 2].map((i) => ({
      statement: t(`philosophy.principles.${i}.statement`),
      sub: t(`philosophy.principles.${i}.sub`),
    })),
  };

  const learning = {
    label: t("learning.label"),
    intro: t("learning.intro"),
    topics: [0, 1, 2, 3, 4].map((i) => t(`learning.topics.${i}`)),
  };

  const vision = {
    label: t("vision.label"),
    heading: t("vision.heading"),
    text: t("vision.text"),
    cta: t("vision.cta"),
  };

  return (
    <>
      <AboutHero t={hero} />
      <AboutBackground t={background} />
      <AboutEvolution t={evolution} />
      <AboutPhilosophy t={philosophy} />
      <AboutLearning t={learning} />
      <AboutVision t={vision} email="deniks.il88@gmail.com" />
    </>
  );
}
