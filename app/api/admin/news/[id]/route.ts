import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/admin-session";
import { supabase } from "@/lib/supabase";

const PATHS_TO_REVALIDATE = ["/", "/news", "/admin", "/admin/news"] as const;

const buildInternalOrigin = (request: NextRequest): string => {
  const protocol = request.headers.get("x-forwarded-proto") ?? "https";
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "localhost:3000";
  return `${protocol}://${host}`;
};

async function runSentinelCheck(request: NextRequest): Promise<void> {
  try {
    const origin = buildInternalOrigin(request);
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdminSession();

    const newsId = params.id;
    if (!newsId) {
      return NextResponse.json({ ok: false, error: "Missing news id" }, { status: 400 });
    }

    const { error } = await supabase.from("news_articles").delete().eq("id", newsId);
    if (error) {
      throw new Error(`Не удалось удалить новость: ${error.message}`);
    }

    revalidateTag("news", { expire: 0 });
    PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
    console.log("Cache purged for news ID:", newsId);
    await runSentinelCheck(request);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/admin/news/[id]", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
