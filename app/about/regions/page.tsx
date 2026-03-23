import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Hududiy boshqarmalar | NKMK Jamg'armasi",
  description: "NKMK Jamg'armasi viloyatlar bo'yicha hududiy boshqarmalari"
};

export default function RegionsPage() {
  const navoiyObjects = [
    { icon: "🏥", name: "Tibbiy-sanitariya bo'limi", details: "500+ xodim" },
    { icon: "🏨", name: "«Metallurg» sanatoriy-profilaktoriysi", details: "" },
    { icon: "🌿", name: "«NKMK» sanatoriysi (Zomin)", details: "" },
    { icon: "👶", name: "«Bolajon» bolalar sog'lomlashtirish oromgohi", details: "560 bola/mavsum" },
    { icon: "🎭", name: "«Farhod» madaniyat saroyi", details: "" },
    { icon: "⚽", name: "«So'g'diyona» jismoniy tarbiya va sport kompleksi", details: "" },
    { icon: "🌱", name: "Issiqxonalar", details: "" },
    { icon: "🏖️", name: "«To'dako'l» dam olish bazasi", details: "" },
    { icon: "🚗", name: "Navoiy maydoni garaji", details: "" }
  ];

  const zarafshonObjects = [
    { icon: "🏥", name: "3-sonli «Zarafshon» tibbiy-sanitariya qismi", details: "" },
    { icon: "🏨", name: "Sanatoriy-profilaktoriylar", details: "" },
    { icon: "🎭", name: "Madaniyat va sport obyektlari", details: "" },
    { icon: "🍽️", name: "«Zarafshon» ovqatlanish kombinati", details: "" }
  ];

  const uchquduqObjects = [
    { icon: "🏥", name: "2-sonli «Uchquduq» tibbiy-sanitariya qismi", details: "" },
    { icon: "🏨", name: "«Konchi» sanatoriy-profilaktoriysi", details: "" },
    { icon: "🎭", name: "«Uchquduq» madaniyat saroyi", details: "" },
    { icon: "⚽", name: "«Konchi» sport majmuasi", details: "" },
    { icon: "🍽️", name: "«Uchquduq» ovqatlanish kombinati", details: "" },
    { icon: "👶", name: "Bolalar sog'lomlashtirish oromgohi", details: "" }
  ];

  const nurobodObjects = [
    { icon: "🏥", name: "4-sonli «Nurobod» tibbiy-sanitariya qismi", details: "" },
    { icon: "💧", name: "«Nurobod» balneologik sanatoriy-profilaktoriysi", details: "radon suvi" },
    { icon: "🎭", name: "«Nurobod» madaniyat saroyi", details: "" },
    { icon: "🍽️", name: "«Nurobod» ovqatlanish kombinati", details: "" }
  ];

  const regions = [
    {
      icon: "🏙️",
      name: "«Navoiy» hududiy boshqarmasi",
      location: "Navoiy shahri",
      established: "2021-yil 21-may",
      objects: navoiyObjects,
      keyInfo: "Eng yirik boshqarma, 9 ta ijtimoiy obyekt"
    },
    {
      icon: "⛏️",
      name: "«Zarafshon» hududiy boshqarmasi",
      location: "Zarafshon shahri",
      objects: zarafshonObjects,
      medicalStats: {
        staff: "900+ ishchi-xodim",
        doctors: "161 shifokor",
        nurses: "462 o'rta tibbiyot xodimi",
        patients: "12 000+ bemor/yil statsionarda"
      }
    },
    {
      icon: "🏜️",
      name: "«Uchquduq» hududiy boshqarmasi",
      location: "Uchquduq tumani (Qizilqum)",
      objects: uchquduqObjects,
      keyInfo: "Qizilqum hududida xizmat ko'rsatadi"
    },
    {
      icon: "🌿",
      name: "«Nurobod» hududiy boshqarmasi",
      location: "Nurobod tumani, Samarqand viloyati",
      objects: nurobodObjects,
      medicalDirections: [
        "Profilaktik sog'liqni saqlash",
        "Sog'lom turmush tarzi",
        "Behator onalik va bolalik tizimi"
      ]
    }
  ];

  return (
    <InnerPageLayout
      title="Hududiy boshqarmalar"
      subtitle="NKMK Jamg'armasi viloyatlar bo'yicha hududiy boshqarmalari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Biz haqimizda", href: "/about" },
        { label: "Hududiy boshqarmalar" }
      ]}
      relatedLinks={[
        { label: "Biz haqimizda", href: "/about", description: "Muassasa haqida" },
        { label: "Rahbariyat", href: "/about/leadership", description: "Muassasa rahbariyati" },
        { label: "Xizmatlar", href: "/services", description: "Barcha xizmatlar" },
      ]}
    >
      {/* Intro блок */}
      <section className="mb-12">
        <div className="bg-[#f0f4ff] rounded-xl shadow-sm border border-[#e0e7ff] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🗺️</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Hududiy boshqarmalar
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>"NKMK jamg'armasi"</strong> davlat muassasasining 2021-yil 21-maydagi 1-sonli buyrug'iga asosan hududiy boshqarmalar tashkil etilgan. Hududiy boshqarmalar Navoiy viloyatining asosiy shahar va tumanlarida joylashgan bo'lib, xodimlar va ularning oila a'zolariga yaqindan xizmat ko'rsatadi.
            </p>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="mb-12">
        <div className="bg-[#0d1f3c] rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">4</div>
              <div className="text-white/80">Hududiy boshqarma</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">166</div>
              <div className="text-white/80">Ijtimoiy obyektlar</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">118 000+</div>
              <div className="text-white/80">Xizmat ko'rsatiladigan xodimlar</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 карточки бошқарма */}
      <section className="space-y-8">
        {regions.map((region, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6 border-l-4 border-l-[#c9a84c]">
            {/* Шапка: иконка + название + локация */}
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">{region.icon}</span>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
                  {region.name}
                </h2>
                <p className="text-[#0d1f3c]/60 flex items-center gap-1 mt-1">
                  📍 {region.location}
                </p>
                {region.established && (
                  <p className="text-[#0d1f3c]/70 text-sm mt-1">Tashkil etilgan: {region.established}</p>
                )}
              </div>
            </div>

            {/* Grid 2 колонки: список объектов слева, статистика/детали справа */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Левая колонка - список объектов */}
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-3">
                  Tasarrufidagi obyektlar:
                </h3>
                <ul className="space-y-2">
                  {region.objects.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-lg">{obj.icon}</span>
                      <div>
                        <span className="text-[#0d1f3c]/70 text-sm">{obj.name}</span>
                        {obj.details && obj.details !== "" && (
                          <span className="text-[#c9a84c] text-xs ml-2">({obj.details})</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Правая колонка - статистика или ключевые объекты */}
              <div className="bg-[#f8fafc] rounded-lg p-4">
                {region.medicalStats ? (
                  <div>
                    <h4 className="font-semibold text-[#0d1f3c] mb-3">Tibbiy statistika:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#0d1f3c]/70 text-sm">Ishchi-xodimlar:</span>
                        <span className="text-[#0d1f3c] font-medium text-sm">{region.medicalStats.staff}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#0d1f3c]/70 text-sm">Shifokorlar:</span>
                        <span className="text-[#0d1f3c] font-medium text-sm">{region.medicalStats.doctors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#0d1f3c]/70 text-sm">O'rta tibbiyot xodimlari:</span>
                        <span className="text-[#0d1f3c] font-medium text-sm">{region.medicalStats.nurses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#0d1f3c]/70 text-sm">Bemorlar/yil:</span>
                        <span className="text-[#0d1f3c] font-medium text-sm">{region.medicalStats.patients}</span>
                      </div>
                    </div>
                  </div>
                ) : region.medicalDirections ? (
                  <div>
                    <h4 className="font-semibold text-[#0d1f3c] mb-3">Tibbiy yo'nalishlar:</h4>
                    <ul className="space-y-2">
                      {region.medicalDirections.map((direction, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#c9a84c] mt-1">•</span>
                          <span className="text-[#0d1f3c]/70 text-sm">{direction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-semibold text-[#0d1f3c] mb-3">Asosiy ma'lumot:</h4>
                    <p className="text-[#0d1f3c]/70 text-sm">{region.keyInfo}</p>
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
