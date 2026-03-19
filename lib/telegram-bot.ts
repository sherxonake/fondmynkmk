import "server-only";

import { Buffer } from "node:buffer";

import { Bot, InlineKeyboard } from "grammy";

import { supabase } from "./supabase";
import { generateSlug } from "./utils";

type TelegramFileResponse = {
  ok: boolean;
  result?: {
    file_id: string;
    file_unique_id: string;
    file_path: string;
    file_size?: number;
  };
  description?: string;
};

type NewsArticleInsert = {
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  slug: string;
  category: string;
  is_published: boolean;
  source: "telegram";
  telegram_message_id: number;
  published_at: string | null;
};

const CATEGORY_TAGS: Record<string, string> = {
  "#sport": "Sport",
  "#medicine": "Tibbiyot",
  "#culture": "Madaniyat",
  "#recreation": "Dam olish",
};

const DEFAULT_CATEGORY = "Yangiliklar";

let botInstance: Bot | null = null;

const ensureEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing ${key}`);
  }
  return value;
};

export async function downloadTelegramFile(fileId: string): Promise<Buffer> {
  const token = ensureEnv("TELEGRAM_BOT_TOKEN");
  const infoResponse = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`);

  if (!infoResponse.ok) {
    throw new Error(`Failed to fetch file info: ${infoResponse.statusText}`);
  }

  const info = (await infoResponse.json()) as TelegramFileResponse;

  if (!info.ok || !info.result?.file_path) {
    throw new Error(info.description ?? "Telegram API getFile error");
  }

  const fileResponse = await fetch(
    `https://api.telegram.org/file/bot${token}/${encodeURI(info.result.file_path)}`
  );

  if (!fileResponse.ok) {
    throw new Error(`Failed to download file: ${fileResponse.statusText}`);
  }

  const arrayBuffer = await fileResponse.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function uploadImageToStorage(buffer: Buffer, filename: string): Promise<string | null> {
  const { error: uploadError } = await supabase.storage
    .from("news-images")
    .upload(filename, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (uploadError) {
    console.error("uploadImageToStorage.upload", uploadError);
    return null;
  }

  const { data } = supabase.storage.from("news-images").getPublicUrl(filename);
  return data.publicUrl ?? null;
}

export function getBot(): Bot {
  if (!botInstance) {
    const token = ensureEnv("TELEGRAM_BOT_TOKEN");
    botInstance = new Bot(token);
    setupBotHandlers(botInstance);
  }
  return botInstance;
}

export function isAllowed(userId: number): boolean {
  if (!userId) return false;
  const allowedIds = (process.env.TELEGRAM_ALLOWED_USER_IDS ?? "")
    .split(",")
    .map((id) => Number(id.trim()))
    .filter((id) => Number.isFinite(id));

  if (allowedIds.length === 0) {
    return false;
  }

  return allowedIds.includes(userId);
}

const formatDate = (value: string | null): string => {
  if (!value) return "—";
  return new Date(value).toLocaleString("ru-RU");
};

const parseCaption = (caption: string) => {
  const lines = caption
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine = lines[0] ?? "";
  const title = firstLine.replace(/#[^\s]+/g, "").trim();

  const contentLines = lines.slice(1).filter((line) => !line.startsWith("#"));
  const content = contentLines.join("\n").trim();

  const lowerCaption = caption.toLowerCase();
  const categoryEntry = Object.entries(CATEGORY_TAGS).find(([tag]) => lowerCaption.includes(tag));
  const category = categoryEntry ? categoryEntry[1] : DEFAULT_CATEGORY;
  const isDraft = /#draft\b/i.test(caption);

  return {
    title,
    content,
    category,
    isDraft,
  };
};

const requireAccess = (ctx: { from?: { id?: number }; reply: (text: string) => Promise<unknown> }): boolean => {
  const userId = ctx.from?.id ?? 0;
  if (!isAllowed(userId)) {
    void ctx.reply("⛔ Нет доступа");
    return false;
  }
  return true;
};

export function setupBotHandlers(bot: Bot): void {
  bot.command("start", async (ctx) => {
    if (!requireAccess(ctx)) return;

    await ctx.reply(
      "👋 Привет! Я бот для публикации новостей НГМК.\n\n📝 Как опубликовать новость:\nОтправь фото с подписью:\n\nПервая строка = заголовок\nОстальные строки = текст новости\n\n🏷 Теги:\n#draft — сохранить как черновик\n#sport #medicine #culture — категория\n\nБез тегов = публикуется сразу"
    );
  });

  bot.command("list", async (ctx) => {
    if (!requireAccess(ctx)) return;

    const { data, error } = await supabase
      .from("news_articles")
      .select("title, slug, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("/list", error);
      await ctx.reply("❌ Не удалось получить новости");
      return;
    }

    if (!data || data.length === 0) {
      await ctx.reply("Пока нет опубликованных новостей");
      return;
    }

    const lines = data.map((item, index) => {
      const title = item.title ?? "(без заголовка)";
      const slug = item.slug ?? "";
      const date = formatDate(item.published_at ?? null);
      return `${index + 1}. ${title}\n   /news/${slug} • ${date}`;
    });

    await ctx.reply(`📰 Последние новости:\n\n${lines.join("\n\n")}`);
  });

  bot.command("drafts", async (ctx) => {
    if (!requireAccess(ctx)) return;

    const { data, error } = await supabase
      .from("news_articles")
      .select("id, title, category, created_at")
      .eq("is_published", false)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("/drafts", error);
      await ctx.reply("❌ Не удалось получить черновики");
      return;
    }

    if (!data || data.length === 0) {
      await ctx.reply("Черновиков нет");
      return;
    }

    for (const draft of data) {
      const keyboard = new InlineKeyboard().text("✅ Опубликовать", `publish_${draft.id}`).row();
      keyboard.text("🗑 Удалить", `delete_${draft.id}`);

      await ctx.reply(
        `📝 ${draft.title ?? "(без названия)"}\n🏷 ${draft.category ?? DEFAULT_CATEGORY}\n📅 ${formatDate(
          draft.created_at ?? null
        )}`,
        { reply_markup: keyboard }
      );
    }
  });

  bot.command("stats", async (ctx) => {
    if (!requireAccess(ctx)) return;

    const [{ count, error: countError }, latestResult] = await Promise.all([
      supabase
        .from("news_articles")
        .select("id", { count: "exact", head: true })
        .eq("is_published", true),
      supabase
        .from("news_articles")
        .select("published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    if (countError || latestResult.error) {
      console.error("/stats", countError, latestResult.error);
      await ctx.reply("❌ Не удалось получить статистику");
      return;
    }

    await ctx.reply(
      `📊 Статистика:\nВсего новостей: ${count ?? 0}\nПоследняя: ${formatDate(
        latestResult.data?.published_at ?? null
      )}`
    );
  });

  bot.on("message:photo", async (ctx) => {
    if (!requireAccess(ctx)) return;

    const caption = ctx.message.caption ?? "";
    if (!caption.trim()) {
      await ctx.reply("⚠️ Добавь подпись к фото:\n1 строка = заголовок\nОстальное = текст");
      return;
    }

    const { title, content, category, isDraft } = parseCaption(caption);
    if (!title) {
      await ctx.reply("⚠️ Добавь заголовок в первую строку (без тегов)");
      return;
    }

    const largestPhoto = ctx.message.photo.at(-1);
    if (!largestPhoto) {
      await ctx.reply("❌ Не удалось получить фото");
      return;
    }

    await ctx.reply("⏳ Загружаю фото...");

    try {
      const buffer = await downloadTelegramFile(largestPhoto.file_id);
      const filename = `telegram-${Date.now()}.jpg`;
      const imageUrl = await uploadImageToStorage(buffer, filename);

      if (!imageUrl) {
        await ctx.reply("❌ Не удалось загрузить изображение");
        return;
      }

      const slug = generateSlug(title);
      const excerptSource = content || title;
      const payload: NewsArticleInsert = {
        title,
        excerpt: excerptSource.slice(0, 200),
        content: content || title,
        image_url: imageUrl,
        slug,
        category,
        is_published: !isDraft,
        source: "telegram",
        telegram_message_id: ctx.message.message_id,
        published_at: isDraft ? null : new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("news_articles")
        .insert([payload])
        .select("id")
        .single();

      if (error || !data) {
        console.error("insert news", error);
        await ctx.reply(`❌ Ошибка сохранения: ${error?.message ?? "unknown"}`);
        return;
      }

      const keyboard = new InlineKeyboard();
      if (isDraft) {
        keyboard.text("✅ Опубликовать", `publish_${data.id}`).row();
      }
      keyboard.text("🗑 Удалить", `delete_${data.id}`);

      await ctx.reply(
        `✅ ${isDraft ? "Черновик сохранён" : "Новость опубликована"}!\n📰 ${title}\n🏷 ${category}\n${
          isDraft ? "📝 Статус: Черновик" : "🌐 Опубликовано на сайте"
        }`,
        { reply_markup: keyboard }
      );
    } catch (error) {
      console.error("message:photo", error);
      await ctx.reply("❌ Ошибка обработки фотографии");
    }
  });

  bot.on("callback_query:data", async (ctx) => {
    const userId = ctx.from?.id ?? 0;
    if (!isAllowed(userId)) {
      await ctx.answerCallbackQuery({ text: "⛔ Нет доступа", show_alert: true });
      return;
    }

    const data = ctx.callbackQuery.data;

    if (!data) {
      await ctx.answerCallbackQuery();
      return;
    }

    if (data.startsWith("publish_")) {
      const id = data.replace("publish_", "");
      const { error } = await supabase
        .from("news_articles")
        .update({ is_published: true, published_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        console.error("publish callback", error);
        await ctx.answerCallbackQuery({ text: "❌ Ошибка публикации" });
        return;
      }

      await ctx.answerCallbackQuery({ text: "✅ Опубликовано!" });
      await ctx.editMessageText("✅ Новость опубликована!");
      return;
    }

    if (data.startsWith("delete_")) {
      const id = data.replace("delete_", "");
      const { error } = await supabase.from("news_articles").delete().eq("id", id);

      if (error) {
        console.error("delete callback", error);
        await ctx.answerCallbackQuery({ text: "❌ Ошибка удаления" });
        return;
      }

      await ctx.answerCallbackQuery({ text: "🗑 Удалено" });
      await ctx.editMessageText("🗑 Новость удалена");
      return;
    }

    await ctx.answerCallbackQuery();
  });
}
