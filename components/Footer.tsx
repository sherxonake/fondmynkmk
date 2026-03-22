"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { FooterColumn } from "@/types";

interface FooterProps {
  columns: FooterColumn[];
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-text-light)]/15 text-[var(--color-text-light)]/50 transition-all duration-300 hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)]"
    >
      {children}
    </a>
  );
}

export function Footer({ columns }: FooterProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <footer id="contacts" className="bg-[var(--color-primary-dark)]">
      {/* Subscription bar */}
      <div className="border-b border-[var(--color-text-light)]/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 lg:flex-row lg:justify-between lg:px-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text-light)] md:text-2xl">
              Yangilanishlarga obuna bo{"'"}ling
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-light)]/50">
              Eng so{"'"}nggi yangiliklar va tadbirlar haqida birinchi bo{"'"}lib biling
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
            <div className="relative flex-1">
              <Mail
                className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--color-text-light)]/30"
                aria-hidden="true"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email manzilingiz"
                required
                className="h-12 w-full rounded-full border border-[var(--color-text-light)]/15 bg-[var(--color-text-light)]/5 pr-4 pl-11 text-sm text-[var(--color-text-light)] placeholder:text-[var(--color-text-light)]/30 transition-all focus:border-[var(--color-accent-gold)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]/30"
              />
            </div>
            <button
              type="submit"
              className="flex h-12 items-center gap-2 rounded-full bg-[var(--color-accent-gold)] px-6 font-bold text-[var(--color-primary-dark)] shadow-lg shadow-[var(--color-accent-gold)]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#d4b47e] hover:shadow-xl hover:shadow-[var(--color-accent-gold)]/35"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Obuna</span>
            </button>
          </form>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-[var(--color-accent-gold)]"
            >
              Rahmat! Obuna muvaffaqiyatli amalga oshirildi.
            </motion.p>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="NKMK Jamg'armasi"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div>
                <p className="font-bold text-[var(--color-text-light)]">NKMK Jamg{"'"}armasi</p>
                <p className="text-xs text-[var(--color-text-light)]/40">Davlat muassasasi</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--color-text-light)]/50">
              166 ta ijtimoiy ob{"'"}yektlarni boshqaramiz va NKMK ning 118 000 dan ortiq xodimining hayot sifatini ta{"'"}minlaymiz.
            </p>
            
            <a 
              href="https://www.ngmk.uz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white mt-3 transition-colors duration-200"
            >
              <ExternalLink size={14} />
              NKMK — Bosh tashkilot
            </a>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:info@fondnkmk.uz"
                className="flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-[var(--color-accent-gold)]"
              >
                <Mail size={14} />
                info@fondnkmk.uz
              </a>
              <div className="flex items-center gap-3 text-sm text-[var(--color-text-light)]/50">
                <Phone className="h-4 w-4 shrink-0 text-[var(--color-accent-gold)]" aria-hidden="true" />
                <span className="font-medium text-[var(--color-text-light)]/70">+998 79 223-60-21</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-bold tracking-wider text-[var(--color-text-light)]/80 uppercase">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-text-light)]/45 transition-colors duration-200 hover:text-[var(--color-accent-gold)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-text-light)]/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-6 lg:flex-row lg:justify-between lg:px-8">
          <p className="flex items-center gap-1.5 text-sm text-[var(--color-text-light)]/35">
            {`\u00A9 ${new Date().getFullYear()} NKMK Jamg\u2018armasi.`}
            <span className="text-[var(--color-accent-gold)]">{"\u2665"}</span>
            {"Barcha huquqlar himoyalangan."}
          </p>

          <div className="flex items-center gap-3">
            <SocialIcon href="https://t.me/fondnkmk" label="Telegram">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://facebook.com/fondnkmk" label="Facebook">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://instagram.com/fondnkmk" label="Instagram">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="https://youtube.com/@fondnkmk" label="YouTube">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </SocialIcon>
          </div>

          <div className="flex items-center gap-4 text-xs text-[var(--color-text-light)]/30">
            <a href="#" className="transition-colors hover:text-[var(--color-text-light)]/60">Sayt xaritasi</a>
            <span aria-hidden="true">|</span>
            <a href="#" className="transition-colors hover:text-[var(--color-text-light)]/60">Maxfiylik siyosati</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
