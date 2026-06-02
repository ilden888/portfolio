"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink } from "./NavLink";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  t: {
    home: string;
    about: string;
    projects: string;
    lab: string;
    blog: string;
  };
  locale: Locale;
}

export function MobileNav({ t, locale }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/projects`, label: t.projects },
    { href: `/${locale}/lab`, label: t.lab },
    { href: `/${locale}/blog`, label: t.blog },
  ];

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-[var(--color-content-secondary)] hover:text-[var(--color-content-primary)] transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-0 z-40 bg-[var(--color-bg-primary)]",
              "flex flex-col pt-24 pb-12 px-8"
            )}
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
              className="flex flex-col gap-2"
            >
              {links.map(({ href, label }) => (
                <motion.div
                  key={href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <NavLink
                    href={href}
                    onClick={() => setOpen(false)}
                    className="text-3xl font-semibold tracking-tight py-2"
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>

            <div className="mt-auto">
              <LocaleSwitcher currentLocale={locale} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
