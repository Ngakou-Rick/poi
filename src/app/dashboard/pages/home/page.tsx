"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import DashboardLayout from "../../layout/DashboardLayout";
import { 
  MapPinIcon, 
  StarIcon, 
  ChatBubbleLeftRightIcon, 
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "@heroicons/react/24/outline";
import { mockPois } from "@/lib/data/mockData";
import { PointOfInterest } from "@/lib/types";

// Statistiques simulées
const mockStats = {
  totalViews: 12458,
  totalFavorites: 342,
  totalComments: 867,
  recentActivity: [
    { id: 1, type: "view", poiId: 3, poiName: "Mont Cameroun", date: "2025-04-14T10:30:00" },
    { id: 2, type: "favorite", poiId: 5, poiName: "Chutes de la Lobé", date: "2025-04-14T09:15:00" },
    { id: 3, type: "comment", poiId: 1, poiName: "Parc National de Waza", date: "2025-04-13T16:45:00" },
    { id: 4, type: "view", poiId: 7, poiName: "Lac Ossa", date: "2025-04-13T14:20:00" },
    { id: 5, type: "comment", poiId: 2, poiName: "Réserve du Dja", date: "2025-04-12T11:10:00" }
  ],
  trends: {
    views: { value: 8.5, increasing: true },
    favorites: { value: 12.3, increasing: true },
    comments: { value: 3.7, increasing: false }
  }
};

export default function DashboardHomePage() {
  const { t } = useTranslation();
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setPois(mockPois);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Sélectionner les POIs les plus populaires (basé sur un critère fictif pour l'exemple)
  const popularPois = [...pois]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  const StatCard = ({ title, value, icon, trend }: { 
    title: string, 
    value: number, 
    icon: React.ReactNode,
    trend?: { value: number, increasing: boolean }
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className="p-2 bg-blue-50 rounded-full text-blue-600">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
        {trend && (
          <div className={`flex items-center ${trend.increasing ? 'text-green-600' : 'text-red-600'}`}>
            {trend.increasing ? (
              <ArrowUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-medium">{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("dashboard.home.welcome")}
        </h1>
        <p className="text-gray-600">
          {t("dashboard.home.overview")}
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title={t("dashboard.home.stats.views")} 
          value={stats.totalViews} 
          icon={<EyeIcon className="w-6 h-6" />} 
          trend={stats.trends.views}
        />
        <StatCard 
          title={t("dashboard.home.stats.favorites")} 
          value={stats.totalFavorites} 
          icon={<StarIcon className="w-6 h-6" />} 
          trend={stats.trends.favorites}
        />
        <StatCard 
          title={t("dashboard.home.stats.comments")} 
          value={stats.totalComments} 
          icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />} 
          trend={stats.trends.comments}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* POIs populaires */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">
              {t("dashboard.home.popularPois")}
            </h2>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {popularPois.map((poi) => (
                  <Link 
                    key={poi.id} 
                    href={`/pois/${poi.id}`}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="p-2 bg-blue-50 rounded-full text-blue-600 mr-4">
                      <MapPinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{poi.name}</h3>
                      <p className="text-sm text-gray-500">{poi.category}</p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
                      <span className="font-medium">{poi.rating || 0}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">
              {t("dashboard.home.recentActivity")}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className={`p-2 rounded-full mr-4 ${
                    activity.type === 'view' ? 'bg-blue-50 text-blue-600' :
                    activity.type === 'favorite' ? 'bg-yellow-50 text-yellow-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    {activity.type === 'view' ? (
                      <EyeIcon className="w-5 h-5" />
                    ) : activity.type === 'favorite' ? (
                      <StarIcon className="w-5 h-5" />
                    ) : (
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {activity.type === 'view' 
                        ? t("dashboard.home.activity.viewed") 
                        : activity.type === 'favorite'
                        ? t("dashboard.home.activity.favorited")
                        : t("dashboard.home.activity.commented")
                      }
                      <span className="font-medium text-gray-900 mx-1">
                        {activity.poiName}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
