import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type WpTerm = {
  name?: string;
};

type WpFeaturedMedia = {
  source_url?: string;
};

type WpPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[];
    "wp:term"?: WpTerm[][];
  };
};

type NewsArticleUpsert = {
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  slug: string;
  category: string | null;
  is_published: boolean;
  is_archived: boolean;
  source: string;
  published_at: string;
};

const WP_API_URL = "https://fondnkmk.uz/wp-json/wp/v2/posts";
const PER_PAGE = 20;
const BATCH_SIZE = 50;
const DEFAULT_CATEGORY = "Yangiliklar";
const SCRIPT_NAME = "import-news";

const dryRun = process.argv.includes("--dry-run");

function log(message: string, ...args: unknown[]): void {
  const prefix = `[${SCRIPT_NAME}]`;
  if (args.length > 0) {
    console.log(prefix, message, ...args);
  } else {
    console.log(prefix, message);
  }
}

function loadEnvFile(filename: string): void {
  const absolutePath = resolve(process.cwd(), filename);
  if (!existsSync(absolutePath)) {
    return;
  }

  const content = readFileSync(absolutePath, "utf8");
  content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .forEach((line) => {
      const separatorIndex = line.indexOf("=");
      if (separatorIndex === -1) {
        return;
      }

      const key = line.slice(0, separatorIndex).trim();
      if (!key) {
        return;
      }

      let value = line.slice(separatorIndex + 1).trim();
      const quotesMatch = value.match(/^(['"])(.*)\1$/);
      if (quotesMatch) {
        value = quotesMatch[2];
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    });
}

function ensureEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }
  return value;
}

function sanitizeSlug(sourceSlug: string | null | undefined, fallback: string): string {
  if (!sourceSlug) {
    return fallback;
  }

  return (
    sourceSlug
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 160) || fallback
  );
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function buildExcerpt(html: string, fallback: string): string {
  const text = stripHtml(html || fallback);
  return text.slice(0, 280);
}

function extractCategory(post: WpPost): string {
  const taxonomies = post._embedded?.["wp:term"] ?? [];
  const categories = taxonomies[0] ?? [];
  const name = categories[0]?.name;
  if (!name) {
    return DEFAULT_CATEGORY;
  }
  return name.trim() || DEFAULT_CATEGORY;
}

function extractImageUrl(post: WpPost): string | null {
  const media = post._embedded?.["wp:featuredmedia"] ?? [];
  const candidate = media.find((item) => Boolean(item?.source_url));
  return candidate?.source_url ?? null;
}

function toIsoDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
}

async function fetchWpPage(page: number): Promise<{ posts: WpPost[]; totalPages: number | null }> {
  const url = new URL(WP_API_URL);
  url.searchParams.set("_embed", "1");
  url.searchParams.set("per_page", PER_PAGE.toString());
  url.searchParams.set("page", page.toString());

  const response = await fetch(url.toString(), { headers: { Accept: "application/json" } });

  if (!response.ok) {
    if (response.status === 400) {
      // WordPress returns 400 when page exceeds total pages.
      return { posts: [], totalPages: null };
    }
    const body = await response.text();
    throw new Error(`Failed to fetch WP posts (page ${page}): ${response.status} ${body}`);
  }

  const totalPagesHeader = response.headers.get("x-wp-totalpages");
  const totalPages = totalPagesHeader ? Number.parseInt(totalPagesHeader, 10) : null;
  const posts = (await response.json()) as WpPost[];
  return { posts, totalPages };
}

async function fetchAllPosts(): Promise<WpPost[]> {
  const allPosts: WpPost[] = [];
  let page = 1;
  let totalPages: number | null = null;

  while (true) {
    const { posts, totalPages: headerTotalPages } = await fetchWpPage(page);
    if (posts.length === 0) {
      break;
    }

    allPosts.push(...posts);
    totalPages = headerTotalPages ?? totalPages;

    log(`Fetched page ${page} (${posts.length} posts)`);

    if (totalPages !== null && page >= totalPages) {
      break;
    }

    page += 1;
  }

  return allPosts;
}

function mapToPayload(posts: WpPost[]): NewsArticleUpsert[] {
  return posts.map((post) => {
    const fallbackTitle = `wp-post-${post.id}`;
    const title = stripHtml(post.title?.rendered ?? fallbackTitle) || fallbackTitle;
    const slug = sanitizeSlug(post.slug, `wp-${post.id}`);
    const content = post.content?.rendered ?? "";
    const excerpt = buildExcerpt(post.excerpt?.rendered ?? "", content || title);
    const imageUrl = extractImageUrl(post);
    const category = extractCategory(post);
    const publishedAt = toIsoDate(post.date);

    return {
      title,
      excerpt,
      content,
      image_url: imageUrl,
      slug,
      category,
      is_published: true,
      is_archived: false,
      source: "wordpress",
      published_at: publishedAt,
    } satisfies NewsArticleUpsert;
  });
}

async function upsertInBatches(client: SupabaseClient, rows: NewsArticleUpsert[]): Promise<number> {
  let processed = 0;
  for (let start = 0; start < rows.length; start += BATCH_SIZE) {
    const chunk = rows.slice(start, start + BATCH_SIZE);
    const { error } = await client.from("news_articles").upsert(chunk, { onConflict: "slug" });

    if (error) {
      throw new Error(`Supabase upsert failed: ${error.message}`);
    }

    processed += chunk.length;
    log(`Upserted ${processed}/${rows.length} rows...`);
  }
  return processed;
}

async function main() {
  loadEnvFile(".env.local");

  const supabaseUrl = ensureEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = ensureEnv("SUPABASE_SERVICE_ROLE_KEY");

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  log(`Starting import (dry-run: ${dryRun ? "yes" : "no"})`);

  const posts = await fetchAllPosts();
  if (posts.length === 0) {
    log("No posts received from WordPress API.");
    return;
  }

  log(`Fetched ${posts.length} total posts from WordPress.`);

  const payload = mapToPayload(posts);

  if (dryRun) {
    log(`[dry-run] Prepared ${payload.length} rows. Showing first 3:`);
    console.dir(payload.slice(0, 3), { depth: 2 });
    return;
  }

  const processed = await upsertInBatches(supabase, payload);
  log(`Import completed. Upserted ${processed} rows.`);
}

main().catch((error) => {
  console.error(`[${SCRIPT_NAME}]`, error);
  process.exitCode = 1;
});
