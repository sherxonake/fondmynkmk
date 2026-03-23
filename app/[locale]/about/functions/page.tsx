import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Funksiya va vazifalar | NKMK Jamg'armasi",
  description: "NKMK Jamg'armasi faoliyatining asosiy yo'nalishlari"
};

export default function FunctionsPage() {
  return (
    <InnerPageLayout
      title="Funksiya va vazifalar"
      subtitle="NKMK Jamg'armasi faoliyatining asosiy yo'nalishlari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Biz haqimizda", href: "/about" },
        { label: "Funksiya va vazifalar" }
      ]}
      relatedLinks={[
        { label: "Biz haqimizda", href: "/about", description: "Muassasa haqida umumiy ma'lumot" },
        { label: "Rahbariyat", href: "/about/leadership", description: "Muassasa rahbariyati" },
        { label: "Hududiy boshqarmalar", href: "/about/regions", description: "Viloyatlar bo'yicha boshqarmalar" },
      ]}
    >
      {/* Asosiy maqsad */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🎯</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Asosiy maqsad
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>"Navoiy kon-metallurgiya kombinati"</strong> aksiyadorlik jamiyati, "Navoiyuran" davlat korxonasi, "NKMK jamg'armasi" davlat muassasasi mehnat jamoalari, ularning oila a'zolari va pensionerlari, shuningdek, O'zbekiston Respublikasi soliq rezidentlari va soliq rezidentlari bo'lmagan shaxslarning ijtimoiy-madaniy, davolash, sport-sog'lomlashtirish, uy-joy, xo'jalik va boshqa ehtiyojlarini qondirish hamda xizmatlarni to'liq, o'z vaqtida bajarish asosiy maqsad hisoblanadi.
            </p>
          </div>
        </div>
      </section>

      {/* Asosiy yo'nalishlar */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Asosiy yo'nalishlar
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Ijtimoiy-madaniy, davolash, sport-sog'lomlashtirish, uy-joy va maishiy xo'jalik binolari hamda boshqa infratuzilma ob'yektlarini texnik soz holatda saqlash
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Jismoniy va yuridik shaxslarning ijtimoiy-madaniy ehtiyojlarini qondirishga qaratilgan ishlarni tashkil qilish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Kasalliklarning oldini olish, davolash, sog'lomlashtirish, sanatoriya-kurortda davolash va turistik faoliyatini tashkil qilish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Madaniy-ko'ngilochar, ma'naviy-ma'rifiy va targ'ibot tadbirlarni o'tkazish, bolalar ijodiyotini rivojlantirish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Bolalar va yoshlar o'rtasida turli xil havaskor ijodkorlik tadbirlarini tashkil etish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Ommaviy-madaniy tadbirlar, konsert dasturlari, teatrlashtirilgan tomoshalar, festivallarni tashkil etish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Faol va sog'lom turmush tarzini targ'ib qilish, jismoniy tarbiya va sport uchun shart-sharoitlar yaratish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Musobaqalar va boshqa sport tadbirlarini tashkil etish va o'tkazish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Kommunal xizmatlar ko'rsatish (ichimlik suvi, issiqlik energiyasi, drenaj)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Yotoqxonalarda qulay yashash sharoitlarini yaratish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Umumiy ovqatlanish, oshxonalar va kafelarni tashkil etish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Tibbiy va farmatsevtika faoliyatini tashkil etish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Noshirlik va matbaa faoliyatini tashkil etish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Iste'mol tovarlarini ishlab chiqarish va sotish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Bolalar, o'smirlar va yoshlar oromgohlari, dam olish maskanlarini tashkil etish
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Kapital qurilish va ta'mirlash
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a84c] mt-1">✅</span>
              <span className="text-[#0d1f3c]/80">
                Kadrlarni tayyorlash, qayta tayyorlash va malakasini oshirish
              </span>
            </li>
          </ul>
        </div>
      </section>
    </InnerPageLayout>
  );
}
