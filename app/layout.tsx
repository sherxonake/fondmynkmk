import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "\"NKMK jamg'armasi\" davlat muassasasi",
  description:
    "166 ta ijtimoiy ob'yektlarni boshqaramiz va Navoiy kon-metallurgiya kombinatining 118 000 dan ortiq xodimining hayot sifatini ta'minlaymiz.",
  openGraph: {
    title: "\"NKMK jamg'armasi\" davlat muassasasi",
    description:
      "166 ta ijtimoiy ob'yektlarni boshqaramiz va NKMK ning 118 000 dan ortiq xodimining hayot sifatini ta'minlaymiz.",
    locale: "uz_UZ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2B4F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
