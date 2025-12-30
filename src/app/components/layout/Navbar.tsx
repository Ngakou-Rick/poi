"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.pois"), path: "/pois" },
    { name: t("navigation.map"), path: "/map" },
    { name: t("navigation.blog"), path: "/blog" },
    { name: t("navigation.podcast"), path: "/podcast" },
    { name: t("navigation.about"), path: "/about" },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
                CameroonPOI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-300 dark:hover:text-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
            <Link
              href="/map?action=add"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {t("navigation.addPoi")}
            </Link>
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400 dark:text-zinc-300 dark:hover:text-zinc-50 dark:hover:bg-zinc-900"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pb-4 pt-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/map?action=add"
              className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 dark:text-zinc-900 dark:bg-white dark:hover:bg-zinc-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {t("navigation.addPoi")}
              </div>
            </Link>
            
            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-zinc-400">{t("language.selectLanguage")}: </span>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
