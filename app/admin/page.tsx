import { ShieldCheck, Newspaper, Users, Bot } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { getTelegramStatus } from "@/lib/telegram-status";
import { SelfTestExecutor } from "@/app/admin/_components/self-test-executor";
import { requireAdminSession } from "@/lib/admin-session";

const numberFormatter = new Intl.NumberFormat("ru-RU");
const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  dateStyle: "medium",
  timeStyle: "short",
});

interface DashboardStats {
  totalNews: number;
  partners: number;
  lastPublishedAt: string | null;
}

async function getDashboardStats(): Promise<DashboardStats> {
  const [newsResult, partnersResult, latestPublished] = await Promise.all([
    supabase.from("news_articles").select("id", { count: "exact", head: true }),
    supabase.from("partners").select("id", { count: "exact", head: true }),
    supabase
      .from("news_articles")
      .select("published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (newsResult.error) {
    throw new Error(`Не удалось получить количество новостей: ${newsResult.error.message}`);
  }

  if (partnersResult.error) {
    throw new Error(`Не удалось получить список партнёров: ${partnersResult.error.message}`);
  }

  if (latestPublished.error) {
    throw new Error(`Не удалось получить дату последней публикации: ${latestPublished.error.message}`);
  }

  return {
    totalNews: newsResult.count ?? 0,
    partners: partnersResult.count ?? 0,
    lastPublishedAt: latestPublished.data?.published_at ?? null,
  };
}

const formatNumber = (value: number): string => numberFormatter.format(value);
const formatDateTime = (value: string | null): string => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
};

export default async function AdminDashboardPage() {
  await requireAdminSession();
  const [stats, telegramStatus] = await Promise.all([getDashboardStats(), getTelegramStatus()]);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Admin Control</p>
        <h1 className="text-3xl font-semibold text-white">Панель управления НГМК</h1>
        <p className="text-sm text-slate-400">Следи за публикациями, ботом и инфраструктурой — Bug Hunter мониторит всё в фоне.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/5 bg-slate-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Всего новостей</CardTitle>
            <Newspaper className="h-5 w-5 text-emerald-300" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-white">{formatNumber(stats.totalNews)}</p>
            <p className="text-xs text-slate-500">Последняя публикация: {formatDateTime(stats.lastPublishedAt)}</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-slate-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Активные партнёры</CardTitle>
            <Users className="h-5 w-5 text-emerald-300" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-white">{formatNumber(stats.partners)}</p>
            <p className="text-xs text-slate-500">Данные синхронизируются из Supabase</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-slate-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Статус Telegram-бота</CardTitle>
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className={telegramStatus.ok ? "bg-emerald-500/20 text-emerald-200" : "bg-rose-500/20 text-rose-200"}>
                <Bot className="mr-1 h-3.5 w-3.5" />
                {telegramStatus.ok ? "Онлайн" : "Недоступен"}
              </Badge>
              <span className="text-sm text-slate-300">{telegramStatus.label}</span>
            </div>
            <p className="text-xs text-slate-500">Проверяем через getMe()</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-white/5 bg-slate-900/40">
          <CardHeader>
            <CardTitle className="text-base text-white">Сводка активности</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Новостная лента</span>
              <span className="font-semibold text-white">{formatNumber(stats.totalNews)} записей</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Партнёрские обновления</span>
              <span className="font-semibold text-white">{formatNumber(stats.partners)} организации</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Последний пост</span>
              <span className="font-semibold text-white">{formatDateTime(stats.lastPublishedAt)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-slate-900/60">
          <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden />
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-200">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-200">Bug Hunter</p>
                <CardTitle className="text-base text-white">Фоновый самотест</CardTitle>
              </div>
            </div>
            <p className="text-sm text-emerald-100/80">
              Автоматически проверяет Supabase, сторидж и актуальность JWT. При сбое сразу прилетит тост.
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-emerald-100/90">
              <li>• Чтение news_articles через сервис-роль</li>
              <li>• Статус публичного bucket news-images</li>
              <li>• Валидность admin JWT-cookie</li>
            </ul>
          </CardContent>
          <SelfTestExecutor />
        </Card>
      </section>
    </div>
  );
}
