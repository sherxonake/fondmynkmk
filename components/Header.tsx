"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteSettings } from "@/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const clickedElement = event.target as Element;
        const isDropdownClick = Object.values(dropdownRefs.current).some(
          ref => ref?.contains(clickedElement)
        );
        if (!isDropdownClick) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const navItems = [
    {
      label: "Jamg'arma haqida",
      hasDropdown: true,
      dropdownKey: "about",
      items: [
        { label: '"NKMK jamg\'armasi" davlat muassasasi', href: '/about' },
        { label: 'Funksiya va vazifalar', href: '/about/functions' },
        { label: 'Hududiy boshqarmalar', href: '/about/regions' },
        { label: 'Rahbariyat', href: '/about/leadership' },
        { label: 'Tashkilot ustavi', href: '/about/charter' },
        { label: 'Tashkilot pasporti', href: '/about/passport' },
      ]
    },
    {
      label: "Xizmatlar",
      hasDropdown: true,
      dropdownKey: "services",
      items: [
        { label: 'Tibbiyot', href: '/services/medical' },
        { label: 'Sanatoriy-profilaktoriylar', href: '/services/sanatorium' },
        { label: 'Ovqatlantirish', href: '/services/catering' },
        { label: 'Madaniyat va sport', href: '/services/culture-sport' },
        { label: 'Bolalar oromgohlari', href: '/services/children-camps' },
        { label: 'Ijtimoiy obyektlar', href: '/services/social' },
      ]
    },
    {
      label: "Ochiq ma'lumotlar",
      hasDropdown: true,
      dropdownKey: "open-data",
      items: [
        { label: 'Statistika', href: '/open-data/statistics' },
        { label: 'Narxlar', href: '/open-data/prices' },
        { label: 'Tenderlar', href: '/open-data/tenders' },
        { label: 'Korrupsiyaga qarshi', href: '/open-data/anticorruption' },
      ]
    },
    {
      label: "Yangiliklar",
      href: "/news",
      hasDropdown: false
    },
    {
      label: "Bog'lanish",
      href: "/contact",
      hasDropdown: false
    }
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
        <nav className="hidden items-center gap-6 md:flex" aria-label="Asosiy navigatsiya">
          {navItems.map((item) => (
            <div key={item.label} className="relative" ref={(el) => {
              if (item.hasDropdown && item.dropdownKey) {
                dropdownRefs.current[item.dropdownKey] = el;
              }
            }}>
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.dropdownKey!)}
                    className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-light)]/70 transition-colors duration-200 hover:text-[var(--color-text-light)]"
                    aria-expanded={openDropdown === item.dropdownKey}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.dropdownKey ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.dropdownKey && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 min-w-[280px] rounded-lg bg-[var(--color-primary-dark)] shadow-xl border border-[var(--color-text-light)]/10"
                      >
                        <div className="py-2">
                          {item.items?.map((subItem) => (
                            <a
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm text-white transition-colors duration-200 hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-primary-dark)]"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <a
                  href={item.href}
                  className="text-sm font-medium text-[var(--color-text-light)]/70 transition-colors duration-200 hover:text-[var(--color-text-light)]"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Trust phone + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${settings.trustPhone}`}
            className="phone-pulse hidden md:flex items-center gap-2 rounded-full border border-[var(--color-accent-gold)]/50 px-3 py-2.5 text-sm font-semibold text-[var(--color-accent-gold)] transition-all duration-300 hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-primary-dark)] hover:shadow-[0_0_24px_rgba(197,165,114,0.45)]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Ishonch telefoni</span>
            <span className="font-bold">{settings.trustPhone}</span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-text-light)]/70 transition-colors hover:text-[var(--color-text-light)] md:hidden"
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
            className="overflow-hidden border-t border-[var(--color-text-light)]/10 bg-[var(--color-primary-dark)]/95 backdrop-blur-xl md:hidden"
            aria-label="Mobil menyusi"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.dropdownKey!)}
                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-[var(--color-text-light)]/80 transition-colors hover:bg-[var(--color-text-light)]/5 hover:text-[var(--color-text-light)]"
                        aria-expanded={openDropdown === item.dropdownKey}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            openDropdown === item.dropdownKey ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.dropdownKey && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-[var(--color-text-light)]/5">
                              {item.items?.map((subItem) => (
                                <a
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setMenuOpen(false);
                                  }}
                                  className="block px-8 py-3 text-sm text-[var(--color-text-light)]/70 transition-colors hover:bg-[var(--color-text-light)]/10 hover:text-[var(--color-text-light)]"
                                >
                                  {subItem.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-4 py-3 text-base font-medium text-[var(--color-text-light)]/80 transition-colors hover:bg-[var(--color-text-light)]/5 hover:text-[var(--color-text-light)]"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <div className="border-t border-[var(--color-text-light)]/10 pt-2">
                <div className="px-4 py-2">
                  <LanguageSwitcher />
                </div>
                <a
                  href={`tel:${settings.trustPhone}`}
                  onClick={() => setMenuOpen(false)}
                  className="mx-4 flex items-center gap-2 rounded-full border border-[var(--color-accent-gold)]/50 px-4 py-2 text-sm font-semibold text-[var(--color-accent-gold)] transition-colors hover:border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-[var(--color-primary-dark)]"
                >
                  <Phone className="h-4 w-4" />
                  <span>Ishonch telefoni: {settings.trustPhone}</span>
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
