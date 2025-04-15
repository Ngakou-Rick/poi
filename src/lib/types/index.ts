export interface PointOfInterest {
  id: string;
  name: string;
  description: string;
  category: PoiCategory;
  coordinates: [number, number]; // [latitude, longitude]
  images: string[];
  details?: string;
  createdAt: string;
  updatedAt: string;
}

export enum PoiCategory {
  HISTORICAL = "historical",
  NATURAL = "natural",
  CULTURAL = "cultural",
  RELIGIOUS = "religious",
  ENTERTAINMENT = "entertainment",
  RESTAURANT = "restaurant",
  HOTEL = "hotel",
  OTHER = "other"
}

export const CategoryColors: Record<PoiCategory, string> = {
  [PoiCategory.HISTORICAL]: "#FFA500", // Orange
  [PoiCategory.NATURAL]: "#00A86B", // Green
  [PoiCategory.CULTURAL]: "#9370DB", // Purple
  [PoiCategory.RELIGIOUS]: "#4169E1", // Royal Blue
  [PoiCategory.ENTERTAINMENT]: "#FF1493", // Deep Pink
  [PoiCategory.RESTAURANT]: "#FF6347", // Tomato
  [PoiCategory.HOTEL]: "#1E90FF", // Dodger Blue
  [PoiCategory.OTHER]: "#808080", // Gray
};

export interface RouteInfo {
  origin: PointOfInterest;
  destination: PointOfInterest;
  distance: number; // in kilometers
  duration: number; // in minutes
  price: number; // in local currency
  additionalInfo?: string;
}
