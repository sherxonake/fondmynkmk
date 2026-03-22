"use client";

import { HeartPulse, TreePine, Palette } from "lucide-react";
import { motion } from "framer-motion";
import type { DirectionItem } from "@/types";

interface DirectionsProps {
  items: DirectionItem[];
}

const iconMap = {
  HeartPulse,
  TreePine,
  Palette,
} as const;

function DirectionCard({ item, index }: { item: DirectionItem; index: number }) {
  const Icon = iconMap[item.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-[var(--color-white)] p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:p-10"
    >
      {/* Large background number */}
      <span
        className="pointer-events-none absolute top-4 right-6 text-[7rem] font-black leading-none text-[var(--color-primary-dark)]/[0.04] transition-all duration-300 group-hover:text-[var(--color-primary-dark)]/[0.07]"
        aria-hidden="true"
      >
        {item.number}
      </span>

      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary-light)] transition-all duration-300 group-hover:bg-[var(--color-accent-gold)]/15">
        <Icon
          className="h-8 w-8 text-[var(--color-accent-gold)] transition-all duration-300 group-hover:text-[var(--color-primary-dark)] group-hover:scale-110"
          aria-hidden="true"
          strokeWidth={1.75}
        />
      </div>

      <h3
        className="relative z-10 mt-7 text-xl font-bold text-[var(--color-text-dark)] lg:text-2xl"
        style={{ letterSpacing: "-0.02em" }}
      >
        {item.title}
      </h3>

      <p className="relative z-10 mt-4 leading-relaxed text-[var(--color-text-dark)]/60">
        {item.description}
      </p>

      <div className="mt-auto pt-6" aria-hidden="true">
        <div className="h-1 w-12 rounded-full bg-[var(--color-accent-gold)]/30 transition-all duration-300 group-hover:w-20 group-hover:bg-[var(--color-accent-gold)]" />
      </div>
    </motion.article>
  );
}

export function Directions({ items }: DirectionsProps) {
  return (
    <section
      id="directions"
      className="relative bg-[var(--color-primary-light)] py-24 lg:py-32"
      aria-labelledby="directions-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--color-accent-gold)] uppercase">
            Faoliyat
          </p>
          <h2
            id="directions-heading"
            className="text-3xl font-bold text-[var(--color-text-dark)] md:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Faoliyat yo{"'"}nalishlari
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--color-text-dark)]/50">
            NKMK Jamg{"'"}armasi xodimlarni asosiy yo{"'"}nalishlar bo{"'"}yicha har tomonlama qo{"'"}llab-quvvatlaydi
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => (
            <DirectionCard key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
