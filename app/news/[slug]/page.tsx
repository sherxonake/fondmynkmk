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
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-text-dark)]/60">
          <Link href="/" className="transition hover:text-[var(--color-primary-dark)]">
            Bosh sahifa
          </Link>
          <span>/</span>
          <Link href="/news" className="transition hover:text-[var(--color-primary-dark)]">
            Yangiliklar
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text-dark)]">{article.title.slice(0, 50)}...</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <article className="overflow-hidden rounded-3xl bg-[var(--color-white)] shadow-[var(--shadow-card)]">
              <div className="relative h-80 w-full sm:h-96 lg:h-[32rem]">
                <Image
                  src={imageSrc}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
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
                  className="prose max-w-none text-[var(--color-text-dark)] prose-headings:text-[var(--color-text-dark)] prose-a:text-[var(--color-primary-dark)] prose-p:text-[var(--color-text-dark)] prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-bold text-[var(--color-text-dark)]">O'xshash yangiliklar</h3>
              <div className="space-y-4">
                {/* Placeholder for similar news - will implement later */}
                <div className="rounded-xl bg-[var(--color-white)]/60 p-4 text-center text-[var(--color-text-dark)]/60">
                  Tez orada o'xshash yangiliklar...
                </div>
              </div>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-gold)] px-6 py-3 text-base font-semibold text-[var(--color-primary-dark)] shadow-lg shadow-[var(--color-accent-gold)]/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[var(--color-accent-gold)]/35"
            >
              ← Barcha yangiliklar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
