"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { revealVariant } from "@/lib/motion-variants";

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealText({ children, delay = 0, className }: RevealTextProps) {
  const variant = delay
    ? {
        hidden: revealVariant.hidden,
        visible: {
          ...(revealVariant.visible as object),
          transition: {
            ...(revealVariant.visible as { transition: object }).transition,
            delay,
          },
        },
      }
    : revealVariant;

  return (
    <motion.span
      variants={variant}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}
