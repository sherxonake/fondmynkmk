import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/admin-session";
import { supabase } from "@/lib/supabase";

const PATHS_TO_REVALIDATE = ["/", "/news", "/admin", "/admin/news"] as const;

async function runSentinelCheck(request: NextRequest): Promise<void> {
  try {
    const protocol = request.headers.get("x-forwarded-proto") ?? "https";
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "localhost:3000";
    const origin = `${protocol}://${host}`;
    
    await fetch(`${origin}/api/admin/sentinel`, {
      cache: "no-store",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });
  } catch (error) {
    console.error("sentinel cache verification failed", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();

    const body = await request.json();
    const {
      title,
      slug,
      category,
      excerpt,
      content,
      image_url,
      published_at,
      is_published = false,
    } = body;

    // Валидация обязательных полей
    if (!title?.trim()) {
      return NextResponse.json({ ok: false, error: "Заголовок обязателен" }, { status: 400 });
    }

    if (!slug?.trim()) {
      return NextResponse.json({ ok: false, error: "Slug обязателен" }, { status: 400 });
    }

    if (!category?.trim()) {
      return NextResponse.json({ ok: false, error: "Категория обязательна" }, { status: 400 });
    }

    // Генерация slug если не предоставлен
    const finalSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9а-яё\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");

    // Проверка уникальности slug
    const { data: existingNews, error: slugCheckError } = await supabase
      .from("news_articles")
      .select("id")
      .eq("slug", finalSlug)
      .maybeSingle();

    if (slugCheckError) {
      throw new Error(`Ошибка проверки slug: ${slugCheckError.message}`);
    }

    if (existingNews) {
      return NextResponse.json({ ok: false, error: "Новость с таким slug уже существует" }, { status: 409 });
    }

    const newsData = {
      title: title.trim(),
      slug: finalSlug,
      category: category.trim(),
      excerpt: excerpt?.trim() || null,
      content: content?.trim() || null,
      image_url: image_url?.trim() || null,
      published_at: is_published && published_at ? published_at : is_published ? new Date().toISOString() : null,
      is_published: Boolean(is_published),
      is_archived: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("news_articles").insert(newsData).select().single();

    if (error) {
      throw new Error(`Не удалось создать новость: ${error.message}`);
    }

    // Инвалидация кэша
    revalidateTag("news", { expire: 0 });
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    console.log("News created:", data.id);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("/api/admin/news POST", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdminSession();

    const body = await request.json();
    const {
      id,
      title,
      slug,
      category,
      excerpt,
      content,
      image_url,
      published_at,
      is_published,
    } = body;

    if (!id?.trim()) {
      return NextResponse.json({ ok: false, error: "ID новости обязателен" }, { status: 400 });
    }

    // Проверка существования новости
    const { data: existingNews, error: fetchError } = await supabase
      .from("news_articles")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json({ ok: false, error: "Новость не найдена" }, { status: 404 });
      }
      throw new Error(`Ошибка поиска новости: ${fetchError.message}`);
    }

    // Подготовка данных для обновления
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (excerpt !== undefined) updateData.excerpt = excerpt?.trim() || null;
    if (content !== undefined) updateData.content = content?.trim() || null;
    if (image_url !== undefined) updateData.image_url = image_url?.trim() || null;

    // Обработка slug
    if (slug !== undefined) {
      const finalSlug = slug || title
        ?.toLowerCase()
        .replace(/[^a-z0-9а-яё\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim("-");

      if (finalSlug && finalSlug !== existingNews.slug) {
        // Проверка уникальности slug
        const { data: slugCheck, error: slugCheckError } = await supabase
          .from("news_articles")
          .select("id")
          .eq("slug", finalSlug)
          .neq("id", id)
          .maybeSingle();

        if (slugCheckError) {
          throw new Error(`Ошибка проверки slug: ${slugCheckError.message}`);
        }

        if (slugCheck) {
          return NextResponse.json({ ok: false, error: "Новость с таким slug уже существует" }, { status: 409 });
        }

        updateData.slug = finalSlug;
      }
    }

    // Обработка статуса публикации
    if (is_published !== undefined) {
      updateData.is_published = Boolean(is_published);
      
      if (is_published && !existingNews.is_published) {
        // Публикуем новость
        updateData.published_at = published_at || new Date().toISOString();
      } else if (!is_published && existingNews.is_published) {
        // Снимаем с публикации
        updateData.published_at = null;
      } else if (is_published && published_at && published_at !== existingNews.published_at) {
        // Обновляем дату публикации
        updateData.published_at = published_at;
      }
    }

    const { data, error } = await supabase
      .from("news_articles")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Не удалось обновить новость: ${error.message}`);
    }

    // Инвалидация кэша
    revalidateTag("news", { expire: 0 });
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    console.log("News updated:", data.id);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("/api/admin/news PATCH", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
