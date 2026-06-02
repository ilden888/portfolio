"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/lib/i18n/config";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  es: "ES",
};

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(locale: Locale) {
    // Replace the locale prefix in the path
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          <button
            onClick={() => switchLocale(locale)}
            className={cn(
              "text-xs font-mono transition-colors duration-200 px-1 py-0.5 rounded",
              locale === currentLocale
                ? "text-[var(--color-content-primary)]"
                : "text-[var(--color-content-muted)] hover:text-[var(--color-content-secondary)]"
            )}
          >
            {localeLabels[locale]}
          </button>
          {i < locales.length - 1 && (
            <span className="text-[var(--color-border)] text-xs select-none">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
