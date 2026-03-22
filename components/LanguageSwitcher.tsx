'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--color-accent-gold)]/20 bg-[var(--color-white)]/10 p-1 backdrop-blur-sm">
      <button
        onClick={() => setLanguage('uz')}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
          language === 'uz'
            ? 'bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]'
            : 'text-[var(--color-text-light)]/70 hover:text-[var(--color-text-light)]'
        }`}
      >
        UZ
      </button>
      <button
        onClick={() => setLanguage('ru')}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
          language === 'ru'
            ? 'bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]'
            : 'text-[var(--color-text-light)]/70 hover:text-[var(--color-text-light)]'
        }`}
      >
        RU
      </button>
    </div>
  );
}
