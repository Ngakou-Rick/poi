"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PointOfInterest } from "@/lib/types";
import { calculateRoute } from "@/lib/data/mockData";
import { toast } from "react-toastify";

interface RouteFormProps {
  originPoi: PointOfInterest;
  allPois: PointOfInterest[];
  onRouteCalculated: (route: any, routePoints: [number, number][]) => void;
  onCancel: () => void;
}

const RouteForm = ({ originPoi, allPois, onRouteCalculated, onCancel }: RouteFormProps) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      destinationId: "",
      additionalInfo: "",
    },
    validationSchema: Yup.object({
      destinationId: Yup.string().required("La destination est requise"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      
      // Find the destination POI
      const destinationPoi = allPois.find(poi => poi.id === values.destinationId);
      
      if (!destinationPoi) {
        toast.error("Destination non trouvée");
        setLoading(false);
        return;
      }
      
      // Calculate route
      const route = calculateRoute(originPoi, destinationPoi);
      
      // Create route points (simplified straight line for demo)
      const routePoints: [number, number][] = [
        originPoi.coordinates,
        destinationPoi.coordinates
      ];
      
      // Add additional info if provided
      if (values.additionalInfo) {
        route.additionalInfo = values.additionalInfo;
      }
      
      // Simulate API delay
      setTimeout(() => {
        onRouteCalculated(route, routePoints);
        setLoading(false);
        toast.success("Itinéraire calculé avec succès!");
      }, 1000);
    },
  });

  // Filter out the origin POI from destination options
  const destinationOptions = allPois.filter(poi => poi.id !== originPoi.id);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Calculer un itinéraire</h2>
      <p className="mb-4 text-gray-600">
        Point de départ: <span className="font-semibold">{originPoi.name}</span>
      </p>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="destinationId" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <select
            id="destinationId"
            name="destinationId"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.destinationId}
            disabled={loading}
          >
            <option value="">Sélectionnez une destination</option>
            {destinationOptions.map((poi) => (
              <option key={poi.id} value={poi.id}>
                {poi.name}
              </option>
            ))}
          </select>
          {formik.touched.destinationId && formik.errors.destinationId ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.destinationId}</div>
          ) : null}
        </div>
        
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
            Informations supplémentaires
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            value={formik.values.additionalInfo}
            placeholder="Préférences de voyage, besoins spéciaux, etc."
            disabled={loading}
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calcul en cours...
              </>
            ) : (
              "Calculer l'itinéraire"
            )}
          </button>
        </div>
      </form>
      
      {loading && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
          Calcul de l'itinéraire en cours, veuillez patienter...
        </div>
      )}
    </div>
  );
};

export default RouteForm;
