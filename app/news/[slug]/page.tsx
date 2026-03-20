import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getNewsArticleBySlug } from "@/lib/api";

interface NewsDetailPageProps {
  params: { slug: string };
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
  const article = await getNewsArticleBySlug(params.slug);

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
  const article = await getNewsArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const imageSrc = article.image?.trim() ? article.image : FALLBACK_IMAGE;
  const formattedDate = formatDate(article.publishedAt);

  return (
    <div className="bg-[var(--color-primary-light)] py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 lg:px-0">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-dark)] transition hover:text-[var(--color-accent-gold)]"
        >
          ← Yangiliklarga qaytish
        </Link>

        <article className="overflow-hidden rounded-3xl bg-[var(--color-white)] shadow-[var(--shadow-card)]">
          <div className="relative h-80 w-full sm:h-96">
            <Image
              src={imageSrc}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 960px"
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

            <h1 className="text-3xl font-bold text-[var(--color-text-dark)] sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>
              {article.title}
            </h1>

            <p className="text-lg text-[var(--color-text-dark)]/70">{article.excerpt}</p>

            <div
              className="prose max-w-none text-[var(--color-text-dark)] prose-headings:text-[var(--color-text-dark)] prose-a:text-[var(--color-primary-dark)]"
              dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
