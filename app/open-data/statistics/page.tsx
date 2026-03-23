import { motion } from 'framer-motion'
import { InnerPageLayout } from '@/components/ui/InnerPageLayout'

export default function StatisticsPage() {
  return (
    <InnerPageLayout
      title="Statistika"
      subtitle="«NKMK jamg'armasi» 2024-yil iqtisodiy va statistik ko'rsatkichlari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Ochiq ma'lumotlar", href: "/open-data" },
        { label: "Statistika" }
      ]}
      relatedLinks={[
        { label: "Narxlar", href: "/open-data/prices", description: "Mahsulot narxlari" },
        { label: "Tenderlar", href: "/open-data/tenders", description: "Tanlov va tenderlar" },
      ]}
    >
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#f0f4ff] rounded-2xl p-8 mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">📊</div>
          <div>
            <h2 className="text-2xl font-bold text-[#0d1f3c] mb-2">
              Statistik ko'rsatkichlar
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              «NKMK jamg'armasi» davlat muassasasining 2024-yil iqtisodiy va statistik ko'rsatkichlari ommaviy foydalanish uchun taqdim etiladi.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-200 p-8 mb-12"
      >
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#0d1f3c] mb-2">
              118 000+
            </div>
            <p className="text-gray-600">
              Xizmat ko'rsatiladigan xodimlar
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#0d1f3c] mb-2">
              166
            </div>
            <p className="text-gray-600">
              Ijtimoiy obyektlar
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#0d1f3c] mb-2">
              4
            </div>
            <p className="text-gray-600">
              Hududiy boshqarmalar
            </p>
          </div>
        </div>
      </motion.div>

      {/* Documents Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-[#0d1f3c] mb-8">
          Hujjatlar
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📄</span>
            <div className="flex-1">
              <h3 className="font-bold text-[#0d1f3c]">Media reja 2024 yil</h3>
              <p className="text-sm text-gray-500">«NKMK jamg'armasi» statistik hisoboti</p>
            </div>
            <span className="bg-[#f0f4ff] text-[#0d1f3c] text-sm px-3 py-1 rounded-full">
              Tez orada
            </span>
          </div>
        </div>
      </motion.div>
    </InnerPageLayout>
  )
}
