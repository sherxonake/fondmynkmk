'use client';

import Image from 'next/image';
import { useState, useEffect, useTransition } from 'react';
import { CalendarDays, EyeOff, Eye, Trash2, Loader2 } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import type { AdminNewsRow } from './types';
import { togglePublishAction, deleteNewsAction } from './actions';

const DATE_FORMATTER = new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function formatDate(value: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return DATE_FORMATTER.format(date);
}

function useImageValidation(url: string): 'checking' | 'ok' | 'broken' {
  const [state, setState] = useState<'checking' | 'ok' | 'broken'>(() => (url ? 'checking' : 'broken'));

  useEffect(() => {
    if (!url) {
      setState('broken');
      return;
    }

    let canceled = false;
    setState('checking');

    async function validate() {
      try {
        const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        if (!canceled) {
          setState(response.ok ? 'ok' : 'broken');
        }
      } catch {
        if (!canceled) {
          setState('broken');
        }
      }
    }

    void validate();

    return () => {
      canceled = true;
    };
  }, [url]);

  return state;
}

export function NewsTable({ items }: { items: AdminNewsRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40">
      <div className="max-h-[600px] overflow-auto">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow>
              <TableHead>Фото</TableHead>
              <TableHead>Заголовок</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <NewsRow key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function NewsRow({ item }: { item: AdminNewsRow }) {
  const imageState = useImageValidation(item.imageUrl);
  const [isPendingToggle, startToggle] = useTransition();
  const [isPendingDelete, startDelete] = useTransition();

  const broken = imageState === 'broken';

  return (
    <TableRow className="border-white/5">
      <TableCell>
        <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-white/5 bg-slate-900">
          {item.imageUrl ? (
            <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="96px" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">Нет фото</div>
          )}
        </div>
        {broken && (
          <Badge variant="destructive" className="mt-2">
            Broken Image
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-white">{item.title}</p>
          <p className="text-xs text-slate-500">{item.category}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1 text-sm text-slate-300">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
            {formatDate(item.createdAt)}
          </span>
          <span className="text-xs text-slate-500">Публикация: {formatDate(item.publishedAt)}</span>
        </div>
      </TableCell>
      <TableCell>
        {item.isPublished ? (
          <Badge className="bg-emerald-500/20 text-emerald-200">Опубликовано</Badge>
        ) : (
          <Badge className="bg-amber-500/20 text-amber-200">Черновик</Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={isPendingToggle || isPendingDelete}
            onClick={() => {
              startToggle(async () => {
                try {
                  await togglePublishAction({ id: item.id, nextPublished: !item.isPublished });
                  toast({
                    title: item.isPublished ? 'Новость снята с публикации' : 'Новость опубликована',
                    description: item.title,
                  });
                } catch (error) {
                  const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
                  toast({ title: 'Не удалось обновить статус', description: message, variant: 'destructive' });
                }
              });
            }}
            className="text-slate-300 hover:text-white"
          >
            {isPendingToggle ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : item.isPublished ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={isPendingDelete || isPendingToggle}
            onClick={() => {
              startDelete(async () => {
                try {
                  await deleteNewsAction({ id: item.id });
                  toast({ title: 'Новость удалена', description: item.title });
                } catch (error) {
                  const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
                  toast({ title: 'Не удалось удалить новость', description: message, variant: 'destructive' });
                }
              });
            }}
            className="text-rose-300 hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
