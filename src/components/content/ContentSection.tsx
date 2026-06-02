import { type ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  size?: "default" | "sm" | "lg";
}

export function ContentSection({
  children,
  className,
  containerClassName,
  size = "default",
}: ContentSectionProps) {
  return (
    <Section size={size} className={cn("border-t border-[var(--border-subtle)]", className)}>
      <Container className={containerClassName}>{children}</Container>
    </Section>
  );
}
