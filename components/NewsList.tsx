"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NewsArticle } from "@/types";

interface NewsListProps {
  items: NewsArticle[];
}

function NewsCard({ item, index }: { item: NewsArticle; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[var(--color-white)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:flex-row"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:w-2/5">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
        <time className="mb-3 text-sm font-semibold text-[var(--color-accent-gold)]">{item.date}</time>
        <h3
          className="text-xl font-bold text-[var(--color-text-dark)] transition-colors duration-200 group-hover:text-[var(--color-primary-dark)] lg:text-2xl"
          style={{ letterSpacing: "-0.01em" }}
        >
          {item.title}
        </h3>
        <p className="mt-3 leading-relaxed text-[var(--color-text-dark)]/55">{item.excerpt}</p>
        <div className="mt-5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-gold)] transition-all duration-200 group-hover:gap-3">
            Batafsil
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function NewsList({ items }: NewsListProps) {
  return (
    <section
      id="news"
      className="bg-[var(--color-primary-light)] py-20 lg:py-28"
      aria-labelledby="news-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--color-accent-gold)] uppercase">
            Matbuot xizmati
          </p>
          <h2
            id="news-heading"
            className="text-3xl font-bold text-[var(--color-text-dark)] md:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            So{"'"}nggi yangiliklar
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {items.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
