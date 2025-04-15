"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mockPois } from "@/lib/data/mockData";
import { getCategoryIcon } from "@/lib/utils";
import { toast } from "react-toastify";

export default function GeoStoryPage() {
  const params = useParams();
  const router = useRouter();
  const [poi, setPoi] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    
    // Simuler un chargement depuis une API
    const timer = setTimeout(() => {
      const foundPoi = mockPois.find(p => p.id === params.id);
      
      if (foundPoi) {
        setPoi(foundPoi);
      } else {
        toast.error("Point d'intérêt non trouvé");
        router.push("/pois");
      }
      
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [params.id, router]);

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
        <h1 className="text-2xl font-bold mb-4">GeoStory non trouvée</h1>
        <p className="mb-6">La GeoStory que vous recherchez n'existe pas ou a été supprimée.</p>
        <Link
          href="/pois"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Retour à la liste des POIs
        </Link>
      </div>
    );
  }

  // Générer un contenu fictif pour la GeoStory basé sur les informations du POI
  const geoStoryContent = {
    title: `L'histoire de ${poi.name}`,
    introduction: `Découvrez l'histoire fascinante et la signification culturelle de ${poi.name}, l'un des trésors du patrimoine camerounais.`,
    sections: [
      {
        title: "Origines et histoire",
        content: `${poi.name} est un lieu emblématique dont l'histoire remonte à plusieurs décennies, voire siècles. Ce site exceptionnel a été témoin de nombreux événements qui ont façonné l'histoire locale et nationale du Cameroun. Les premières mentions documentées de ce lieu datent du début du 20ème siècle, bien que les traditions orales suggèrent une présence et une importance bien plus anciennes.

Au fil des années, ${poi.name} a connu différentes phases de développement et de transformation, reflétant les changements sociaux, politiques et culturels du pays. Chaque pierre, chaque arbre de ce lieu raconte une histoire unique qui s'inscrit dans la grande histoire du Cameroun.`
      },
      {
        title: "Importance culturelle",
        content: `${poi.name} occupe une place particulière dans le cœur des Camerounais, notamment pour les communautés locales qui entretiennent un lien spirituel et culturel profond avec ce lieu. De nombreuses traditions, cérémonies et rituels sont associés à cet endroit, témoignant de son importance dans le patrimoine immatériel du pays.

Les contes et légendes transmis de génération en génération évoquent souvent ${poi.name} comme un lieu de sagesse, de rencontre ou de transformation. Ces récits contribuent à enrichir l'imaginaire collectif et à renforcer l'attachement des populations à ce site remarquable.`
      },
      {
        title: "Biodiversité et environnement",
        content: `La région entourant ${poi.name} abrite une biodiversité exceptionnelle, caractéristique de la richesse naturelle du Cameroun. On y trouve une variété d'espèces végétales et animales, dont certaines sont endémiques à cette zone.

L'écosystème local joue un rôle crucial dans l'équilibre environnemental de la région, contribuant à la régulation du climat, à la préservation des ressources en eau et à la protection contre l'érosion. Les communautés locales ont développé au fil du temps des pratiques de gestion durable qui permettent de préserver cette richesse naturelle tout en bénéficiant de ses ressources.`
      },
      {
        title: "Préservation et défis actuels",
        content: `Aujourd'hui, ${poi.name} fait face à divers défis liés au développement urbain, au changement climatique et à l'évolution des modes de vie. Des initiatives de conservation et de valorisation ont été mises en place pour préserver ce patrimoine unique pour les générations futures.

Ces efforts impliquent une collaboration entre les autorités locales, les organisations de la société civile, les experts en patrimoine et les communautés. L'objectif est de trouver un équilibre entre la préservation de l'authenticité du lieu et son adaptation aux réalités contemporaines.`
      },
      {
        title: "Visiter et découvrir",
        content: `Visiter ${poi.name} est une expérience inoubliable qui permet de s'immerger dans la richesse culturelle et naturelle du Cameroun. Les visiteurs peuvent y découvrir des paysages à couper le souffle, des témoignages historiques émouvants et des traditions vivantes fascinantes.

Pour une expérience optimale, il est recommandé de prévoir suffisamment de temps pour explorer les différentes facettes du lieu, d'être accompagné par un guide local qui pourra partager ses connaissances et ses anecdotes, et de respecter les coutumes et règles en vigueur.`
      }
    ],
    conclusion: `${poi.name} est bien plus qu'un simple lieu touristique – c'est un témoignage vivant de l'histoire, de la culture et de la biodiversité du Cameroun. En découvrant ce site exceptionnel, on comprend mieux la richesse et la complexité de ce pays souvent décrit comme "l'Afrique en miniature". Préserver et valoriser ce patrimoine est une responsabilité collective qui contribue à renforcer l'identité nationale et à promouvoir le développement durable.`
  };

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
          <li>
            <Link href={`/pois/${poi.id}`} className="hover:text-blue-600">{poi.name}</Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="font-medium text-gray-900">GeoStory</li>
        </ol>
      </nav>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 text-white p-8 md:p-12">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">{getCategoryIcon(poi.category)}</span>
            <h1 className="text-3xl md:text-4xl font-bold">{geoStoryContent.title}</h1>
          </div>
          <p className="text-xl text-blue-100">{geoStoryContent.introduction}</p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {geoStoryContent.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-600">{geoStoryContent.conclusion}</p>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* POI Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{getCategoryIcon(poi.category)}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{poi.name}</h3>
                  <p className="text-gray-600 text-sm">{poi.description}</p>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Faits rapides</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📍</span>
                    <div>
                      <span className="font-medium">Localisation:</span>
                      <span className="text-gray-600 ml-1">Région {poi.coordinates[0] > 5 ? "Nord" : "Sud"} du Cameroun</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">🏷️</span>
                    <div>
                      <span className="font-medium">Type:</span>
                      <span className="text-gray-600 ml-1">{getCategoryIcon(poi.category)} {poi.category}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">🗓️</span>
                    <div>
                      <span className="font-medium">Meilleure période:</span>
                      <span className="text-gray-600 ml-1">Novembre à Mars</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">⏱️</span>
                    <div>
                      <span className="font-medium">Temps de visite:</span>
                      <span className="text-gray-600 ml-1">2-3 heures</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  href={`/pois/${poi.id}`}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="mr-2">🔍</span>
                  Voir les détails du POI
                </Link>
                <Link
                  href="/map"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="mr-2">🗺️</span>
                  Voir sur la carte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related POIs */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Autres points d'intérêt qui pourraient vous intéresser</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPois
            .filter(p => p.id !== poi.id && p.category === poi.category)
            .slice(0, 3)
            .map(relatedPoi => (
              <Link
                key={relatedPoi.id}
                href={`/pois/${relatedPoi.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl">{getCategoryIcon(relatedPoi.category)}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{relatedPoi.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{relatedPoi.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
