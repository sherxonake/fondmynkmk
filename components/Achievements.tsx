"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const accentMap = {
  gold: {
    badge: "bg-[var(--color-accent-gold)] text-[var(--color-primary-dark)]",
    line: "bg-[var(--color-accent-gold)]",
    quoteText: "text-[var(--color-accent-gold)]",
  },
  green: {
    badge: "bg-[var(--color-accent-green)] text-[var(--color-text-light)]",
    line: "bg-[var(--color-accent-green)]",
    quoteText: "text-[var(--color-accent-green)]",
  },
  blue: {
    badge: "bg-[var(--color-primary-dark)] text-[var(--color-text-light)]",
    line: "bg-[var(--color-primary-dark)]",
    quoteText: "text-[var(--color-primary-dark)]",
  },
};

/* --- REGATTA: full-bleed photo, text centred over it --- */
function RegattaBlock() {
  const colors = accentMap.gold;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-3xl"
    >
      {/* Full-background image */}
      <div className="relative aspect-[21/9] min-h-[420px] w-full overflow-hidden sm:aspect-[2/1] lg:aspect-[21/9]">
        <Image
          src="/images/news-regatta.jpg"
          alt="Zarafshon yelkanlari regatasi"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--color-primary-dark)]/65" />
      </div>

      {/* Centre text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className={`mb-5 rounded-full px-4 py-1.5 text-xs font-bold uppercase ${colors.badge}`}>
          Regata
        </span>
        <h3
          className="max-w-2xl text-3xl font-bold text-[var(--color-text-light)] md:text-4xl lg:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          {"\"Zarafshon yelkanlari\" regatasi"}
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-text-light)]/75 md:text-lg">
          {"An'anaviy yelkanli regata har yili Tudakul suv omborida o'tkaziladi. Musobaqa sog'lom turmush tarzini targ'ib qiladi va 20 dan ortiq jamoani birlashtiradi."}
        </p>

        <div className="mt-8 rounded-2xl border border-[var(--color-text-light)]/15 bg-[var(--color-text-light)]/10 px-8 py-5 backdrop-blur-sm">
          <p className="text-base leading-relaxed font-medium italic text-[var(--color-accent-gold)]">
            {"\u201CRegata nafaqat sport, balki jamoaviy ruh va tabiat bilan uyg\u2018unlikdir.\u201D"}
          </p>
          <p className="mt-2 text-sm font-semibold text-[var(--color-text-light)]/50">
            {"-- Musobaqa tashkilotchisi"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* --- POWERLIFTING: photo right, text left --- */
function PowerliftingBlock() {
  const colors = accentMap.green;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16"
    >
      {/* Text left */}
      <div className="flex flex-col lg:w-1/2">
        <div className={`mb-4 h-1 w-12 rounded-full ${colors.line}`} aria-hidden="true" />
        <h3
          className="text-2xl font-bold text-[var(--color-text-dark)] lg:text-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Pauerliftingchilar yutuqlari
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-dark)]/60">
          {"NKMK sportchilari respublika va xalqaro musobaqalarda yuqori natijalarga erishmoqda. Sport majmualarida zamonaviy mashg'ulot zallari mavjud."}
        </p>
        <div className="mt-8 rounded-2xl bg-[var(--color-primary-light)] p-6">
          <p className={`text-base leading-relaxed font-medium italic ${colors.quoteText}`}>
            {"\u201CKuch sporti intizom, irodani chiniqtiradi va sog\u2018liq garovi.\u201D"}
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--color-text-dark)]/50">
            {"-- Bosh murabbiy"}
          </p>
        </div>
      </div>

      {/* Image right */}
      <div className="relative overflow-hidden rounded-3xl lg:w-1/2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/news-powerlifting.jpg"
            alt="Pauerliftingchilar yutuqlari"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/40 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

/* --- MEDICAL: photo left, text right + mini gallery --- */
function MedicalBlock() {
  const colors = accentMap.blue;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="flex flex-col gap-8 lg:flex-row-reverse lg:items-start lg:gap-16"
    >
      {/* Text right */}
      <div className="flex flex-col lg:w-1/2">
        <div className={`mb-4 h-1 w-12 rounded-full ${colors.line}`} aria-hidden="true" />
        <h3
          className="text-2xl font-bold text-[var(--color-text-dark)] lg:text-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Zamonaviy tibbiyot markazlari
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-dark)]/60">
          {"Germaniya va Janubiy Koreyadan keltirilgan ilg'or tibbiy uskunalar bilan jihozlangan markazlar. 118 000 dan ortiq xodim va ularning oilalariga xizmat ko'rsatiladi."}
        </p>
        <div className="mt-8 rounded-2xl bg-[var(--color-primary-light)] p-6">
          <p className={`text-base leading-relaxed font-medium italic ${colors.quoteText}`}>
            {"\u201CXodimlarimiz va ularning oilalari uchun eng yaxshi tibbiy xizmat ko\u2018rsatish bizning asosiy maqsadimiz.\u201D"}
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--color-text-dark)]/50">
            {"-- Bosh shifokor"}
          </p>
        </div>

        {/* Mini gallery */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/medical-equipment-1.jpg"
                alt="MRT tekshiruv uskunasi"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/medical-equipment-2.jpg"
                alt="Jarrohlik xonasi"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image left */}
      <div className="relative overflow-hidden rounded-3xl lg:w-1/2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/hero-hospital.jpg"
            alt="Zamonaviy tibbiyot markazi binosi"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/40 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

export function Achievements() {
  return (
    <section className="bg-[var(--color-white)] py-20 lg:py-28" aria-labelledby="achievements-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--color-accent-gold)] uppercase">
            Yutuqlar
          </p>
          <h2
            id="achievements-heading"
            className="text-3xl font-bold text-[var(--color-text-dark)] md:text-4xl lg:text-5xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Sport va tibbiyot yutuqlari
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20">
          <RegattaBlock />
          <PowerliftingBlock />
          <MedicalBlock />
        </div>
      </div>
    </section>
  );
}
