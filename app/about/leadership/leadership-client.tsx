"use client";

import { motion } from "framer-motion";

const leaders = [
  {
    name: "Ochilov Dilshod Murodullayevich",
    position: "Bosh direktor",
    age: "50 yosh, 1976-yilda tug'ilgan",
    initials: "OD",
    education: [
      { year: "2004", place: "Buxoro oziq-ovqat va yengil sanoat texnologiyalari instituti" },
      { year: "2008", place: "O'zbekiston Respublikasi Bank-moliya akademiyasi" }
    ],
    career: [
      { years: "1996–2003", role: "Navoiy viloyat Qiziltepa tumani maliya bo'limida mas'ul xodim" },
      { years: "2003–2012", role: "Navoiy viloyat Maliya boshqarmasida mas'ul xodim" },
      { years: "2012–2014", role: "Qiziltepa tumani maliya bo'limi mudiri" },
      { years: "2014–2017", role: "Uchquduq tuman hokimining ijtimoiy-iqtisodiy masalalar bo'yicha o'rinbosari" },
      { years: "2017–2023", role: "Navoiy viloyat Maliya boshqarmasi boshlig'i" },
      { years: "2023–h.v.", role: "\"NKMK jamg'armasi\" davlat muassasasi bosh direktori", current: true }
    ]
  },
  {
    name: "Altinov Suxrab Rustamovich",
    position: "Direktorning iqtisod va tijorat masalalari bo'yicha o'rinbosari",
    age: "43 yosh, 1983-yilda tug'ilgan",
    initials: "AS",
    education: [
      { year: "2007", place: "Jahon iqtisodiyoti va diplomatiyasi universiteti" }
    ],
    career: [
      { years: "2007–2021", role: "NKMK davlat korxonasi Ijtimoiy rivojlantirish bo'limi (turli lavozimlar)" },
      { years: "2021–h.v.", role: "\"NKMK jamg'armasi\" bosh direktorining umumiy masalalar va kadrlar bo'yicha o'rinbosari", current: true }
    ]
  },
  {
    name: "Ibragimov Asliddin Abdiqodirovich",
    position: "Bosh muhandis",
    age: "43 yosh, 1983-yilda tug'ilgan",
    initials: "IA",
    education: [
      { year: "2008", place: "Samarqand davlat arxitektura qurilish instituti" }
    ],
    career: [
      { years: "2002–2021", role: "NKMK davlat korxonasida turli muhandislik lavozimlari" },
      { years: "2021–h.v.", role: "\"NKMK jamg'armasi\" bosh muhandisi", current: true }
    ]
  },
  {
    name: "Numonov Maqsud Muminovich",
    position: "Xodimlar va tashkiliy rivojlanish boshqarmasi boshlig'i",
    age: "40 yosh, 1986-yilda tug'ilgan",
    initials: "NM",
    education: [
      { year: "2008", place: "Navoiy davlat pedagogika instituti" }
    ],
    career: [
      { years: "2007–2016", role: "NKMK davlat korxonasida turli lavozimlar" },
      { years: "2016–2021", role: "NKMK kadrlar bo'limi boshlig'i" },
      { years: "2021–h.v.", role: "\"NKMK jamg'armasi\" xodimlar boshqarmasi boshlig'i", current: true }
    ]
  }
];

function ProfileCard({ leader, index }: { leader: typeof leaders[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm border-l-4 border-[#c9a227] p-8 mb-6"
    >
      {/* ШАПКА */}
      <div className="flex items-start gap-6 mb-6 pb-6 border-b border-gray-100">
        {/* Аватар */}
        <div className="w-20 h-20 rounded-full bg-[#0d1f3c] flex items-center justify-center 
                        text-white text-2xl font-bold shrink-0">
          {leader.initials}
        </div>
        {/* Имя и должность */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#0d1f3c] mb-1">{leader.name}</h2>
          <p className="text-[#c9a227] font-medium mb-2">{leader.position}</p>
          <span className="bg-[#f0f4ff] text-[#0d1f3c] text-sm px-3 py-1 rounded-full">
            {leader.age}
          </span>
        </div>
      </div>

      {/* КОНТЕНТ — 2 колонки */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        
        {/* ЛЕВАЯ — Образование */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold text-[#0d1f3c] mb-4">
            🎓 Ta'lim
          </h3>
          <ul className="space-y-3">
            {leader.education.map((edu, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="text-[#c9a227] font-bold shrink-0">{edu.year}</span>
                <span className="text-[#0d1f3c]/70">{edu.place}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ПРАВАЯ — Timeline карьеры */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold text-[#0d1f3c] mb-4">
            💼 Mehnat faoliyati
          </h3>
          <div className="relative pl-4 border-l-2 border-gray-200">
            {leader.career.map((item, i) => (
              <div key={i} className={`relative mb-4 pl-4 ${item.current ? 'bg-[#fefce8] rounded-lg p-3 -ml-4' : ''}`}>
                {/* Точка на линии */}
                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 
                               ${item.current ? 'bg-[#c9a227] border-[#c9a227]' : 'bg-white border-gray-300'}`} />
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-1 inline-block
                                ${item.current ? 'bg-[#c9a227] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {item.years}
                </span>
                <p className="text-sm text-[#0d1f3c]/80">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function LeadershipClient() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {leaders.map((leader, index) => (
          <ProfileCard key={leader.initials} leader={leader} index={index} />
        ))}
      </div>
    </section>
  );
}
