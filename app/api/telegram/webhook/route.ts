import type { NextRequest } from "next/server";
import { webhookCallback } from "grammy";

import { ensureStorageBucket } from "@/lib/supabase";
import { getBot } from "@/lib/telegram-bot";

export async function POST(req: NextRequest) {
  await ensureStorageBucket();

  const secret = req.headers.get("x-telegram-bot-api-secret-token");
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const bot = getBot();
  const handler = webhookCallback(bot, "std/http");

  return handler(req);
}
