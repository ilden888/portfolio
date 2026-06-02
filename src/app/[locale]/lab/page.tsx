import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const tagColors: Record<string, string> = {
  Research: "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  Prototype: "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  Experiment: "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
  "Исследование": "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  "Прототип": "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  "Эксперимент": "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
  "Investigación": "text-cyan-400/70 border-cyan-400/20 bg-cyan-400/[0.04]",
  "Prototipo": "text-amber-400/70 border-amber-400/20 bg-amber-400/[0.04]",
  "Experimento": "text-indigo-400/70 border-indigo-400/20 bg-indigo-400/[0.04]",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function LabPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("labs");

  const items = [0, 1, 2].map((i) => ({
    slug: t(`items.${i}.slug`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    longDescription: t(`items.${i}.longDescription`),
    tag: t(`items.${i}.tag`),
    tags: [t(`items.${i}.tags.0`), t(`items.${i}.tags.1`), t(`items.${i}.tags.2`)],
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[120px] pb-16 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute right-1/4 top-0"
            style={{
              width: 500,
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

      {/* Lab items */}
      <Section size="sm" className="border-t border-white/[0.04]">
        <Container>
          <div className="flex flex-col gap-6">
            {items.map((item, i) => {
              const colorClass = tagColors[item.tag] ?? "text-white/40 border-white/[0.08] bg-white/[0.02]";
              return (
                <div
                  key={item.slug}
                  className="group flex flex-col gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 hover:border-white/[0.1] hover:bg-white/[0.025] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl font-semibold tracking-[-0.02em] text-white/85">
                        {item.title}
                      </h2>
                    </div>
                    <span className={`inline-flex shrink-0 items-center self-start rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider ${colorClass}`}>
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-[15px] leading-relaxed text-white/50 max-w-[680px]">
                    {item.longDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.05]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 font-mono text-[12px] text-white/35"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
