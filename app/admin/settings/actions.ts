'use server';

import { revalidatePath } from 'next/cache';

import { requireAdminSession } from '@/lib/admin-session';
import { supabase } from '@/lib/supabase';
import { siteSettingsSchema, type SiteSettingsFormValues } from './schema';

const DEFAULT_RECORD_ID = 'singleton';
const PATHS_TO_REVALIDATE = ['/admin', '/admin/settings', '/'];

export async function saveSiteSettingsAction(input: { values: SiteSettingsFormValues; recordId: string | null }) {
  await requireAdminSession();

  const parsed = siteSettingsSchema.safeParse(input.values);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    throw new Error(firstError?.message ?? 'Форма заполнена неверно');
  }

  const values = parsed.data;
  const recordId = input.recordId ?? DEFAULT_RECORD_ID;

  const { error } = await supabase.from('site_settings').upsert(
    [
      {
        id: recordId,
        phone: values.phone,
        trust_phone: values.trustPhone,
        contact_email: values.email,
        telegram_url: values.telegram,
        instagram_url: values.instagram,
        hero_title: values.heroTitle,
        hero_subtitle: values.heroSubtitle,
      },
    ],
    { onConflict: 'id' },
  );

  if (error) {
    console.error('saveSiteSettingsAction', error);
    throw new Error(`Не удалось сохранить настройки: ${error.message}`);
  }

  PATHS_TO_REVALIDATE.forEach((path) => {
    revalidatePath(path);
  });
}
