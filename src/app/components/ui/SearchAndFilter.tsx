"use client";

import { useState } from "react";
import { PoiCategory } from "@/lib/types";
import { getCategoryName, getCategoryIcon } from "@/lib/utils";

interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void;
  onCategoryChange: (categories: PoiCategory[]) => void;
}

const SearchAndFilter = ({ onSearch, onCategoryChange }: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<PoiCategory[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryToggle = (category: PoiCategory) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newSelectedCategories);
    onCategoryChange(newSelectedCategories);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    onCategoryChange([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input */}
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Rechercher un point d'intérêt..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        {/* Filter button */}
        <div className="relative">
          <button
            className={`px-4 py-2 border ${selectedCategories.length > 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filtrer
            {selectedCategories.length > 0 && (
              <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {selectedCategories.length}
              </span>
            )}
          </button>
          
          {/* Filter dropdown */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">Filtrer par catégorie</h3>
              </div>
              <div className="p-3 max-h-60 overflow-y-auto">
                {Object.values(PoiCategory).map((category) => (
                  <div key={category} className="flex items-center mb-2 last:mb-0">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      <span className="mr-2">{getCategoryIcon(category)}</span>
                      {getCategoryName(category)}
                    </label>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Effacer les filtres
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Selected filters display */}
      {selectedCategories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {getCategoryIcon(category)} {getCategoryName(category)}
              <button
                type="button"
                className="ml-1 flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                onClick={() => handleCategoryToggle(category)}
              >
                <span className="sr-only">Retirer le filtre {getCategoryName(category)}</span>
                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </button>
            </span>
          ))}
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Effacer tout
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
