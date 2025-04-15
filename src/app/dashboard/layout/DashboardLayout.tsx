"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import { 
  HomeIcon, 
  MapIcon, 
  StarIcon, 
  ChatBubbleLeftRightIcon, 
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  BellIcon
} from "@heroicons/react/24/outline";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}

const SidebarLink = ({ href, icon, text, isActive }: SidebarLinkProps) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? "bg-blue-600 text-white" 
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`}
  >
    <div className="w-6 h-6">{icon}</div>
    <span className="font-medium">{text}</span>
  </Link>
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    {
      href: "/dashboard/pages/home",
      icon: <HomeIcon className="w-6 h-6" />,
      text: t("dashboard.sidebar.home"),
    },
    {
      href: "/dashboard/pages/pois",
      icon: <MapIcon className="w-6 h-6" />,
      text: t("dashboard.sidebar.pois"),
    },
    {
      href: "/dashboard/pages/favorites",
      icon: <StarIcon className="w-6 h-6" />,
      text: t("dashboard.sidebar.favorites"),
    },
    {
      href: "/dashboard/pages/comments",
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      text: t("dashboard.sidebar.comments"),
    },
    {
      href: "/dashboard/pages/statistics",
      icon: <ChartBarIcon className="w-6 h-6" />,
      text: t("dashboard.sidebar.statistics"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between px-4 py-5 border-b">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 font-bold text-xl">CameroonPOI</span>
            </Link>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navLinks.map((link) => (
              <SidebarLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                text={link.text}
                isActive={pathname === link.href}
              />
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserCircleIcon className="w-10 h-10 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{t("dashboard.user.name")}</p>
                <Link
                  href="/profile"
                  className="text-xs text-gray-500 hover:text-blue-600"
                >
                  {t("dashboard.user.viewProfile")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <BellIcon className="w-6 h-6" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Cog6ToothIcon className="w-6 h-6" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
