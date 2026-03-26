"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { SiteSettings } from "@/types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from 'next-intl';

interface HeaderProps {
  settings: SiteSettings;
}

export function Header({ settings }: HeaderProps) {
  const t = useTranslations('Header');
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) return null;

  const locale = pathname?.split('/')[1] || 'uz';
  const isHomePage = pathname === `/${locale}` || pathname === "/";
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
 
   // Lock body scroll when mobile menu is open
   useEffect(() => {
     if (menuOpen) {
       document.body.classList.add('overflow-hidden');
     } else {
       document.body.classList.remove('overflow-hidden');
     }
   }, [menuOpen]);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const navItems = [
    {
      label: t('about'),
      hasDropdown: true,
      dropdownKey: "about",
      items: [
        { label: '"NKMK jamg\'armasi" davlat muassasasi', href: `/${locale}/about` },
        { label: 'Funksiya va vazifalar', href: `/${locale}/about/functions` },
        { label: 'Hududiy boshqarmalar', href: `/${locale}/about/regions` },
        { label: 'Rahbariyat', href: `/${locale}/about/leadership` },
        { label: 'Tashkilot ustavi', href: `/${locale}/about/charter` },
        { label: 'Tashkilot pasporti', href: `/${locale}/about/passport` },
      ]
    },
    {
      label: t('services'),
      hasDropdown: true,
      dropdownKey: "services",
      items: [
        { label: 'Tibbiyot', href: `/${locale}/services/medical` },
        { label: 'Sanatoriy-profilaktoriylar', href: `/${locale}/services/sanatorium` },
        { label: 'Ovqatlantirish', href: `/${locale}/services/food` },
        { label: 'Madaniyat va sport', href: `/${locale}/services/culture` },
        { label: 'Bolalar oromgohlari', href: `/${locale}/services/children` },
        { label: 'Ijtimoiy obyektlar', href: `/${locale}/services/production` },
      ]
    },
     // {
     //   label: t('openData'),
     //   hasDropdown: true,
     //   dropdownKey: "open-data",
     //   items: [
     //     { label: 'Statistik', href: `/${locale}/open-data/statistics` },
     //     { label: 'Narxlar', href: `/${locale}/open-data/prices` },
     //     { label: 'Tenderlar', href: `/${locale}/open-data/tenders` },
     //   ]
     // },
    {
      label: t('news'),
      href: `/${locale}/news`,
      hasDropdown: false
    }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 isolate transition-all duration-500 ${
        isHomePage 
          ? scrolled ? 'bg-[#0d1f3c]/95 py-3' : 'bg-transparent py-5'
          : 'bg-[#0d1f3c] py-3 shadow-lg'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo -- bigger */}
        <a href={`/${locale}`} className="group flex items-center gap-3" aria-label="NKMK Jamg'armasi">
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
            <span className="text-[11px] font-medium tracking-wide text-[var(--color-text-light)]/70 uppercase">
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
                    className={`flex items-center gap-1 text-sm font-medium subpixel-antialiased transition-colors duration-200 ${
                      isHomePage ? 'text-white hover:text-white' : 'text-white hover:text-white'
                    }`}
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
                  className={`text-sm font-medium subpixel-antialiased transition-colors duration-200 ${
                    isHomePage ? 'text-white hover:text-white' : 'text-white hover:text-white'
                  }`}
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
          <div className="relative group hidden md:block">
            {/* Кнопка */}
            <button className="phone-pulse flex items-center gap-2 rounded-full bg-[#c5a572] 
                               text-white px-4 py-2 text-sm font-semibold hover:bg-[#b8956a] 
                               transition-colors">
              📞 Bog'lanish
            </button>
            
            {/* Dropdown — появляется при hover */}
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl 
                            border border-gray-100 p-4 opacity-0 invisible 
                            group-hover:opacity-100 group-hover:visible transition-all z-50">
              <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
                Bog'lanish
              </p>
              <a href="tel:+998792272121" 
                 className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 mb-2">
                <span className="text-xl">📞</span>
                <div>
                  <p className="text-xs text-gray-500">Call markaz</p>
                  <p className="font-bold text-[#0d1f3c]">+998 79 227 21 21</p>
                </div>
              </a>
              <a href="tel:+998792272968"
                 className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="text-xs text-gray-500">Ishonch telefoni</p>
                  <p className="font-bold text-[#0d1f3c]">+998 79 227 29 68</p>
                </div>
              </a>
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              isHomePage ? 'text-white hover:text-white' : 'text-white hover:text-white'
            } md:hidden`}
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
             className="overflow-hidden border-t border-[var(--color-text-light)]/10 bg-[var(--color-primary-dark)]/95 z-50 md:hidden"
            aria-label="Mobil menyusi"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.dropdownKey!)}
                        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-white subpixel-antialiased transition-colors hover:bg-[var(--color-text-light)]/10"
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
                                  className="block px-8 py-3 text-sm font-medium text-white subpixel-antialiased transition-colors hover:bg-[var(--color-text-light)]/15"
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
                      className="rounded-lg px-4 py-3 text-base font-medium text-white subpixel-antialiased transition-colors hover:bg-[var(--color-text-light)]/10"
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
