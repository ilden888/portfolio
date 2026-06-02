"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm transition-colors duration-200",
        isActive
          ? "text-[var(--foreground)]"
          : "text-[var(--fg-40)] hover:text-[var(--fg-80)]",
        className
      )}
    >
      {children}
    </Link>
  );
}
