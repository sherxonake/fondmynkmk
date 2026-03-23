export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Hero } from "@/components/Hero";
import { NewsStories } from "@/components/NewsStories";
import { Stats } from "@/components/Stats";
import { Directions } from "@/components/Directions";
import { Achievements } from "@/components/Achievements";
import { NewsList } from "@/components/NewsList";
import { Quote } from "@/components/Quote";
import { Partners } from "@/components/Partners";
import { Preloader } from "@/components/Preloader";
import {
  getHeroSlides,
  getStats,
  getDirections,
  getQuote,
  getPartners,
  getNewsStories,
  getNewsArticles,
} from "@/lib/api";

export default async function HomePage() {
  const [heroSlides, stats, directions, quote, partners, newsStories, newsArticles] =
    await Promise.all([
      getHeroSlides(),
      getStats(),
      getDirections(),
      getQuote(),
      getPartners(),
      getNewsStories(),
      getNewsArticles(),
    ]);

  const safeQuote = quote ?? { text: "", author: "" };

  return (
    <>
      <Preloader />
      <main>
        <Hero slides={heroSlides} />
        <NewsStories items={newsStories} />
        <Stats items={stats} />
        <Directions items={directions} />
        <Achievements />
        <Quote data={safeQuote} />
        <NewsList items={newsArticles} />
        <Partners items={partners} />
      </main>
    </>
  );
}