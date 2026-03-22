export const dynamic = "force-dynamic";

import { Plus, Save, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { requireAdminSession } from "@/lib/admin-session";

interface StatItem {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  sort_order: number;
}

async function getStats(): Promise<StatItem[]> {
  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getStats", error);
    return [];
  }

  return (data ?? []).map((row, index) => ({
    id: row.id,
    value: row.value ?? 0,
    label: row.label ?? "",
    suffix: row.suffix ?? undefined,
    sort_order: row.sort_order ?? index,
  }));
}

async function updateStats(formData: FormData) {
  "use server";

  requireAdminSession();

  const stats = [];
  let index = 0;

  while (formData.has(`stats_${index}_id`)) {
    const id = formData.get(`stats_${index}_id`) as string;
    const value = Number(formData.get(`stats_${index}_value`));
    const label = formData.get(`stats_${index}_label`) as string;
    const suffix = formData.get(`stats_${index}_suffix`) as string;
    const sortOrder = Number(formData.get(`stats_${index}_sort_order`));

    if (id && label && !isNaN(value)) {
      stats.push({ id, value, label, suffix: suffix || null, sort_order: sortOrder });
    }
    index++;
  }

  // Update existing stats
  for (const stat of stats) {
    if (stat.id !== "new") {
      const { error } = await supabase
        .from("stats")
        .update({
          value: stat.value,
          label: stat.label,
          suffix: stat.suffix,
          sort_order: stat.sort_order,
        })
        .eq("id", stat.id);

      if (error) {
        console.error("Error updating stat:", error);
      }
    }
  }

  redirect("/admin/stats");
}

async function addStat(formData: FormData) {
  "use server";

  requireAdminSession();

  const value = Number(formData.get("value"));
  const label = formData.get("label") as string;
  const suffix = formData.get("suffix") as string;

  if (label && !isNaN(value)) {
    // Get the highest sort_order
    const { data: existingStats } = await supabase
      .from("stats")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1);

    const nextSortOrder = (existingStats?.[0]?.sort_order ?? 0) + 1;

    const { error } = await supabase.from("stats").insert({
      value,
      label,
      suffix: suffix || null,
      sort_order: nextSortOrder,
    });

    if (error) {
      console.error("Error adding stat:", error);
    }
  }

  redirect("/admin/stats");
}

async function deleteStat(formData: FormData) {
  "use server";

  requireAdminSession();

  const id = formData.get("id") as string;

  if (id) {
    const { error } = await supabase.from("stats").delete().eq("id", id);

    if (error) {
      console.error("Error deleting stat:", error);
    }
  }

  redirect("/admin/stats");
}

export default async function AdminStatsPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-dark)]">Статистика</h1>
          <p className="mt-2 text-[var(--color-text-dark)]/60">
            Управление статистическими показателями на главной странице
          </p>
        </div>
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/60 p-10 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">System Status</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Мониторинг системы</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">Мониторинг временно отключён для стабильности.</p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
          <span className="font-semibold">Stable Mode</span>
          <span className="text-emerald-200/70">система работает стабильно.</span>
        </div>
      </div>
      </div>

      {/* Stats Form */}
      <Card>
        <CardHeader>
          <CardTitle>Редактировать статистику</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateStats} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {stats.map((stat, index) => (
                <div key={stat.id} className="space-y-4 rounded-lg border p-4">
                  <input type="hidden" name={`stats_${index}_id`} value={stat.id} />
                  <input type="hidden" name={`stats_${index}_sort_order`} value={stat.sort_order} />

                  <div>
                    <Label htmlFor={`stats_${index}_label`}>Заголовок</Label>
                    <Input
                      id={`stats_${index}_label`}
                      name={`stats_${index}_label`}
                      defaultValue={stat.label}
                      placeholder="Например: Год основания"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`stats_${index}_value`}>Значение</Label>
                    <Input
                      id={`stats_${index}_value`}
                      name={`stats_${index}_value`}
                      type="number"
                      defaultValue={stat.value}
                      placeholder="Например: 2020"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`stats_${index}_suffix`}>Суффикс (необязательно)</Label>
                    <Input
                      id={`stats_${index}_suffix`}
                      name={`stats_${index}_suffix`}
                      defaultValue={stat.suffix || ""}
                      placeholder="Например: +, лет, %"
                    />
                  </div>

                  <form action={deleteStat} className="flex justify-end">
                    <input type="hidden" name="id" value={stat.id} />
                    <Button type="submit" variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Удалить
                    </Button>
                  </form>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button type="submit" size="lg">
                <Save className="mr-2 h-4 w-4" />
                Сохранить изменения
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Add New Stat */}
      <Card>
        <CardHeader>
          <CardTitle>Добавить новую статистику</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addStat} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="new_label">Заголовок</Label>
                <Input
                  id="new_label"
                  name="label"
                  placeholder="Например: Год основания"
                  required
                />
              </div>

              <div>
                <Label htmlFor="new_value">Значение</Label>
                <Input
                  id="new_value"
                  name="value"
                  type="number"
                  placeholder="Например: 2020"
                  required
                />
              </div>

              <div>
                <Label htmlFor="new_suffix">Суффикс (необязательно)</Label>
                <Input
                  id="new_suffix"
                  name="suffix"
                  placeholder="Например: +, лет, %"
                />
              </div>
            </div>

            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Добавить статистику
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
