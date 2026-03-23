import { InnerPageLayout } from '@/components/ui/InnerPageLayout';
import { LeadershipClient } from './leadership-client';

export const metadata = {
  title: "Rahbariyat | NKMK Jamg'armasi",
  description: "\"NKMK jamg'armasi\" davlat muassasasi rahbariyati tarkibi va ularning mehnat faoliyati"
};

export default function LeadershipPage() {
  return (
    <InnerPageLayout
      title="Rahbariyat"
      subtitle="Muassasa rahbariyati tarkibi va ularning mehnat faoliyati"
      breadcrumbs={[
        { label: "Jamg'arma haqida", href: "/about" },
        { label: "Rahbariyat" }
      ]}
      relatedLinks={[
        {
          label: "Funksiya va vazifalar",
          href: "/about/functions",
          description: "Muassasaning asosiy funksiyalari"
        },
        {
          label: "Hududiy boshqarmalar",
          href: "/about/regions",
          description: "Viloyatlar bo'yicha boshqarmalar"
        },
        {
          label: "Tashkilot pasporti",
          href: "/about/passport",
          description: "Muassasa haqida umumiy ma'lumot"
        }
      ]}
    >
      <LeadershipClient />
    </InnerPageLayout>
  );
}
