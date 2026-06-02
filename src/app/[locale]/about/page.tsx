import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { locales } from "@/lib/i18n/config";

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
  const tContact = await getTranslations("contact");

  const whatIDoItems = [0, 1, 2, 3, 4].map((i) => ({
    title: t(`whatIDo.items.${i}.title`),
    description: t(`whatIDo.items.${i}.description`),
  }));

  const principles = [0, 1, 2].map((i) => ({
    title: t(`approach.principles.${i}.title`),
    description: t(`approach.principles.${i}.description`),
  }));

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-[120px] pb-20 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: 700,
              height: 500,
              background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <Container>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            {/* Left */}
            <div className="flex flex-col gap-6 flex-1">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/25">
                {t("role")}
              </span>
              <h1
                className="font-semibold leading-[1.0] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
              >
                {t("title")}
              </h1>
              <p className="max-w-[520px] text-[16px] leading-relaxed text-white/45">
                {t("bio")}
              </p>

              {/* Availability */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-sm text-white/50">{t("availability.status")}</span>
                <span className="text-[13px] text-white/25">—</span>
                <span className="text-[13px] text-white/35">{t("availability.description")}</span>
              </div>
            </div>

            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    transform: "scale(1.1)",
                  }}
                />
                <div className="relative h-[220px] w-[220px] overflow-hidden rounded-2xl border border-white/[0.1]">
                  <Image
                    src="/avatar.png"
                    alt="Denis IL"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── What I Build ── */}
      <Section className="border-t border-white/[0.04]">
        <Container>
          <div className="flex flex-col gap-10">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/25">
              {t("whatIDo.label")}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatIDoItems.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 hover:border-white/[0.1] hover:bg-white/[0.025] transition-all duration-200"
                >
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white/85">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/35">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Approach ── */}
      <Section className="border-t border-white/[0.04]">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5 max-w-[560px]">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/25">
                {t("approach.label")}
              </span>
              <h2
                className="font-semibold leading-[1.1] tracking-[-0.03em] text-white"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
              >
                {t("approach.heading")}
              </h2>
              <p className="text-[16px] leading-relaxed text-white/40 italic border-l-2 border-indigo-500/40 pl-5">
                {t("approach.text")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {principles.map((p, i) => (
                <div key={i} className="flex flex-col gap-3 p-6 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/60" />
                    <h3 className="text-[14px] font-semibold text-white/80">{p.title}</h3>
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/35">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Contact CTA ── */}
      <Section size="sm" className="border-t border-white/[0.04]">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/25">
                {tContact("label")}
              </span>
              <p className="text-[16px] text-white/60">{tContact("description")}</p>
            </div>
            <a
              href="mailto:deniks.il88@gmail.com"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              <Mail size={14} />
              {tContact("email")}
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
