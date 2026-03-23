'use client';

import { usePathname, useRouter } from 'next/navigation';

const LOCALES = ['uz', 'ru'];
const DEFAULT_LOCALE = 'uz';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname?.split('/')[1] || DEFAULT_LOCALE;

  const switchLocale = (newLocale: string) => {
    if (!pathname) return;
    
    // Получаем текущий путь и заменяем префикс локали
    const segments = pathname.split('/').filter(Boolean);
    
    // Если первый сегмент - это локаль, заменяем её
    if (LOCALES.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      // Если локали нет в пути, добавляем её в начало
      segments.unshift(newLocale);
    }
    
    const newPath = '/' + segments.join('/');
    
    // Используем router.push для навигации без перезагрузки
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--color-accent-gold)]/20 bg-[var(--color-white)]/10 p-1 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => switchLocale('uz')}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-all cursor-pointer ${
          currentLocale === 'uz'
            ? 'bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]'
            : 'text-[var(--color-text-light)]/70 hover:text-[var(--color-text-light)]'
        }`}
      >
        UZ
      </button>
      <button
        type="button"
        onClick={() => switchLocale('ru')}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-all cursor-pointer ${
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