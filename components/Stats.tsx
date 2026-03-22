"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Building2, Users, Map, List } from "lucide-react";
import type { StatItem } from "@/types";

interface StatsProps {
  items: StatItem[];
}

function AnimatedNumber({ target, isVisible, suffix }: { target: number; isVisible: boolean; suffix?: string }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  const formatNumber = (n: number) => {
    if (n >= 1000) {
      return `${Math.round(n / 1000)}K+`;
    }
    return n.toString();
  };

  useEffect(() => {
    if (!isVisible) return;
    
    const controls = animate(count, target, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1],
    });

    const unsubscribe = count.on("change", (value) => {
      const formatted = formatNumber(Math.round(value));
      setDisplay(formatted);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, target, isVisible]);

  return (
    <span aria-label={`${target}${suffix ?? ""}`}>
      {display}
      {suffix ?? ""}
    </span>
  );
}

const statColors = [
  "from-[#C5A572] to-[#B8945A]",
  "from-[#0B2B4F] to-[#163d6a]",
  "from-[#2E7D32] to-[#1B5E20]",
  "from-[#C5A572] to-[#B8945A]",
];

const statIcons = [Building2, Users, Map, List];

function StatShowcase({ item, isVisible, index }: { item: StatItem; isVisible: boolean; index: number }) {
  const Icon = statIcons[index] || Building2;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-8 lg:p-12"
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${statColors[index]} opacity-100 transition-all duration-500`}
      />

      {/* Decorative background number */}
      <span
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black leading-none text-[var(--color-text-light)]/[0.07] md:text-[14rem]"
        aria-hidden="true"
      >
        {item.value}
      </span>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-text-light)]/20 backdrop-blur-sm">
          <Icon className="h-8 w-8 text-[var(--color-text-light)]" aria-hidden="true" />
        </div>
        
        <span
          className={`font-black text-[var(--color-text-light)] ${
            item.value >= 100000 
              ? 'text-4xl md:text-5xl lg:text-[4rem]' 
              : item.value >= 10000
              ? 'text-5xl md:text-6xl lg:text-[5rem]'
              : 'text-6xl md:text-7xl lg:text-[6rem]'
          }`}
          style={{ letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          <AnimatedNumber target={item.value} isVisible={isVisible} suffix={item.suffix} />
        </span>

        <div className="mx-auto mt-5 mb-4 h-0.5 w-10 rounded-full bg-[var(--color-text-light)]/30" aria-hidden="true" />

        <span className="text-sm font-semibold tracking-wider text-[var(--color-text-light)]/80 uppercase md:text-base">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
}

export function Stats({ items }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0]?.isIntersecting) setIsVisible(true);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative overflow-hidden bg-[var(--color-white)] py-16 lg:py-20"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--color-accent-gold)] uppercase">
            Raqamlarda
          </p>
          <h2
            id="stats-heading"
            className="text-3xl font-bold text-[var(--color-text-dark)] md:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Asosiy ko{"'"}rsatkichlar
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {items.length > 0 ? (
            items.map((item, i) => (
              <StatShowcase key={item.label} item={item} isVisible={isVisible} index={i} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[var(--color-text-dark)]/50">Statistika yuklanmoqda...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
