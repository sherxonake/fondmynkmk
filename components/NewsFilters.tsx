'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { NewsArticle } from '@/types';

const categories = [
  { id: 'all', name: 'Barchasi' },
  { id: 'Sport', name: 'Sport' },
  { id: 'Tibbiyot', name: 'Tibbiyot' },
  { id: 'Dam olish', name: 'Dam olish' },
  { id: 'Madaniyat', name: 'Madaniyat' },
];

interface NewsFiltersProps {
  items: NewsArticle[];
  onFilteredItems: (items: NewsArticle[]) => void;
}

export function NewsFilters({ items, onFilteredItems }: NewsFiltersProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [items, activeCategory, searchQuery]);

  // Update parent component when filters change
  useMemo(() => {
    onFilteredItems(filteredItems);
  }, [filteredItems, onFilteredItems]);

  return (
    <div className="mb-12 space-y-6">
      {/* Search */}
      <div className="mx-auto max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-dark)]/40" />
          <input
            type="text"
            placeholder={t('searchNews') || 'Yangiliklarni qidirish...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[var(--color-primary-light)] bg-[var(--color-white)] py-3 pl-12 pr-4 text-[var(--color-text-dark)] placeholder-[var(--color-text-dark)]/40 transition-all duration-300 focus:border-[var(--color-accent-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]/20"
          />
        </div>
      </div>

      {/* Category Filters */}
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
