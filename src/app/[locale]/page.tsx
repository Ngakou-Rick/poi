"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

// Sample data for popular POIs
const popularPois = [
  {
    id: 1,
    name: "Mount Cameroon",
    description: "The highest mountain in West Africa, located in the Southwest Region.",
    images: ["/images/mount-cameroon.jpg"],
    category: "natural",
  },
  {
    id: 2,
    name: "Limbe Wildlife Centre",
    description: "A wildlife rescue and rehabilitation center in the coastal city of Limbe.",
    images: ["/images/limbe-wildlife.jpg"],
    category: "entertainment",
  },
  {
    id: 3,
    name: "Kribi Beach",
    description: "Beautiful sandy beaches along the Atlantic Ocean in the coastal town of Kribi.",
    images: ["/images/kribi-beach.jpg"],
    category: "natural",
  },
];

export default function Home() {
  const t = useTranslations();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent hydration errors
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-blue-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cameroon-hero.jpg"
            alt="Cameroon landscape"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/map"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
            >
              {t("home.hero.exploreMap")}
            </Link>
            <Link
              href="/pois"
              className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
            >
              {t("home.hero.viewAllPois")}
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("home.about.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              {t("home.about.problem.title")}
            </h3>
            <p className="text-gray-700">
              {t("home.about.problem.content")}
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              {t("home.about.vision.title")}
            </h3>
            <p className="text-gray-700">
              {t("home.about.vision.content")}
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              {t("home.about.mission.title")}
            </h3>
            <p className="text-gray-700">
              {t("home.about.mission.content")}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.features.interactiveMap.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.interactiveMap.content")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.features.advancedSearch.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.advancedSearch.content")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.features.imageGalleries.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.imageGalleries.content")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.features.poiCreation.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.poiCreation.content")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.features.culturalStories.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.culturalStories.content")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.features.routes.title")}
              </h3>
              <p className="text-gray-600">
                {t("home.features.routes.content")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular POIs Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t("home.popularPois.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("home.popularPois.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPois.map((poi) => (
            <div
              key={poi.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={poi.images[0]}
                  alt={poi.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      poi.category === "natural"
                        ? "bg-green-100 text-green-800"
                        : poi.category === "historical"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {t(`categories.${poi.category}`)}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{poi.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{poi.description}</p>
                <Link
                  href={`/pois/${poi.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  {t("home.popularPois.learnMore")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/pois"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            {t("home.popularPois.viewAll")}
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-900 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t("home.cta.title")}
          </h2>
          <p className="text-xl mb-8">
            {t("home.cta.subtitle")}
          </p>
          <Link
            href="/map"
            className="inline-block bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            {t("home.cta.exploreMap")}
          </Link>
        </div>
      </div>
    </div>
  );
}
