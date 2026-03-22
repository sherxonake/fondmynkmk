'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Save, Eye, EyeOff, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Схема валидации
const newsSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(200, 'Максимум 200 символов'),
  slug: z.string().min(1, 'Slug обязателен').max(100, 'Максимум 100 символов'),
  category: z.enum(['Sport', 'Tibbiyot', 'Dam olish', 'Madaniyat']),
  excerpt: z.string().max(200, 'Максимум 200 символов').optional(),
  content: z.string().optional(),
  image_url: z.string().url('Некорректный URL').or(z.literal('')).optional(),
  published_at: z.string().optional(),
  is_published: z.boolean(),
});

type NewsFormData = z.infer<typeof newsSchema>;

const CATEGORIES = [
  { value: 'Sport', label: 'Спорт' },
  { value: 'Tibbiyot', label: 'Медицина' },
  { value: 'Dam olish', label: 'Отдых' },
  { value: 'Madaniyat', label: 'Культура' },
];

const generateSlug = (title: string): string => {
  const translitMap: Record<string, string> = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e',
    'ё':'yo','ж':'zh','з':'z','и':'i','й':'y','к':'k',
    'л':'l','м':'m','н':'n','о':'o','п':'p','р':'r',
    'с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts',
    'ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'',
    'э':'e','ю':'yu','я':'ya',
    'o\'':'o','g\'':'g',  // ўзбек
  };
  
  return title
    .toLowerCase()
    .replace(/o'/g, 'o').replace(/g'/g, 'g')
    .replace(/[''`ʻʼ]/g, '')
    .replace(/[а-яёА-ЯЁ]/g, ch => translitMap[ch] || ch)
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

interface NewsEditorFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<NewsFormData>;
  newsId?: string;
}

export function NewsEditorForm({ mode, initialData, newsId }: NewsEditorFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      slug: '',
      category: 'Sport',
      excerpt: '',
      content: '',
      image_url: '',
      published_at: '',
      is_published: false,
      ...initialData,
    },
  });

  // Авто-генерация slug из заголовка
  const title = form.watch('title');
  useEffect(() => {
    if (mode === 'create' && title && !slugManuallyEdited) {
      const slug = generateSlug(title);
      form.setValue('slug', slug);
    }
  }, [title, form, mode, slugManuallyEdited]);

  const onSubmit = async (data: NewsFormData) => {
    setIsLoading(true);
    try {
      const url = mode === 'create' ? '/api/admin/news' : '/api/admin/news';
      const method = mode === 'create' ? 'POST' : 'PATCH';
      
      const payload = mode === 'create' 
        ? data 
        : { ...data, id: newsId };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Произошла ошибка');
      }

      toast({
        title: mode === 'create' ? 'Новость создана' : 'Новость обновлена',
        description: data.title,
      });

      router.push('/admin/news');
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      toast({
        title: 'Ошибка',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const errors = form.formState.errors;
  const imageUrl = form.watch('image_url');
  const isPublished = form.watch('is_published');

  return (
    <div className="space-y-6">
      {/* Навигация */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/news')}
          className="text-slate-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к списку
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
            className="border-white/10 text-slate-300 hover:text-white"
          >
            {isPreview ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {isPreview ? 'Редактировать' : 'Предпросмотр'}
          </Button>
        </div>
      </div>

      {isPreview ? (
        // Предпросмотр
        <Card className="border-white/5 bg-slate-900/40">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-2xl text-white">{form.watch('title') || 'Без заголовка'}</CardTitle>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary">
                    {CATEGORIES.find(c => c.value === form.watch('category'))?.label || form.watch('category')}
                  </Badge>
                  <Badge className={isPublished ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-200"}>
                    {isPublished ? 'Опубликовано' : 'Черновик'}
                  </Badge>
                </div>
              </div>
              {imageUrl && (
                <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-white/5 bg-slate-800">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.watch('excerpt') && (
              <div className="rounded-lg border border-white/5 bg-slate-800/50 p-4">
                <p className="text-sm text-slate-300">{form.watch('excerpt')}</p>
              </div>
            )}
            {form.watch('content') && (
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-slate-300"
                  dangerouslySetInnerHTML={{ __html: form.watch('content')?.replace(/\n/g, '<br>') || '' }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        // Форма редактирования
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Левая колонка - основная информация */}
            <div className="space-y-6">
              <Card className="border-white/5 bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Основная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Заголовок */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-300">
                      Заголовок <span className="text-rose-400">*</span>
                    </Label>
                    <Input
                      id="title"
                      {...form.register('title')}
                      placeholder="Введите заголовок новости"
                      className={cn(
                        "border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500",
                        errors.title && "border-rose-500/50"
                      )}
                    />
                    {errors.title && (
                      <p className="text-sm text-rose-400">{errors.title.message}</p>
                    )}
                  </div>

                  {/* Slug */}
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-slate-300">
                      Slug <span className="text-rose-400">*</span>
                    </Label>
                    <Input
                      id="slug"
                      {...form.register('slug')}
                      placeholder="url-адрес-новости"
                      onChange={(e) => {
                        form.setValue('slug', e.target.value);
                        setSlugManuallyEdited(true);
                      }}
                      className={cn(
                        "border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500",
                        errors.slug && "border-rose-500/50"
                      )}
                    />
                    {errors.slug && (
                      <p className="text-sm text-rose-400">{errors.slug.message}</p>
                    )}
                    <p className="text-xs text-slate-500">
                      URL-адрес новости. Генерируется автоматически из заголовка.
                    </p>
                  </div>

                  {/* Категория */}
                  <div className="space-y-2">
                    <Label className="text-slate-300">
                      Категория <span className="text-rose-400">*</span>
                    </Label>
                    <Select
                      value={form.watch('category')}
                      onValueChange={(value) => form.setValue('category', value as any)}
                    >
                      <SelectTrigger className="border-white/10 bg-slate-800/50 text-white">
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-slate-900">
                        {CATEGORIES.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                            className="text-slate-300 hover:bg-white/5"
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-rose-400">{errors.category.message}</p>
                    )}
                  </div>

                  {/* Дата публикации */}
                  <div className="space-y-2">
                    <Label htmlFor="published_at" className="text-slate-300">
                      Дата публикации
                    </Label>
                    <Input
                      id="published_at"
                      type="datetime-local"
                      {...form.register('published_at')}
                      className="border-white/10 bg-slate-800/50 text-white"
                    />
                    <p className="text-xs text-slate-500">
                      Оставьте пустым для автоматической установки при публикации.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Статус публикации */}
              <Card className="border-white/5 bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Статус</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Опубликовать немедленно</Label>
                      <p className="text-sm text-slate-500">
                        Новость будет видна на сайте
                      </p>
                    </div>
                    <Switch
                      checked={isPublished}
                      onCheckedChange={(checked) => form.setValue('is_published', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Правая колонка - контент */}
            <div className="space-y-6">
              {/* Обложка */}
              <Card className="border-white/5 bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Обложка</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_url" className="text-slate-300">
                      URL изображения
                    </Label>
                    <Input
                      id="image_url"
                      {...form.register('image_url')}
                      placeholder="https://example.com/image.jpg"
                      className={cn(
                        "border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500",
                        errors.image_url && "border-rose-500/50"
                      )}
                    />
                    {errors.image_url && (
                      <p className="text-sm text-rose-400">{errors.image_url.message}</p>
                    )}
                  </div>

                  {/* Предпросмотр изображения */}
                  {imageUrl && (
                    <div className="space-y-2">
                      <Label className="text-sm text-slate-400">Предпросмотр</Label>
                      <div className="relative h-48 w-full overflow-hidden rounded-lg border border-white/5 bg-slate-800">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = '<div class="flex h-full w-full items-center justify-center text-xs text-slate-500">Ошибка загрузки изображения</div>';
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card className="border-white/5 bg-slate-900/40">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Краткое описание</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Textarea
                    {...form.register('excerpt')}
                    placeholder="Краткое описание новости (максимум 200 символов)"
                    rows={3}
                    className={cn(
                      "border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500 resize-none",
                      errors.excerpt && "border-rose-500/50"
                    )}
                  />
                  <div className="flex justify-between">
                    {errors.excerpt && (
                      <p className="text-sm text-rose-400">{errors.excerpt.message}</p>
                    )}
                    <p className="text-xs text-slate-500">
                      {form.watch('excerpt')?.length || 0}/200
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Полный контент */}
          <Card className="border-white/5 bg-slate-900/40">
            <CardHeader>
              <CardTitle className="text-lg text-white">Полный текст новости</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                {...form.register('content')}
                placeholder="Полный текст новости. Поддерживается HTML для форматирования."
                rows={12}
                className="border-white/10 bg-slate-800/50 text-white placeholder:text-slate-500 resize-none"
              />
              <p className="mt-2 text-xs text-slate-500">
                Можно использовать HTML-теги для форматирования: &lt;b&gt;, &lt;i&gt;, &lt;p&gt;, &lt;br&gt; и другие.
              </p>
            </CardContent>
          </Card>

          {/* Кнопки действий */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/news')}
              className="border-white/10 text-slate-300 hover:text-white"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === 'create' ? 'Создание...' : 'Сохранение...'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {mode === 'create' ? 'Создать новость' : 'Сохранить изменения'}
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
