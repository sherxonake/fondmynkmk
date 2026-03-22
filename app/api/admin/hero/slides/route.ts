import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/admin-session";
import { supabase } from "@/lib/supabase";

const PATHS_TO_REVALIDATE = ["/", "/admin", "/admin/hero"] as const;

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

export async function GET(request: NextRequest) {
  try {
    await requireAdminSession();

    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      throw new Error(`Не удалось загрузить слайды: ${error.message}`);
    }

    return NextResponse.json({ slides: data || [] });
  } catch (error) {
    console.error("/api/admin/hero/slides GET", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();

    const body = await request.json();
    const {
      title,
      subtitle,
      button_text,
      button_url,
      image_url,
    } = body;

    // Валидация обязательных полей
    if (!title?.trim()) {
      return NextResponse.json({ error: "Заголовок обязателен" }, { status: 400 });
    }

    if (!subtitle?.trim()) {
      return NextResponse.json({ error: "Описание обязательно" }, { status: 400 });
    }

    // Получаем максимальный sort_order для нового слайда
    const { data: maxSortResult } = await supabase
      .from("hero_slides")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextSortOrder = (maxSortResult?.sort_order ?? -1) + 1;

    const slideData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      button_text: button_text?.trim() || "",
      button_url: button_url?.trim() || "",
      image_url: image_url?.trim() || "",
      is_active: true,
      sort_order: nextSortOrder,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("hero_slides").insert(slideData).select().single();

    if (error) {
      throw new Error(`Не удалось создать слайд: ${error.message}`);
    }

    // Инвалидация кэша
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    revalidateTag("hero-slides", { expire: 0 });
    console.log("Hero slide created:", data.id);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("/api/admin/hero/slides POST", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
