import { requireAdminSession } from '@/lib/admin-session';
import { supabase } from '@/lib/supabase';

import { SettingsForm } from './settings-form';
import type { SiteSettingsFormValues } from './schema';

type SettingsRow = {
  id: string | null;
  phone: string | null;
  trust_phone: string | null;
  contact_email: string | null;
  telegram_url: string | null;
  instagram_url: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
};

const FALLBACK_VALUES: SiteSettingsFormValues = {
  phone: '+998 79 223-60-21',
  trustPhone: '1150',
  email: 'press@nkmk.uz',
  telegram: 'https://t.me/nkmk',
  instagram: 'https://instagram.com/nkmk',
  heroTitle: "NKMK Jamg'armasi",
  heroSubtitle: "Yirik ijtimoiy loyihalarni qo'llab-quvvatlaymiz",
};

async function getSettingsFormState(): Promise<{ recordId: string | null; values: SiteSettingsFormValues }> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('id, phone, trust_phone, contact_email, telegram_url, instagram_url, hero_title, hero_subtitle')
    .maybeSingle();

  if (error) {
    console.error('getSettingsFormState', error);
  }

  const row = (data ?? null) as SettingsRow | null;

  if (!row) {
    return { recordId: null, values: FALLBACK_VALUES };
  }

  return {
    recordId: row.id ?? null,
    values: {
      phone: row.phone ?? FALLBACK_VALUES.phone,
      trustPhone: row.trust_phone ?? FALLBACK_VALUES.trustPhone,
      email: row.contact_email ?? FALLBACK_VALUES.email,
      telegram: row.telegram_url ?? '',
      instagram: row.instagram_url ?? '',
      heroTitle: row.hero_title ?? FALLBACK_VALUES.heroTitle,
      heroSubtitle: row.hero_subtitle ?? FALLBACK_VALUES.heroSubtitle,
    },
  };
}

export default async function AdminSettingsPage() {
  await requireAdminSession();
  const { values, recordId } = await getSettingsFormState();

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Site Settings</p>
        <h1 className="text-3xl font-semibold text-white">Контакты и Hero-блок</h1>
        <p className="text-sm text-slate-400">Все данные сразу попадают на публичный сайт и кэшируются через revalidatePath.</p>
      </section>

      <SettingsForm initialData={values} recordId={recordId} />
    </div>
  );
}
