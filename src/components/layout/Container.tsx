import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  variant?: "default" | "narrow" | "wide" | "full";
  className?: string;
  as?: ElementType;
}

const variants = {
  default: "max-w-[1120px] mx-auto px-6 md:px-10",
  narrow: "max-w-[720px] mx-auto px-6 md:px-10",
  wide: "max-w-[1440px] mx-auto px-6 md:px-10",
  full: "w-full px-6 md:px-10",
};

export function Container({
  children,
  variant = "default",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
}
