'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { getNewsArticles } from "@/lib/client-api";
import { NewsGrid } from "@/components/NewsGrid";
import { NewsFilters } from "@/components/NewsFilters";
import type { NewsArticle } from "@/types";

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);

  // Load news on mount
  useEffect(() => {
    getNewsArticles().then(data => {
      setNews(data);
      setFilteredNews(data);
    });
  }, []);

  return (
    <div className="bg-[var(--color-primary-light)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)] md:text-4xl lg:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            Barcha yangiliklar
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-dark)]/70">
            NKMK Jamg'armasi faoliyati haqida so'nggi yangiliklar
          </p>
        </div>

        {/* Filters */}
        <NewsFilters items={news} onFilteredItems={setFilteredNews} />

        {/* News Grid */}
        <NewsGrid items={news} filteredItems={filteredNews} />
      </div>
    </div>
  );
}
