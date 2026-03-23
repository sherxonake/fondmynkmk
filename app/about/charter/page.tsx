import { InnerPageLayout } from '@/components/ui/InnerPageLayout';

export const metadata = {
  title: "Tashkil etish hujjatlari | NKMK Jamg'armasi",
  description: "NKMK Jamg'armasi huquqiy asoslari va rasmiy hujjatlar"
};

export default function CharterPage() {
  const foundingDocuments = [
    {
      icon: "🏛️",
      title: "O'zbekiston Respublikasi Prezidentining Qarori",
      number: "PQ-4629-son",
      date: "2020-yil 6-mart",
      subject: "\"Navoiy kon-metallurgiya kombinati\" davlat korxonasini isloh qilish chora-tadbirlari to'g'risida",
      bgColor: "#fefce8",
      borderColor: "#fde047"
    },
    {
      icon: "🏦",
      title: "O'zbekiston Respublikasi Vazirlar Mahkamasining Qarori",
      number: "170-son",
      date: "2021-yil 30-mart",
      subject: "\"Navoiyuran\" DK, \"NKMK\" AJ va \"NKMK jamg'armasi\" DM faoliyatini tashkil etish to'g'risida",
      bgColor: "#f0fdf4",
      borderColor: "#bbf7d0"
    },
    {
      icon: "📋",
      title: "Davlat aktivlarini boshqarish agentligining Buyrug'i",
      number: "15/07-QR-son",
      date: "2021-yil 29-aprel",
      subject: "\"NKMK jamg'armasi\" davlat muassasasini tashkil etish",
      bgColor: "#fff7ed",
      borderColor: "#fed7aa"
    }
  ];

  const legalInfoLeft = [
    { icon: "📌", text: "Notijorat tashkilot" },
    { icon: "📌", text: "Davlat muassasasi" },
    { icon: "📌", text: "Yuridik shaxs" },
    { icon: "📌", text: "Mustaqil balansga ega" },
    { icon: "📌", text: "Davlat gerbi muhrli" }
  ];

  const legalInfoRight = [
    { icon: "📌", text: "Davlat mulki asosida tashkil etilgan" },
    { icon: "📌", text: "Operativ boshqarish huquqida" },
    { icon: "📌", text: "O'zbekiston Respublikasi qonunchiligiga bo'ysunadi" },
    { icon: "📌", text: "Davlat aktivlarini boshqarish agentligi nazoratida" }
  ];

  const documents = [
    {
      icon: "📄",
      title: "Tashkilot ustavi",
      description: "PDF hujjat • Yuklab olish",
      href: "http://fondnkmk.uz/wp-content/uploads/2024/01/Таъсисчи-карори-15-07-кр.pdf",
      available: true
    },
    {
      icon: "📋",
      title: "Tarkibiy tuzilma",
      description: "PDF hujjat • Yuklab olish",
      href: "http://fondnkmk.uz/wp-content/uploads/2024/01/Таркибий-тузилма.pdf",
      available: true
    },
    {
      icon: "📘",
      title: "Tashkilot pasporti",
      description: "Tez orada",
      href: "#",
      available: false
    },
    {
      icon: "📜",
      title: "Guvohnoma",
      description: "Tez orada",
      href: "#",
      available: false
    }
  ];

  return (
    <InnerPageLayout
      title="Tashkil etish hujjatlari"
      subtitle="NKMK Jamg'armasi huquqiy asoslari va rasmiy hujjatlar"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Biz haqimizda", href: "/about" },
        { label: "Tashkil etish hujjatlari" }
      ]}
      relatedLinks={[
        { label: "Biz haqimizda", href: "/about", description: "Muassasa haqida" },
        { label: "Funksiya va vazifalar", href: "/about/functions", description: "Asosiy vazifalar" },
        { label: "Rahbariyat", href: "/about/leadership", description: "Muassasa rahbariyati" },
      ]}
    >
      {/* Intro блок */}
      <section className="mb-12">
        <div className="bg-[#f0f4ff] rounded-xl shadow-sm border border-[#e0e7ff] p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">📜</div>
            <h2 className="text-2xl font-bold text-[#0d1f3c]" style={{ letterSpacing: "-0.02em" }}>
              Huquqiy asoslar
            </h2>
          </div>
          <div className="text-[#0d1f3c]/80 leading-relaxed">
            <p>
              <strong>"NKMK jamg'armasi"</strong> davlat muassasasi O'zbekiston Respublikasining amaldagi qonunchiligiga muvofiq tashkil etilgan bo'lib, yuridik shaxs maqomiga ega davlat muassasasi hisoblanadi.
            </p>
          </div>
        </div>
      </section>

      {/* Асосий таъсис ҳужжатлари */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Asosiy ta'sis hujjatlari
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {foundingDocuments.map((doc, index) => (
            <div 
              key={index} 
              className="rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
              style={{ 
                backgroundColor: doc.bgColor, 
                borderColor: doc.borderColor 
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{doc.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0d1f3c] mb-2">{doc.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-[#0d1f3c] text-white px-2 py-0.5 rounded-full">
                      {doc.date}
                    </span>
                  </div>
                  <p className="text-sm text-[#0d1f3c]/70 font-medium">{doc.number}</p>
                </div>
              </div>
              <div className="text-[#0d1f3c]/80 text-sm leading-relaxed">
                <p>{doc.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Юридик маълумотлар */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-[#0d1f3c] mb-6" style={{ letterSpacing: "-0.02em" }}>
            Yuridik ma'lumotlar
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Левая колонка */}
            <div>
              <h3 className="font-semibold text-[#0d1f3c] mb-4">Tashkiliy-huquqiy shakl:</h3>
              <div className="space-y-3">
                {legalInfoLeft.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[#0d1f3c]/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Правая колонка */}
            <div>
              <h3 className="font-semibold text-[#0d1f3c] mb-4">Mulkchilik shakli:</h3>
              <div className="space-y-3">
                {legalInfoRight.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[#0d1f3c]/70">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Расмий ҳужжатлар */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#0d1f3c] mb-8" style={{ letterSpacing: "-0.02em" }}>
          Rasmiy hujjatlar
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {documents.map((doc, index) => (
            <div key={index}>
              {doc.available ? (
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:border-[#c9a84c] hover:shadow-md transition-all group"
                >
                  <div className="text-3xl">{doc.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0d1f3c] group-hover:text-[#c9a84c] transition-colors">
                      {doc.title}
                    </p>
                    <p className="text-sm text-gray-500">{doc.description}</p>
                  </div>
                  <div className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <div className="text-3xl opacity-50">{doc.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-500">{doc.title}</p>
                    <p className="text-sm text-gray-400">{doc.description}</p>
                  </div>
                  <div className="text-gray-400 text-sm">Tez orada</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Тез орада блок */}
      <section>
        <div className="bg-[#f8fafc] rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">⏳</div>
            <div>
              <h2 className="text-2xl font-bold text-[#0d1f3c] mb-3" style={{ letterSpacing: "-0.02em" }}>
                Tez orada
              </h2>
              <p className="text-[#0d1f3c]/80 leading-relaxed">
                Qo'shimcha hujjatlar va ma'lumotlar tez orada qo'shiladi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
