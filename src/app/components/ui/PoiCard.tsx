"use client";

import { PointOfInterest } from "@/lib/types";
import { getCategoryIcon, getCategoryName, formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface PoiCardProps {
  poi: PointOfInterest;
  onHighlight?: () => void;
  onUnhighlight?: () => void;
}

const PoiCard = ({ poi, onHighlight, onUnhighlight }: PoiCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      onMouseEnter={onHighlight}
      onMouseLeave={onUnhighlight}
    >
      <div className="relative h-48">
        {poi.images && poi.images.length > 0 ? (
          <Image
            src={poi.images[0]}
            alt={poi.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-4xl">{getCategoryIcon(poi.category)}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
          {getCategoryName(poi.category)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-1">{poi.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{poi.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {formatDate(poi.createdAt)}
          </span>
          <Link 
            href={`/pois/${poi.id}`}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            Plus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PoiCard;
