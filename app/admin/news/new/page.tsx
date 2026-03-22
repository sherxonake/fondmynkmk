import { requireAdminSession } from "@/lib/admin-session";
import { NewsEditorForm } from "../news-editor-form";

export default async function NewNewsPage() {
  await requireAdminSession();

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">News Creation</p>
        <h1 className="text-3xl font-semibold text-white">Создание новости</h1>
        <p className="text-sm text-slate-400">
          Заполни форму ниже чтобы создать новую публикацию. Все поля помеченные звёздочкой обязательны.
        </p>
      </section>

      <NewsEditorForm mode="create" />
    </div>
  );
}
