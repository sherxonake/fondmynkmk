import { requireAdminSession } from "@/lib/admin-session";
import { PartnersManager } from "./partners-manager";

export default async function AdminPartnersPage() {
  await requireAdminSession();

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Partners Management</p>
        <h1 className="text-3xl font-semibold text-white">Управление партнёрами</h1>
        <p className="text-sm text-slate-400">
          Добавляй, удаляй и меняй порядок партнёров фонда. Их логотипы отображаются на главной странице.
        </p>
      </section>

      <PartnersManager />
    </div>
  );
}
