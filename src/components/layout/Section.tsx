import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: ElementType;
  size?: "default" | "sm" | "lg";
}

const sizes = {
  sm: "py-16 md:py-20",
  default: "py-24 md:py-32",
  lg: "py-32 md:py-40",
};

export function Section({ children, id, className, as: Tag = "section", size = "default" }: SectionProps) {
  return (
    <Tag id={id} className={cn(sizes[size], className)}>
      {children}
    </Tag>
  );
}
