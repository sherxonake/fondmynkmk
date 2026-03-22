'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const categories = [
  { id: 'all', name: 'Barchasi' },
  { id: 'Sport', name: 'Sport' },
  { id: 'Tibbiyot', name: 'Tibbiyot' },
  { id: 'Dam olish', name: 'Dam olish' },
  { id: 'Madaniyat', name: 'Madaniyat' },
];

export function NewsFilters() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)] shadow-lg'
                : 'bg-[var(--color-white)]/60 text-[var(--color-text-dark)]/70 hover:bg-[var(--color-white)] hover:text-[var(--color-text-dark)]'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
