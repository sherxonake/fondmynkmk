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
const ADMIN_PASSWORD = "admin123";

let botInstance: Bot | null = null;

// Хранение авторизованных пользователей
const authorizedUsers = new Map<number, boolean>();
const userStates = new Map<number, 'editing' | 'normal'>();

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

// Проверка авторизации по паролю
function isAuthorized(userId: number): boolean {
  return authorizedUsers.has(userId);
}

// Функция для проверки авторизации
const requireAuth = (ctx: { from?: { id?: number }; reply: (text: string) => Promise<unknown> }): boolean => {
  const userId = ctx.from?.id ?? 0;
  if (!isAuthorized(userId)) {
    void ctx.reply("⛔ Доступ запрещён. Сначала авторизуйтесь через /start");
    return false;
  }
  return true;
};

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

  return {
    title,
    content,
    category,
  };
};

export function setupBotHandlers(bot: Bot): void {
  // Команда /start - авторизация
  bot.command("start", async (ctx) => {
    const userId = ctx.from?.id ?? 0;
    
    if (isAuthorized(userId)) {
      await ctx.reply(
        "✅ Вы уже авторизованы!\n\n📸 Отправьте фото с подписью → опубликовать новость\n/list — список новостей\n/edit — редактировать новость\n/drafts — черновики\n/logout — выйти"
      );
      return;
    }

    await ctx.reply(
      "👋 Добро пожаловать в бот управления новостями НГМК!\n\n" +
      "Для работы нужно авторизоваться.\n" +
      "Введите пароль:"
    );
  });

  // Обработка ввода пароля
  bot.on("message:text", async (ctx) => {
    const userId = ctx.from?.id ?? 0;
    const text = ctx.message.text.trim();

    // Если пользователь не авторизован и это не команда, проверяем пароль
    if (!isAuthorized(userId) && !text.startsWith('/')) {
      if (text === ADMIN_PASSWORD) {
        authorizedUsers.set(userId, true);
        userStates.set(userId, 'normal');
        await ctx.reply(
          "✅ Авторизован! Теперь вы можете:\n\n" +
          "📸 Отправить фото с подписью → опубликовать новость\n" +
          "/list — список новостей\n" +
          "/edit — редактировать новость\n" +
          "/drafts — черновики\n" +
          "/logout — выйти"
        );
      } else {
        await ctx.reply("❌ Неверный пароль. Попробуйте ещё раз.");
      }
      return;
    }
  });

  // Команда /logout
  bot.command("logout", async (ctx) => {
    const userId = ctx.from?.id ?? 0;
    authorizedUsers.delete(userId);
    userStates.delete(userId);
    await ctx.reply("👋 Вы вышли из системы. Для входа используйте /start");
  });

  // Команда /list
  bot.command("list", async (ctx) => {
    if (!requireAuth(ctx)) return;

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

  // Команда /edit - показать список новостей для редактирования
  bot.command("edit", async (ctx) => {
    if (!requireAuth(ctx)) return;

    const userId = ctx.from?.id ?? 0;
    userStates.set(userId, 'editing');

    const { data, error } = await supabase
      .from("news_articles")
      .select("id, title, category, published_at")
      .eq("source", "telegram")
      .order("published_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("/edit", error);
      await ctx.reply("❌ Не удалось получить новости");
      return;
    }

    if (!data || data.length === 0) {
      await ctx.reply("Нет новостей для редактирования");
      return;
    }

    await ctx.reply("📝 Выберите новость для редактирования:");

    for (const news of data) {
      const keyboard = new InlineKeyboard().text("✏️ Редактировать", `edit_${news.id}`);
      
      await ctx.reply(
        `📰 ${news.title ?? "(без названия)"}\n🏷 ${news.category ?? DEFAULT_CATEGORY}\n📅 ${formatDate(
          news.published_at ?? null
        )}`,
        { reply_markup: keyboard }
      );
    }
  });

  // Команда /drafts
  bot.command("drafts", async (ctx) => {
    if (!requireAuth(ctx)) return;

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

  // Обработка фотографий
  bot.on("message:photo", async (ctx) => {
    if (!requireAuth(ctx)) return;

    const userId = ctx.from?.id ?? 0;
    const userState = userStates.get(userId) ?? 'normal';

    // Если пользователь в режиме редактирования, ожидаем текст а не фото
    if (userState === 'editing') {
      await ctx.reply("⚠️ Вы в режиме редактирования. Сначала завершите редактирование новости или отправьте /edit для выхода.");
      return;
    }

    const caption = ctx.message.caption ?? "";
    if (!caption.trim()) {
      await ctx.reply("⚠️ Добавь подпись к фото:\n1 строка = заголовок\nОстальное = текст");
      return;
    }

    const { title, content, category } = parseCaption(caption);
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
        is_published: false, // ВСЕГДА черновик для модерации
        source: "telegram",
        telegram_message_id: ctx.message.message_id,
        published_at: null, // Нет даты публикации пока не одобрено
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

      await ctx.reply(
        `⏳ Новость отправлена на модерацию!\n\n📰 ${title}\n🏷 ${category}\n\nАдминистратор рассмотрит и опубликует её на сайте.`
      );
    } catch (error) {
      console.error("message:photo", error);
      await ctx.reply("❌ Ошибка обработки фотографии");
    }
  });

  // Обработка текста в режиме редактирования
  bot.on("message:text", async (ctx) => {
    const userId = ctx.from?.id ?? 0;
    const userState = userStates.get(userId) ?? 'normal';
    const text = ctx.message.text.trim();

    // Если пользователь в режиме редактирования и это не команда
    if (userState === 'editing' && !text.startsWith('/')) {
      // Здесь будет логика редактирования новости
      // Пока просто выходим из режима редактирования
      userStates.set(userId, 'normal');
      await ctx.reply("✅ Режим редактирования завершён. Используйте /edit для выбора новости.");
      return;
    }
  });

  // Обработка callback кнопок
  bot.on("callback_query:data", async (ctx) => {
    const userId = ctx.from?.id ?? 0;
    if (!isAuthorized(userId)) {
      await ctx.answerCallbackQuery({ text: "⛔ Доступ запрещён", show_alert: true });
      return;
    }

    const data = ctx.callbackQuery.data;

    if (!data) {
      await ctx.answerCallbackQuery();
      return;
    }

    // Редактирование новости
    if (data.startsWith("edit_")) {
      const newsId = data.replace("edit_", "");
      userStates.set(userId, 'editing');
      
      await ctx.answerCallbackQuery({ text: "✏️ Режим редактирования" });
      await ctx.editMessageText(
        "✏️ Теперь отправьте новый текст для новости:\n\n" +
        "1 строка = новый заголовок\n" +
        "Остальные строки = новый текст\n\n" +
        "Или отправьте /edit для отмены"
      );
      
      // Сохраняем ID новости для редактирования (можно использовать userStates или отдельный Map)
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
