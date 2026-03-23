import { motion } from 'framer-motion'
import { InnerPageLayout } from '@/components/ui/InnerPageLayout'

export default function ContactPage() {
  return (
    <InnerPageLayout
      title="Bog'lanish"
      subtitle="Biz bilan bog'laning"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Bog'lanish" }
      ]}
      relatedLinks={[
        { label: "Biz haqimizda", href: "/about", description: "Muassasa haqida" },
        { label: "Hududiy boshqarmalar", href: "/about/regions", description: "Viloyatlar bo'yicha" },
      ]}
    >
      {/* Contact Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 mb-16">
        {/* Phone Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-[#f0f4ff] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#0d1f3c] mb-4 flex items-center gap-2">
              📞 Telefon raqamlar
            </h3>
            <div className="space-y-3">
              <a 
                href="tel:+998792272121" 
                className="block text-[#0d1f3c] hover:text-[#c9a84c] transition-colors duration-200"
              >
                <div className="font-semibold">Call markaz:</div>
                <div>+998 79 227 21 21</div>
              </a>
              <a 
                href="tel:+998792272968" 
                className="block text-[#0d1f3c] hover:text-[#c9a84c] transition-colors duration-200"
              >
                <div className="font-semibold">Ishonch telefoni:</div>
                <div>+998 79 227 29 68</div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Address Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-[#f0fdf4] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#0d1f3c] mb-4 flex items-center gap-2">
              📍 Manzil
            </h3>
            <div className="text-[#0d1f3c]">
              <p>Navoiy viloyati, Navoiy shahri</p>
              <p>«NKMK jamg'armasi» davlat muassasasi</p>
            </div>
          </div>
        </motion.div>

        {/* Working Hours Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-[#fff7ed] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#0d1f3c] mb-4 flex items-center gap-2">
              🕐 Ish vaqti
            </h3>
            <div className="text-[#0d1f3c]">
              <p>Dushanba – Juma: 09:00 – 18:00</p>
              <p>Shanba – Yakshanba: Dam olish</p>
            </div>
          </div>
        </motion.div>

        {/* Citizen Reception Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-[#fefce8] rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#0d1f3c] mb-4 flex items-center gap-2">
              👥 Fuqarolarni qabul qilish
            </h3>
            <div className="text-[#0d1f3c]">
              <p>Seshanba va Payshanba kunlari</p>
              <p>14:00 – 17:00</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Regional Offices */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-[#0d1f3c] mb-8">
          Hududiy boshqarmalar kontaktlari
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏙️</span>
              <h3 className="font-bold text-[#0d1f3c]">Navoiy hududiy boshqarmasi</h3>
            </div>
            <p className="text-gray-600">Navoiy shahri</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⛏️</span>
              <h3 className="font-bold text-[#0d1f3c]">Zarafshon hududiy boshqarmasi</h3>
            </div>
            <p className="text-gray-600">Zarafshon shahri</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏜️</span>
              <h3 className="font-bold text-[#0d1f3c]">Uchquduq hududiy boshqarmasi</h3>
            </div>
            <p className="text-gray-600">Uchquduq tumani</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌿</span>
              <h3 className="font-bold text-[#0d1f3c]">Nurobod hududiy boshqarmasi</h3>
            </div>
            <p className="text-gray-600">Nurobod tumani</p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="bg-[#0d1f3c] text-white rounded-2xl p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl">📞</span>
              <div>
                <div className="font-semibold mb-1">Call markaz:</div>
                <div className="text-xl font-bold">+998 79 227 21 21</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">🔒</span>
              <div>
                <div className="font-semibold mb-1">Ishonch telefoni:</div>
                <div className="text-xl font-bold">+998 79 227 29 68</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </InnerPageLayout>
  )
}
