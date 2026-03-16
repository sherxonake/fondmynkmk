'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        });

        const data = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;

        if (!response.ok || !data?.success) {
          const message = data?.error ?? 'Не удалось войти';
          setError(message);
          toast({ title: 'Ошибка авторизации', description: message, variant: 'destructive' });
          return;
        }

        toast({ title: 'Добро пожаловать', description: 'Перенаправляем в новости' });
        setPassword('');
        router.replace('/admin/news');
        router.refresh();
      } catch (submitError) {
        const message = submitError instanceof Error ? submitError.message : 'Неизвестная ошибка';
        setError(message);
        toast({ title: 'Ошибка сети', description: message, variant: 'destructive' });
      }
    });
  }

  return (
    <Card className="border-white/10 bg-slate-950/80 text-slate-100">
      <CardHeader>
        <CardTitle className="text-2xl">Bug Hunter Access</CardTitle>
        <CardDescription className="text-slate-400">
          Введите админский пароль, чтобы перейти к управлению новостями
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">
              Пароль администратора
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Введите пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isPending}
              className="bg-slate-900/60"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              <ShieldAlert className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Подождите…
              </>
            ) : (
              'Войти'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
