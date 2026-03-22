'use client';

import Image from 'next/image';
import { useState, useEffect, useTransition } from 'react';
import { CalendarDays, EyeOff, Eye, Trash2, Loader2, Archive, ArchiveRestore, Edit, Plus } from 'lucide-react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { HydratedDate } from '../_components/hydrated-date';
import type { AdminNewsRow } from './types';
import { togglePublishAction, deleteNewsAction, archiveNewsAction, restoreNewsAction } from './actions';

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

type NewsTableMode = 'active' | 'archived';

export function NewsTable({ items, mode }: { items: AdminNewsRow[]; mode: NewsTableMode }) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {/* Кнопка создания новости для активных */}
      {mode === 'active' && (
        <div className="flex justify-end">
          <Button
            onClick={() => router.push('/admin/news/new')}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Создать новость
          </Button>
        </div>
      )}
      
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40" data-admin-news-table>
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
                <NewsRow key={item.id} item={item} mode={mode} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function NewsRow({ item, mode }: { item: AdminNewsRow; mode: NewsTableMode }) {
  const imageState = useImageValidation(item.imageUrl);
  const [isPendingToggle, startToggle] = useTransition();
  const [isPendingDelete, startDelete] = useTransition();
  const [isPendingArchive, startArchive] = useTransition();
  const [isPendingRestore, startRestore] = useTransition();
  const router = useRouter();

  const broken = imageState === 'broken';
  const isArchived = mode === 'archived';
  const disablePublishControls = isArchived || isPendingArchive || isPendingRestore;

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
            <HydratedDate value={item.createdAt} formatter={(date) => DATE_FORMATTER.format(date)} />
          </span>
          <span className="text-xs text-slate-500">
            Публикация: <HydratedDate value={item.publishedAt} formatter={(date) => DATE_FORMATTER.format(date)} />
          </span>
        </div>
      </TableCell>
      <TableCell>
        {isArchived ? (
          <Badge className="bg-slate-500/30 text-slate-200">В архиве</Badge>
        ) : item.isPublished ? (
          <Badge className="bg-emerald-500/20 text-emerald-200">Опубликовано</Badge>
        ) : (
          <Badge className="bg-amber-500/20 text-amber-200">Черновик</Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          {!isArchived && (
            <Button
              variant="ghost"
              size="sm"
              disabled={isPendingToggle || disablePublishControls}
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
          )}

          {/* Кнопка редактирования */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/admin/news/${item.id}/edit`)}
            className="text-blue-300 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </Button>

          {!isArchived ? (
            <Button
              variant="ghost"
              size="sm"
              disabled={isPendingArchive || isPendingToggle}
              onClick={() => {
                startArchive(async () => {
                  try {
                    await archiveNewsAction({ id: item.id });
                    toast({ title: 'Новость отправлена в архив', description: item.title });
                  } catch (error) {
                    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
                    toast({ title: 'Не удалось архивировать новость', description: message, variant: 'destructive' });
                  }
                });
              }}
              className="text-amber-200 hover:text-white"
            >
              {isPendingArchive ? <Loader2 className="h-4 w-4 animate-spin" /> : <Archive className="h-4 w-4" />}
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                disabled={isPendingRestore || isPendingDelete}
                onClick={() => {
                  startRestore(async () => {
                    try {
                      await restoreNewsAction({ id: item.id });
                      toast({ title: 'Новость восстановлена', description: item.title });
                    } catch (error) {
                      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
                      toast({ title: 'Не удалось восстановить новость', description: message, variant: 'destructive' });
                    }
                  });
                }}
                className="text-emerald-200 hover:text-white"
              >
                {isPendingRestore ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArchiveRestore className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={isPendingDelete || isPendingRestore}
                onClick={() => {
                  startDelete(async () => {
                    try {
                      await deleteNewsAction({ id: item.id });
                      toast({ title: 'Новость удалена навсегда', description: item.title });
                    } catch (error) {
                      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
                      toast({ title: 'Не удалось удалить новость', description: message, variant: 'destructive' });
                    }
                  });
                }}
                className="text-rose-300 hover:text-white"
              >
                {isPendingDelete ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
