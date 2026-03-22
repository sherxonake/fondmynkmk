import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/admin-session";
import { supabase } from "@/lib/supabase";

const PATHS_TO_REVALIDATE = ["/", "/admin", "/admin/partners"] as const;

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
    const { partnerIds } = body;

    if (!Array.isArray(partnerIds) || partnerIds.length === 0) {
      return NextResponse.json({ error: "Некорректный список ID партнёров" }, { status: 400 });
    }

    // Обновляем sort_order для каждого партнёра
    const updatePromises = partnerIds.map((partnerId: string, index: number) =>
      supabase
        .from("partners")
        .update({ sort_order: index, updated_at: new Date().toISOString() })
        .eq("id", partnerId)
    );

    const results = await Promise.all(updatePromises);
    
    // Проверяем на ошибки
    const errors = results.filter(result => result.error);
    if (errors.length > 0) {
      throw new Error(`Ошибка обновления порядка: ${errors[0].error?.message}`);
    }

    // Инвалидация кэша
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    revalidateTag("partners", { expire: 0 });
    console.log("Partners reordered");
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/admin/partners/reorder PATCH", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
