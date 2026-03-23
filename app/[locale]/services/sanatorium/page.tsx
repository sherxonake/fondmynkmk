import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Sanatoriy-profilaktoriylar | NKMK Jamg'armasi",
  description: "Sog'lomlashtirish va dam olish maskanlarimiz"
};

export default function SanatoriumPage() {
  const sanatoriums = [
    {
      icon: "🏔️",
      name: "«Gornyak» pansionati",
      location: "Toshkent viloyati, Bo'stonliq tumani, Yusufxona (Chorvoq bo'yida)",
      distance: "Poytaxtdan 100 km",
      capacity: "173",
      opened: "2002-yil",
      area: "4 gektar",
      rooms: "103 xona",
      features: [
        "Tog' havosi",
        "Qishki va yozgi dam olish",
        "Suzish havzasi (kattalar va bolalar)",
        "Sauna",
        "Gidromassaj",
        "Terrenkur yo'laklari",
        "Chimyon va Beldersoyga ekskursiyalar"
      ],
      renovation: "2020–2023-yillar",
      description: "Poytaxtdan 100 km masofada joylashgan bu maskan tog' havosi va ajoyib tabiiy muhit bilan ajralib turadi."
    },
    {
      icon: "🌿",
      name: "«NKMK» sanatoriysi",
      location: "Jizzax viloyati, Zomin tumani, Turkiston tog' tizmasi",
      altitude: "Dengiz sathidan 1960 metr",
      capacity: "150",
      area: "8 gektar, 5000+ ekzotik daraxt",
      treatmentDirections: [
        "Nafas olish tizimi (allergik bronxit, bronxial astma)",
        "Asab tizimi",
        "Umumiy sog'lomlashtirish"
      ],
      methods: [
        "Fizioterapiya",
        "Terrenkur",
        "Uqalab davolash",
        "Galokamera",
        "Fitoterapiya",
        "Kislorod kokteyli",
        "Aerozolli ingalyatsiya"
      ],
      infrastructure: [
        "Asosiy bino",
        "Davolash binosi",
        "Kottejlar",
        "Amfiteatr",
        "Sport maydoni",
        "Bolalar maydoni"
      ],
      description: "Turkiston tog' tizmasining go'zal muhitida joylashgan bu sanatoriy yuqori balandlikda sog'lomlashtirish xizmatlarini taklif etadi."
    },
    {
      icon: "⚙️",
      name: "«Metallurg» sanatoriy-profilaktoriysi",
      location: "Navoiy viloyati, Karmana tumani, \"Talqoq\" mahallasi",
      opened: "1972-yil",
      capacity: "200",
      courseDuration: "14 kunlik kurslar",
      annualVisitors: "23 mavsum, 4600+ dam oluvchi",
      treatmentDirections: [
        "Yurak-qon tomir",
        "Asab tizimi",
        "Tayanch-harakat",
        "Ovqat hazm qilish",
        "Nafas olish",
        "Siydik yo'llari",
        "Endokrin kasalliklar"
      ],
      features: [
        "50 metrlik (8 yo'lak) suzish havzasi",
        "Fin saunasi",
        "Balneoterapiya",
        "Balchiq terapiyasi",
        "Speleoterapiya (tuz g'ori)",
        "Jizzax balchig'i"
      ],
      description: "1972-yildan beri faoliyat yuritib kelgan bu sanatoriy keng spektrdagi tibbiy xizmatlarni taklif etadi."
    },
    {
      icon: "💧",
      name: "«Nurobod» balneologik sanatoriy-profilaktoriysi",
      location: "Samarqand viloyati, Nurobod shahri yaqini",
      opened: "2016-yil, 30-avgust",
      capacity: "50",
      annualVisitors: "1150 dam oluvchi/yil",
      mainTherapy: "Radon xlorid-sulfat suvi (37–43°C), Sxaltubo kurortiga o'xshash",
      treatmentDirections: [
        "Tayanch-harakat",
        "Yurak-qon tomir",
        "Asab",
        "Teri",
        "Ginekologik",
        "Oshqozon-ichak",
        "Endokrin kasalliklar"
      ],
      methods: [
        "Sirkulyar dush",
        "Sharko dush",
        "Gidromassaj vannalar",
        "Elektroterapiya",
        "Lazeroterapiya",
        "Magnitoterapiya",
        "Ozokerit",
        "Ichakni yuvish (Germaniya jihozi)"
      ],
      description: "2016-yilda ochilgan bu zamonaviy sanatoriy Sxaltubo kurorti analogidagi balneologik davolash usullarini taklif etadi."
    },
    {
      icon: "⛏️",
      name: "«Konchi» sanatoriy-profilaktoriysi",
      location: "Navoiy viloyati, Uchquduq tumani",
      opened: "1968-yil",
      capacity: "90",
      courseDuration: "14 kunlik kurslar",
      annualVisitors: "23 mavsum, 2000+ dam oluvchi",
      purpose: "Shimoliy kon boshqarmasi, Navoiyuran va Jamg'arma Uchquduq xodimlari",
      features: [
        "Favvorali kirish",
        "4 qavatli bino",
        "Istirohat bog'i",
        "To'g'ridan-to'g'ri ishdan keyin davolanish imkoni",
        "24 soatlik davolash xonasi",
        "Milliy taomlar kuni"
      ],
      equipment: [
        "Ultratovush",
        "Lazer",
        "Elektromassaj",
        "Magnitoterapiya",
        "Elektroforez",
        "Gidromassaj",
        "Marvarid vannalar",
        "Parafin",
        "Zarba to'lqinlari terapiyasi"
      ],
      description: "1968-yildan beri konchilar uchun xizmat qilayotgan bu sanatoriy to'g'ridan-to'g'ri ish joyidan davolanish imkoniyatini taqdim etadi."
    }
  ];

  return (
    <InnerPageLayout
      title="Sanatoriy-profilaktoriylar"
      subtitle="Sog'lomlashtirish va dam olish maskanlarimiz"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Xizmatlar", href: "/services" },
        { label: "Sanatoriy-profilaktoriylar" }
      ]}
      relatedLinks={[
        { label: "Tibbiyot", href: "/services/medical", description: "Tibbiy xizmatlar" },
        { label: "Bolalar oromgohlari", href: "/services/children", description: "Bolalar sog'lomlashtirish" },
        { label: "Xizmatlar", href: "/services", description: "Barcha xizmatlar" },
      ]}
    >
      {/* Intro блок */}
      <section className="mb-12">
        <div className="bg-[#f0f4ff] rounded-xl shadow-sm border border-[#e0e7ff] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🏨</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Sog'lomlashtirish maskanlari
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>"Navoiy kon-metallurgiya kombinati jamg'armasi"</strong> davlat muassasasi tasarrufidagi sanatoriy-profilaktoriy va pansionatlar yurtimizning turfa mintaqasida joylashgani bilan alohida ajralib turadi.
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
              <div className="text-white/80">Sanatoriy va pansionat</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">700+</div>
              <div className="text-white/80">O'rin sig'imi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">10 000+</div>
              <div className="text-white/80">Yillik dam oluvchilar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Карточки объектов */}
      <section className="space-y-8">
        {sanatoriums.map((sanatorium, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            {/* Шапка карточки */}
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="text-4xl">{sanatorium.icon}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#0d1f3c] mb-2" style={{ letterSpacing: "-0.02em" }}>
                  {sanatorium.name}
                </h2>
                <p className="text-[#0d1f3c]/60 flex items-center gap-1 mb-1">
                  📍 {sanatorium.location}
                </p>
                {sanatorium.distance && (
                  <p className="text-[#0d1f3c]/60 text-sm">{sanatorium.distance}</p>
                )}
                {sanatorium.altitude && (
                  <p className="text-[#0d1f3c]/60 text-sm">{sanatorium.altitude}</p>
                )}
              </div>
              <div className="text-center md:text-right">
                <div className="text-3xl font-bold text-[#c9a84c]">{sanatorium.capacity}</div>
                <p className="text-sm text-gray-500">o'rin</p>
                {sanatorium.rooms && (
                  <p className="text-xs text-gray-400 mt-1">{sanatorium.rooms}</p>
                )}
              </div>
            </div>

            {/* Описание */}
            {sanatorium.description && (
              <div className="mb-6">
                <p className="text-[#0d1f3c]/80 leading-relaxed">{sanatorium.description}</p>
              </div>
            )}

            {/* 2 колонки: Хусусиятлар + Даволаш */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Левая колонка - Основная информация */}
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-4 flex items-center gap-2">
                  <span className="text-[#c9a84c]">ℹ️</span>
                  Asosiy ma'lumotlar
                </h3>
                <div className="space-y-3">
                  {sanatorium.opened && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-[#0d1f3c]/70">Ochilgan:</span>
                      <span className="text-[#0d1f3c] font-medium">{sanatorium.opened}</span>
                    </div>
                  )}
                  {sanatorium.area && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-[#0d1f3c]/70">Maydon:</span>
                      <span className="text-[#0d1f3c] font-medium">{sanatorium.area}</span>
                    </div>
                  )}
                  {sanatorium.courseDuration && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-[#0d1f3c]/70">Kurs davomiyligi:</span>
                      <span className="text-[#0d1f3c] font-medium">{sanatorium.courseDuration}</span>
                    </div>
                  )}
                  {sanatorium.annualVisitors && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-[#0d1f3c]/70">Yillik tashrif:</span>
                      <span className="text-[#0d1f3c] font-medium">{sanatorium.annualVisitors}</span>
                    </div>
                  )}
                  {sanatorium.purpose && (
                    <div className="py-2">
                      <span className="text-[#0d1f3c]/70">Maqsadi:</span>
                      <p className="text-[#0d1f3c] font-medium mt-1">{sanatorium.purpose}</p>
                    </div>
                  )}
                </div>

                {/* Xususiyatlar */}
                {sanatorium.features && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-[#0d1f3c] mb-3">Xususiyatlar:</h4>
                    <ul className="space-y-2">
                      {sanatorium.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#c9a84c] mt-1">•</span>
                          <span className="text-[#0d1f3c]/70 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Jihozlar */}
                {sanatorium.equipment && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-[#0d1f3c] mb-3">Jihozlar:</h4>
                    <ul className="space-y-2">
                      {sanatorium.equipment.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#c9a84c] mt-1">•</span>
                          <span className="text-[#0d1f3c]/70 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Infratuzilma */}
                {sanatorium.infrastructure && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-[#0d1f3c] mb-3">Infratuzilma:</h4>
                    <ul className="space-y-2">
                      {sanatorium.infrastructure.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#c9a84c] mt-1">•</span>
                          <span className="text-[#0d1f3c]/70 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Правая колонка - Даволаш */}
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-4 flex items-center gap-2">
                  <span className="text-[#c9a84c]">🏥</span>
                  Davolash
                </h3>

                {/* Asosiy terapiya */}
                {sanatorium.mainTherapy && (
                  <div className="mb-6 p-4 bg-[#f8fafc] rounded-lg">
                    <h4 className="font-semibold text-[#0d1f3c] mb-2">Asosiy terapiya:</h4>
                    <p className="text-[#0d1f3c]/70 text-sm">{sanatorium.mainTherapy}</p>
                  </div>
                )}

                {/* Davolash yo'nalishlari */}
                {sanatorium.treatmentDirections && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0d1f3c] mb-3">Davolash yo'nalishlari:</h4>
                    <ul className="space-y-2">
                      {sanatorium.treatmentDirections.map((direction, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#c9a84c] mt-1">✓</span>
                          <span className="text-[#0d1f3c]/70 text-sm">{direction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Usullar */}
                {sanatorium.methods && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#0d1f3c] mb-3">Usullar:</h4>
                    <ul className="space-y-2">
                      {sanatorium.methods.map((method, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#c9a84c] mt-1">•</span>
                          <span className="text-[#0d1f3c]/70 text-sm">{method}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ta'mirlash */}
                {sanatorium.renovation && (
                  <div className="p-4 bg-[#f0f4ff] rounded-lg">
                    <h4 className="font-semibold text-[#0d1f3c] mb-2">Kapital ta'mirlash:</h4>
                    <p className="text-[#0d1f3c]/70 text-sm">{sanatorium.renovation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </InnerPageLayout>
  );
}
