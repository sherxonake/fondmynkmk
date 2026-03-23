"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, User, Briefcase, GraduationCap } from "lucide-react";

const leadershipData = [
  {
    id: "director",
    name: "Ochilov Dilshod Murodullayevich",
    position: "Navoiy kon-metallurgiya kombinati jamg'armasi davlat muassasasi direktori",
    photo: "https://fondnkmk.uz/wp-content/uploads/2024/01/DSC_6043-768x512.jpg",
    birthYear: 1976,
    isMain: true,
    education: [
      "2004 — Buxoro oziq-ovqat va yengil sanoat texnologiyalari instituti",
      "2008 — O'zbekiston Respublikasi Bank-moliya akademiyasi"
    ],
    career: [
      { period: "1996-2003", position: "Navoiy viloyat Qiziltepa tumani maliya bo'limida mas'ul xodim" },
      { period: "2003-2012", position: "Navoiy viloyat Maliya boshqarmasida mas'ul xodim" },
      { period: "2012-2014", position: "Qiziltepa tumani maliya bo'limi mudiri" },
      { period: "2014-2017", position: "Uchquduq tuman hokimining ijtimoiy-iqtisodiy masalalar bo'yicha o'rinbosari" },
      { period: "2017-2023", position: "Navoiy viloyat Maliya boshqarmasi boshlig'i" },
      { period: "2023-h.v.", position: "\"NKMK jamg'armasi\" davlat muassasasi bosh direktori" }
    ]
  },
  {
    id: "deputy-economics",
    name: "Altinov Suxrab Rustamovich",
    position: "Direktorning iqtisod va tijorat masalalari bo'yicha o'rinbosari",
    photo: "http://fondnkmk.uz/wp-content/uploads/2023/04/Suhrob-Rustamovich-2-249x300.jpg",
    birthYear: 1983,
    isMain: false,
    education: [
      "2007 — Jahon iqtisodiyoti va diplomatiyasi universiteti"
    ],
    career: [
      { period: "2007-2021", position: "NKMK davlat korxonasi Ijtimoiy rivojlantirish bo'limi (turli lavozimlar)" },
      { period: "2021-h.v.", position: "\"NKMK jamg'armasi\" bosh direktorining umumiy masalalar va kadrlar bo'yicha o'rinbosari" }
    ]
  },
  {
    id: "chief-engineer",
    name: "Ibragimov Asliddin Abdiqodirovich",
    position: "Bosh muhandis",
    photo: "http://fondnkmk.uz/wp-content/uploads/2023/04/Asliddin-Abduqodirovich-235x300.jpg",
    birthYear: 1983,
    isMain: false,
    education: [
      "2008 — Samarqand davlat arxitektura qurilish instituti"
    ],
    career: [
      { period: "2002-2021", position: "NKMK davlat korxonasida turli muhandislik lavozimlari" },
      { period: "2021-h.v.", position: "\"NKMK jamg'armasi\" bosh muhandisi" }
    ]
  },
  {
    id: "department-head",
    name: "Numonov Maqsud Muminovich",
    position: "Xodimlar va tashkiliy rivojlanish boshqarmasi boshlig'i",
    photo: "http://fondnkmk.uz/wp-content/uploads/2023/04/Maqsud-aka-2-230x300.jpg",
    birthYear: 1986,
    isMain: false,
    education: [
      "2008 — Navoiy davlat pedagogika instituti"
    ],
    career: [
      { period: "2007-2016", position: "NKMK davlat korxonasida turli lavozimlar" },
      { period: "2016-2021", position: "NKMK kadrlar bo'limi boshlig'i" },
      { period: "2021-h.v.", position: "\"NKMK jamg'armasi\" xodimlar boshqarmasi boshlig'i" }
    ]
  }
];

interface LeaderCardProps {
  leader: typeof leadershipData[0];
}

function LeaderCard({ leader }: LeaderCardProps) {
  const [bioOpen, setBioOpen] = useState(true);
  const [careerOpen, setCareerOpen] = useState(true);
  const age = new Date().getFullYear() - leader.birthYear;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${
        leader.isMain ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <div className={`flex flex-col ${leader.isMain ? 'md:flex-row' : 'lg:flex-row'} gap-6 p-6 lg:p-8`}>
        {/* Photo */}
        <div className={`flex-shrink-0 ${leader.isMain ? 'md:w-1/3' : 'lg:w-1/3'}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg">
            <Image
              src={leader.photo}
              alt={leader.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-4">
            <h2 className={`font-bold text-[#0d1f3c] transition-colors ${
              leader.isMain ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
            }`} style={{ letterSpacing: "-0.02em" }}>
              {leader.name}
            </h2>
            <p className={`font-semibold text-[#c9a84c] mt-2 ${
              leader.isMain ? 'text-lg' : 'text-base'
            }`}>
              {leader.position}
            </p>
            <p className="text-sm text-[#0d1f3c]/60 mt-1">
              {age} yosh, {leader.birthYear}-yilda tug'ilgan
            </p>
          </div>

          {/* Expandable sections */}
          <div className="space-y-4">
            {/* Biography */}
            <div className="border border-[#0d1f3c]/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setBioOpen(!bioOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-[#c9a84c]" />
                  <span className="font-semibold text-[#0d1f3c]">Biografiyasi</span>
                </div>
                {bioOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#0d1f3c]/60" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#0d1f3c]/60" />
                )}
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={bioOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-4 w-4 text-[#c9a84c]" />
                    <span className="font-medium text-[#0d1f3c]/80">Ma'lumoti:</span>
                  </div>
                  <ul className="space-y-2">
                    {leader.education.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#c9a84c] mt-1">•</span>
                        <span className="text-[#0d1f3c]/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Career */}
            <div className="border border-[#0d1f3c]/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setCareerOpen(!careerOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-[#c9a84c]" />
                  <span className="font-semibold text-[#0d1f3c]">Mehnat faoliyati</span>
                </div>
                {careerOpen ? (
                  <ChevronUp className="h-5 w-5 text-[#0d1f3c]/60" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#0d1f3c]/60" />
                )}
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={careerOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0">
                  <ul className="space-y-3">
                    {leader.career.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 font-semibold text-[#c9a84c] text-sm mt-0.5">
                          {item.period}
                        </span>
                        <span className="text-[#0d1f3c]/70">{item.position}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function LeadershipClient() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(
    new Set(leadershipData.map(l => l.id))
  );

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const mainLeader = leadershipData.find(leader => leader.isMain);
  const otherLeaders = leadershipData.filter(leader => !leader.isMain);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Main Leader */}
        {mainLeader && (
          <div className="mb-12">
            <LeaderCard leader={mainLeader} />
          </div>
        )}

        {/* Other Leaders */}
        <div className="grid gap-8 lg:grid-cols-3">
          {otherLeaders.map((leader) => (
            <LeaderCard key={leader.id} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
