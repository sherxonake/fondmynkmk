import { motion } from 'framer-motion'
import { InnerPageLayout } from '@/components/ui/InnerPageLayout'

export default function PricesPage() {
  return (
    <InnerPageLayout
      title="Narxlar"
      subtitle="Ishlab chiqarish mahsulotlari va xizmatlar narxlari"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Ochiq ma'lumotlar", href: "/open-data" },
        { label: "Narxlar" }
      ]}
      relatedLinks={[
        { label: "Statistika", href: "/open-data/statistics", description: "Statistik ko'rsatkichlar" },
        { label: "Tenderlar", href: "/open-data/tenders", description: "Tanlov va tenderlar" },
      ]}
    >
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#f0fdf4] rounded-2xl p-8 mb-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">💰</div>
          <div>
            <h2 className="text-2xl font-bold text-[#0d1f3c] mb-2">
              Mahsulot narxlari
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              «NKMK jamg'armasi» davlat muassasasi ishlab chiqarish korxonalari mahsulotlarining belgilangan narxlari.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Documents Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-[#0d1f3c] mb-8">
          Hujjatlar
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Document 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📄</span>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0d1f3c]">Mahsulot narxlari 2024 yil</h3>
                  <p className="text-sm text-gray-500">Ishlab chiqarish mahsulotlari narxlari to'g'risida</p>
                </div>
                <span className="bg-[#f0fdf4] text-[#0d1f3c] text-sm px-3 py-1 rounded-full">
                  Tez orada
                </span>
              </div>
            </div>
          </motion.div>

          {/* Document 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🖨️</span>
                <div className="flex-1">
                  <h3 className="font-bold text-[#0d1f3c]">Tipografiya narxlari</h3>
                  <p className="text-sm text-gray-500">Tipografiya xizmatlari narxlari ro'yxati</p>
                </div>
                <span className="bg-[#f0fdf4] text-[#0d1f3c] text-sm px-3 py-1 rounded-full">
                  Tez orada
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </InnerPageLayout>
  )
}
