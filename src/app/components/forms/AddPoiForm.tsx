"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PointOfInterest, PoiCategory } from "@/lib/types";
import { generateUniqueId } from "@/lib/utils";
import { toast } from "react-toastify";

interface AddPoiFormProps {
  onAddPoi: (poi: PointOfInterest) => void;
  onCancel: () => void;
  selectedLocation: [number, number] | null;
  selectingLocation: boolean;
  onRequestSelectLocation: () => void;
}

const AddPoiForm = ({
  onAddPoi,
  onCancel,
  selectedLocation,
  selectingLocation,
  onRequestSelectLocation,
}: AddPoiFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: PoiCategory.OTHER,
      details: "",
      image: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est requis"),
      description: Yup.string().required("La description est requise"),
      category: Yup.string().required("La catégorie est requise"),
      details: Yup.string(),
    }),
    onSubmit: (values) => {
      if (!selectedLocation) {
        toast.error("Veuillez sélectionner un emplacement sur la carte");
        return;
      }

      const now = new Date().toISOString();
      
      // Create a new POI
      const newPoi: PointOfInterest = {
        id: generateUniqueId(),
        name: values.name,
        description: values.description,
        category: values.category as PoiCategory,
        coordinates: selectedLocation,
        images: previewImage ? [previewImage] : [],
        details: values.details,
        createdAt: now,
        updatedAt: now,
      };

      onAddPoi(newPoi);
      toast.success("Point d'intérêt ajouté avec succès!");
      formik.resetForm();
      setPreviewImage(null);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un nouveau point d'intérêt</h2>
      
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            ) : null}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              {Object.values(PoiCategory).map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Détails supplémentaires
            </label>
            <textarea
              id="details"
              name="details"
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            />
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleImageChange}
            />
            {previewImage && (
              <div className="mt-2">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="h-32 w-auto object-cover rounded-md" 
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emplacement (cliquez sur la carte pour sélectionner)
            </label>

            <div className="flex items-center justify-end mb-3">
              <button
                type="button"
                className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectingLocation
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={onRequestSelectLocation}
              >
                {selectingLocation ? "Cliquez sur la grande carte" : "Définir sur la carte"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <div>
                <label htmlFor="latitude" className="block text-xs text-gray-500 mb-1">
                  Latitude
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  type="text"
                  readOnly
                  value={selectedLocation ? selectedLocation[0].toFixed(6) : ""}
                  placeholder="Sélectionnez un point sur la carte"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-xs text-gray-500 mb-1">
                  Longitude
                </label>
                <input
                  id="longitude"
                  name="longitude"
                  type="text"
                  readOnly
                  value={selectedLocation ? selectedLocation[1].toFixed(6) : ""}
                  placeholder="Sélectionnez un point sur la carte"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {selectedLocation && (
              <div className="mt-2 text-sm text-gray-600">
                Coordonnées sélectionnées: {selectedLocation[0].toFixed(6)}, {selectedLocation[1].toFixed(6)}
              </div>
            )}
            {!selectedLocation && formik.submitCount > 0 && (
              <div className="text-red-500 text-sm mt-1">Veuillez sélectionner un emplacement sur la carte</div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onCancel}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ajouter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPoiForm;
