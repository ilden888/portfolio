import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] rounded-[var(--radius-md)]",
  secondary:
    "bg-[var(--color-bg-elevated)] text-[var(--color-content-primary)] hover:bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)]",
  outline:
    "border border-[var(--color-border)] text-[var(--color-content-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-content-primary)] rounded-[var(--radius-md)]",
  ghost:
    "text-[var(--color-content-secondary)] hover:text-[var(--color-content-primary)] hover:bg-[var(--color-bg-elevated)] rounded-[var(--radius-md)]",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-sm px-6 py-3",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, href, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
