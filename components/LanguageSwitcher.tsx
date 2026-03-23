'use client';

import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname?.split('/')[1] || 'uz';

  const switchLocale = (newLocale: string) => {
    if (!pathname) return;
    
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--color-accent-gold)]/20 bg-[var(--color-white)]/10 p-1 backdrop-blur-sm">
      <button
        onClick={() => switchLocale('uz')}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
          currentLocale === 'uz'
            ? 'bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]'
            : 'text-[var(--color-text-light)]/70 hover:text-[var(--color-text-light)]'
        }`}
      >
        UZ
      </button>
      <button
        onClick={() => switchLocale('ru')}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
          currentLocale === 'ru'
            ? 'bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]'
            : 'text-[var(--color-text-light)]/70 hover:text-[var(--color-text-light)]'
        }`}
      >
        RU
      </button>
    </div>
  );
}