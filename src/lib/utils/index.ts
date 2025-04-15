import { PointOfInterest, PoiCategory } from "../types";

// Filter POIs by search term
export const filterPoisBySearchTerm = (pois: PointOfInterest[], searchTerm: string): PointOfInterest[] => {
  if (!searchTerm.trim()) return pois;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
  return pois.filter(poi => 
    poi.name.toLowerCase().includes(lowerCaseSearchTerm) || 
    poi.description.toLowerCase().includes(lowerCaseSearchTerm) ||
    (poi.details && poi.details.toLowerCase().includes(lowerCaseSearchTerm))
  );
};

// Filter POIs by category
export const filterPoisByCategory = (pois: PointOfInterest[], categories: PoiCategory[]): PointOfInterest[] => {
  if (!categories.length) return pois;
  
  return pois.filter(poi => categories.includes(poi.category));
};

// Generate a unique ID for new POIs
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Format date to a readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Get icon for POI category
export const getCategoryIcon = (category: PoiCategory): string => {
  switch (category) {
    case PoiCategory.HISTORICAL:
      return "🏛️";
    case PoiCategory.NATURAL:
      return "🌳";
    case PoiCategory.CULTURAL:
      return "🎭";
    case PoiCategory.RELIGIOUS:
      return "⛪";
    case PoiCategory.ENTERTAINMENT:
      return "🎉";
    case PoiCategory.RESTAURANT:
      return "🍽️";
    case PoiCategory.HOTEL:
      return "🏨";
    case PoiCategory.OTHER:
      return "📍";
    default:
      return "📍";
  }
};

// Format coordinates to a readable string
export const formatCoordinates = (coordinates: [number, number]): string => {
  const [lat, lng] = coordinates;
  const latDirection = lat >= 0 ? "N" : "S";
  const lngDirection = lng >= 0 ? "E" : "W";
  
  return `${Math.abs(lat).toFixed(4)}° ${latDirection}, ${Math.abs(lng).toFixed(4)}° ${lngDirection}`;
};

// Get category name in French
export const getCategoryName = (category: PoiCategory): string => {
  switch (category) {
    case PoiCategory.HISTORICAL:
      return "Historique";
    case PoiCategory.NATURAL:
      return "Naturel";
    case PoiCategory.CULTURAL:
      return "Culturel";
    case PoiCategory.RELIGIOUS:
      return "Religieux";
    case PoiCategory.ENTERTAINMENT:
      return "Divertissement";
    case PoiCategory.RESTAURANT:
      return "Restaurant";
    case PoiCategory.HOTEL:
      return "Hôtel";
    case PoiCategory.OTHER:
      return "Autre";
    default:
      return "Autre";
  }
};
