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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();

    const slideId = params.id;
    if (!slideId) {
      return NextResponse.json({ error: "Missing slide id" }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      button_text,
      button_url,
      image_url,
      is_active,
    } = body;

    // Проверка существования слайда
    const { data: existingSlide, error: fetchError } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("id", slideId)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json({ error: "Слайд не найден" }, { status: 404 });
      }
      throw new Error(`Ошибка поиска слайда: ${fetchError.message}`);
    }

    // Подготовка данных для обновления
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (title !== undefined) updateData.title = title.trim();
    if (subtitle !== undefined) updateData.subtitle = subtitle.trim();
    if (button_text !== undefined) updateData.button_text = button_text?.trim() || "";
    if (button_url !== undefined) updateData.button_url = button_url?.trim() || "";
    if (image_url !== undefined) updateData.image_url = image_url?.trim() || "";
    if (is_active !== undefined) updateData.is_active = Boolean(is_active);

    const { data, error } = await supabase
      .from("hero_slides")
      .update(updateData)
      .eq("id", slideId)
      .select()
      .single();

    if (error) {
      throw new Error(`Не удалось обновить слайд: ${error.message}`);
    }

    // Инвалидация кэша
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    revalidateTag("hero-slides", { expire: 0 });
    console.log("Hero slide updated:", data.id);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("/api/admin/hero/slides/[id] PATCH", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();

    const slideId = params.id;
    if (!slideId) {
      return NextResponse.json({ error: "Missing slide id" }, { status: 400 });
    }

    const { error } = await supabase.from("hero_slides").delete().eq("id", slideId);
    if (error) {
      throw new Error(`Не удалось удалить слайд: ${error.message}`);
    }

    // Инвалидация кэша
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    revalidateTag("hero-slides", { expire: 0 });
    console.log("Hero slide deleted:", slideId);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/admin/hero/slides/[id] DELETE", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
