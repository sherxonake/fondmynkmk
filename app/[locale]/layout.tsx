import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings, getFooterColumns } from "@/lib/api";
import "../globals.css";
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
 
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }
 
  const messages = await getMessages();
  const [settings, footerColumns] = await Promise.all([
    getSiteSettings(),
    getFooterColumns(),
  ]);
 
  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <NextIntlClientProvider messages={messages}>
            <Header settings={settings} />
            {children}
            <Footer columns={footerColumns} />
          </NextIntlClientProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}