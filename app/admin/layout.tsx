export const dynamic = "force-dynamic";

import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck, Newspaper, Settings2, Activity } from "lucide-react";

import { checkAdminHealth, checkSiteSettingsHealth } from "@/lib/admin-health";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const navItems = [
  { label: "Дашборд", href: "/admin", icon: ShieldCheck },
  { label: "Новости", href: "/admin/news", icon: Newspaper },
  { label: "Настройки", href: "/admin/settings", icon: Settings2 },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const [adminHealth, healthOk] = await Promise.all([checkAdminHealth(), checkSiteSettingsHealth()]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-white/5 bg-slate-950/40 px-6 py-8 md:flex">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">NKMK</p>
              <p className="text-lg font-semibold">Admin Console</p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-white/5 bg-slate-900/40 p-4">
            <p className="text-sm font-semibold">Администратор</p>
            <p className="text-xs text-slate-400">demo@nkmk.uz</p>
            <Link href="/admin/logout" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mt-4 w-full justify-center")}
            >
              Выйти
            </Link>
          </div>

          <nav className="flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-emerald-500/40 hover:bg-slate-900/70 hover:text-white"
              >
                <item.icon className="h-4 w-4 text-emerald-400" />
                {item.label}
              </Link>
            ))}
          </nav>

          <HealthIndicator healthy={healthOk && adminHealth.healthy} />
        </aside>

        <main className="flex flex-1 flex-col bg-slate-950/60 p-4 md:p-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}

function HealthIndicator({ healthy }: { healthy: boolean }) {
  return (
    <div className="mt-auto rounded-2xl border border-white/5 bg-slate-900/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
        <span>System Health</span>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "h-3 w-3 rounded-full shadow-xl",
            healthy ? "bg-emerald-400 shadow-emerald-500/70" : "bg-rose-500 shadow-rose-500/60 animate-pulse"
          )}
        />
        <div>
          <p className="text-sm font-semibold">site_settings</p>
          <p className="text-xs text-slate-400">{healthy ? "Система активна" : "Нет связи с Supabase"}</p>
        </div>
      </div>
    </div>
  );
}
