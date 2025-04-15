"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import { PointOfInterest, PoiCategory } from "@/lib/types";
import { 
  ExclamationTriangleIcon,
  MapPinIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

// Import dynamique de la carte pour éviter les erreurs côté serveur
const MapSelector = dynamic(
  () => import("./MapSelector"),
  { ssr: false }
);

interface AddPoiFormProps {
  initialData?: PointOfInterest | null;
  onSubmit: (poi: PointOfInterest) => void;
  onCancel: () => void;
  existingPois: PointOfInterest[];
}

export default function AddPoiForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  existingPois 
}: AddPoiFormProps) {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<Partial<PointOfInterest>>({
    name: "",
    description: "",
    category: "natural",
    coordinates: [7.3697, 12.3547], // Centre du Cameroun par défaut
    address: "",
    images: [],
    rating: 0,
    openingHours: "",
    contactInfo: "",
    website: "",
    accessibility: [],
    tags: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [nearbyPois, setNearbyPois] = useState<PointOfInterest[]>([]);
  const [showMap, setShowMap] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setTags(initialData.tags || []);
    }
  }, [initialData]);

  useEffect(() => {
    // Vérifier les POIs à proximité lorsque les coordonnées changent
    if (formData.coordinates) {
      const nearby = existingPois.filter(poi => 
        poi.id !== (initialData?.id || -1) && // Exclure le POI en cours d'édition
        calculateDistance(formData.coordinates, poi.coordinates) < 0.5 // 500m
      );
      setNearbyPois(nearby);
    }
  }, [formData.coordinates, existingPois, initialData?.id]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleCoordinatesChange = (coordinates: [number, number]) => {
    setFormData({
      ...formData,
      coordinates
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setFormData({
        ...formData,
        tags: updatedTags
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    setFormData({
      ...formData,
      tags: updatedTags
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = t("dashboard.pois.form.errors.nameRequired");
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = t("dashboard.pois.form.errors.descriptionRequired");
    }
    
    if (!formData.category) {
      newErrors.category = t("dashboard.pois.form.errors.categoryRequired");
    }
    
    if (!formData.coordinates || formData.coordinates.length !== 2) {
      newErrors.coordinates = t("dashboard.pois.form.errors.coordinatesRequired");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData as PointOfInterest);
    }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations de base */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t("dashboard.pois.form.name")} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            {t("dashboard.pois.form.category")} *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {t(`common.categories.${category}`)}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          {t("dashboard.pois.form.description")} *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      
      {/* Coordonnées et carte */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            {t("dashboard.pois.form.coordinates")} *
          </label>
          <button
            type="button"
            onClick={() => setShowMap(!showMap)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showMap ? t("dashboard.pois.form.hideMap") : t("dashboard.pois.form.showMap")}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label htmlFor="latitude" className="block text-xs text-gray-500 mb-1">
              {t("dashboard.pois.form.latitude")}
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              step="0.0001"
              value={formData.coordinates?.[0] || ""}
              onChange={(e) => handleCoordinatesChange([parseFloat(e.target.value), formData.coordinates?.[1] || 0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-xs text-gray-500 mb-1">
              {t("dashboard.pois.form.longitude")}
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              step="0.0001"
              value={formData.coordinates?.[1] || ""}
              onChange={(e) => handleCoordinatesChange([formData.coordinates?.[0] || 0, parseFloat(e.target.value)])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {errors.coordinates && (
          <p className="mt-1 text-sm text-red-600">{errors.coordinates}</p>
        )}
        
        {showMap && (
          <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden h-64">
            <MapSelector 
              initialCoordinates={formData.coordinates || [7.3697, 12.3547]}
              onCoordinatesChange={handleCoordinatesChange}
              existingPois={existingPois.filter(poi => poi.id !== (initialData?.id || -1))}
            />
          </div>
        )}
        
        {/* Alerte de POIs à proximité */}
        {nearbyPois.length > 0 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  {t("dashboard.pois.form.nearbyPoisWarning", { count: nearbyPois.length })}
                </h4>
                <ul className="mt-1 text-sm text-yellow-700 list-disc list-inside">
                  {nearbyPois.slice(0, 3).map(poi => (
                    <li key={poi.id}>
                      {poi.name} ({calculateDistance(formData.coordinates || [0, 0], poi.coordinates).toFixed(2)} km)
                    </li>
                  ))}
                  {nearbyPois.length > 3 && (
                    <li>{t("dashboard.pois.form.andMore", { count: nearbyPois.length - 3 })}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Informations complémentaires */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          {t("dashboard.pois.form.address")}
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700 mb-1">
            {t("dashboard.pois.form.openingHours")}
          </label>
          <input
            type="text"
            id="openingHours"
            name="openingHours"
            value={formData.openingHours || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={t("dashboard.pois.form.openingHoursPlaceholder")}
          />
        </div>
        
        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
            {t("dashboard.pois.form.contactInfo")}
          </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={t("dashboard.pois.form.contactInfoPlaceholder")}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
          {t("dashboard.pois.form.website")}
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com"
        />
      </div>
      
      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("dashboard.pois.form.tags")}
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
              <button 
                type="button" 
                onClick={() => handleRemoveTag(tag)}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder={t("dashboard.pois.form.addTagPlaceholder")}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t("dashboard.pois.form.addTag")}
          </button>
        </div>
      </div>
      
      {/* Boutons d'action */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t("common.cancel")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {initialData ? t("common.update") : t("common.create")}
        </button>
      </div>
    </form>
  );
}
