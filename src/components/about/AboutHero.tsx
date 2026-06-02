"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const ease = [0.22, 1, 0.36, 1] as const;

interface AboutHeroProps {
  t: {
    eyebrow: string;
    tagline: string;
    availability: string;
  };
}

export function AboutHero({ t }: AboutHeroProps) {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden pb-24 pt-[120px]">
      {/* Atmospheric background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(var(--foreground) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Primary glow */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: 900,
            height: 650,
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.11) 0%, transparent 68%)",
            filter: "blur(60px)",
          }}
        />
        {/* Drifting orb */}
        <motion.div
          animate={{
            x: [0, 24, -14, 0],
            y: [0, -18, 12, 0],
            scale: [1, 1.06, 0.96, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[28%]"
          style={{
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.055) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <Container>
        <div className="flex max-w-[820px] flex-col gap-9">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--fg-25)]"
          >
            {t.eyebrow}
          </motion.span>

          {/* Name — the hero statement */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.07 }}
            className="font-semibold leading-[1.0] tracking-[-0.04em] text-[var(--foreground)]"
            style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)" }}
          >
            Denis IL
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.15 }}
            className="max-w-[520px] text-[17px] leading-relaxed text-[var(--fg-45)]"
          >
            {t.tagline}
          </motion.p>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.24 }}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-[13px] text-[var(--fg-50)]">{t.availability}</span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
