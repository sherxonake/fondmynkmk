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

export async function PATCH(request: NextRequest) {
  try {
    await requireAdminSession();

    const body = await request.json();
    const { slideIds } = body;

    if (!Array.isArray(slideIds) || slideIds.length === 0) {
      return NextResponse.json({ error: "Некорректный список ID слайдов" }, { status: 400 });
    }

    // Обновляем sort_order для каждого слайда
    const updatePromises = slideIds.map((slideId: string, index: number) =>
      supabase
        .from("hero_slides")
        .update({ sort_order: index, updated_at: new Date().toISOString() })
        .eq("id", slideId)
    );

    const results = await Promise.all(updatePromises);
    
    // Проверяем на ошибки
    const errors = results.filter(result => result.error);
    if (errors.length > 0) {
      throw new Error(`Ошибка обновления порядка: ${errors[0].error?.message}`);
    }

    // Инвалидация кэша
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    revalidateTag("hero-slides", { expire: 0 });
    console.log("Hero slides reordered");
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/admin/hero/reorder PATCH", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
