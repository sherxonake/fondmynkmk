'use client';

export const dynamic = "force-dynamic";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck, Newspaper, Settings2, Activity, BarChart3, Image, Building, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const navItems = [
  { label: "Дашборд", href: "/admin", icon: ShieldCheck },
  { label: "Новости", href: "/admin/news", icon: Newspaper },
  { label: "Hero слайдер", href: "/admin/hero", icon: Image },
  { label: "Партнёры", href: "/admin/partners", icon: Building },
  { label: "Статистика", href: "/admin/stats", icon: BarChart3 },
  { label: "Настройки", href: "/admin/settings", icon: Settings2 },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Мобильный header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
            <Activity className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Admin Console</span>
        </div>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Мобильное меню - slide-in drawer */}
      <div className={`md:hidden fixed inset-0 z-50 ${menuOpen ? 'block' : 'hidden'}`}>
        <div 
          className="absolute inset-0 bg-black/60" 
          onClick={() => setMenuOpen(false)} 
        />
        <aside className="absolute left-0 top-0 bottom-0 w-72 bg-slate-950 p-6 overflow-y-auto">
          {/* Закрыть кнопку */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">NKMK</p>
                <p className="text-sm font-semibold">Admin Console</p>
              </div>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Навигация */}
          <nav className="flex flex-1 flex-col gap-2 mb-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-emerald-500/40 hover:bg-slate-900/70 hover:text-white"
              >
                <item.icon className="h-4 w-4 text-emerald-400" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Кнопка выхода */}
          <Link 
            href="/admin/logout" 
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full justify-center")}
          >
            Выйти
          </Link>
        </aside>
      </div>

      {/* Desktop layout */}
      <div className="flex h-screen bg-slate-950">
        {/* Desktop sidebar - скрыт на мобильных */}
        <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-slate-950/40 px-6 py-8">
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
            <Link 
              href="/admin/logout" 
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mt-4 w-full justify-center")}
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

          <HealthIndicator />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-slate-950/60 p-4 md:p-8">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

function HealthIndicator() {
  return (
    <div className="mt-auto rounded-2xl border border-white/5 bg-slate-900/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
        <span>System Health</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 rounded-full shadow-xl bg-emerald-400 shadow-emerald-500/70" />
        <div>
          <p className="text-sm font-semibold">site_settings</p>
          <p className="text-xs text-slate-400">Система активна</p>
        </div>
      </div>
    </div>
  );
}
