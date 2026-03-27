"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import type { HeroSlide } from "@/types";

interface HeroProps {
  slides: HeroSlide[];
}

const SLIDE_DURATION = 6000;

export function Hero({ slides }: HeroProps) {
  if (!slides || slides.length === 0) return null;

  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'uz';

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      setProgress(0);
      startTimeRef.current = Date.now();
    },
    []
  );

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [slides.length]);

  // Progress bar animation + auto advance
  useEffect(() => {
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(pct);
      if (pct >= 1) {
        next();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, next]);

  return (
    <section
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Crossfade slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)] via-[var(--color-primary-dark)]/60 to-[var(--color-primary-dark)]/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-text-light)]/15 bg-[var(--color-text-light)]/5 px-5 py-2 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent-gold)]" aria-hidden="true" />
          <span className="text-sm font-medium tracking-wide text-[var(--color-text-light)]/80">
            Navoiy viloyati, O{"'"}zbekiston
          </span>
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-5xl text-balance text-2xl font-extrabold tracking-tight text-[var(--color-text-light)] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[4rem]"
          style={{ lineHeight: 1.1, letterSpacing: "-0.02em" }}
        >
          {"\"NKMK jamg'armasi\" "}
          <span className="text-[var(--color-accent-gold)]">davlat muassasasi</span>
        </motion.h1>

        {/* Slide subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-[var(--color-text-light)]/90 md:text-xl lg:text-2xl"
          >
            {slides[current]?.subtitle ?? ''}
          </motion.p>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
           <a
             href={`/${locale}#about`}
             className="inline-flex items-center rounded-full bg-[var(--color-accent-gold)] px-8 py-4 text-base font-bold text-[var(--color-primary-dark)] shadow-lg shadow-[var(--color-accent-gold)]/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[var(--color-accent-gold)]/35"
           >
             Biz haqimizda
           </a>
           <a
             href={`/${locale}#news`}
             className="inline-flex items-center rounded-full border border-[var(--color-text-light)]/20 bg-[var(--color-text-light)]/5 px-8 py-4 text-base font-semibold text-[var(--color-text-light)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-text-light)]/40 hover:bg-[var(--color-text-light)]/10"
           >
             Yangiliklar
           </a>
        </motion.div>
      </div>

      {/* Progress-bar indicators */}
      <div className="absolute bottom-24 left-0 z-20 flex w-full items-center justify-center gap-6 px-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-text-light)]/20 bg-[var(--color-text-light)]/5 text-[var(--color-text-light)]/70 backdrop-blur-sm transition-all hover:border-[var(--color-text-light)]/40 hover:text-[var(--color-text-light)]"
          aria-label="Oldingi slayd"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative h-1 w-12 overflow-hidden rounded-full bg-[var(--color-text-light)]/20 transition-all sm:w-16"
              aria-label={`Slayd ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            >
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-gold)] transition-none"
                style={{
                  width: i === current ? `${progress * 100}%` : i < current ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-text-light)]/20 bg-[var(--color-text-light)]/5 text-[var(--color-text-light)]/70 backdrop-blur-sm transition-all hover:border-[var(--color-text-light)]/40 hover:text-[var(--color-text-light)]"
          aria-label="Keyingi slayd"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
