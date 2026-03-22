export const dynamic = "force-dynamic";

import { ShieldCheck, Newspaper, Users, Bot, Plus, ExternalLink, Edit } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getTelegramStatus } from "@/lib/telegram-status";
import { HydratedDate } from "@/app/admin/_components/hydrated-date";

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
  published_at: string;
}

async function getDashboardStats(): Promise<{ stats: DashboardStats; recentNews: RecentNews[] }> {
  try {
    // Получаем количество новостей
    const { count: totalNews } = await supabase
      .from("news_articles")
      .select("*", { count: "exact", head: true });

    // Получаем количество партнёров
    const { count: partners } = await supabase
      .from("partners")
      .select("*", { count: "exact", head: true });

    // Получаем последнюю новость
    const { data: lastNews } = await supabase
      .from("news_articles")
      .select("published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // Получаем последние 3 новости
    const { data: recentNews } = await supabase
      .from("news_articles")
      .select("id, title, category, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3);

    return {
      stats: {
        totalNews: totalNews || 0,
        partners: partners || 0,
        lastPublishedAt: lastNews?.published_at || null,
      },
      recentNews: recentNews || [],
    };
  } catch (error) {
    console.error("getDashboardStats error", error);
    return {
      stats: { totalNews: 0, partners: 0, lastPublishedAt: null },
      recentNews: [],
    };
  }
}

export default async function AdminDashboardPage() {
  // Используем Promise.allSettled для защиты от падений
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
        <p className="text-sm text-slate-400">Следи за публикациями, ботом и инфраструктурой.</p>
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
            <p className="text-4xl font-semibold text-white">{numberFormatter.format(stats.totalNews)}</p>
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
            <p className="text-4xl font-semibold text-white">{numberFormatter.format(stats.partners)}</p>
            <p className="text-xs text-slate-500">Организации-партнёры фонда</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-slate-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Telegram бот</CardTitle>
            <Bot className="h-5 w-5 text-emerald-300" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-3 w-3 rounded-full shadow-xl",
                  telegramStatus.ok ? "bg-emerald-400 shadow-emerald-500/70" : "bg-rose-500 shadow-rose-500/60 animate-pulse"
                )}
              />
              <div>
                <p className="text-sm font-semibold">{telegramStatus.label}</p>
                <p className="text-xs text-slate-500">Проверяем через getMe()</p>
              </div>
            </div>
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

        {/* SelfTestExecutor УДАЛЕН */}
        <Card className="border-white/5 bg-slate-900/40">
          <CardHeader>
            <CardTitle className="text-base text-white">Система мониторинга</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              Автоматический мониторинг работоспособности системы временно отключен для диагностики.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}
