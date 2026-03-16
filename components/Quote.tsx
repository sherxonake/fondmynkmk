"use client";

import { motion } from "framer-motion";
import type { QuoteData } from "@/types";

interface QuoteProps {
  data: QuoteData;
}

export function Quote({ data }: QuoteProps) {
  return (
    <section
      className="relative overflow-hidden bg-[var(--color-primary-dark)] py-24 lg:py-32"
      aria-label="Rahbariyat iqtibosi"
    >
      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="quote-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quote-grid)" />
        </svg>
      </div>

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-[var(--color-accent-gold)] opacity-[0.08] blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[var(--color-accent-gold)] opacity-[0.06] blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mb-8"
          aria-hidden="true"
        >
          <span
            className="block text-center text-[8rem] font-black leading-none text-[var(--color-accent-gold)]/20 md:text-[10rem]"
            style={{ lineHeight: 0.7 }}
          >
            {"\u201C"}
          </span>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-balance text-2xl leading-relaxed font-light text-[var(--color-text-light)] md:text-3xl lg:text-4xl lg:leading-snug">
            {data.text}
          </p>

          <footer className="mt-10">
            <div className="mx-auto mb-5 h-0.5 w-16 rounded-full bg-[var(--color-accent-gold)]/40" aria-hidden="true" />
            <cite className="text-lg font-semibold not-italic tracking-wide text-[var(--color-accent-gold)]">
              {data.author}
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
