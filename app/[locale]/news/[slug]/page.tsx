import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getNewsArticleBySlug, getNewsArticles } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface NewsDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

const FALLBACK_IMAGE = "/images/news-placeholder.jpg";

const DATE_FORMATTER = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return DATE_FORMATTER.format(date);
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Yangilik topilmadi",
      description: "So'ralgan yangilik topilmadi",
    };
  }

  const title = `${article.title} | NKMK Jamg'armasi`;
  const description = article.excerpt.slice(0, 150) || "Yangilik tafsilotlari";
  const image = article.image?.trim() ? article.image : FALLBACK_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug, locale } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allNews = await getNewsArticles();
  const relatedNews = allNews
    .filter(item => String(item.id) !== String(article.id) && item.category === article.category)
    .slice(0, 3);

  const imageSrc = article.image?.trim() ? article.image : FALLBACK_IMAGE;
  const formattedDate = formatDate(article.publishedAt);

  return (
    <div className="bg-[var(--color-primary-light)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-dark)]/60">
            <li>
              <Link href={`/${locale}`} className="transition hover:text-[var(--color-accent-gold)]">
                Bosh sahifa
              </Link>
            </li>
            <li className="text-[var(--color-text-dark)]/40">→</li>
            <li>
              <Link href={`/${locale}/news`} className="transition hover:text-[var(--color-accent-gold)]">
                Yangiliklar
              </Link>
            </li>
            <li className="text-[var(--color-text-dark)]/40">→</li>
            <li className="truncate font-medium text-[var(--color-text-dark)]">
              {article.title}
            </li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <article className="overflow-hidden rounded-3xl bg-[var(--color-white)] shadow-[var(--shadow-card)]">
              <div className="relative h-80 w-full sm:h-96 lg:h-[32rem]">
                <Image
                  src={imageSrc}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
                />
              </div>

              <div className="space-y-6 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-[var(--color-accent-gold)]">
                  {article.category ? (
                    <span className="rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs uppercase tracking-wide text-[var(--color-primary-dark)]">
                      {article.category}
                    </span>
                  ) : null}
                  <time>{formattedDate}</time>
                </div>

                <h1 className="text-3xl font-bold text-[var(--color-text-dark)] sm:text-4xl lg:text-5xl" style={{ letterSpacing: "-0.02em" }}>
                  {article.title}
                </h1>

                <p className="text-lg text-[var(--color-text-dark)]/70">{article.excerpt}</p>

                <div
                  className="prose max-w-none text-[var(--color-text-dark)] prose-headings:text-[var(--color-text-dark)] prose-a:text-[var(--color-primary-dark)] prose-p:text-[var(--color-text-dark)] prose-strong:text-[var(--color-text-dark)]"
                  dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
                />
              </div>
            </article>

            <div className="mt-8">
              <Link
                href={`/${locale}/news`}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-gold)] px-8 py-3 text-base font-semibold text-[var(--color-primary-dark)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                ← Barcha yangiliklar
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {relatedNews.length > 0 && (
                <div className="rounded-2xl bg-[var(--color-white)] p-6 shadow-[var(--shadow-card)]">
                  <h3 className="mb-4 text-xl font-bold text-[var(--color-text-dark)]">
                    O'xshash yangiliklar
                  </h3>
                  <div className="space-y-4">
                    {relatedNews.map((item) => (
                      <Link
                        key={item.id}
                        href={`/${locale}/news/${item.slug}`}
                        className="group block transition-transform hover:scale-[1.02]"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium text-[var(--color-text-dark)] transition-colors group-hover:text-[var(--color-accent-gold)] line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-sm text-[var(--color-text-dark)]/50">
                            {formatDate(item.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {article.category && (
                <div className="rounded-2xl bg-[var(--color-white)] p-6 shadow-[var(--shadow-card)]">
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-gold)]">
                    Kategoriya
                  </h3>
                  <p className="text-lg font-medium text-[var(--color-text-dark)]">
                    {article.category}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}