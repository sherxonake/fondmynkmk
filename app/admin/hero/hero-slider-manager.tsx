'use client';

import { useState, useEffect, useTransition } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  GripVertical, 
  Loader2,
  Image as ImageIcon,
  Save
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: 'demo-1',
    title: 'Поддержка талантов',
    subtitle: 'Инвестируем в будущее через спорт и образование',
    button_text: 'Узнать больше',
    button_url: '/about',
    image_url: '/images/hero-children.jpg',
    is_active: true,
    sort_order: 0,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-2',
    title: 'Здоровье нации',
    subtitle: 'Современная медицина для всех жителей региона',
    button_text: 'Наши проекты',
    button_url: '/projects',
    image_url: '/images/hero-hospital.jpg',
    is_active: true,
    sort_order: 1,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
  },
];

async function fetchHeroSlides(): Promise<HeroSlide[]> {
  try {
    const response = await fetch('/api/admin/hero/slides');
    if (!response.ok) {
      console.warn('Failed to fetch hero slides, using fallback');
      return FALLBACK_SLIDES;
    }
    const data = await response.json();
    return data.slides || FALLBACK_SLIDES;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return FALLBACK_SLIDES;
  }
}

async function saveSlideOrder(slideIds: string[]): Promise<void> {
  const response = await fetch('/api/admin/hero/reorder', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slideIds }),
  });
  
  if (!response.ok) {
    throw new Error('Не удалось сохранить порядок');
  }
}

async function toggleSlideStatus(slideId: string, isActive: boolean): Promise<void> {
  const response = await fetch(`/api/admin/hero/slides/${slideId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_active: isActive }),
  });
  
  if (!response.ok) {
    throw new Error('Не удалось обновить статус');
  }
}

async function deleteSlide(slideId: string): Promise<void> {
  const response = await fetch(`/api/admin/hero/slides/${slideId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Не удалось удалить слайд');
  }
}

export function HeroSliderManager() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const data = await fetchHeroSlides();
        setSlides(data.sort((a, b) => a.sort_order - b.sort_order));
      } catch (error) {
        toast({
          title: 'Ошибка загрузки',
          description: 'Не удалось загрузить слайды',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSlides();
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(slides);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedSlides = items.map((slide, index) => ({
      ...slide,
      sort_order: index,
    }));

    setSlides(updatedSlides);

    startTransition(async () => {
      try {
        await saveSlideOrder(updatedSlides.map(slide => slide.id));
        toast({
          title: 'Порядок сохранён',
          description: 'Слайды успешно отсортированы',
        });
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось сохранить порядок',
          variant: 'destructive',
        });
      }
    });
  };

  const handleToggleActive = (slideId: string, isActive: boolean) => {
    startTransition(async () => {
      try {
        await toggleSlideStatus(slideId, isActive);
        setSlides(prev => 
          prev.map(slide => 
            slide.id === slideId ? { ...slide, is_active: isActive } : slide
          )
        );
        toast({
          title: isActive ? 'Слайд активирован' : 'Слайд деактивирован',
          description: 'Статус обновлён',
        });
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить статус',
          variant: 'destructive',
        });
      }
    });
  };

  const handleDelete = (slideId: string) => {
    if (!confirm('Удалить слайд? Это действие нельзя отменить.')) return;

    startTransition(async () => {
      try {
        await deleteSlide(slideId);
        setSlides(prev => prev.filter(slide => slide.id !== slideId));
        toast({
          title: 'Слайд удалён',
          description: 'Слайд успешно удалён',
        });
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить слайд',
          variant: 'destructive',
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Кнопка создания */}
      <div className="flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Добавить слайд
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl border-white/10 bg-slate-900">
            <DialogHeader>
              <DialogTitle className="text-white">Создание нового слайда</DialogTitle>
            </DialogHeader>
            <SlideEditorForm
              slide={null}
              onSave={() => {
                setIsCreateDialogOpen(false);
                // Перезагрузка слайдов
                fetchHeroSlides().then(data => {
                  setSlides(data.sort((a, b) => a.sort_order - b.sort_order));
                });
              }}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Список слайдов */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="slides">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {slides.map((slide, index) => (
                <Draggable key={slide.id} draggableId={slide.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "border-white/5 bg-slate-900/40 transition-all",
                        snapshot.isDragging && "border-emerald-500/50 bg-emerald-500/5"
                      )}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Drag handle */}
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center justify-center mt-1"
                          >
                            <GripVertical className="h-5 w-5 text-slate-500 cursor-move" />
                          </div>

                          {/* Preview */}
                          <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-slate-800">
                            {slide.image_url ? (
                              <img
                                src={slide.image_url}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    parent.innerHTML = '<div class="flex h-full w-full items-center justify-center"><ImageIcon class="h-8 w-8 text-slate-600" /></div>';
                                  }
                                }}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-slate-600" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-white truncate">
                                  {slide.title}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                                  {slide.subtitle}
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                  <Badge className={cn(
                                    "text-xs",
                                    slide.is_active 
                                      ? "bg-emerald-500/20 text-emerald-200" 
                                      : "bg-slate-500/30 text-slate-400"
                                  )}>
                                    {slide.is_active ? 'Активен' : 'Неактивен'}
                                  </Badge>
                                  <span className="text-xs text-slate-500">
                                    Порядок: {slide.sort_order}
                                  </span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={slide.is_active}
                                    onCheckedChange={(checked) => 
                                      handleToggleActive(slide.id, checked)
                                    }
                                    disabled={isPending}
                                  />
                                </div>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setEditingSlide(slide)}
                                      className="text-blue-300 hover:text-white"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl border-white/10 bg-slate-900">
                                    <DialogHeader>
                                      <DialogTitle className="text-white">
                                        Редактирование слайда
                                      </DialogTitle>
                                    </DialogHeader>
                                    <SlideEditorForm
                                      slide={editingSlide}
                                      onSave={() => {
                                        setEditingSlide(null);
                                        // Перезагрузка слайдов
                                        fetchHeroSlides().then(data => {
                                          setSlides(data.sort((a, b) => a.sort_order - b.sort_order));
                                        });
                                      }}
                                      onCancel={() => setEditingSlide(null)}
                                    />
                                  </DialogContent>
                                </Dialog>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(slide.id)}
                                  className="text-rose-300 hover:text-white"
                                  disabled={isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {slides.length === 0 && (
        <Card className="border-white/5 bg-slate-900/40">
          <CardContent className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Нет слайдов</h3>
            <p className="text-sm text-slate-400 mb-6">
              Создай первый слайд для Hero-блока
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Создать слайд
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Компонент формы редактирования слайда
function SlideEditorForm({ 
  slide, 
  onSave, 
  onCancel 
}: { 
  slide: HeroSlide | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    title: slide?.title || '',
    subtitle: slide?.subtitle || '',
    button_text: slide?.button_text || '',
    button_url: slide?.button_url || '',
    image_url: slide?.image_url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.subtitle.trim()) {
      toast({
        title: 'Ошибка валидации',
        description: 'Заполните заголовок и описание',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        const url = slide ? `/api/admin/hero/slides/${slide.id}` : '/api/admin/hero/slides';
        const method = slide ? 'PATCH' : 'POST';
        
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Не удалось сохранить слайд');
        }

        toast({
          title: slide ? 'Слайд обновлён' : 'Слайд создан',
          description: 'Изменения сохранены',
        });
        
        onSave();
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось сохранить слайд',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Заголовок
          </label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Введите заголовок"
            className="border-white/10 bg-slate-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Описание
          </label>
          <Textarea
            value={formData.subtitle}
            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            placeholder="Введите описание"
            rows={3}
            className="border-white/10 bg-slate-800 text-white resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Текст кнопки
            </label>
            <Input
              value={formData.button_text}
              onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
              placeholder="Подробнее"
              className="border-white/10 bg-slate-800 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              URL кнопки
            </label>
            <Input
              value={formData.button_url}
              onChange={(e) => setFormData(prev => ({ ...prev, button_url: e.target.value }))}
              placeholder="/about"
              className="border-white/10 bg-slate-800 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            URL изображения
          </label>
          <Input
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            placeholder="https://example.com/image.jpg"
            className="border-white/10 bg-slate-800 text-white"
          />
          {formData.image_url && (
            <div className="mt-3">
              <img
                src={formData.image_url}
                alt="Preview"
                className="h-32 w-full object-cover rounded-lg border border-white/10"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-white/10 text-slate-300 hover:text-white"
        >
          Отмена
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {slide ? 'Обновить' : 'Создать'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

// Утилита для классов
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}
