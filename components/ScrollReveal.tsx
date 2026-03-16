"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  /** Uses stagger children animation */
  stagger?: boolean;
  /** Delay before animation starts */
  delay?: number;
}

export function ScrollReveal({
  children,
  className,
  as = "div",
  stagger = false,
  delay = 0,
}: ScrollRevealProps) {
  const Component = motion.create(as);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={
        stagger
          ? staggerContainer
          : {
              hidden: { opacity: 0, y: 32 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay,
                },
              },
            }
      }
      className={className}
    >
      {children}
    </Component>
  );
}

export function ScrollRevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={revealVariants} className={className}>
      {children}
    </motion.div>
  );
}
