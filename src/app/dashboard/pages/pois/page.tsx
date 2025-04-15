"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import DashboardLayout from "../../layout/DashboardLayout";
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { mockPois } from "@/lib/data/mockData";
import { PointOfInterest, PoiCategory } from "@/lib/types";
import AddPoiForm from "@/app/dashboard/components/forms/AddPoiForm";
import { toast } from "react-toastify";

export default function DashboardPoisPage() {
  const { t } = useTranslation();
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PoiCategory | "">("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPoi, setEditingPoi] = useState<PointOfInterest | null>(null);
  const [filteredPois, setFilteredPois] = useState<PointOfInterest[]>([]);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setPois(mockPois);
      setFilteredPois(mockPois);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filtrer les POIs en fonction des critères de recherche
    let results = [...pois];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        poi => 
          poi.name.toLowerCase().includes(term) || 
          poi.description.toLowerCase().includes(term) ||
          poi.address?.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory) {
      results = results.filter(poi => poi.category === selectedCategory);
    }
    
    setFilteredPois(results);
  }, [pois, searchTerm, selectedCategory]);

  const handleAddPoi = (newPoi: PointOfInterest) => {
    // Vérifier les conflits potentiels (POIs trop proches)
    const conflicts = checkForConflicts(newPoi);
    
    if (conflicts.length > 0) {
      // Afficher un avertissement avec les conflits détectés
      toast.warning(
        <div>
          <p className="font-bold mb-2">{t("dashboard.pois.conflictWarning")}</p>
          <ul className="list-disc pl-5">
            {conflicts.map(poi => (
              <li key={poi.id}>{poi.name} ({calculateDistance(newPoi.coordinates, poi.coordinates).toFixed(2)} km)</li>
            ))}
          </ul>
          <p className="mt-2">{t("dashboard.pois.proceedAnyway")}</p>
          <div className="flex justify-end mt-2">
            <button 
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded mr-2"
              onClick={() => toast.dismiss()}
            >
              {t("common.cancel")}
            </button>
            <button 
              className="bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => {
                addPoiAfterConflictCheck(newPoi);
                toast.dismiss();
              }}
            >
              {t("common.confirm")}
            </button>
          </div>
        </div>,
        { autoClose: false, closeOnClick: false }
      );
    } else {
      // Aucun conflit, ajouter directement
      addPoiAfterConflictCheck(newPoi);
    }
  };

  const addPoiAfterConflictCheck = (newPoi: PointOfInterest) => {
    // Générer un ID pour le nouveau POI
    const newId = Math.max(...pois.map(p => p.id)) + 1;
    const poiWithId = { ...newPoi, id: newId };
    
    // Ajouter le POI à la liste
    setPois([poiWithId, ...pois]);
    setShowAddForm(false);
    toast.success(t("dashboard.pois.addSuccess", { name: newPoi.name }));
  };

  const handleEditPoi = (poi: PointOfInterest) => {
    setEditingPoi(poi);
    setShowAddForm(true);
  };

  const handleDeletePoi = (id: number) => {
    if (window.confirm(t("dashboard.pois.deleteConfirm"))) {
      setPois(pois.filter(poi => poi.id !== id));
      toast.success(t("dashboard.pois.deleteSuccess"));
    }
  };

  // Fonction pour vérifier les conflits (POIs trop proches)
  const checkForConflicts = (newPoi: PointOfInterest): PointOfInterest[] => {
    const MAX_DISTANCE_KM = 0.5; // 500 mètres
    return pois.filter(poi => 
      calculateDistance(newPoi.coordinates, poi.coordinates) < MAX_DISTANCE_KM
    );
  };

  // Calculer la distance entre deux points en kilomètres (formule de Haversine)
  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    
    const R = 6371; // Rayon de la Terre en km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
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
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("dashboard.pois.title")}
          </h1>
          <p className="text-gray-600">
            {t("dashboard.pois.subtitle")}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPoi(null);
            setShowAddForm(true);
          }}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          {t("dashboard.pois.addNew")}
        </button>
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
              placeholder={t("dashboard.pois.searchPlaceholder")}
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
              <option value="">{t("dashboard.pois.allCategories")}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {t(`common.categories.${category}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {t("dashboard.pois.totalCount", { count: filteredPois.length })}
            </span>
          </div>
        </div>
      </div>

      {/* Liste des POIs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-4 animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : filteredPois.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">{t("dashboard.pois.noResults")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.pois.table.name")}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.pois.table.category")}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.pois.table.location")}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.pois.table.rating")}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("dashboard.pois.table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPois.map((poi) => (
                  <tr key={poi.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{poi.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{poi.description.substring(0, 60)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {t(`common.categories.${poi.category}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {poi.coordinates[0].toFixed(4)}, {poi.coordinates[1].toFixed(4)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {poi.rating ? poi.rating.toFixed(1) : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditPoi(poi)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeletePoi(poi.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal pour ajouter/éditer un POI */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">
                {editingPoi 
                  ? t("dashboard.pois.editPoi", { name: editingPoi.name }) 
                  : t("dashboard.pois.addNewPoi")
                }
              </h2>
            </div>
            <div className="p-6">
              <AddPoiForm 
                initialData={editingPoi}
                onSubmit={handleAddPoi}
                onCancel={() => setShowAddForm(false)}
                existingPois={pois}
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
