import { z } from 'zod';

export const siteSettingsSchema = z.object({
  phone: z.string().min(6, 'Укажите основной телефон'),
  trustPhone: z.string().min(3, 'Укажите доверительный телефон'),
  email: z.string().email('Неверный формат email'),
  telegram: z
    .string()
    .url('Введите ссылку вида https://t.me/...')
    .or(z.literal('')),
  instagram: z
    .string()
    .url('Введите ссылку вида https://instagram.com/...')
    .or(z.literal('')),
  heroTitle: z.string().min(10, 'Заголовок hero слишком короткий'),
  heroSubtitle: z.string().min(10, 'Описание hero слишком короткое'),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;
