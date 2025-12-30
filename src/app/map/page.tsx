"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { mockPois } from "@/lib/data/mockData";
import { PointOfInterest, PoiCategory } from "@/lib/types";
import { filterPoisBySearchTerm, filterPoisByCategory } from "@/lib/utils";
import MapComponent from "@/app/components/map/MapComponent";
import SearchAndFilter from "@/app/components/ui/SearchAndFilter";
import AddPoiForm from "@/app/components/forms/AddPoiForm";
import { toast } from "react-toastify";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function MapPage() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [filteredPois, setFilteredPois] = useState<PointOfInterest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<PoiCategory[]>([]);
  const [highlightedPoi, setHighlightedPoi] = useState<PointOfInterest | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectingLocation, setSelectingLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([7.3697, 12.3547]); // Default center of Cameroon
  const [mapZoom, setMapZoom] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'action "add" est présente dans les paramètres d'URL
    const action = searchParams.get("action");
    if (action === "add") {
      setShowAddForm(true);
    }

    // Simuler un chargement depuis une API
    const timer = setTimeout(() => {
      setPois(mockPois);
      setFilteredPois(mockPois);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    // Appliquer les filtres lorsque les critères changent
    let result = [...pois];
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      result = filterPoisBySearchTerm(result, searchTerm);
    }
    
    // Filtrer par catégories
    if (selectedCategories.length > 0) {
      result = filterPoisByCategory(result, selectedCategories);
    }
    
    setFilteredPois(result);
  }, [pois, searchTerm, selectedCategories]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (categories: PoiCategory[]) => {
    setSelectedCategories(categories);
  };

  const handlePoiClick = (poi: PointOfInterest) => {
    setHighlightedPoi(poi);
    setMapCenter(poi.coordinates);
    setMapZoom(12);
  };

  const handleAddPoi = (newPoi: PointOfInterest) => {
    setPois([newPoi, ...pois]);
    setShowAddForm(false);
    setSelectingLocation(false);
    setSelectedLocation(null);
    toast.success(`${t("map.poiAddedSuccess", { name: newPoi.name })}`);
    
    // Centrer la carte sur le nouveau POI
    setMapCenter(newPoi.coordinates);
    setMapZoom(12);
    setHighlightedPoi(newPoi);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setSelectingLocation(false);
    setSelectedLocation(null);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setSelectingLocation(false);
    setSelectedLocation(null);
  };

  const handleRequestSelectLocation = () => {
    setSelectingLocation(true);
    setHighlightedPoi(null);
  };

  const handleMapClickForLocation = (e: any) => {
    if (!selectingLocation) return;
    const lat = e.latlng?.lat;
    const lng = e.latlng?.lng;
    if (typeof lat !== "number" || typeof lng !== "number") return;
    setSelectedLocation([lat, lng]);
    setSelectingLocation(false);
    setMapCenter([lat, lng]);
    setMapZoom(12);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
              {t("map.title")}
            </h1>
            <button
              onClick={toggleAddForm}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showAddForm ? (
                <>
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Annuler
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Ajouter un POI
                </>
              )}
            </button>
          </div>

          {!showAddForm && (
            <SearchAndFilter 
              onSearch={handleSearch} 
              onCategoryChange={handleCategoryChange} 
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Formulaire d'ajout ou panneau d'information */}
        {showAddForm ? (
          <div className="w-full md:w-1/3 p-4 overflow-y-auto">
            <AddPoiForm
              onAddPoi={handleAddPoi}
              onCancel={handleCancelAdd}
              selectedLocation={selectedLocation}
              selectingLocation={selectingLocation}
              onRequestSelectLocation={handleRequestSelectLocation}
            />
          </div>
        ) : highlightedPoi ? (
          <div className="w-full md:w-1/3 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{highlightedPoi.name}</h2>
                <button 
                  onClick={() => setHighlightedPoi(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mt-2">{highlightedPoi.description}</p>
              
              {highlightedPoi.details && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-700">Détails</h3>
                  <p className="text-gray-600 mt-1">{highlightedPoi.details}</p>
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <a
                  href={`/pois/${highlightedPoi.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Voir plus de détails
                </a>
              </div>
            </div>
          </div>
        ) : null}

        {/* Carte */}
        <div className={`flex-1 ${loading ? "flex items-center justify-center" : ""}`}>
          {loading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          ) : (
            <MapComponent
              pois={filteredPois}
              highlightedPoi={highlightedPoi}
              onPoiClick={handlePoiClick}
              onMapClick={handleMapClickForLocation}
              center={mapCenter}
              zoom={mapZoom}
            />
          )}
        </div>
      </div>
    </div>
  );
}
