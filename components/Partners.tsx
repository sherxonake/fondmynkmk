"use client";

import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import type { PartnerItem } from "@/types";

interface PartnersProps {
  items: PartnerItem[];
}

export function Partners({ items }: PartnersProps) {
  return (
    <section
      className="relative overflow-hidden bg-[var(--color-primary-light)] py-20 lg:py-28"
      aria-labelledby="partners-heading"
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
            Hamkorlik
          </p>
          <h3
            id="partners-heading"
            className="text-2xl font-bold text-[var(--color-text-dark)] md:text-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ta{"'"}sischilar va hamkor tashkilotlar
          </h3>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-5">
          {items.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-center gap-3 rounded-full border border-[var(--color-primary-dark)]/10 bg-[var(--color-white)] px-6 py-3 shadow-sm transition-all duration-300 hover:border-[var(--color-accent-gold)]/40 hover:shadow-md"
            >
              <Building2
                className="h-5 w-5 shrink-0 text-[var(--color-accent-gold)] transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-[var(--color-text-dark)] md:text-base">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
