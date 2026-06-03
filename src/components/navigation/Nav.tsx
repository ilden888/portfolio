import { NavLink } from "./NavLink";
import { type Locale } from "@/lib/i18n/config";

interface NavProps {
  t: {
    home: string;
    about: string;
    projects: string;
    labs: string;
    expertise: string;
    architectures: string;
    roadmap: string;
  };
  locale: Locale;
  onLinkClick?: () => void;
}

export function Nav({ t, locale, onLinkClick }: NavProps) {
  const links = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/projects`, label: t.projects },
    { href: `/${locale}/labs`, label: t.labs },
    { href: `/${locale}/expertise`, label: t.expertise },
    { href: `/${locale}/architectures`, label: t.architectures },
    { href: `/${locale}/roadmap`, label: t.roadmap },
  ];

  return (
    <nav className="flex items-center gap-6">
      {links.map(({ href, label }) => (
        <NavLink key={href} href={href} onClick={onLinkClick}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
