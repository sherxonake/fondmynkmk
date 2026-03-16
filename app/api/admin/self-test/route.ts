import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/admin-session";
import { checkStorageHealth } from "@/lib/admin-health";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    await requireAdminSession();

    const [{ error: newsError }, storageHealthy] = await Promise.all([
      supabase.from("news_articles").select("id", { count: "exact", head: true }),
      checkStorageHealth(),
    ]);

    if (newsError) {
      throw new Error(`news_articles unavailable: ${newsError.message}`);
    }

    if (!storageHealthy) {
      throw new Error("Supabase storage bucket 'news-images' недоступен");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/admin/self-test", error);
    const message = error instanceof Error ? error.message : "Неизвестная ошибка";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
