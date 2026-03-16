import { getBot } from "./telegram-bot";

export type TelegramStatus = {
  ok: boolean;
  label: string;
};

export async function getTelegramStatus(): Promise<TelegramStatus> {
  try {
    const bot = getBot();
    const me = await bot.api.getMe();
    const label = me.username ? `@${me.username}` : me.first_name;
    return { ok: true, label: label ?? "Bot" };
  } catch (error) {
    console.error("getTelegramStatus", error);
    return { ok: false, label: "Недоступен" };
  }
}
