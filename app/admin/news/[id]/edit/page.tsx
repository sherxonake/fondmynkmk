import { requireAdminSession } from "@/lib/admin-session";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { NewsEditorForm } from "../../news-editor-form";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  published_at: string | null;
  is_published: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

async function getNewsArticle(id: string): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      console.error("Failed to load news article:", error);
      return null;
    }

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error loading news article:", error);
    return null;
  }
}

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  await requireAdminSession();
  const newsArticle = await getNewsArticle(params.id);

  if (!newsArticle) {
    return (
      <div className="p-8 text-white">
        <p className="text-red-400">Новость не найдена или была удалена.</p>
        <Link href="/admin/news" className="text-emerald-400 hover:text-emerald-300">← Вернуться к новостям</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">News Editing</p>
        <h1 className="text-3xl font-semibold text-white">Редактирование новости</h1>
        <p className="text-sm text-slate-400">
          Внеси изменения в форму ниже. Все поля помеченные звёздочкой обязательны.
        </p>
      </section>

      <NewsEditorForm 
        mode="edit" 
        initialData={{
          title: newsArticle.title,
          slug: newsArticle.slug,
          category: newsArticle.category as "Sport" | "Tibbiyot" | "Dam olish" | "Madaniyat",
          excerpt: newsArticle.excerpt || undefined,
          content: newsArticle.content || undefined,
          image_url: newsArticle.image_url || undefined,
          published_at: newsArticle.published_at || undefined,
          is_published: newsArticle.is_published,
        }}
        newsId={newsArticle.id}
      />
    </div>
  );
}
