import { requireAdminSession } from "@/lib/admin-session";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsTable } from "./news-table";
import type { AdminNewsRow } from "./types";

type NewsRowResponse = {
  id: string | null;
  title: string | null;
  category: string | null;
  image_url: string | null;
  created_at: string | null;
  published_at: string | null;
  is_published: boolean | null;
  is_archived: boolean | null;
};

function mapRow(row: NewsRowResponse): AdminNewsRow | null {
  if (!row.id) {
    return null;
  }

  return {
    id: row.id,
    title: row.title ?? "(без заголовка)",
    category: row.category ?? "—",
    imageUrl: row.image_url ?? "",
    createdAt: row.created_at ?? "",
    publishedAt: row.published_at,
    isPublished: Boolean(row.is_published),
    isArchived: Boolean(row.is_archived),
  };
}

async function getNewsBuckets(): Promise<{ active: AdminNewsRow[]; archived: AdminNewsRow[] }> {
  const selectFields = "id, title, category, image_url, created_at, published_at, is_published, is_archived";

  const [active, archived] = await Promise.all([
    supabase
      .from("news_articles")
      .select(selectFields)
      .eq("is_archived", false)
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("news_articles")
      .select(selectFields)
      .eq("is_archived", true)
      .order("updated_at", { ascending: false })
      .limit(50),
  ]);

  if (active.error) {
    throw new Error(`Не удалось загрузить активные новости: ${active.error.message}`);
  }

  if (archived.error) {
    throw new Error(`Не удалось загрузить архив: ${archived.error.message}`);
  }

  const toRows = (rows: NewsRowResponse[] | null | undefined) =>
    (rows ?? []).map(mapRow).filter((row): row is AdminNewsRow => Boolean(row));

  return {
    active: toRows(active.data as NewsRowResponse[] | null | undefined),
    archived: toRows(archived.data as NewsRowResponse[] | null | undefined),
  };
}

export default async function AdminNewsPage() {
  await requireAdminSession();
  const { active, archived } = await getNewsBuckets();
  const hasActive = active.length > 0;
  const hasArchived = archived.length > 0;
  const defaultTab = hasActive ? "active" : "archived";

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">News Control</p>
        <h1 className="text-3xl font-semibold text-white">Публикации, черновики и архив</h1>
        <p className="text-sm text-slate-400">
          Управляй лентой, проверяй превью и мгновенно скрывай новости, отправляя их в архив без полного удаления.
        </p>
      </section>

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="active" className="min-w-[140px]">
            Лента
            <span className="ml-2 rounded-full bg-emerald-500/20 px-2 text-xs text-emerald-200">{active.length}</span>
          </TabsTrigger>
          <TabsTrigger value="archived" className="min-w-[140px]">
            Архив
            <span className="ml-2 rounded-full bg-slate-500/30 px-2 text-xs text-slate-200">{archived.length}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {hasActive ? <NewsTable items={active} mode="active" /> : <EmptyState title="Лента пуста" variant="active" />}
        </TabsContent>

        <TabsContent value="archived">
          {hasArchived ? (
            <NewsTable items={archived} mode="archived" />
          ) : (
            <EmptyState title="Архив пуст" variant="archived" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ title, variant }: { title: string; variant: "active" | "archived" }) {
  const isActive = variant === "active";
  const description = isActive
    ? "Чтобы добавить публикацию, отправьте пост в Telegram-бота фонда — система создаст черновик автоматически."
    : "Удалённые новости появляются здесь. Вы можете восстановить их или удалить навсегда.";

  return (
    <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/60 p-10 shadow-2xl">
      <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">{isActive ? "Ready to post" : "Archive"}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>
      <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
        <span className="font-semibold">Bug Hunter Mode</span>
        <span className="text-emerald-200/70">следит за консистентностью данных.</span>
      </div>
    </div>
  );
}
