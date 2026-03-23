'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { InnerPageLayout } from '@/components/ui/InnerPageLayout'

export default function OpenDataPage() {
  return (
    <InnerPageLayout
      title="Ochiq ma'lumotlar"
      subtitle="Shaffoflik va ochiqlik — bizning tamoyilimiz"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Ochiq ma'lumotlar" }
      ]}
      relatedLinks={[
        { label: "Biz haqimizda", href: "/about", description: "Muassasa haqida" },
        { label: "Xizmatlar", href: "/services", description: "Barcha xizmatlar" },
      ]}
    >
      <div className="grid gap-8 md:grid-cols-3">
        {/* Карточка 1 - Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            href="/open-data/statistics"
            className="block group"
          >
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="text-2xl font-bold text-[#0d1f3c] mb-3 group-hover:text-[#c9a84c] transition-colors duration-200">
                Statistika
              </h3>
              <p className="text-gray-600 leading-relaxed">
                2024-yil iqtisodiy va statistik ko'rsatkichlar
              </p>
              <div className="mt-4 flex items-center text-[#c9a84c] font-semibold group-hover:gap-2 transition-all duration-200">
                Batafsil
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Карточка 2 - Цены */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/open-data/prices"
            className="block group"
          >
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">💰</div>
              <h3 className="text-2xl font-bold text-[#0d1f3c] mb-3 group-hover:text-[#c9a84c] transition-colors duration-200">
                Narxlar
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ishlab chiqarish mahsulotlari narxlari
              </p>
              <div className="mt-4 flex items-center text-[#c9a84c] font-semibold group-hover:gap-2 transition-all duration-200">
                Batafsil
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Карточка 3 - Тендеры */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/open-data/tenders"
            className="block group"
          >
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📋</div>
              <h3 className="text-2xl font-bold text-[#0d1f3c] mb-3 group-hover:text-[#c9a84c] transition-colors duration-200">
                Tenderlar va tanlovlar
              </h3>
              <p className="text-gray-600 leading-relaxed">
                2024-2025-yillardagi tanlov va tenderlar
              </p>
              <div className="mt-4 flex items-center text-[#c9a84c] font-semibold group-hover:gap-2 transition-all duration-200">
                Batafsil
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </InnerPageLayout>
  )
}
