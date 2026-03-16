"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/types";

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Biz haqimizda", href: "#about" },
    { label: "Faoliyat", href: "#directions" },
    { label: "Yangiliklar", href: "#news" },
    { label: "Bog'lanish", href: "#contacts" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--color-text-light)]/10 bg-[var(--color-primary-dark)]/85 py-3 shadow-lg backdrop-blur-2xl"
          : "bg-transparent py-5 backdrop-blur-[2px]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo -- bigger */}
        <a href="/" className="group flex items-center gap-3" aria-label="NKMK Jamg'armasi">
          <Image
            src={settings.logo.url}
            alt="NKMK Jamg'armasi logotipi"
            width={60}
            height={60}
            priority
            className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105 lg:h-14 lg:w-14"
          />
          <div className="hidden flex-col sm:flex">
            <span className="text-base font-bold tracking-tight text-[var(--color-text-light)] lg:text-lg">
              NKMK Jamg{"'"}armasi
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[var(--color-text-light)]/40 uppercase">
              Davlat muassasasi
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Asosiy navigatsiya">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-light)]/70 transition-colors duration-200 hover:text-[var(--color-text-light)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trust phone + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${settings.trustPhone}`}
            className="phone-pulse group flex items-center gap-2 rounded-full border border-[var(--color-accent-gold)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--color-accent-gold)] transition-all duration-300 hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-primary-dark)] hover:shadow-[0_0_24px_rgba(197,165,114,0.45)]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Ishonch telefoni</span>
            <span className="font-bold">{settings.trustPhone}</span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-text-light)]/70 transition-colors hover:text-[var(--color-text-light)] lg:hidden"
            aria-label={menuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[var(--color-text-light)]/10 bg-[var(--color-primary-dark)]/95 backdrop-blur-xl lg:hidden"
            aria-label="Mobil menyusi"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-[var(--color-text-light)]/80 transition-colors hover:bg-[var(--color-text-light)]/5 hover:text-[var(--color-text-light)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
