import { InnerPageLayout } from '@/components/ui/InnerPageLayout';
import Link from 'next/link';

export const metadata = {
  title: "Tibbiyot | NKMK Jamg'armasi",
  description: "Konchilar salomatligining fidoyi posbonlari"
};

export default function MedicalPage() {
  const departments = [
    "Sanitariya-epidemiologiya markazi",
    "Markaziy qabul bo'limi",
    "Ayollar maslahatxonasi",
    "Stomatologiya poliklinikasi",
    "Bolalar poliklinikasi",
    "Kattalar poliklinikasi",
    "Tez tibbiy yordam",
    "Ko'p tarmoqli jarrohlik",
    "Terapiya",
    "Nevrologiya",
    "Pediatriya",
    "Rentgen",
    "Otorinolaringologiya",
    "Akusherlik-ginekologiya",
    "Yuqumli kasalliklar",
    "Anestiziya-reanimasiya"
  ];

  const sanatoriums = [
    { name: "Tibbiy-sanitariya bo'limi (Navoiy)", href: "/services/sanatorium" },
    { name: "2-sonli «Uchquduq» tibbiy-sanitariya qismi", href: "/services/sanatorium" },
    { name: "3-sonli «Zarafshon» tibbiy-sanitariya qismi", href: "/services/sanatorium" },
    { name: "4-sonli «Nurobod» tibbiy-sanitariya qismi", href: "/services/sanatorium" }
  ];

  return (
    <InnerPageLayout
      title="Tibbiyot"
      subtitle="Konchilar salomatligining fidoyi posbonlari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Xizmatlar", href: "/services" },
        { label: "Tibbiyot" }
      ]}
      relatedLinks={[
        { label: "Sanatoriy-profilaktoriylar", href: "/services/sanatorium", description: "Dam olish maskanlari" },
        { label: "Bolalar oromgohlari", href: "/services/children", description: "Bolalar sog'lomlashtirish oromgohlari" },
        { label: "Xizmatlar", href: "/services", description: "Barcha xizmatlar" },
      ]}
    >
      {/* Intro блок */}
      <section className="mb-12">
        <div className="bg-[#0d1f3c] rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ letterSpacing: "-0.02em" }}>
              Konchilar salomatligi — bizning ustuvor vazifamiz
            </h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-4xl mx-auto">
              Navoiy kon-metallurgiya kombinatida ko'p ming kishilik jamoa ishchi-xizmatchilari hamda ularning oila a'zolari salomatligi to'g'risida alohida e'tibor va g'amxo'rlik ko'rsatilmoqda.
            </p>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-3xl font-bold text-[#c9a84c] mb-2">1000+</div>
            <div className="text-[#0d1f3c]/70">Zamonaviy tibbiy uskunalar</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-3xl font-bold text-[#c9a84c] mb-2">250+</div>
            <div className="text-[#0d1f3c]/70">Malaka oshirgan tibbiyot xodimlari</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-3xl font-bold text-[#c9a84c] mb-2">26</div>
            <div className="text-[#0d1f3c]/70">Oliy toifali shifokorlar</div>
          </div>
        </div>
      </section>

      {/* Bo'lim tarkibi */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Bo'lim tarkibi
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f8fafc] transition-colors">
                <div className="w-2 h-2 bg-[#c9a84c] rounded-full"></div>
                <span className="text-[#0d1f3c]/80">{dept}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sanatoriy bo'limlari */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Sanatoriy bo'limlari
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {sanatoriums.map((sanatorium, index) => (
              <Link
                key={index}
                href={sanatorium.href}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#c9a84c] hover:bg-[#f8fafc] transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏨</div>
                  <span className="text-[#0d1f3c]/80 group-hover:text-[#0d1f3c] transition-colors">
                    {sanatorium.name}
                  </span>
                </div>
                <div className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
