import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/config';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CameroonPOI - Explore Cameroon's Points of Interest",
  description:
    "Discover and explore Cameroon's diverse points of interest, from natural wonders to historical landmarks.",
};

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the current locale
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}/index.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar locale={locale} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ToastContainer position="bottom-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
