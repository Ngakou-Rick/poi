"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import DashboardLayout from "../../layout/DashboardLayout";
import { mockPois } from "@/lib/data/mockData";
import { PointOfInterest, PoiCategory } from "@/lib/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Données simulées pour les statistiques
const mockViewsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Vues 2024',
      data: [1200, 1900, 3000, 5000, 4000, 6000, 7000, 8500, 7800, 9000, 10000, 11000],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderColor: 'rgba(53, 162, 235, 1)',
      borderWidth: 1,
    },
    {
      label: 'Vues 2023',
      data: [800, 1200, 1800, 3000, 2500, 4000, 5000, 6000, 5500, 7000, 8000, 9000],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const mockCommentData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Commentaires',
      data: [65, 78, 90, 115, 130, 167, 189, 210, 190, 205, 225, 250],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Favoris',
      data: [30, 45, 55, 70, 85, 100, 120, 140, 130, 145, 160, 180],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
};

export default function DashboardStatisticsPage() {
  const { t } = useTranslation();
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("year");
  const [categoryData, setCategoryData] = useState<any>(null);
  const [ratingData, setRatingData] = useState<any>(null);
  const [regionData, setRegionData] = useState<any>(null);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setPois(mockPois);
      generateChartData(mockPois);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const generateChartData = (poisData: PointOfInterest[]) => {
    // Données pour le graphique des catégories
    const categories = poisData.reduce((acc, poi) => {
      acc[poi.category] = (acc[poi.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setCategoryData({
      labels: Object.keys(categories).map(cat => t(`common.categories.${cat}`)),
      datasets: [
        {
          label: t("dashboard.statistics.poiByCategory"),
          data: Object.values(categories),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });

    // Données pour le graphique des notes
    const ratings = poisData.reduce((acc, poi) => {
      const rating = Math.floor(poi.rating || 0);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // S'assurer que toutes les notes de 0 à 5 sont représentées
    for (let i = 0; i <= 5; i++) {
      if (ratings[i] === undefined) {
        ratings[i] = 0;
      }
    }

    setRatingData({
      labels: Object.keys(ratings).map(rating => rating === "0" ? t("dashboard.statistics.noRating") : `${rating} ${t("dashboard.statistics.stars")}`),
      datasets: [
        {
          label: t("dashboard.statistics.poiByRating"),
          data: Object.values(ratings),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    });

    // Simuler des données par région (puisque nous n'avons pas de vraies données régionales)
    const regions = {
      "Littoral": Math.floor(Math.random() * 20) + 10,
      "Centre": Math.floor(Math.random() * 20) + 10,
      "Ouest": Math.floor(Math.random() * 15) + 5,
      "Nord-Ouest": Math.floor(Math.random() * 15) + 5,
      "Sud-Ouest": Math.floor(Math.random() * 15) + 5,
      "Nord": Math.floor(Math.random() * 10) + 5,
      "Extrême-Nord": Math.floor(Math.random() * 10) + 5,
      "Adamaoua": Math.floor(Math.random() * 10) + 5,
      "Est": Math.floor(Math.random() * 10) + 5,
      "Sud": Math.floor(Math.random() * 10) + 5,
    };

    setRegionData({
      labels: Object.keys(regions),
      datasets: [
        {
          label: t("dashboard.statistics.poiByRegion"),
          data: Object.values(regions),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("dashboard.statistics.title")}
        </h1>
        <p className="text-gray-600">
          {t("dashboard.statistics.subtitle")}
        </p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
              {t("dashboard.statistics.timeRange")}
            </label>
            <select
              id="timeRange"
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="month">{t("dashboard.statistics.lastMonth")}</option>
              <option value="quarter">{t("dashboard.statistics.lastQuarter")}</option>
              <option value="year">{t("dashboard.statistics.lastYear")}</option>
              <option value="all">{t("dashboard.statistics.allTime")}</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Graphique des vues */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {t("dashboard.statistics.viewsOverTime")}
              </h2>
              <div className="h-64">
                <Bar options={barOptions} data={mockViewsData} />
              </div>
            </div>

            {/* Graphique des commentaires et favoris */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {t("dashboard.statistics.commentsAndFavorites")}
              </h2>
              <div className="h-64">
                <Line options={chartOptions} data={mockCommentData} />
              </div>
            </div>

            {/* Graphique des catégories */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {t("dashboard.statistics.poiByCategory")}
              </h2>
              <div className="h-64">
                {categoryData && <Pie options={chartOptions} data={categoryData} />}
              </div>
            </div>

            {/* Graphique des notes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {t("dashboard.statistics.poiByRating")}
              </h2>
              <div className="h-64">
                {ratingData && <Pie options={chartOptions} data={ratingData} />}
              </div>
            </div>
          </div>

          {/* Graphique des régions */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t("dashboard.statistics.poiByRegion")}
            </h2>
            <div className="h-80">
              {regionData && <Bar options={barOptions} data={regionData} />}
            </div>
          </div>

          {/* Résumé des statistiques */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">
                {t("dashboard.statistics.summary")}
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    {t("dashboard.statistics.totalPois")}
                  </h3>
                  <p className="text-3xl font-bold text-blue-900">{pois.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-800 mb-2">
                    {t("dashboard.statistics.totalViews")}
                  </h3>
                  <p className="text-3xl font-bold text-green-900">67,890</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-yellow-800 mb-2">
                    {t("dashboard.statistics.avgRating")}
                  </h3>
                  <p className="text-3xl font-bold text-yellow-900">
                    {(pois.reduce((sum, poi) => sum + (poi.rating || 0), 0) / pois.length).toFixed(1)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">
                    {t("dashboard.statistics.totalComments")}
                  </h3>
                  <p className="text-3xl font-bold text-purple-900">1,789</p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-pink-800 mb-2">
                    {t("dashboard.statistics.totalFavorites")}
                  </h3>
                  <p className="text-3xl font-bold text-pink-900">943</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-800 mb-2">
                    {t("dashboard.statistics.mostPopularCategory")}
                  </h3>
                  <p className="text-3xl font-bold text-indigo-900">
                    {t(`common.categories.${Object.entries(pois.reduce((acc, poi) => {
                      acc[poi.category] = (acc[poi.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1])[0][0]}`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
