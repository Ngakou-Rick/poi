"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PointOfInterest } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

interface MapSelectorProps {
  initialCoordinates: [number, number];
  onCoordinatesChange: (coordinates: [number, number]) => void;
  existingPois?: PointOfInterest[];
}

// Composant pour gérer les événements de la carte
function MapEvents({ onCoordinatesChange }: { onCoordinatesChange: (coordinates: [number, number]) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onCoordinatesChange([lat, lng]);
    },
  });
  return null;
}

export default function MapSelector({ 
  initialCoordinates, 
  onCoordinatesChange,
  existingPois = []
}: MapSelectorProps) {
  const { t } = useTranslation();
  const [position, setPosition] = useState<[number, number]>(initialCoordinates);
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    setPosition(initialCoordinates);
  }, [initialCoordinates]);

  const handlePositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
    onCoordinatesChange(newPosition);
  };

  // Icône personnalisée pour le marqueur principal
  const mainIcon = new L.Icon({
    iconUrl: "/images/marker-icon-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  // Icône personnalisée pour les marqueurs existants
  const existingIcon = new L.Icon({
    iconUrl: "/images/marker-icon-gray.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Marqueur principal déplaçable */}
      <Marker
        position={position}
        icon={mainIcon}
        draggable={true}
        ref={markerRef}
        eventHandlers={{
          dragend: () => {
            const marker = markerRef.current;
            if (marker) {
              const newPosition = marker.getLatLng();
              handlePositionChange([newPosition.lat, newPosition.lng]);
            }
          },
        }}
      />
      
      {/* Marqueurs des POIs existants */}
      {existingPois.map((poi) => (
        <Marker
          key={poi.id}
          position={[poi.coordinates[0], poi.coordinates[1]]}
          icon={existingIcon}
        >
        </Marker>
      ))}
      
      {/* Composant pour gérer les clics sur la carte */}
      <MapEvents onCoordinatesChange={handlePositionChange} />
    </MapContainer>
  );
}
