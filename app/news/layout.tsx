import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings, getFooterColumns } from "@/lib/api";

export default async function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, footerColumns] = await Promise.all([
    getSiteSettings(),
    getFooterColumns(),
  ]);

  return (
    <>
      <Header settings={settings} />
      {children}
      <Footer columns={footerColumns} />
    </>
  );
}
