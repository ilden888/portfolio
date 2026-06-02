"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

const icons = { dark: Moon, light: Sun, system: Monitor } as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-8 w-8" />;

  function cycle() {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  }

  const Icon = icons[(theme as keyof typeof icons) ?? "dark"] ?? Moon;
  const labels = { dark: "Switch to light", light: "Switch to system", system: "Switch to dark" };
  const label = labels[(theme as keyof typeof labels) ?? "dark"] ?? "Toggle theme";

  return (
    <button
      onClick={cycle}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--fg-40)] transition-colors duration-200 hover:text-[var(--foreground)]"
    >
      <Icon size={15} strokeWidth={1.75} />
    </button>
  );
}
