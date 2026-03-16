import { Suspense } from "react";

import { requireAdminSession } from "@/lib/admin-session";
import { supabase } from "@/lib/supabase";
import { NewsTable } from "./news-table";
import type { AdminNewsRow } from "./types";

async function getAdminNews(): Promise<AdminNewsRow[]> {
  const { data, error } = await supabase
    .from("news_articles")
    .select("id, title, category, image_url, created_at, published_at, is_published")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(`Не удалось загрузить новости: ${error.message}`);
  }

  const rows = (data ?? []) as {
    id: string | null;
    title: string | null;
    category: string | null;
    image_url: string | null;
    created_at: string | null;
    published_at: string | null;
    is_published: boolean | null;
  }[];

  return rows
    .filter((row) => row.id)
    .map((row) => ({
      id: row.id as string,
      title: row.title ?? "(без заголовка)",
      category: row.category ?? "—",
      imageUrl: row.image_url ?? "",
      createdAt: row.created_at ?? "",
      publishedAt: row.published_at,
      isPublished: Boolean(row.is_published),
    }));
}

export default async function AdminNewsPage() {
  await requireAdminSession();
  const news = await getAdminNews();
  const hasNews = news.length > 0;

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">News Control</p>
        <h1 className="text-3xl font-semibold text-white">Публикации и черновики</h1>
        <p className="text-sm text-slate-400">Управляй лентой, проверяй превью и моментально снимай публикации при ошибках.</p>
      </section>

      {hasNews ? (
        <Suspense fallback={<p className="text-sm text-slate-400">Загружаем таблицу…</p>}>
          <NewsTable items={news} />
        </Suspense>
      ) : (
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/60 p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Empty feed</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Новостей пока нет</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Отправьте пост с фотографией и подписью в Telegram-бота фонда. Он автоматически создаст черновик или сразу опубликует новость.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
            <span className="font-semibold">Команда Bug Hunter</span>
            <span className="text-emerald-200/70">следит за тем, чтобы всё появилось мгновенно.</span>
          </div>
        </div>
      )}
    </div>
  );
}
