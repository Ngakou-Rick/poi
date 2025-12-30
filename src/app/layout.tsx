import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TranslationProvider } from "@/lib/i18n/TranslationProvider";

export const metadata: Metadata = {
  title: "CameroonPOI - Points d'intérêt au Cameroun",
  description:
    "Découvrez les merveilles du Cameroun à travers notre plateforme interactive de points d'intérêt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-50">
        <TranslationProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
            <Footer />
            <ToastContainer position="bottom-right" />
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
