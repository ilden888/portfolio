"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TypewriterText } from "@/components/motion/TypewriterText";

const ease = [0.22, 1, 0.36, 1] as const;

function item(delay: number) {
  return {
    initial: { opacity: 0, y: 20, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, ease, delay },
  };
}

interface HeroProps {
  t: {
    label: string;
    greeting: string;
    typed: string;
    rest: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
}

export function Hero({ t }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--background)]">

      {/* ── Atmosphere ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 900,
            height: 900,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "orb-drift 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute inset-[-50%] h-[200%] w-[200%] opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            animation: "noise 0.4s steps(2) infinite",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col items-center px-6 text-center md:px-10">

        {/* Avatar + Status badge */}
        <motion.div {...item(0.05)} className="mb-8 flex flex-col items-center gap-4">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)",
                filter: "blur(12px)",
                transform: "scale(1.15)",
              }}
            />
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-[var(--border-12)] ring-1 ring-[var(--border-6)]">
              <Image
                src="/avatar.png"
                alt="Denis IL"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-3)] px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-[var(--fg-40)]">
              {t.label}
            </span>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          {...item(0.15)}
          className="mb-3 font-mono text-[var(--fg-35)]"
          style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)" }}
        >
          {t.greeting}
        </motion.p>

        {/* Typed headline */}
        <motion.div {...item(0.25)} className="mb-2">
          <h1
            className="font-sans font-semibold leading-[1.05] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)" }}
          >
            <TypewriterText
              text={t.typed}
              startDelay={600}
              speed={60}
              className="inline"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            />
          </h1>
        </motion.div>

        {/* Static continuation */}
        <motion.h2
          {...item(0.3)}
          className="mb-8 font-sans font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--foreground)]"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", whiteSpace: "pre-line" }}
        >
          {t.rest}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          {...item(0.38)}
          className="mb-10 max-w-[520px] leading-relaxed text-[var(--fg-40)]"
          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div {...item(0.46)} className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-[var(--primary-foreground)] transition-all duration-200 hover:opacity-90 hover:gap-3"
          >
            {t.cta}
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-10)] bg-[var(--surface-3)] px-6 py-2.5 text-sm font-medium text-[var(--fg-60)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--border-20)] hover:text-[var(--fg-90)]"
          >
            {t.ctaSecondary}
          </Link>
        </motion.div>

        {/* Tech strip */}
        <motion.div
          {...item(0.55)}
          className="mt-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {["ClickHouse", "dbt", "Airflow", "Iceberg", "Kafka", "Claude", "LangChain", "RAG"].map(
            (tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] tracking-wider text-[var(--fg-20)] transition-colors duration-200 hover:text-[var(--fg-50)]"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="h-12 w-px"
          style={{
            background: `linear-gradient(to bottom, transparent, var(--fg-20))`,
            animation: "glow-pulse 2.5s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
