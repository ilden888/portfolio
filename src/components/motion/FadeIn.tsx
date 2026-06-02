"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { fadeUpVariant, fadeInVariant, fadeDownVariant } from "@/lib/motion-variants";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration,
  className,
  once = true,
}: FadeInProps) {
  const base =
    direction === "up"
      ? fadeUpVariant
      : direction === "down"
        ? fadeDownVariant
        : fadeInVariant;

  const variant = duration
    ? {
        hidden: base.hidden,
        visible: {
          ...(base.visible as object),
          transition: { ...(base.visible as { transition: object }).transition, duration, delay },
        },
      }
    : delay
      ? {
          hidden: base.hidden,
          visible: {
            ...(base.visible as object),
            transition: { ...(base.visible as { transition: object }).transition, delay },
          },
        }
      : base;

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-64px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
