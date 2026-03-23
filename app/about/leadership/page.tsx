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
    photo: "http://fondnkmk.uz/wp-content/uploads/2024/01/DSC_6043-300x200.jpg",
    birthYear: 1976,
    isMain: true,
    education: [
      "2004 — Buxoro oziq-ovqat va yengil sanoat texnologiyalari instituti",
      "2008 — O'zbekiston Respublikasi Bank-moliya akademiyasi"
    ],
    career: [
      { period: "1996-2003", position: "Navoiy viloyat Qiziltepa tuman moliya bo'limida mas'ul xodim" },
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
  isExpanded: boolean;
  onToggle: () => void;
}

function LeaderCard({ leader, isExpanded, onToggle }: LeaderCardProps) {
  const age = new Date().getFullYear() - leader.birthYear;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`overflow-hidden rounded-2xl bg-[var(--color-white)] shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-xl ${
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
            <h2 className={`font-bold text-[var(--color-text-dark)] transition-colors ${
              leader.isMain ? 'text-3xl lg:text-4xl' : 'text-2xl lg:text-3xl'
            }`} style={{ letterSpacing: "-0.02em" }}>
              {leader.name}
            </h2>
            <p className={`font-semibold text-[var(--color-accent-gold)] mt-2 ${
              leader.isMain ? 'text-lg' : 'text-base'
            }`}>
              {leader.position}
            </p>
            <p className="text-sm text-[var(--color-text-dark)]/60 mt-1">
              {age} yosh, {leader.birthYear}-yilda tug'ilgan
            </p>
          </div>

          {/* Expandable sections */}
          <div className="space-y-4">
            {/* Biography */}
            <div className="border border-[var(--color-text-light)]/10 rounded-lg overflow-hidden">
              <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-primary-light)]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-[var(--color-accent-gold)]" />
                  <span className="font-semibold text-[var(--color-text-dark)]">Biografiyasi</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-[var(--color-text-dark)]/60" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[var(--color-text-dark)]/60" />
                )}
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-4 w-4 text-[var(--color-accent-gold)]" />
                    <span className="font-medium text-[var(--color-text-dark)]/80">Ma'lumoti:</span>
                  </div>
                  <ul className="space-y-2">
                    {leader.education.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[var(--color-accent-gold)] mt-1">•</span>
                        <span className="text-[var(--color-text-dark)]/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Career */}
            <div className="border border-[var(--color-text-light)]/10 rounded-lg overflow-hidden">
              <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--color-primary-light)]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-[var(--color-accent-gold)]" />
                  <span className="font-semibold text-[var(--color-text-dark)]">Mehnat faoliyati</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-[var(--color-text-dark)]/60" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[var(--color-text-dark)]/60" />
                )}
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0">
                  <ul className="space-y-3">
                    {leader.career.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 font-semibold text-[var(--color-accent-gold)] text-sm mt-0.5">
                          {item.period}
                        </span>
                        <span className="text-[var(--color-text-dark)]/70">{item.position}</span>
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

export default function LeadershipPage() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

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
    <>
      {/* Hero Section */}
      <section className="bg-[var(--color-primary-dark)] text-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold lg:text-6xl mb-4" style={{ letterSpacing: "-0.02em" }}>
              Rahbariyat
            </h1>
            <p className="text-xl text-[var(--color-text-light)]/80 max-w-3xl mx-auto">
              "NKMK jamg'armasi" davlat muassasasi rahbariyati tarkibi va ularning mehnat faoliyati
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Content */}
      <section className="bg-[var(--color-primary-light)] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Main Leader */}
          {mainLeader && (
            <div className="mb-12">
              <LeaderCard
                leader={mainLeader}
                isExpanded={expandedCards.has(mainLeader.id)}
                onToggle={() => toggleCard(mainLeader.id)}
              />
            </div>
          )}

          {/* Other Leaders */}
          <div className="grid gap-8 lg:grid-cols-3">
            {otherLeaders.map((leader) => (
              <LeaderCard
                key={leader.id}
                leader={leader}
                isExpanded={expandedCards.has(leader.id)}
                onToggle={() => toggleCard(leader.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata = {
  title: "Rahbariyat | NKMK Jamg'armasi",
  description: "\"NKMK jamg'armasi\" davlat muassasasi rahbariyati tarkibi va ularning mehnat faoliyati"
};
