'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NewsArticle } from "@/types";

interface NewsGridProps {
  items: NewsArticle[];
}

const DATE_FORMATTER = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const NEWS_PLACEHOLDER = "/images/news-placeholder.jpg";

function formatDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return DATE_FORMATTER.format(date);
}

function NewsCard({ item, index }: { item: NewsArticle; index: number }) {
  const imageSrc = item.image?.trim() ? item.image : NEWS_PLACEHOLDER;
  const href = item.slug ? `/news/${item.slug}` : "#";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[var(--color-white)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-h-[480px]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-[var(--color-accent-gold)]">
          {item.category && (
            <span className="rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs uppercase tracking-wide text-[var(--color-primary-dark)]">
              {item.category}
            </span>
          )}
          <time>{formatDate(item.publishedAt)}</time>
        </div>
        <h3
          className="text-xl font-bold text-[var(--color-text-dark)] transition-colors duration-200 group-hover:text-[var(--color-primary-dark)]"
          style={{ letterSpacing: "-0.01em" }}
        >
          {item.title}
        </h3>
        <p className="mt-3 leading-relaxed text-[var(--color-text-dark)]/55 line-clamp-3">{item.excerpt}</p>
        <div className="mt-auto pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-gold)] transition-all duration-200 group-hover:gap-3"
          >
            Batafsil
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function NewsGrid({ items }: NewsGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-3xl bg-[var(--color-white)]/60 p-10 text-center shadow-[var(--shadow-card)]">
        <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--color-accent-gold)] uppercase">Matbuot xizmati</p>
        <h2 className="text-3xl font-bold text-[var(--color-text-dark)]" style={{ letterSpacing: "-0.02em" }}>
          Yangiliklar yo'q
        </h2>
        <p className="mt-3 text-[var(--color-text-dark)]/70">Tez orada yangi yangiliklar paydo bo'ladi.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <NewsCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
