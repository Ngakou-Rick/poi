"use client";

import { useState, useEffect } from "react";
import { mockPois } from "@/lib/data/mockData";
import { PointOfInterest, PoiCategory } from "@/lib/types";
import { filterPoisBySearchTerm, filterPoisByCategory } from "@/lib/utils";
import PoiCard from "@/app/components/ui/PoiCard";
import SearchAndFilter from "@/app/components/ui/SearchAndFilter";

export default function PoisPage() {
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [filteredPois, setFilteredPois] = useState<PointOfInterest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<PoiCategory[]>([]);
  const [highlightedPoi, setHighlightedPoi] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement depuis une API
    const timer = setTimeout(() => {
      setPois(mockPois);
      setFilteredPois(mockPois);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  const handlePoiHighlight = (poiId: string) => {
    setHighlightedPoi(poiId);
  };

  const handlePoiUnhighlight = () => {
    setHighlightedPoi(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Points d'intérêt au Cameroun
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Découvrez les lieux les plus fascinants du Cameroun, des merveilles naturelles aux sites historiques et culturels.
        </p>
      </div>

      <SearchAndFilter 
        onSearch={handleSearch} 
        onCategoryChange={handleCategoryChange} 
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPois.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou de filtrage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPois.map((poi) => (
            <PoiCard 
              key={poi.id} 
              poi={poi} 
              onHighlight={() => handlePoiHighlight(poi.id)}
              onUnhighlight={handlePoiUnhighlight}
            />
          ))}
        </div>
      )}
    </div>
  );
}
