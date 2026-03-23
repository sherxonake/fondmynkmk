import "server-only";

/**
 * Supabase-backed API functions simulating WordPress REST API / GraphQL responses.
 */

import type {
  SiteSettings,
  StatItem,
  DirectionItem,
  QuoteData,
  PartnerItem,
  HeroSlide,
  NewsStory,
  NewsArticle,
  NewsArticleDetail,
  FooterColumn,
  FooterLink,
} from "@/types";
import { supabase } from "./supabase";

type SiteSettingsRow = {
  id: string | null;
  address: string | null;
  phone: string | null;
  trust_phone: string | null;
  contact_email: string | null;
  telegram_url: string | null;
  instagram_url: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  logo_url: string | null;
};

type HeroSlideRow = {
  id: string | null;
  image_url: string | null;
  title: string | null;
  subtitle: string | null;
};

type StatRow = {
  value: number | null;
  label: string | null;
  suffix: string | null;
};

type DirectionRow = {
  number: string | null;
  icon: DirectionItem["icon"] | null;
  title: string | null;
  description: string | null;
};

type QuoteRow = {
  text: string | null;
  author: string | null;
};

type PartnerRow = {
  name: string | null;
  logo_url: string | null;
};

type NewsStoryRow = {
  id: string | null;
  image_url: string | null;
  title: string | null;
  category: string | null;
  created_at: string | null;
};

type NewsArticleRow = {
  id: string | null;
  image_url: string | null;
  title: string | null;
  content: string | null;
  published_at: string | null;
  excerpt: string | null;
  slug: string | null;
  category: string | null;
  is_archived: boolean | null;
  is_published: boolean | null;
};

type FooterColumnRow = {
  id: string;
  title: string | null;
  sort_order: number | null;
};

type FooterLinkRow = {
  column_id: string;
  label: string | null;
  href: string | null;
  sort_order: number | null;
};

const RU_LOCALE = "ru-RU";

const fallbackSiteSettings: SiteSettings = {
  address: "Navoiy viloyati, O'zbekiston Respublikasi",
  phone: "+998 79 223-60-21",
  trustPhone: "1150",
  email: "press@nkmk.uz",
  telegram: "https://t.me/nkmk",
  instagram: "https://instagram.com/nkmk",
  heroTitle: "NKMK Jamg'armasi",
  heroSubtitle: "Yirik ijtimoiy loyihalarni qo'llab-quvvatlaymiz",
  logo: {
    url: "/images/logo.png",
    width: 150,
    height: 150,
  },
};

const toDateString = (value: string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(RU_LOCALE);
};

const toIsoString = (value: string | null): string => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
};

const toNumericId = (sourceId: string | null, fallback: number): number => {
  if (!sourceId) return fallback;
  let hash = 0;
  for (let i = 0; i < sourceId.length; i += 1) {
    hash = (hash * 31 + sourceId.charCodeAt(i)) >>> 0;
  }
  return hash || fallback;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select(
        "id, address, phone, trust_phone, contact_email, telegram_url, instagram_url, hero_title, hero_subtitle, logo_url"
      )
      .maybeSingle();

    if (error) {
      console.error("getSiteSettings", error);
      return fallbackSiteSettings;
    }

    const row = (data ?? null) as SiteSettingsRow | null;
    if (!row) {
      return fallbackSiteSettings;
    }

    return {
      address: row.address ?? fallbackSiteSettings.address,
      phone: row.phone ?? fallbackSiteSettings.phone,
      trustPhone: row.trust_phone ?? fallbackSiteSettings.trustPhone,
      email: row.contact_email ?? fallbackSiteSettings.email,
      telegram: row.telegram_url ?? fallbackSiteSettings.telegram,
      instagram: row.instagram_url ?? fallbackSiteSettings.instagram,
      heroTitle: row.hero_title ?? fallbackSiteSettings.heroTitle,
      heroSubtitle: row.hero_subtitle ?? fallbackSiteSettings.heroSubtitle,
      logo: {
        url: row.logo_url ?? fallbackSiteSettings.logo.url,
        width: 150,
        height: 150,
      },
    };
  } catch (error) {
    console.error("getSiteSettings.catch", error);
    return fallbackSiteSettings;
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("id, image_url, title, subtitle")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getHeroSlides", error);
      return [];
    }

    const rows = (data ?? []) as HeroSlideRow[];
    return rows.map((slide, index) => ({
      id: toNumericId(slide.id, index + 1),
      image: slide.image_url ?? "",
      title: slide.title ?? "",
      subtitle: slide.subtitle ?? "",
    }));
  } catch (error) {
    console.error("getHeroSlides.catch", error);
    return [];
  }
}

export async function getStats(): Promise<StatItem[]> {
  try {
    const { data, error } = await supabase
      .from("stats")
      .select("value, label, suffix")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getStats", error);
      return [];
    }

    const rows = (data ?? []) as StatRow[];
    console.log("Raw stats from DB:", rows.length, rows);
    const result = rows.map((row) => ({
      value: row.value ?? 0,
      label: row.label ?? "",
      suffix: row.suffix ?? undefined,
    }));
    console.log("Processed stats:", result.length, result);
    return result;
  } catch (error) {
    console.error("getStats.catch", error);
    return [];
  }
}

export async function getDirections(): Promise<DirectionItem[]> {
  try {
    const { data, error } = await supabase
      .from("directions")
      .select("number, icon, title, description")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getDirections", error);
      return [];
    }

    const rows = (data ?? []) as DirectionRow[];
    return rows.map((row, index) => ({
      number: row.number ?? String(index + 1).padStart(2, "0"),
      icon: row.icon ?? "HeartPulse",
      title: row.title ?? "",
      description: row.description ?? "",
    }));
  } catch (error) {
    console.error("getDirections.catch", error);
    return [];
  }
}

export async function getQuote(): Promise<QuoteData | null> {
  try {
    const { data, error } = await supabase
      .from("quote_data")
      .select("text, author")
      .maybeSingle();

    if (error) {
      console.error("getQuote", error);
      return null;
    }

    const row = (data ?? null) as QuoteRow | null;
    if (!row) {
      return null;
    }

    return {
      text: row.text ?? "",
      author: row.author ?? "",
    };
  } catch (error) {
    console.error("getQuote.catch", error);
    return null;
  }
}

export async function getPartners(): Promise<PartnerItem[]> {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("name, logo_url")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("getPartners", error);
      return [];
    }

    const rows = (data ?? []) as PartnerRow[];
    return rows.map((row) => ({
      name: row.name ?? "",
      logoUrl: row.logo_url ?? undefined,
    }));
  } catch (error) {
    console.error("getPartners.catch", error);
    return [];
  }
}

export async function getNewsStories(): Promise<NewsStory[]> {
  try {
    const { data, error } = await supabase
      .from("news_stories")
      .select("id, image_url, title, category, created_at")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .limit(5);

    if (error) {
      console.error("getNewsStories", error);
      return [];
    }

    const rows = (data ?? []) as NewsStoryRow[];
    return rows.map((row, index) => ({
      id: toNumericId(row.id, index + 1),
      image: (row.image_url && row.image_url.includes("news-powerlifting.jpg")) 
        ? "https://fondnkmk.uz/wp-content/uploads/2025/04/photo_2025-04-14_10-40-05-780x437.jpg" 
        : (row.image_url ?? ""),
      title: row.title ?? "",
      category: row.category ?? undefined,
      date: toDateString(row.created_at),
    }));
  } catch (error) {
    console.error("getNewsStories.catch", error);
    return [];
  }
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const { data, error } = await supabase
      .from("news_articles")
      .select("id, image_url, title, published_at, excerpt, slug, category, is_published, is_archived")
      .eq("is_published", true)
      .eq("is_archived", false)
      .order("published_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("getNewsArticles", error);
      return [];
    }

    const rows = (data ?? []) as NewsArticleRow[];
    return rows.map((row, index) => ({
      id: toNumericId(row.id, index + 1),
      image: (row.image_url && row.image_url.includes("news-powerlifting.jpg")) 
        ? "https://fondnkmk.uz/wp-content/uploads/2025/04/photo_2025-04-14_10-40-05-780x437.jpg" 
        : (row.image_url ?? ""),
      title: row.title ?? "",
      publishedAt: toIsoString(row.published_at),
      excerpt: row.excerpt ?? "",
      slug: row.slug ?? "",
      category: row.category ?? undefined,
      isPublished: Boolean(row.is_published),
    }));
  } catch (error) {
    console.error("getNewsArticles.catch", error);
    return [];
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticleDetail | null> {
  if (!slug) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("news_articles")
      .select("id, title, content, excerpt, image_url, category, published_at, slug, is_published, is_archived")
      .eq("slug", slug)
      .eq("is_archived", false)
      .maybeSingle();

    if (error) {
      console.error("getNewsArticleBySlug", error);
      return null;
    }

    if (!data || data.is_published === false) {
      return null;
    }

    const row = data as NewsArticleRow;
    return {
      id: row.id ?? slug,
      title: row.title ?? "",
      content: row.content ?? "",
      excerpt: row.excerpt ?? "",
      image: row.image_url ?? "",
      category: row.category ?? undefined,
      publishedAt: toIsoString(row.published_at),
      slug: row.slug ?? slug,
      isPublished: Boolean(row.is_published),
    };
  } catch (error) {
    console.error("getNewsArticleBySlug.catch", error);
    return null;
  }
}

export async function getFooterColumns(): Promise<FooterColumn[]> {
  try {
    const [{ data: columns, error: columnsError }, { data: links, error: linksError }] = await Promise.all([
      supabase
        .from("footer_columns")
        .select("id, title, sort_order")
        .order("sort_order", { ascending: true }),
      supabase
        .from("footer_links")
        .select("column_id, label, href, sort_order")
        .order("sort_order", { ascending: true }),
    ]);

    if (columnsError) {
      console.error("getFooterColumns.columns", columnsError);
    }

    if (linksError) {
      console.error("getFooterColumns.links", linksError);
    }

    const columnRows = (columns ?? []) as FooterColumnRow[];
    const linkRows = (links ?? []) as FooterLinkRow[];

    if (columnRows.length === 0) {
      return [];
    }

    const groupedLinks = linkRows.reduce<Record<string, FooterLink[]>>((acc, link) => {
      const bucket = acc[link.column_id] ?? [];
      bucket.push({
        label: link.label ?? "",
        href: link.href ?? "#",
      });
      acc[link.column_id] = bucket;
      return acc;
    }, {});

    return columnRows.map((column) => ({
      title: column.title ?? "",
      links: groupedLinks[column.id] ?? [],
    }));
  } catch (error) {
    console.error("getFooterColumns.catch", error);
    return [];
  }
}
