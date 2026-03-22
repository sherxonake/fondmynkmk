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

export async function GET(request: NextRequest) {
  try {
    await requireAdminSession();

    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      throw new Error(`Не удалось загрузить партнёров: ${error.message}`);
    }

    return NextResponse.json({ partners: data || [] });
  } catch (error) {
    console.error("/api/admin/partners GET", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();

    const body = await request.json();
    const {
      name,
      logo_url,
      website_url,
    } = body;

    // Валидация обязательных полей
    if (!name?.trim()) {
      return NextResponse.json({ error: "Название партнёра обязательно" }, { status: 400 });
    }

    if (!logo_url?.trim()) {
      return NextResponse.json({ error: "URL логотипа обязателен" }, { status: 400 });
    }

    // Получаем максимальный sort_order для нового партнёра
    const { data: maxSortResult } = await supabase
      .from("partners")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const nextSortOrder = (maxSortResult?.sort_order ?? -1) + 1;

    const partnerData = {
      name: name.trim(),
      logo_url: logo_url.trim(),
      website_url: website_url?.trim() || null,
      sort_order: nextSortOrder,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("partners").insert(partnerData).select().single();

    if (error) {
      throw new Error(`Не удалось создать партнёра: ${error.message}`);
    }

    // Инвалидация кэша
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    revalidateTag("partners", { expire: 0 });
    console.log("Partner created:", data.id);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("/api/admin/partners POST", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
