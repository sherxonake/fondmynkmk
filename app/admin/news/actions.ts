'use server';

import { revalidatePath } from 'next/cache';

import { requireAdminSession } from '@/lib/admin-session';
import { supabase } from '@/lib/supabase';

const ADMIN_PATHS_TO_REVALIDATE = ['/admin', '/admin/news', '/'];

async function revalidateAdminPaths() {
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

  revalidateAdminPaths();
}

export async function deleteNewsAction(input: { id: string }) {
  await requireAdminSession();

  const { error } = await supabase.from('news_articles').delete().eq('id', input.id);

  if (error) {
    throw new Error(`Не удалось удалить новость: ${error.message}`);
  }

  revalidateAdminPaths();
}
