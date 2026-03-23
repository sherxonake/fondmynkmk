import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Bolalar oromgohlari | NKMK Jamg'armasi",
  description: "Bolalar sog'lomlashtirish va dam olish oromgohlari"
};

export default function ChildrenPage() {
  const camps = [
    {
      icon: "🌸",
      name: "«Bolajon» bolalar sog'lomlashtirish oromgohi",
      location: "Navoiy viloyati",
      details: "NKMK xodimlari bolalari uchun"
    },
    {
      icon: "🌟",
      name: "«Kelajak» bolalar sog'lomlashtirish oromgohi",
      location: "Navoiy viloyati",
      details: "Sport va ijodiyot yo'nalishlari"
    },
    {
      icon: "💧",
      name: "«So'g'diyona» bolalar sog'lomlashtirish oromgohi",
      location: "Navoiy shahri yaqini",
      details: "Zamonaviy infratuzilma"
    },
    {
      icon: "🦁",
      name: "«Pahlavon» bolalar sog'lomlashtirish oromgohi",
      location: "Navoiy viloyati",
      details: "Sport yo'nalishi"
    },
    {
      icon: "🌊",
      name: "«Zarafshon» bolalar sog'lomlashtirish oromgohi",
      location: "Zarafshon shahri",
      details: "Zarafshon xodimlari bolalari"
    },
    {
      icon: "🏔️",
      name: "«Sarmish» bolalar sog'lomlashtirish oromgohi",
      location: "Navoiy viloyati",
      details: "Tog' yaqinida, toza havo"
    }
  ];

  const campServices = [
    "✅ Yozgi dam olish va sog'lomlashtirish",
    "✅ Sport tadbirlari va musobaqalar",
    "✅ Madaniy-ko'ngilochar kechalar",
    "✅ Tibbiy nazorat va parvarishlash",
    "✅ 3 mahal to'liq ovqatlanish",
    "✅ Xavfsiz muhit, qo'riqlash"
  ];

  const safetyStandards = [
    "🚌 Yo'l-patrul xizmati kuzatuvida avtobus bilan yetkazish",
    "🏥 Kirish oldidan tibbiy ko'rik",
    "👥 Yosh toifasiga qarab guruhga bo'linish",
    "🔒 Yong'in xavfsizligi va qo'riqlash xizmati",
    "👨‍⚕️ Doimiy tibbiy xodim navbatchiligi",
    "📋 Har bir bola uchun individual nazorat"
  ];

  return (
    <InnerPageLayout
      title="Bolalar oromgohlari"
      subtitle="Bolalar sog'lomlashtirish va dam olish oromgohlari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Xizmatlar", href: "/services" },
        { label: "Bolalar oromgohlari" }
      ]}
      relatedLinks={[
        { label: "Madaniyat va sport", href: "/services/culture", description: "Sport va madaniyat" },
        { label: "Tibbiyot", href: "/services/medical", description: "Tibbiy xizmatlar" },
        { label: "Xizmatlar", href: "/services", description: "Barcha xizmatlar" },
      ]}
    >
      {/* Intro блок */}
      <section className="mb-12">
        <div className="bg-[#f0fdf4] rounded-xl shadow-sm border border-[#bbf7d0] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">👶</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Yosh avlodga g'amxo'rlik
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              Mamlakatimizda yosh avlodga e'tibor va g'amxo'rlik ko'rsatish, ularga barcha sohalarda o'z iqtidori va salohiyatini to'liq namoyon etishi uchun zarur sharoit va imkoniyatlar yaratib berish davlat siyosatining ustuvor yo'nalishi hisoblanadi. <strong>NKMK Jamg'armasi</strong> 6 ta bolalar sog'lomlashtirish oromgohida yozgi mavsumda minglab bolalarga xizmat ko'rsatadi.
            </p>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="mb-12">
        <div className="bg-[#0d1f3c] rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">6</div>
              <div className="text-white/80">Bolalar oromgohi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">3</div>
              <div className="text-white/80">Yozgi mavsum</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">5 000+</div>
              <div className="text-white/80">Yillik bolalar</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 карточек оромгохов */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Bolalar sog'lomlashtirish oromgohlari
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {camps.map((camp, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Иконка + Название + Локация */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{camp.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0d1f3c]">{camp.name}</h3>
                  <p className="text-sm text-[#0d1f3c]/60">📍 {camp.location}</p>
                  <p className="text-sm text-[#c9a84c] mt-1">{camp.details}</p>
                </div>
              </div>
              
              {/* Золотая разделительная линия */}
              <div className="h-0.5 bg-[#c9a84c] w-12 mb-4 rounded" />
              
              {/* Список услуг */}
              <ul className="space-y-2 text-sm text-[#0d1f3c]/70">
                {campServices.map((service, idx) => (
                  <li key={idx}>{service}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Xavfsizlik va standartlar */}
      <section className="mb-12">
        <div className="bg-[#f8fafc] rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🛡️</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Xavfsizlik va standartlar
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed mb-6">
            <p>Barcha oromgohlarda belgilangan standartlar:</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {safetyStandards.map((standard, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100">
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
