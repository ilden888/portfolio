"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { staggerContainer, staggerContainerFast } from "@/lib/motion-variants";

interface StaggerChildrenProps {
  children: ReactNode;
  fast?: boolean;
  className?: string;
  once?: boolean;
}

export function StaggerChildren({
  children,
  fast = false,
  className,
  once = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={fast ? staggerContainerFast : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-64px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
