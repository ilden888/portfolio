"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "@/components/navigation/Nav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { LocaleSwitcher } from "@/components/navigation/LocaleSwitcher";
import { ThemeSwitcher } from "@/components/navigation/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n/config";

interface HeaderProps {
  locale: Locale;
  t: {
    home: string;
    about: string;
    projects: string;
    labs: string;
    expertise: string;
    blog: string;
  };
}

export function Header({ locale, t }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[60px] transition-all duration-500",
        scrolled
          ? "border-b border-[var(--border-6)] bg-[var(--bg-glass)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1120px] items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-mono text-sm font-semibold tracking-[0.2em] text-[var(--fg-90)] transition-colors duration-200 hover:text-[var(--foreground)]"
        >
          DENIS IL.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Nav t={t} locale={locale} />
          <div className="h-4 w-px bg-[var(--border)]" />
          <LocaleSwitcher currentLocale={locale} />
          <ThemeSwitcher />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3 relative z-50">
          <ThemeSwitcher />
          <MobileNav t={t} locale={locale} />
        </div>
      </div>
    </motion.header>
  );
}
