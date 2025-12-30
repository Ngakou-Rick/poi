import { PointOfInterest, PoiCategory } from "../types";

export const mockPois: PointOfInterest[] = [
  {
    id: "1",
    name: "Mont Cameroun",
    description: "Le plus haut sommet d'Afrique de l'Ouest avec une altitude de 4040 mètres.",
    category: PoiCategory.NATURAL,
    coordinates: [4.2156, 9.1712],
    images: ["/mont.jpeg", "/chemin.jpeg", "/Sans%20titre.jpeg"],
    details: "Le Mont Cameroun, également connu sous le nom de Mongo ma Ndemi (« Montagne de Grandeur »), est un volcan actif situé dans la région du Sud-Ouest. Il offre des randonnées spectaculaires à travers différents écosystèmes, de la forêt tropicale aux prairies alpines.",
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Chutes de la Lobé",
    description: "Spectaculaire chute d'eau qui se jette directement dans l'océan Atlantique.",
    category: PoiCategory.NATURAL,
    coordinates: [2.8794, 9.8880],
    images: ["/chutes.jpeg", "/plage.jpeg", "/Sans%20titre.jpeg"],
    details: "Les Chutes de la Lobé sont un phénomène naturel rare où une rivière se jette directement dans l'océan. Situées près de Kribi, elles sont entourées d'une végétation luxuriante et sont considérées comme un site sacré par les populations locales.",
    createdAt: "2023-02-10T14:45:00Z",
    updatedAt: "2023-02-10T14:45:00Z"
  },
  {
    id: "3",
    name: "Palais des Rois Bamoun",
    description: "Palais royal historique situé à Foumban, centre culturel du peuple Bamoun.",
    category: PoiCategory.HISTORICAL,
    coordinates: [5.7290, 10.9027],
    images: ["/musee.jpeg", "/marche.jpeg", "/Sans%20titre.jpeg"],
    details: "Construit en 1917, le Palais des Rois Bamoun est un témoignage de l'architecture traditionnelle et de l'histoire du royaume Bamoun. Il abrite également un musée avec des objets d'art et des artefacts historiques.",
    createdAt: "2023-03-05T09:15:00Z",
    updatedAt: "2023-03-05T09:15:00Z"
  },
  {
    id: "4",
    name: "Parc National de Waza",
    description: "L'un des parcs nationaux les plus célèbres du Cameroun, abritant une faune diverse.",
    category: PoiCategory.NATURAL,
    coordinates: [11.0000, 14.7500],
    images: ["/waza.jpeg", "/mont.jpeg", "/Sans%20titre.jpeg"],
    details: "Le Parc National de Waza, situé dans l'extrême nord du Cameroun, est une réserve de biosphère de l'UNESCO. Il abrite des lions, éléphants, girafes, antilopes et de nombreuses espèces d'oiseaux.",
    createdAt: "2023-04-20T11:30:00Z",
    updatedAt: "2023-04-20T11:30:00Z"
  },
  {
    id: "5",
    name: "Cathédrale Notre-Dame-des-Victoires",
    description: "Imposante cathédrale catholique située à Yaoundé.",
    category: PoiCategory.RELIGIOUS,
    coordinates: [3.8667, 11.5167],
    images: ["/cathedrale.jpeg", "/Sans%20titre.jpeg"],
    details: "Construite dans les années 1950, cette cathédrale est le siège de l'archidiocèse de Yaoundé. Son architecture mêle des éléments modernes et traditionnels africains.",
    createdAt: "2023-05-12T16:20:00Z",
    updatedAt: "2023-05-12T16:20:00Z"
  },
  {
    id: "6",
    name: "Musée National du Cameroun",
    description: "Principal musée du pays présentant l'histoire et la culture camerounaise.",
    category: PoiCategory.CULTURAL,
    coordinates: [3.8683, 11.5211],
    images: ["/musee.jpeg", "/Sans%20titre.jpeg"],
    details: "Le Musée National du Cameroun à Yaoundé présente des collections d'art, d'artefacts historiques et ethnographiques qui illustrent la riche diversité culturelle du pays.",
    createdAt: "2023-06-08T13:40:00Z",
    updatedAt: "2023-06-08T13:40:00Z"
  },
  {
    id: "7",
    name: "Plage de Kribi",
    description: "Magnifique plage de sable doré sur la côte atlantique.",
    category: PoiCategory.ENTERTAINMENT,
    coordinates: [2.9400, 9.9100],
    images: ["/plage.jpeg", "/chutes.jpeg", "/Sans%20titre.jpeg"],
    details: "La plage de Kribi est réputée pour son sable doré, ses eaux claires et ses restaurants de fruits de mer. C'est une destination populaire pour la baignade, les sports nautiques et la détente.",
    createdAt: "2023-07-25T10:10:00Z",
    updatedAt: "2023-07-25T10:10:00Z"
  },
  {
    id: "8",
    name: "Réserve du Dja",
    description: "Site du patrimoine mondial de l'UNESCO, abritant une forêt tropicale dense.",
    category: PoiCategory.NATURAL,
    coordinates: [3.1667, 13.0000],
    images: ["/chemin.jpeg", "/mont.jpeg", "/Sans%20titre.jpeg"],
    details: "La Réserve de faune du Dja est l'une des plus grandes et des mieux protégées forêts pluviales d'Afrique. Elle abrite une biodiversité exceptionnelle, incluant des gorilles, chimpanzés et éléphants de forêt.",
    createdAt: "2023-08-17T15:30:00Z",
    updatedAt: "2023-08-17T15:30:00Z"
  },
  {
    id: "9",
    name: "Marché de Douala",
    description: "Grand marché traditionnel offrant une variété de produits locaux.",
    category: PoiCategory.CULTURAL,
    coordinates: [4.0510, 9.7678],
    images: ["/marche.jpeg", "/gastro.jpeg", "/Sans%20titre.jpeg"],
    details: "Le marché central de Douala est un lieu animé où l'on peut découvrir l'artisanat local, les textiles, les épices et la gastronomie camerounaise. C'est un excellent endroit pour s'immerger dans la culture locale.",
    createdAt: "2023-09-05T09:45:00Z",
    updatedAt: "2023-09-05T09:45:00Z"
  },
  {
    id: "10",
    name: "Hôtel Hilton Yaoundé",
    description: "Hôtel de luxe emblématique au cœur de la capitale.",
    category: PoiCategory.HOTEL,
    coordinates: [3.8750, 11.5174],
    images: ["/hilton.jpeg", "/Sans%20titre.jpeg"],
    details: "L'Hôtel Hilton Yaoundé est un établissement 5 étoiles offrant des chambres luxueuses, plusieurs restaurants, une piscine et des installations de conférence. Il est situé près des principales attractions de la ville.",
    createdAt: "2023-10-12T12:20:00Z",
    updatedAt: "2023-10-12T12:20:00Z"
  }
];

// Function to get nearby POIs based on a reference POI and a radius in kilometers
export const getNearbyPois = (poi: PointOfInterest, radiusKm: number = 50): PointOfInterest[] => {
  // Simple distance calculation (not accounting for Earth's curvature for simplicity)
  return mockPois.filter(p => {
    if (p.id === poi.id) return false;
    
    const lat1 = poi.coordinates[0];
    const lon1 = poi.coordinates[1];
    const lat2 = p.coordinates[0];
    const lon2 = p.coordinates[1];
    
    // Approximate distance calculation (Haversine formula)
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance <= radiusKm;
  });
};

// Function to calculate route between two POIs (simplified)
export const calculateRoute = (origin: PointOfInterest, destination: PointOfInterest) => {
  // Simple direct line for demonstration
  const route = {
    origin,
    destination,
    distance: getDistanceBetweenPois(origin, destination),
    duration: getDistanceBetweenPois(origin, destination) * 2, // Simplified: 2 minutes per km
    price: getDistanceBetweenPois(origin, destination) * 100, // Simplified: 100 currency units per km
    additionalInfo: "Route calculée en ligne droite. Les conditions réelles peuvent varier."
  };
  
  return route;
};

// Helper function to calculate distance between two POIs
export const getDistanceBetweenPois = (poi1: PointOfInterest, poi2: PointOfInterest): number => {
  const lat1 = poi1.coordinates[0];
  const lon1 = poi1.coordinates[1];
  const lat2 = poi2.coordinates[0];
  const lon2 = poi2.coordinates[1];
  
  // Haversine formula
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};
