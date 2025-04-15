"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import DashboardLayout from "../../layout/DashboardLayout";
import { 
  StarIcon, 
  MapPinIcon,
  HeartIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { mockPois } from "@/lib/data/mockData";
import { PointOfInterest, PoiCategory } from "@/lib/types";
import Link from "next/link";
import { toast } from "react-toastify";

// Simuler des données de favoris
const mockFavorites = [1, 3, 5, 7].map(id => ({
  id: id,
  poiId: id,
  userId: 1,
  notes: `Notes personnelles sur le POI ${id}`,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  visitDate: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString() : null,
  rating: Math.floor(Math.random() * 5) + 1
}));

interface FavoriteItem {
  id: number;
  poiId: number;
  userId: number;
  notes: string;
  createdAt: string;
  visitDate: string | null;
  rating: number;
}

export default function DashboardFavoritesPage() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PoiCategory | "">("");
  const [editingFavorite, setEditingFavorite] = useState<FavoriteItem | null>(null);
  const [showNotes, setShowNotes] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setPois(mockPois);
      setFavorites(mockFavorites);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les favoris en fonction des critères de recherche
  const filteredFavorites = favorites.filter(favorite => {
    const poi = pois.find(p => p.id === favorite.poiId);
    if (!poi) return false;
    
    let matchesSearch = true;
    let matchesCategory = true;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      matchesSearch = 
        poi.name.toLowerCase().includes(term) || 
        poi.description.toLowerCase().includes(term) ||
        (favorite.notes && favorite.notes.toLowerCase().includes(term));
    }
    
    if (selectedCategory) {
      matchesCategory = poi.category === selectedCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  const handleRemoveFavorite = (id: number) => {
    if (window.confirm(t("dashboard.favorites.confirmRemove"))) {
      setFavorites(favorites.filter(fav => fav.id !== id));
      toast.success(t("dashboard.favorites.removedSuccess"));
    }
  };

  const toggleNotes = (id: number) => {
    setShowNotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const updateFavoriteNotes = (id: number, notes: string) => {
    setFavorites(favorites.map(fav => 
      fav.id === id ? { ...fav, notes } : fav
    ));
    toast.success(t("dashboard.favorites.notesUpdated"));
  };

  const updateFavoriteRating = (id: number, rating: number) => {
    setFavorites(favorites.map(fav => 
      fav.id === id ? { ...fav, rating } : fav
    ));
  };

  // Toutes les catégories disponibles
  const categories: PoiCategory[] = [
    "natural",
    "cultural",
    "historical",
    "entertainment",
    "accommodation",
    "restaurant"
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("dashboard.favorites.title")}
        </h1>
        <p className="text-gray-600">
          {t("dashboard.favorites.subtitle")}
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={t("dashboard.favorites.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as PoiCategory | "")}
            >
              <option value="">{t("dashboard.favorites.allCategories")}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {t(`common.categories.${category}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {t("dashboard.favorites.totalCount", { count: filteredFavorites.length })}
            </span>
          </div>
        </div>
      </div>

      {/* Liste des favoris */}
      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <HeartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("dashboard.favorites.noFavorites")}
            </h3>
            <p className="text-gray-500 mb-4">
              {t("dashboard.favorites.noFavoritesDescription")}
            </p>
            <Link
              href="/map"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t("dashboard.favorites.exploreMap")}
            </Link>
          </div>
        ) : (
          filteredFavorites.map(favorite => {
            const poi = pois.find(p => p.id === favorite.poiId);
            if (!poi) return null;
            
            return (
              <div key={favorite.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                        <MapPinIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{poi.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                            {t(`common.categories.${poi.category}`)}
                          </span>
                          <span className="text-gray-400">
                            {t("dashboard.favorites.addedOn", { 
                              date: new Date(favorite.createdAt).toLocaleDateString() 
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/pois/${poi.id}`}
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        className="p-2 text-red-400 hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 mr-2">
                        {t("dashboard.favorites.yourRating")}:
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => updateFavoriteRating(favorite.id, star)}
                            className={`${
                              star <= favorite.rating
                                ? "text-yellow-400 hover:text-yellow-500"
                                : "text-gray-300 hover:text-gray-400"
                            }`}
                          >
                            <StarIcon 
                              className={`h-5 w-5 ${star <= favorite.rating ? 'fill-current' : ''}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleNotes(favorite.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {showNotes[favorite.id] 
                        ? t("dashboard.favorites.hideNotes") 
                        : t("dashboard.favorites.showNotes")
                      }
                    </button>
                  </div>
                  
                  {showNotes[favorite.id] && (
                    <div className="mt-4">
                      <label htmlFor={`notes-${favorite.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        {t("dashboard.favorites.personalNotes")}
                      </label>
                      <div className="flex">
                        <textarea
                          id={`notes-${favorite.id}`}
                          rows={3}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder={t("dashboard.favorites.notesPlaceholder")}
                          value={favorite.notes || ""}
                          onChange={(e) => {
                            const updatedFavorites = favorites.map(fav => 
                              fav.id === favorite.id ? { ...fav, notes: e.target.value } : fav
                            );
                            setFavorites(updatedFavorites);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => updateFavoriteNotes(favorite.id, favorite.notes)}
                          className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {t("common.save")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}
