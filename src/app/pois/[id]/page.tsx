"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockPois, getNearbyPois } from "@/lib/data/mockData";
import { PointOfInterest } from "@/lib/types";
import { formatCoordinates, formatDate, getCategoryName, getCategoryIcon } from "@/lib/utils";
import MapComponent from "@/app/components/map/MapComponent";
import RouteForm from "@/app/components/forms/RouteForm";
import { toast } from "react-toastify";

export default function PoiDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [poi, setPoi] = useState<PointOfInterest | null>(null);
  const [nearbyPois, setNearbyPois] = useState<PointOfInterest[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [route, setRoute] = useState<any>(null);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [mapZoom, setMapZoom] = useState(12);

  useEffect(() => {
    if (!params.id) return;
    
    // Simuler un chargement depuis une API
    const timer = setTimeout(() => {
      const foundPoi = mockPois.find(p => p.id === params.id);
      
      if (foundPoi) {
        setPoi(foundPoi);
        setMapCenter(foundPoi.coordinates);
        
        // Récupérer les POIs à proximité
        const nearby = getNearbyPois(foundPoi, 50);
        setNearbyPois(nearby);
      } else {
        toast.error("Point d'intérêt non trouvé");
        router.push("/pois");
      }
      
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [params.id, router]);

  const handleImageChange = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleTakeMeToClick = () => {
    setShowRouteForm(true);
  };

  const handleRouteCalculated = (calculatedRoute: any, points: [number, number][]) => {
    setRoute(calculatedRoute);
    setRoutePoints(points);
    setShowRouteForm(false);
    setMapZoom(10); // Zoom out to see the route
  };

  const handleCancelRoute = () => {
    setShowRouteForm(false);
  };

  const handleGeostoryClick = () => {
    if (poi) {
      router.push(`/geostory/${poi.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!poi) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-4">Point d'intérêt non trouvé</h1>
        <p className="mb-6">Le point d'intérêt que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link
          href="/pois"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600">Accueil</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link href="/pois" className="hover:text-blue-600">Points d'intérêt</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="font-medium text-gray-900 truncate max-w-xs">{poi.name}</li>
        </ol>
      </nav>

      {/* POI Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-0">{poi.name}</h1>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <span className="mr-1">{getCategoryIcon(poi.category)}</span>
              {getCategoryName(poi.category)}
            </span>
            <span className="text-sm text-gray-500">
              Ajouté le {formatDate(poi.createdAt)}
            </span>
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-2">{poi.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <div className="relative h-80 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
            {poi.images && poi.images.length > 0 ? (
              <Image
                src={poi.images[Math.min(activeImageIndex, poi.images.length - 1)]}
                alt={poi.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl">{getCategoryIcon(poi.category)}</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {poi.images && poi.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {poi.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden ${
                    index === activeImageIndex ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handleImageChange(index)}
                >
                  <Image
                    src={image}
                    alt={`${poi.name} - photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Map */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Emplacement</h2>
            <div className="h-80 rounded-lg overflow-hidden border border-gray-200">
              {mapCenter && (
                <MapComponent
                  pois={[poi, ...nearbyPois]}
                  highlightedPoi={poi}
                  center={mapCenter}
                  zoom={mapZoom}
                  route={routePoints}
                />
              )}
            </div>
          </div>

          {/* Nearby POIs */}
          {nearbyPois.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Points d'intérêt à proximité</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nearbyPois.slice(0, 4).map((nearbyPoi) => (
                  <Link
                    key={nearbyPoi.id}
                    href={`/pois/${nearbyPoi.id}`}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                      {nearbyPoi.images && nearbyPoi.images.length > 0 ? (
                        <div className="relative h-12 w-12">
                          <Image
                            src={nearbyPoi.images[0]}
                            alt={nearbyPoi.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <span className="text-xl">{getCategoryIcon(nearbyPoi.category)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{nearbyPoi.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{nearbyPoi.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Details and Actions */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Détails</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Catégorie</h3>
                <p className="mt-1 flex items-center">
                  <span className="mr-2">{getCategoryIcon(poi.category)}</span>
                  {getCategoryName(poi.category)}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Coordonnées</h3>
                <p className="mt-1">{formatCoordinates(poi.coordinates)}</p>
              </div>
              
              {poi.details && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description détaillée</h3>
                  <p className="mt-1 text-gray-700">{poi.details}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Actions</h2>
            
            <div className="space-y-3">
              <button
                onClick={handleGeostoryClick}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">📖</span>
                Voir la GeoStory
              </button>
              
              <button
                onClick={handleTakeMeToClick}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="mr-2">🚗</span>
                M'y emmener
              </button>
              
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${poi.coordinates[0]},${poi.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="mr-2">🗺️</span>
                Voir sur Google Maps
              </Link>
            </div>
          </div>

          {/* Route Form */}
          {showRouteForm && (
            <RouteForm
              originPoi={poi}
              allPois={mockPois}
              onRouteCalculated={handleRouteCalculated}
              onCancel={handleCancelRoute}
            />
          )}

          {/* Route Details */}
          {route && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Détails de l'itinéraire</h2>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Destination</h3>
                  <p className="mt-1 font-medium">{route.destination.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Distance</h3>
                  <p className="mt-1">{route.distance} km</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Durée estimée</h3>
                  <p className="mt-1">{route.duration} minutes</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Prix estimé</h3>
                  <p className="mt-1">{route.price} FCFA</p>
                </div>
                
                {route.additionalInfo && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Informations supplémentaires</h3>
                    <p className="mt-1 text-gray-700">{route.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
