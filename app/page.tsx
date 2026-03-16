import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NewsStories } from "@/components/NewsStories";
import { Stats } from "@/components/Stats";
import { Directions } from "@/components/Directions";
import { Achievements } from "@/components/Achievements";
import { NewsList } from "@/components/NewsList";
import { Quote } from "@/components/Quote";
import { Partners } from "@/components/Partners";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import {
  getSiteSettings,
  getHeroSlides,
  getStats,
  getDirections,
  getQuote,
  getPartners,
  getNewsStories,
  getNewsArticles,
  getFooterColumns,
} from "@/lib/api";

export default async function HomePage() {
  const [settings, heroSlides, stats, directions, quote, partners, newsStories, newsArticles, footerColumns] =
    await Promise.all([
      getSiteSettings(),
      getHeroSlides(),
      getStats(),
      getDirections(),
      getQuote(),
      getPartners(),
      getNewsStories(),
      getNewsArticles(),
      getFooterColumns(),
    ]);

  return (
    <>
      <Preloader />
      <Header settings={settings} />
      <main>
        <Hero slides={heroSlides} />
        <NewsStories items={newsStories} />
        <Stats items={stats} />
        <Directions items={directions} />
        <Achievements />
        <Quote data={quote} />
        <NewsList items={newsArticles} />
        <Partners items={partners} />
      </main>
      <Footer columns={footerColumns} />
    </>
  );
}
