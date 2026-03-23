import { InnerPageLayout } from '@/components/ui/InnerPageLayout';
import Link from 'next/link';

export const metadata = {
  title: "Xizmatlar | NKMK Jamg'armasi",
  description: "NKMK Jamg'armasi ko'rsatadigan xizmatlar"
};

export default function ServicesPage() {
  const services = [
    {
      icon: "🏥",
      title: "Tibbiyot",
      subtitle: "5 ta tibbiy-sanitariya bo'limi",
      href: "/services/medical"
    },
    {
      icon: "🏨",
      title: "Sanatoriy-profilaktoriylar",
      subtitle: "5 ta dam olish maskani",
      href: "/services/sanatorium"
    },
    {
      icon: "🍽️",
      title: "Ovqatlantirish",
      subtitle: "5 ta ovqatlanish kombinati",
      href: "/services/food"
    },
    {
      icon: "🎭",
      title: "Madaniyat va sport",
      subtitle: "9 ta madaniyat va sport majmuasi",
      href: "/services/culture"
    },
    {
      icon: "👶",
      title: "Bolalar oromgohlari",
      subtitle: "6 ta bolalar sog'lomlashtirish oromgohi",
      href: "/services/children"
    },
    {
      icon: "🏗️",
      title: "Ishlab chiqarish",
      subtitle: "Agrofirma, bosmaxona, fabrika",
      href: "/services/production"
    }
  ];

  return (
    <InnerPageLayout
      title="Xizmatlar"
      subtitle="NKMK Jamg'armasi ko'rsatadigan xizmatlar"
      breadcrumbs={[
        { label: "Bosh sahifa", href: "/" },
        { label: "Xizmatlar" }
      ]}
      relatedLinks={[
        { label: "Biz haqimizda", href: "/about", description: "Muassasa haqida umumiy ma'lumot" },
        { label: "Rahbariyat", href: "/about/leadership", description: "Muassasa rahbariyati" },
      ]}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Link
            key={service.href}
            href={service.href}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:bg-[#0d1f3c] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#0d1f3c] group-hover:text-white mb-2 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[#0d1f3c]/70 group-hover:text-white/80 text-sm transition-colors duration-300">
                  {service.subtitle}
                </p>
              </div>
              <div className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </InnerPageLayout>
  );
}
