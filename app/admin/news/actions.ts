'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { requireAdminSession } from '@/lib/admin-session';
import { supabase } from '@/lib/supabase';

const ADMIN_PATHS_TO_REVALIDATE = ['/admin', '/admin/news', '/', '/news'];
const NEWS_TAG = 'news';

const INTERNAL_BASE_URL = (() => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
})();

async function buildCookieHeader(): Promise<string | null> {
  const store = await cookies();
  const serialized = store
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');
  return serialized || null;
}

async function invalidateNewsCache() {
  revalidateTag(NEWS_TAG, { expire: 0 });
  ADMIN_PATHS_TO_REVALIDATE.forEach((path) => revalidatePath(path));
}

export async function togglePublishAction(input: { id: string; nextPublished: boolean }) {
  await requireAdminSession();

  const payload = input.nextPublished
    ? { is_published: true, published_at: new Date().toISOString() }
    : { is_published: false, published_at: null };

  const { error } = await supabase.from('news_articles').update(payload).eq('id', input.id);

  if (error) {
    throw new Error(`Не удалось обновить новость: ${error.message}`);
  }

  await invalidateNewsCache();
}

export async function archiveNewsAction(input: { id: string }) {
  await requireAdminSession();

  const { error } = await supabase.from('news_articles').update({ is_archived: true }).eq('id', input.id);
  if (error) {
    throw new Error(`Не удалось отправить в архив: ${error.message}`);
  }

  await invalidateNewsCache();
}

export async function restoreNewsAction(input: { id: string }) {
  await requireAdminSession();

  const { error } = await supabase.from('news_articles').update({ is_archived: false }).eq('id', input.id);
  if (error) {
    throw new Error(`Не удалось восстановить новость: ${error.message}`);
  }

  await invalidateNewsCache();
}

export async function deleteNewsAction(input: { id: string }) {
  await requireAdminSession();
  const cookieHeader = await buildCookieHeader();
  const response = await fetch(`${INTERNAL_BASE_URL}/api/admin/news/${input.id}`, {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    const message = payload?.error ?? 'Не удалось удалить новость';
    throw new Error(message);
  }

  await invalidateNewsCache();
}
