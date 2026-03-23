import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";   // ← ДОБАВИТЬ
import { Footer } from "@/components/Footer";   // ← ДОБАВИТЬ
import { getSiteSettings, getFooterColumns } from "@/lib/api";  // ← ДОБАВИТЬ
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fondmynkmk.vercel.app'),
  title: "NKMK Jamg'armasi | Davlat muassasasi",
  description:
    "166 ta ijtimoiy ob'yektlarni boshqaramiz va Navoiy kon-metallurgiya kombinatining 118 000 dan ortiq xodimining hayot sifatini ta'minlaymiz.",
  openGraph: {
    title: "NKMK Jamg'armasi | Davlat muassasasi",
    description:
      "166 ta ijtimoiy ob'yektlarni boshqaramiz va NKMK ning 118 000 dan ortiq xodimining hayot sifatini ta'minlaymiz.",
    url: "https://fondmynkmk.vercel.app",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NKMK Jamg'armasi",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2B4F",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, footerColumns] = await Promise.all([
    getSiteSettings(),
    getFooterColumns(),
  ]);

  return (
    <html lang="uz" className={inter.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Header settings={settings} />          {/* ← ДОБАВИТЬ */}
          {children}
          <Footer columns={footerColumns} />          {/* ← ДОБАВИТЬ */}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
