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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();

    const partnerId = params.id;
    if (!partnerId) {
      return NextResponse.json({ error: "Missing partner id" }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      logo_url,
      website_url,
    } = body;

    // Проверка существования партнёра
    const { data: existingPartner, error: fetchError } = await supabase
      .from("partners")
      .select("*")
      .eq("id", partnerId)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json({ error: "Партнёр не найден" }, { status: 404 });
      }
      throw new Error(`Ошибка поиска партнёра: ${fetchError.message}`);
    }

    // Подготовка данных для обновления
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name.trim();
    if (logo_url !== undefined) updateData.logo_url = logo_url.trim();
    if (website_url !== undefined) updateData.website_url = website_url?.trim() || null;

    const { data, error } = await supabase
      .from("partners")
      .update(updateData)
      .eq("id", partnerId)
      .select()
      .single();

    if (error) {
      throw new Error(`Не удалось обновить партнёра: ${error.message}`);
    }

    // Инвалидация кэша
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    revalidateTag("partners", { expire: 0 });
    console.log("Partner updated:", data.id);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("/api/admin/partners/[id] PATCH", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();

    const partnerId = params.id;
    if (!partnerId) {
      return NextResponse.json({ error: "Missing partner id" }, { status: 400 });
    }

    const { error } = await supabase.from("partners").delete().eq("id", partnerId);
    if (error) {
      throw new Error(`Не удалось удалить партнёра: ${error.message}`);
    }

    // Инвалидация кэша
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    revalidateTag("partners", { expire: 0 });
    console.log("Partner deleted:", partnerId);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/admin/partners/[id] DELETE", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
