export const dynamic = "force-dynamic";

import { ShieldCheck, Newspaper, Users, Bot, Plus, ExternalLink, Edit } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getTelegramStatus } from "@/lib/telegram-status";
import { SelfTestExecutor } from "@/app/admin/_components/self-test-executor";
import { HydratedDate } from "@/app/admin/_components/hydrated-date";
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

interface RecentNews {
  id: string;
  title: string;
  category: string;
  published_at: string | null;
  is_published: boolean;
}

async function getDashboardStats(): Promise<{ stats: DashboardStats; recentNews: RecentNews[] }> {
  const [newsResult, partnersResult, latestPublished, recentNewsResult] = await Promise.all([
    supabase.from("news_articles").select("id", { count: "exact", head: true }),
    supabase.from("partners").select("id", { count: "exact", head: true }),
    supabase
      .from("news_articles")
      .select("published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("news_articles")
      .select("id, title, category, published_at, is_published")
      .order("created_at", { ascending: false })
      .limit(3),
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

  if (recentNewsResult.error) {
    throw new Error(`Не удалось получить последние новости: ${recentNewsResult.error.message}`);
  }

  return {
    stats: {
      totalNews: newsResult.count ?? 0,
      partners: partnersResult.count ?? 0,
      lastPublishedAt: latestPublished.data?.published_at ?? null,
    },
    recentNews: (recentNewsResult.data || []) as RecentNews[],
  };
}

const formatNumber = (value: number): string => numberFormatter.format(value);
const formatDateTime = (value: string | null): string => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
};

export default async function AdminDashboardPage() {
  try {
    await requireAdminSession({ redirectOnFail: false });
  } catch {
    // Не редиректим, просто продолжаем с fallback данными
  }
  
  // Используем Promise.allSettled для дополнительной защиты от падений
  const [dataResult, telegramResult] = await Promise.allSettled([
    getDashboardStats(),
    getTelegramStatus()
  ]);
  
  const data = dataResult.status === 'fulfilled' ? dataResult.value : { stats: { totalNews: 0, partners: 0, lastPublishedAt: null }, recentNews: [] };
  const telegramStatus = telegramResult.status === 'fulfilled' ? telegramResult.value : { ok: false, label: "Недоступен" };
  
  const { stats, recentNews } = data;

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Admin Control</p>
        <h1 className="text-3xl font-semibold text-white">Панель управления НГМК</h1>
        <p className="text-sm text-slate-400">Следи за публикациями, ботом и инфраструктурой — Bug Hunter мониторит всё в фоне.</p>
      </section>

      {/* Быстрые действия */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold text-white">Создать новость</h3>
              <p className="text-sm text-slate-400">Добавить новую публикацию</p>
            </div>
            <Link href="/admin/news/new">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                Создать
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold text-white">Предпросмотр сайта</h3>
              <p className="text-sm text-slate-400">Открыть fondmynkmk.vercel.app</p>
            </div>
            <Link href="https://fondmynkmk.vercel.app" target="_blank">
              <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                <ExternalLink className="mr-2 h-4 w-4" />
                Открыть
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/5 bg-slate-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Всего новостей</CardTitle>
            <Newspaper className="h-5 w-5 text-emerald-300" />
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-white">{formatNumber(stats.totalNews)}</p>
            <p className="text-xs text-slate-500">
              Последняя публикация: <HydratedDate value={stats.lastPublishedAt} formatter={(date) => dateFormatter.format(date)} />
            </p>
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
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-white">Последние новости</CardTitle>
              <Link href="/admin/news">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  Все новости
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNews.length > 0 ? (
              recentNews.map((news) => (
                <div key={news.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-800/50 p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{news.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {news.category}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        <HydratedDate value={news.published_at} formatter={(date) => dateFormatter.format(date)} />
                      </span>
                    </div>
                  </div>
                  <Link href={`/admin/news/${news.id}/edit`}>
                    <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white ml-2">
                      <Edit className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-slate-400">Новостей пока нет</p>
                <Link href="/admin/news/new">
                  <Button variant="outline" size="sm" className="mt-2 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10">
                    <Plus className="mr-2 h-3.5 w-3.5" />
                    Создать первую
                  </Button>
                </Link>
              </div>
            )}
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
