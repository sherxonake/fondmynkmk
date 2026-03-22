import { requireAdminSession } from "@/lib/admin-session";
import { HeroSliderManager } from "./hero-slider-manager";

export default async function AdminHeroPage() {
  await requireAdminSession();

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-400">Hero Slider</p>
        <h1 className="text-3xl font-semibold text-white">Управление Hero-слайдером</h1>
        <p className="text-sm text-slate-400">
          Меняй главные баннеры сайта. Управляй порядком, активностью и контентом слайдов.
        </p>
      </section>

      <HeroSliderManager />
    </div>
  );
}
