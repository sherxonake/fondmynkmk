import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Ovqatlantirish | NKMK Jamg'armasi",
  description: "NKMK xodimlari uchun sifatli ovqatlanish xizmatlari"
};

export default function FoodPage() {
  const foodCombines = [
    {
      icon: "🏙️",
      name: "«Navoiy» ovqatlanish kombinati",
      location: "Navoiy shahri",
      description: "NKMK markaziy kombinati, eng yirik, ko'p tseхli ishlab chiqarish"
    },
    {
      icon: "🌊",
      name: "«Zarafshon» ovqatlanish kombinati",
      location: "Zarafshon shahri",
      description: "Zarafshon shahri xodimlari uchun, Zarafshon kon boshqarmasi"
    },
    {
      icon: "🏜️",
      name: "«Uchquduq» ovqatlanish kombinati",
      location: "Uchquduq tumani",
      description: "Shimoliy kon boshqarmasi va Navoiyuran xodimlari uchun"
    },
    {
      icon: "🌿",
      name: "«Nurobod» ovqatlanish kombinati",
      location: "Nurobod tumani",
      description: "Nurobod hududiy boshqarmasi xodimlari uchun"
    },
    {
      icon: "🌾",
      name: "«Ko'kcha» ovqatlanish kombinati",
      location: "Navoiy viloyati",
      description: "Ko'kcha hududi xodimlari uchun"
    }
  ];

  const services = [
    "✅ To'liq siklli ovqatlanish xizmati",
    "✅ Uch mahal issiq ovqat",
    "✅ Oziq-ovqat xavfsizligi nazorati",
    "✅ Parhez taomlar",
    "✅ Milliy taomlar"
  ];

  const standards = [
    "🥗 Kuniga 3 mahal issiq ovqat",
    "🌡️ Oziq-ovqat harorat nazorati",
    "📋 Ratsional ovqatlanish dasturi",
    "🥦 Toza va sifatli mahsulotlar",
    "👨‍🍳 Malakali oshpazlar jamoasi",
    "🏥 Sanitariya-gigiena talablari",
    "⚖️ Kaloriyalar hisobi",
    "🎯 Parhez va diet taomlar"
  ];

  return (
    <InnerPageLayout
      title="Ovqatlantirish"
      subtitle="NKMK xodimlari uchun sifatli ovqatlanish xizmatlari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Xizmatlar", href: "/services" },
        { label: "Ovqatlantirish" }
      ]}
      relatedLinks={[
        { label: "Tibbiyot", href: "/services/medical", description: "Tibbiy xizmatlar" },
        { label: "Sanatoriy-profilaktoriylar", href: "/services/sanatorium", description: "Dam olish maskanlar" },
        { label: "Xizmatlar", href: "/services", description: "Barcha xizmatlar" },
      ]}
    >
      {/* Intro блок */}
      <section className="mb-12">
        <div className="bg-[#f0fff4] rounded-xl shadow-sm border border-[#bbf7d0] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🍽️</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Sifatli ovqatlanish xizmatlari
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>NKMK Jamg'armasi</strong> tasarrufidagi ovqatlanish kombinatlari "Navoiy kon-metallurgiya kombinati" aksiyadorlik jamiyati, "Navoiyuran" davlat korxonasi va "NKMK jamg'armasi" davlat muassasasi mehnat jamoalari uchun to'liq siklli, sifatli ovqatlanish xizmatlarini ko'rsatadi. Oziq-ovqat xavfsizligi va sifat nazorati asosiy ustuvorlik hisoblanadi.
            </p>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="mb-12">
        <div className="bg-[#0d1f3c] rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">5</div>
              <div className="text-white/80">Ovqatlanish kombinati</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">5</div>
              <div className="text-white/80">Shahar va tuman</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">100 000+</div>
              <div className="text-white/80">Kunlik xizmat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Карточки комбинатов */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Ovqatlanish kombinatlari
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {foodCombines.map((combine, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Иконка + Название + Локация */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{combine.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0d1f3c]">{combine.name}</h3>
                  <p className="text-sm text-[#0d1f3c]/60">📍 {combine.location}</p>
                </div>
              </div>
              
              {/* Золотая разделительная линия */}
              <div className="h-0.5 bg-[#c9a84c] w-12 mb-4 rounded" />
              
              {/* Описание */}
              <p className="text-[#0d1f3c]/70 text-sm mb-4">{combine.description}</p>
              
              {/* Список услуг */}
              <ul className="space-y-2 text-sm text-[#0d1f3c]/70">
                <li>✅ To'liq siklli ovqatlanish xizmati</li>
                <li>✅ Uch mahal issiq ovqat</li>
                <li>✅ Oziq-ovqat xavfsizligi nazorati</li>
                <li>✅ Parhez taomlar</li>
                <li>✅ Milliy taomlar</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Xizmat ko'rsatish standarti */}
      <section className="mb-12">
        <div className="bg-[#f8fafc] rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">📋</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Xizmat ko'rsatish standarti
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed mb-6">
            <p>Barcha ovqatlanish kombinatlarida yagona standart:</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {standards.map((standard, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100">
                <span className="text-lg">{standard.split(' ')[0]}</span>
                <span className="text-[#0d1f3c]/70 text-sm">{standard.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
