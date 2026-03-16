"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-white)]"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-10"
          >
            <Image
              src="/images/logo.png"
              alt="NKMK Jamg'armasi"
              width={80}
              height={80}
              priority
              className="h-20 w-20 object-contain"
            />
            {/* Circular gold trace */}
            <svg
              className="absolute -inset-4 h-[calc(100%+32px)] w-[calc(100%+32px)]"
              viewBox="0 0 112 112"
              aria-hidden="true"
            >
              <circle
                cx="56"
                cy="56"
                r="52"
                fill="none"
                stroke="var(--color-primary-light)"
                strokeWidth="2"
              />
              <motion.circle
                cx="56"
                cy="56"
                r="52"
                fill="none"
                stroke="var(--color-accent-gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - progress / 100) }}
                transition={{ ease: "easeOut" }}
                style={{ transformOrigin: "center", rotate: "-90deg" }}
              />
            </svg>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48">
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-[var(--color-primary-light)]">
              <motion.div
                className="h-full rounded-full bg-[var(--color-accent-gold)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <p className="mt-3 text-center text-xs font-medium tracking-widest text-[var(--color-text-dark)]/40 uppercase">
              NKMK Jamg{"'"}armasi
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
