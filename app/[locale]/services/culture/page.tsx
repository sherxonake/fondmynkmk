import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Madaniyat va sport | NKMK Jamg'armasi",
  description: "Madaniy-ma'rifiy va sport-sog'lomlashtirish majmualari"
};

export default function CulturePage() {
  const culturePalaces = [
    {
      icon: "🎪",
      name: "«Uchquduq» madaniyat saroyi",
      location: "Uchquduq tumani"
    },
    {
      icon: "🌟",
      name: "«Oltin vodiy» madaniyat saroyi",
      location: "Navoiy shahri"
    },
    {
      icon: "🎨",
      name: "«Farhod» madaniyat saroyi",
      location: "Navoiy viloyati"
    },
    {
      icon: "🎵",
      name: "«Nurobod» madaniyat saroyi",
      location: "Nurobod tumani"
    },
    {
      icon: "🏛️",
      name: "«Yoshlik» madaniyat va sport majmuasi",
      location: "Zarafshon shahri"
    }
  ];

  const sportComplexes = [
    {
      icon: "🏋️",
      name: "«So'g'diyona» jismoniy tarbiya va sport majmuasi",
      location: "Navoiy shahri"
    },
    {
      icon: "🥊",
      name: "«Alpomish» sport majmuasi",
      location: "Navoiy viloyati"
    },
    {
      icon: "🎯",
      name: "«Lochin» sport majmuasi",
      location: "Zarafshon shahri"
    },
    {
      icon: "⛏️",
      name: "«Konchi» sport majmuasi",
      location: "Uchquduq tumani"
    }
  ];

  const cultureServices = [
    "✅ Konsert va tomoshalar",
    "✅ Havaskorlik to'garaklari",
    "✅ Bolalar ijodiyot seksiyalari",
    "✅ Ma'naviy-ma'rifiy tadbirlar",
    "✅ Bayram va festivallar"
  ];

  const sportServices = [
    "✅ Jismoniy tarbiya va sport seksiyalari",
    "✅ Musobaqalar va turnirlar",
    "✅ Sport zallari va maydonchalar",
    "✅ Bolalar va kattalar uchun bo'limlar"
  ];

  return (
    <InnerPageLayout
      title="Madaniyat va sport"
      subtitle="Madaniy-ma'rifiy va sport-sog'lomlashtirish majmualari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Xizmatlar", href: "/services" },
        { label: "Madaniyat va sport" }
      ]}
      relatedLinks={[
        { label: "Bolalar oromgohlari", href: "/services/children", description: "Yozgi dam olish" },
        { label: "Sanatoriy-profilaktoriylar", href: "/services/sanatorium", description: "Sog'lomlashtirish" },
        { label: "Xizmatlar", href: "/services", description: "Barcha xizmatlar" },
      ]}
    >
      {/* Intro блок */}
      <section className="mb-12">
        <div className="bg-[#fff7ed] rounded-xl shadow-sm border border-[#fed7aa] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🎭</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Madaniy-ma'rifiy va sport xizmatlari
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>NKMK Jamg'armasi</strong> tasarrufidagi madaniyat saroylari va sport majmualari xodimlar va ularning oila a'zolari uchun mazmunli dam olish, madaniy-ma'rifiy tadbirlar, sport va sog'lomlashtirish xizmatlarini ko'rsatadi.
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
              <div className="text-white/80">Madaniyat saroyi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">4</div>
              <div className="text-white/80">Sport majmuasi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">9</div>
              <div className="text-white/80">Jami obyekt</div>
            </div>
          </div>
        </div>
      </section>

      {/* Madaniyat saroylari */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Madaniyat saroylari
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {culturePalaces.map((palace, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Иконка + Название + Локация */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{palace.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0d1f3c]">{palace.name}</h3>
                  <p className="text-sm text-[#0d1f3c]/60">📍 {palace.location}</p>
                </div>
              </div>
              
              {/* Золотая разделительная линия */}
              <div className="h-0.5 bg-[#c9a84c] w-12 mb-4 rounded" />
              
              {/* Список услуг */}
              <ul className="space-y-2 text-sm text-[#0d1f3c]/70">
                {cultureServices.map((service, idx) => (
                  <li key={idx}>{service}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Sport majmualari */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Sport majmualari
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {sportComplexes.map((complex, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              {/* Иконка + Название + Локация */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{complex.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-[#0d1f3c]">{complex.name}</h3>
                  <p className="text-sm text-[#0d1f3c]/60">📍 {complex.location}</p>
                </div>
              </div>
              
              {/* Золотая разделительная линия */}
              <div className="h-0.5 bg-[#c9a84c] w-12 mb-4 rounded" />
              
              {/* Список услуг */}
              <ul className="space-y-2 text-sm text-[#0d1f3c]/70">
                {sportServices.map((service, idx) => (
                  <li key={idx}>{service}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </InnerPageLayout>
  );
}
