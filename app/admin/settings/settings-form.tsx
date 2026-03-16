'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

import type { SiteSettingsFormValues } from './schema';
import { siteSettingsSchema } from './schema';
import { saveSiteSettingsAction } from './actions';

interface SettingsFormProps {
  initialData: SiteSettingsFormValues;
  recordId: string | null;
}

export function SettingsForm({ initialData, recordId }: SettingsFormProps) {
  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: initialData,
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: SiteSettingsFormValues) {
    startTransition(async () => {
      try {
        await saveSiteSettingsAction({ values, recordId });
        toast({ title: 'Настройки сохранены', description: 'Главная страница обновлена' });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        toast({ title: 'Не удалось сохранить настройки', description: message, variant: 'destructive' });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-admin-settings-form>
        <Card className="border-white/5 bg-slate-950/50">
          <CardContent className="grid gap-6 pt-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Основной телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="+998 79 ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trustPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Доверительный телефон</FormLabel>
                  <FormControl>
                    <Input placeholder="1150" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта для контактов</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="press@nkmk.uz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://t.me/nkmk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/nkmk" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-slate-950/50">
          <CardContent className="grid gap-6 pt-6">
            <FormField
              control={form.control}
              name="heroTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero заголовок</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Фонд НГМК поддерживает..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heroSubtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero описание</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Мы инвестируем в ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-3 border-t border-white/5 bg-slate-950/30 py-4">
            <div className="text-xs text-slate-500">Изменения вступят в силу сразу после сохранения</div>
            <Button type="submit" disabled={isPending} className="gap-2">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Сохранить
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
