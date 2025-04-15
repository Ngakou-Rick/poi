"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PointOfInterest, CategoryColors } from "@/lib/types";

interface MapComponentProps {
  pois: PointOfInterest[];
  highlightedPoi?: PointOfInterest | null;
  onPoiClick?: (poi: PointOfInterest) => void;
  onMapClick?: (e: L.LeafletMouseEvent) => void;
  center?: [number, number];
  zoom?: number;
  route?: [number, number][];
}

// Component to recenter the map when center prop changes
const ChangeMapView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Fix for Leaflet icons in Next.js
const fixLeafletIcons = () => {
  // This is needed to fix the marker icons in Leaflet with Next.js
  // @ts-ignore - _getIconUrl exists but is not in the type definitions
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/images/marker-icon-2x.png",
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
  });
};

// Component to handle map clicks
const MapClickHandler = ({ onClick }: { onClick: (e: L.LeafletMouseEvent) => void }) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};

const MapComponent = ({
  pois,
  highlightedPoi,
  onPoiClick,
  onMapClick,
  center = [7.3697, 12.3547], // Default center of Cameroon
  zoom = 6,
  route
}: MapComponentProps) => {
  // Fix Leaflet icons on component mount
  useEffect(() => {
    fixLeafletIcons();
  }, []);
  // Create custom icons for each POI category
  const createCustomIcon = (poi: PointOfInterest, isHighlighted: boolean) => {
    return L.divIcon({
      className: "custom-poi-marker",
      html: `<div style="
        background-color: ${CategoryColors[poi.category]};
        width: ${isHighlighted ? '30px' : '20px'};
        height: ${isHighlighted ? '30px' : '20px'};
        border-radius: 50%;
        border: ${isHighlighted ? '3px solid #fff' : '2px solid #fff'};
        box-shadow: 0 0 ${isHighlighted ? '10px #fff, 0 0 5px #fff' : '0px #fff'};
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: white;
        transition: all 0.3s ease;
      "></div>`,
      iconSize: isHighlighted ? [30, 30] : [20, 20],
      iconAnchor: isHighlighted ? [15, 15] : [10, 10],
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {pois.map((poi) => (
        <Marker
          key={poi.id}
          position={[poi.coordinates[0], poi.coordinates[1]]}
          icon={createCustomIcon(poi, highlightedPoi?.id === poi.id)}
          eventHandlers={{
            click: () => {
              if (onPoiClick) onPoiClick(poi);
            },
          }}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{poi.name}</h3>
              <p>{poi.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* Render route if provided */}
      {route && route.length > 1 && (
        <Polyline
          positions={route}
          color="#3388ff"
          weight={4}
          opacity={0.7}
          dashArray="10, 10"
        />
      )}
      
      {/* Update map center when center prop changes */}
      <ChangeMapView center={center} zoom={zoom} />
      
      {/* Handle map clicks if onMapClick is provided */}
      {onMapClick && <MapClickHandler onClick={onMapClick} />}
    </MapContainer>
  );
};

export default MapComponent;
