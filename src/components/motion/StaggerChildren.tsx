"use client";

import { motion } from "framer-motion";
import { type ElementType, type ReactNode } from "react";
import { staggerContainer, staggerContainerFast } from "@/lib/motion-variants";

interface StaggerChildrenProps {
  children: ReactNode;
  fast?: boolean;
  className?: string;
  once?: boolean;
  as?: ElementType;
}

export function StaggerChildren({
  children,
  fast = false,
  className,
  once = true,
  as: Tag = "div",
}: StaggerChildrenProps) {
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      variants={fast ? staggerContainerFast : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-64px" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
