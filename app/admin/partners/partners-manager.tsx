'use client';

import { useState, useEffect, useTransition } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Plus, 
  Edit, 
  Trash2, 
  GripVertical, 
  Loader2,
  Building,
  Save,
  ExternalLink
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const FALLBACK_PARTNERS: Partner[] = [
  {
    id: 'demo-1',
    name: 'Пример партнёра 1',
    logo_url: '/images/partner1.png',
    website_url: 'https://example1.com',
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    name: 'Пример партнёра 2',
    logo_url: '/images/partner2.png',
    website_url: 'https://example2.com',
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function fetchPartners(): Promise<Partner[]> {
  try {
    const response = await fetch('/api/admin/partners');
    if (!response.ok) {
      console.warn('Failed to fetch partners, using fallback');
      return FALLBACK_PARTNERS;
    }
    const data = await response.json();
    return data.partners || FALLBACK_PARTNERS;
  } catch (error) {
    console.error('Error fetching partners:', error);
    return FALLBACK_PARTNERS;
  }
}

async function savePartnerOrder(partnerIds: string[]): Promise<void> {
  const response = await fetch('/api/admin/partners/reorder', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ partnerIds }),
  });
  
  if (!response.ok) {
    throw new Error('Не удалось сохранить порядок');
  }
}

async function deletePartner(partnerId: string): Promise<void> {
  const response = await fetch(`/api/admin/partners/${partnerId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Не удалось удалить партнёра');
  }
}

export function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const data = await fetchPartners();
        setPartners(data.sort((a, b) => a.sort_order - b.sort_order));
      } catch (error) {
        toast({
          title: 'Ошибка загрузки',
          description: 'Не удалось загрузить партнёров',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPartners();
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(partners);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedPartners = items.map((partner, index) => ({
      ...partner,
      sort_order: index,
    }));

    setPartners(updatedPartners);

    startTransition(async () => {
      try {
        await savePartnerOrder(updatedPartners.map(partner => partner.id));
        toast({
          title: 'Порядок сохранён',
          description: 'Партнёры успешно отсортированы',
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

  const handleDelete = (partnerId: string) => {
    if (!confirm('Удалить партнёра? Это действие нельзя отменить.')) return;

    startTransition(async () => {
      try {
        await deletePartner(partnerId);
        setPartners(prev => prev.filter(partner => partner.id !== partnerId));
        toast({
          title: 'Партнёр удалён',
          description: 'Партнёр успешно удалён',
        });
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить партнёра',
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
              Добавить партнёра
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg border-white/10 bg-slate-900">
            <DialogHeader>
              <DialogTitle className="text-white">Добавление партнёра</DialogTitle>
            </DialogHeader>
            <PartnerEditorForm
              partner={null}
              onSave={() => {
                setIsCreateDialogOpen(false);
                // Перезагрузка партнёров
                fetchPartners().then(data => {
                  setPartners(data.sort((a, b) => a.sort_order - b.sort_order));
                });
              }}
              onCancel={() => setIsCreateDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Список партнёров */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="partners">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {partners.map((partner, index) => (
                <Draggable key={partner.id} draggableId={partner.id} index={index}>
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
                        <div className="space-y-4">
                          {/* Drag handle */}
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center justify-center"
                          >
                            <GripVertical className="h-5 w-5 text-slate-500 cursor-move" />
                          </div>

                          {/* Logo */}
                          <div className="flex justify-center">
                            <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-white/10 bg-slate-800">
                              {partner.logo_url ? (
                                <img
                                  src={partner.logo_url}
                                  alt={partner.name}
                                  className="h-full w-full object-contain p-2"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                      parent.innerHTML = '<div class="flex h-full w-full items-center justify-center"><Building class="h-8 w-8 text-slate-600" /></div>';
                                    }
                                  }}
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Building className="h-8 w-8 text-slate-600" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="text-center space-y-2">
                            <h3 className="font-semibold text-white text-sm">
                              {partner.name}
                            </h3>
                            
                            {partner.website_url && (
                              <a
                                href={partner.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Сайт
                              </a>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingPartner(partner)}
                                  className="text-blue-300 hover:text-white"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg border-white/10 bg-slate-900">
                                <DialogHeader>
                                  <DialogTitle className="text-white">
                                    Редактирование партнёра
                                  </DialogTitle>
                                </DialogHeader>
                                <PartnerEditorForm
                                  partner={editingPartner}
                                  onSave={() => {
                                    setEditingPartner(null);
                                    // Перезагрузка партнёров
                                    fetchPartners().then(data => {
                                      setPartners(data.sort((a, b) => a.sort_order - b.sort_order));
                                    });
                                  }}
                                  onCancel={() => setEditingPartner(null)}
                                />
                              </DialogContent>
                            </Dialog>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(partner.id)}
                              className="text-rose-300 hover:text-white"
                              disabled={isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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

      {partners.length === 0 && (
        <Card className="border-white/5 bg-slate-900/40">
          <CardContent className="text-center py-12">
            <Building className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Нет партнёров</h3>
            <p className="text-sm text-slate-400 mb-6">
              Добавь первого партнёра фонда
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Добавить партнёра
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Компонент формы редактирования партнёра
function PartnerEditorForm({ 
  partner, 
  onSave, 
  onCancel 
}: { 
  partner: Partner | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    logo_url: partner?.logo_url || '',
    website_url: partner?.website_url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: 'Ошибка валидации',
        description: 'Введите название партнёра',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.logo_url.trim()) {
      toast({
        title: 'Ошибка валидации',
        description: 'Введите URL логотипа',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        const url = partner ? `/api/admin/partners/${partner.id}` : '/api/admin/partners';
        const method = partner ? 'PATCH' : 'POST';
        
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Не удалось сохранить партнёра');
        }

        toast({
          title: partner ? 'Партнёр обновлён' : 'Партнёр добавлен',
          description: 'Изменения сохранены',
        });
        
        onSave();
      } catch (error) {
        toast({
          title: 'Ошибка',
          description: 'Не удалось сохранить партнёра',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Название партнёра
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Введите название"
            className="border-white/10 bg-slate-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            URL логотипа
          </label>
          <Input
            value={formData.logo_url}
            onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
            placeholder="https://example.com/logo.png"
            className="border-white/10 bg-slate-800 text-white"
            required
          />
          {formData.logo_url && (
            <div className="mt-3">
              <img
                src={formData.logo_url}
                alt="Logo preview"
                className="h-20 w-full object-contain rounded-lg border border-white/10 bg-slate-800 p-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Сайт партнёра (опционально)
          </label>
          <Input
            value={formData.website_url}
            onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
            placeholder="https://example.com"
            className="border-white/10 bg-slate-800 text-white"
          />
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
              {partner ? 'Обновить' : 'Добавить'}
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
