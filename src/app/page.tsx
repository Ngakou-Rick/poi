"use client";

import Image from "next/image";
import Link from "next/link";
import { mockPois } from "@/lib/data/mockData";
import { getCategoryIcon } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function Home() {
  // Sélectionnez quelques POIs pour l'affichage sur la page d'accueil
  const featuredPois = mockPois.slice(0, 3);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full bg-blue-800"></div>
          {/* Remplacer par une vraie image quand disponible */}
          {/* <Image
            src="/images/cameroon-hero.jpg"
            alt="Cameroun paysage"
            fill
            className="object-cover opacity-30"
            priority
          /> */}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/map"
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full font-semibold text-lg transition-colors duration-300"
            >
              {t("home.hero.exploreMap")}
            </Link>
            <Link
              href="/pois"
              className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-full font-semibold text-lg transition-colors duration-300"
            >
              {t("home.hero.viewAllPois")}
            </Link>
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.about.title")}
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3">{t("home.about.problem.title")}</h3>
              <p className="text-gray-600">
                {t("home.about.problem.content")}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-600 text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">{t("home.about.vision.title")}</h3>
              <p className="text-gray-600">
                {t("home.about.vision.content")}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-blue-600 text-4xl mb-4">🚩</div>
              <h3 className="text-xl font-bold mb-3">{t("home.about.mission.title")}</h3>
              <p className="text-gray-600">
                {t("home.about.mission.content")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.features.title")}
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-300">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-3xl mb-4">
                🗺️
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.features.interactiveMap.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.interactiveMap.content")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-300">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-3xl mb-4">
                🔍
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.features.advancedSearch.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.advancedSearch.content")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-300">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-3xl mb-4">
                📸
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.features.imageGalleries.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.imageGalleries.content")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-300">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-3xl mb-4">
                📝
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.features.poiCreation.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.poiCreation.content")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-300">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-3xl mb-4">
                📖
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.features.culturalStories.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.culturalStories.content")}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-300">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600 text-3xl mb-4">
                🚗
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("home.features.routes.title")}</h3>
              <p className="text-gray-600">
                {t("home.features.routes.content")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured POIs Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.popularPois.title")}
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("home.popularPois.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPois.map((poi) => (
              <div key={poi.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  {poi.images && poi.images.length > 0 ? (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-4xl">{getCategoryIcon(poi.category)}</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-4xl">{getCategoryIcon(poi.category)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{poi.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{poi.description}</p>
                  <Link
                    href={`/pois/${poi.id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
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
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("home.cta.title")}
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            {t("home.cta.subtitle")}
          </p>
          <Link
            href="/map"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors duration-300"
          >
            {t("home.cta.exploreMap")}
          </Link>
        </div>
      </section>
    </div>
  );
}
