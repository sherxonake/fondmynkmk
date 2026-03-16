'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AdminError({ error, reset }: { error: Error & { digest?: string } | null; reset: () => void }) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 rounded-3xl border border-white/5 bg-gradient-to-b from-slate-900/70 to-slate-950/80 p-10 text-center text-slate-100 shadow-2xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-300">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Что-то пошло не так</h1>
        <p className="mt-2 text-sm text-slate-400">
          {error?.message ?? 'Не удалось загрузить админ-панель. Проверьте соединение и попробуйте снова.'}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className={cn(buttonVariants({ size: 'lg' }), 'gap-2 bg-emerald-500 text-slate-900 hover:bg-emerald-400')}
          onClick={() => {
            reset();
          }}
        >
          <RefreshCw className="h-4 w-4" />
          Сбросить кэш и попробовать снова
        </button>
        <Link href="/admin" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'gap-2')}>Вернуться в дашборд</Link>
      </div>
      <p className="text-xs text-slate-500">Если ошибка повторяется — проверьте Supabase и Telegram вебхуки.</p>
    </div>
  );
}
