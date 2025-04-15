"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function DashboardRedirect() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // Rediriger vers la page d'accueil du dashboard
    router.push("/dashboard/pages/home");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          {t("dashboard.loading")}
        </h2>
        <p className="text-gray-600">
          {t("dashboard.redirecting")}
        </p>
      </div>
    </div>
  );
}
