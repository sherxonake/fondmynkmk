export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getNewsArticles } from "@/lib/api";
import { NewsGrid } from "@/components/NewsGrid";
import { NewsFilters } from "@/components/NewsFilters";

export default async function NewsPage() {
  const news = await getNewsArticles();

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
        <NewsFilters />

        {/* News Grid */}
        <NewsGrid items={news} />
      </div>
    </div>
  );
}
