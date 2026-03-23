import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Biz haqimizda | NKMK Jamg'armasi",
  description: "NKMK Jamg'armasi davlat muassasasi haqida ma'lumot"
};

export default function AboutPage() {
  return (
    <InnerPageLayout
      title="Biz haqimizda"
      subtitle="NKMK Jamg'armasi davlat muassasasi haqida"
      breadcrumbs={[
        { label: "Biz haqimizda" }
      ]}
      relatedLinks={[
        { label: "Rahbariyat", href: "/about/leadership", description: "Muassasa rahbariyati" },
        { label: "Funksiya va vazifalar", href: "/about/functions", description: "Asosiy funksiyalar va vazifalar" },
        { label: "Hududiy boshqarmalar", href: "/about/regions", description: "Viloyatlar bo'yicha boshqarmalar" },
      ]}
    >
      {/* Jamg'arma haqida */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🏛️</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Jamg'arma haqida
            </h2>
          </div>
          <div className="space-y-4 text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>"NKMK jamg'armasi"</strong> DM O'zbekiston Respublikasi Prezidentining 2020-yil 6-martdagi PQ-4629-son va O'zbekiston Respublikasi Vazirlar Mahkamasining 2021-yil 30-martdagi 170-son qarorlari hamda Davlat aktivlarini boshqarish agentligining 2021-yil 29-apreldagi 15/07-QR-son buyrug'i bilan tashkil etilgan.
            </p>
            <p>
              Jamg'arma yuridik shaxs hisoblanib, O'zbekiston Respublikasi Davlat gerbi tasviri va o'z nomi davlat tilida lotin alifbosida tushirilgan muhr va blanklarga, mustaqil balansiga ega.
            </p>
          </div>
        </div>
      </section>

      {/* Asosiy maqsad */}
      <section className="mb-12">
        <div className="bg-[#f0f4ff] rounded-xl shadow-sm border border-[#e0e7ff] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🎯</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Asosiy maqsad
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>"Navoiy kon-metallurgiya kombinati"</strong> aksiyadorlik jamiyati, "Navoiyuran" davlat korxonasi, "NKMK jamg'armasi" davlat muassasasi mehnat jamoalari, ularning oila a'zolari va pensionerlari... ijtimoiy-madaniy, davolash, sport-sog'lomlashtirish, uy-joy, xo'jalik va boshqa ehtiyojlarini qondirish hamda xizmatlarni to'liq, o'z vaqtida bajarish asosiy maqsad hisoblanadi.
            </p>
          </div>
        </div>
      </section>

      {/* Faoliyatning asosiy yo'nalishlari */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Faoliyatning asosiy yo'nalishlari
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🏥</div>
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-2">Kasalliklarning oldini olish, davolash, sog'lomlashtirish</h3>
                <p className="text-[#0d1f3c]/70 text-sm">Tibbiy xizmatlar va profilaktika tadbirlari</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🎭</div>
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-2">Madaniy-ko'ngilochar, ma'naviy-ma'rifiy tadbirlar</h3>
                <p className="text-[#0d1f3c]/70 text-sm">Madaniy va ma'rifiy tadbirlar tashkil etish</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚽</div>
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-2">Faol va sog'lom turmush tarzini targ'ib qilish, sport</h3>
                <p className="text-[#0d1f3c]/70 text-sm">Sport tadbirlari va sog'lom turmush tarzi</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">👶</div>
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-2">Bolalar va yoshlar ijodiyotini rivojlantirish</h3>
                <p className="text-[#0d1f3c]/70 text-sm">Yoshlar bilan ishlash va ijodiyot rivojlantirish</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🍽️</div>
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-2">Umumiy ovqatlanish xizmatlari</h3>
                <p className="text-[#0d1f3c]/70 text-sm">Ovqatlanish tashkilotlari faoliyati</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🏨</div>
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-2">Yotoqxonalar va uy-joy sharoitlari</h3>
                <p className="text-[#0d1f3c]/70 text-sm">Yashash sharoitlari va yotoqxona xizmatlari</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🏗️</div>
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-2">Kapital qurilish va ta'mirlash</h3>
                <p className="text-[#0d1f3c]/70 text-sm">Qurilish va ta'mirlash ishlari</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <h3 className="font-semibold text-[#0d1f3c] mb-2">Kadrlarni tayyorlash va malakasini oshirish</h3>
                <p className="text-[#0d1f3c]/70 text-sm">Kadrlar tayyorlash va malaka oshirish dasturlari</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistika */}
      <section className="mb-12">
        <div className="bg-[#0d1f3c] rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ letterSpacing: "-0.02em" }}>
            Bizning raqamlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">2021</div>
              <div className="text-white/80">Tashkil etilgan yil</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">4</div>
              <div className="text-white/80">Hududiy boshqarma</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c9a84c] mb-2">50+</div>
              <div className="text-white/80">Ijtimoiy obyektlar</div>
            </div>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
