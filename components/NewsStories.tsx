"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsStory } from "@/types";

interface NewsStoriesProps {
  items: NewsStory[];
}

const categoryColors: Record<string, string> = {
  Sport: "bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]",
  Tibbiyot: "bg-[var(--color-accent-green)] text-[var(--color-text-light)]",
  Madaniyat: "bg-[var(--color-primary-dark)] text-[var(--color-text-light)]",
  Bolalar: "bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]",
};

export function NewsStories({ items }: NewsStoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-[var(--color-white)] py-20 lg:py-28" aria-labelledby="stories-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--color-accent-gold)] uppercase">
              Jarayon
            </p>
            <h2
              id="stories-heading"
              className="text-3xl font-bold text-[var(--color-text-dark)] md:text-4xl lg:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              NKMK jamg{"'"}armasi
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-primary-dark)]/10 text-[var(--color-text-dark)]/60 transition-all hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)]/10 hover:text-[var(--color-accent-gold)] disabled:opacity-30 disabled:hover:border-[var(--color-primary-dark)]/10 disabled:hover:bg-transparent"
              aria-label="Chapga aylantirish"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-primary-dark)]/10 text-[var(--color-text-dark)]/60 transition-all hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)]/10 hover:text-[var(--color-accent-gold)] disabled:opacity-30 disabled:hover:border-[var(--color-primary-dark)]/10 disabled:hover:bg-transparent"
              aria-label="O'ngga aylantirish"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile side arrows */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className="absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-primary-dark)]/70 text-[var(--color-text-light)] shadow-lg backdrop-blur-sm transition-opacity disabled:opacity-0 md:hidden"
        aria-label="Chapga aylantirish"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className="absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-primary-dark)]/70 text-[var(--color-text-light)] shadow-lg backdrop-blur-sm transition-opacity disabled:opacity-0 md:hidden"
        aria-label="O'ngga aylantirish"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Horizontal slider */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 lg:px-8"
        style={{ scrollbarWidth: "none" }}
        role="list"
      >
        {/* Left spacer for max-w-7xl alignment */}
        <div className="w-[max(0px,calc((100vw-80rem)/2))] shrink-0" aria-hidden="true" />

        {items.map((story, i) => {
          const badgeColor =
            categoryColors[story.category ?? ""] ??
            "bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]";

          return (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative w-72 shrink-0 snap-start overflow-hidden rounded-2xl sm:w-80 lg:w-96"
              role="listitem"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/90 via-[var(--color-primary-dark)]/20 to-transparent" />

                {/* Hover lift effect */}
                <div className="absolute inset-0 transition-shadow duration-500 group-hover:shadow-[inset_0_-120px_100px_-60px_rgba(0,0,0,0.3)]" />

                {/* Category badge */}
                {story.category && (
                  <div className="absolute top-4 left-4">
                    <span
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase ${badgeColor}`}
                    >
                      {story.category}
                    </span>
                  </div>
                )}

                {/* Bottom content */}
                <div className="absolute right-0 bottom-0 left-0 p-5 transition-transform duration-500 group-hover:-translate-y-1">
                  <p className="mb-2 text-xs font-medium text-[var(--color-text-light)]/50">{story.date}</p>
                  <h3 className="text-lg font-bold leading-snug text-[var(--color-text-light)]">
                    {story.title}
                  </h3>
                </div>
              </div>
            </motion.article>
          );
        })}

        {/* Right spacer */}
        <div className="w-[max(16px,calc((100vw-80rem)/2))] shrink-0" aria-hidden="true" />
      </div>
    </section>
  );
}
