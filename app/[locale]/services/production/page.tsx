import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Ishlab chiqarish | NKMK Jamg'armasi",
  description: "NKMK Jamg'armasi ishlab chiqarish korxonalari"
};

export default function ProductionPage() {
  const productionDirections = [
    { icon: "🥛", text: "Sut va sut mahsulotlari (qayta ishlash sexi)" },
    { icon: "🥬", text: "Sabzavot va mevalar (pomidor, bodring, ko'kat, limon)" },
    { icon: "🌱", text: "Ko'chatchilik (40 000 nina bargli + 100 000 dekorativ ko'chat)" },
    { icon: "🐄", text: "Chorvachilik (sog'im sigirlar, jo'ja chiqarish)" },
    { icon: "🏡", text: "Issiqxona yetishtirish (tomchilab sug'orish, aqlli issiqxona)" }
  ];

  const news2024 = [
    "Sut o'lchagichlar o'rnatildi",
    "Inkubator qurilmasi",
    "Sutni qayta ishlash sexi modernizatsiyasi"
  ];

  const printingServices = [
    "✅ Korporativ nashrlar va blanklarni chop etish",
    "✅ Reklama materiallarini ishlab chiqarish",
    "✅ Jamg'arma ichki hujjatlarini tayyorlash",
    "✅ Gazeta va byulletenlarni nashr etish"
  ];

  const textileServices = [
    "✅ Trikotaj kiyimlar ishlab chiqarish",
    "✅ NKMK xodimlari uchun korporativ kiyimlar",
    "✅ Iste'mol tovarlarini ishlab chiqarish va sotish"
  ];

  const specialClothingServices = [
    "✅ Ishlab chiqarish xodimlari uchun maxsus kiyimlar",
    "✅ Xavfsizlik standartlariga javob beradigan himoya kiyimlari",
    "✅ Korporativ forma tikish",
    "✅ Buyurtma asosida maxsus kiyimlar"
  ];

  return (
    <InnerPageLayout
      title="Ishlab chiqarish"
      subtitle="NKMK Jamg'armasi ishlab chiqarish korxonalari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Xizmatlar", href: "/services" },
        { label: "Ishlab chiqarish" }
      ]}
      relatedLinks={[
        { label: "Ovqatlantirish", href: "/services/food", description: "Ovqatlanish xizmatlari" },
        { label: "Madaniyat va sport", href: "/services/culture", description: "Madaniy xizmatlar" },
        { label: "Xizmatlar", href: "/services", description: "Barcha xizmatlar" },
      ]}
    >
      {/* Intro блок */}
      <section className="mb-12">
        <div className="bg-[#fefce8] rounded-xl shadow-sm border border-[#fde047] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🏭</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Ishlab chiqarish korxonalari
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>NKMK Jamg'armasi</strong> tasarrufidagi ishlab chiqarish korxonalari NKMK xodimlari va aholini zarur mahsulotlar, xizmatlar hamda iste'mol tovarlari bilan ta'minlaydi. Oziq-ovqat ishlab chiqarishdan tortib to to'qimachilik va matbuotgacha bo'lgan keng qamrovli faoliyat amalga oshiriladi.
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
              <div className="text-white/80">Ishlab chiqarish korxonasi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">1959</div>
              <div className="text-white/80">Eng qadimiy korxona (agrofirma)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">65+</div>
              <div className="text-white/80">Yillik tajriba</div>
            </div>
          </div>
        </div>
      </section>

      {/* Карточки */}

      {/* Карточка 1 — «Do'stlik» agrofirmasi (featured) */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-sm border-2 border-[#c9a84c] p-8">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">🌾</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-[#0d1f3c]">«Do'stlik» agrofirmasi</h2>
                <span className="bg-[#c9a84c] text-white text-xs px-2 py-1 rounded-full">
                  1959-yildan
                </span>
              </div>
              <p className="text-[#0d1f3c]/60 mb-2">📍 Navoiy (Karmana) tumani</p>
              <p className="text-[#0d1f3c]/70 text-sm">Boshlang'ich maydon: 270 gektar</p>
            </div>
          </div>

          {/* 2 колонки: yo'nalishlar слева, yangiliklar справа */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Левая колонка - Yo'nalishlar */}
            <div>
              <h3 className="font-semibold text-[#0d1f3c] mb-4 flex items-center gap-2">
                <span className="text-[#c9a84c]">🌱</span>
                Ishlab chiqarish yo'nalishlari
              </h3>
              <div className="space-y-3">
                {productionDirections.map((direction, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-[#f8fafc]">
                    <span className="text-lg">{direction.icon}</span>
                    <span className="text-[#0d1f3c]/70 text-sm">{direction.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая колонка - Yangiliklar */}
            <div>
              <h3 className="font-semibold text-[#0d1f3c] mb-4 flex items-center gap-2">
                <span className="text-[#c9a84c]">📰</span>
                Yangiliklar 2024
              </h3>
              <div className="bg-[#fefce8] rounded-lg p-4 border border-[#fde047]">
                <ul className="space-y-2">
                  {news2024.map((news, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#c9a84c] mt-1">•</span>
                      <span className="text-[#0d1f3c]/70 text-sm">{news}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Остальные 3 карточки в grid 3 колонки */}
      <section className="grid gap-6 md:grid-cols-3">
        {/* Карточка 2 — Bosmaxona */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">🖨️</span>
            <div>
              <h3 className="text-lg font-bold text-[#0d1f3c]">Bosmaxona</h3>
              <p className="text-sm text-[#0d1f3c]/60">Noshirlik va matbaa faoliyati</p>
            </div>
          </div>
          
          <div className="h-0.5 bg-[#c9a84c] w-12 mb-4 rounded" />
          
          <div className="space-y-2 text-sm text-[#0d1f3c]/70">
            {printingServices.map((service, index) => (
              <li key={index} className="list-none">{service}</li>
            ))}
          </div>
        </div>

        {/* Карточка 3 — «Agama» to'qimachilik-trikotaj fabrikasi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">🧵</span>
            <div>
              <h3 className="text-lg font-bold text-[#0d1f3c]">«Agama» to'qimachilik-trikotaj fabrikasi</h3>
              <p className="text-sm text-[#0d1f3c]/60">To'qimachilik va trikotaj mahsulotlari</p>
            </div>
          </div>
          
          <div className="h-0.5 bg-[#c9a84c] w-12 mb-4 rounded" />
          
          <div className="space-y-2 text-sm text-[#0d1f3c]/70">
            {textileServices.map((service, index) => (
              <li key={index} className="list-none">{service}</li>
            ))}
          </div>
        </div>

        {/* Карточка 4 — Maxsus kiyim tikish sexi */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">👷</span>
            <div>
              <h3 className="text-lg font-bold text-[#0d1f3c]">Maxsus kiyim tikish sexi</h3>
              <p className="text-sm text-[#0d1f3c]/60">Maxsus himoya kiyimlari tikish</p>
            </div>
          </div>
          
          <div className="h-0.5 bg-[#c9a84c] w-12 mb-4 rounded" />
          
          <div className="space-y-2 text-sm text-[#0d1f3c]/70">
            {specialClothingServices.map((service, index) => (
              <li key={index} className="list-none">{service}</li>
            ))}
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
