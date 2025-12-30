import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const getBlogPost = (id: string) => {
  // Dans une vraie application, on récupérerait les données depuis une API
  // Pour l'instant, on simule une récupération des données
  const blogPosts = [
    {
      id: "1",
      title: "Découvrir Douala en 24h: idées simples",
      excerpt: "Balade, cuisine, marchés et points de vue: un itinéraire facile pour une journée réussie.",
      content: [
        "Commence par une promenade tôt le matin au bord du fleuve Wouri, où tu pourras observer les pêcheurs locaux préparer leurs filets. L'air frais du matin et l'ambiance paise sont parfaits pour bien commencer la journée.",
        "Ensuite, direction le marché des fleurs pour une explosion de couleurs et de parfums. C'est l'endroit idéal pour acheter des souvenirs authentiques et discuter avec les vendeurs locaux.",
        "Pour le déjeuner, ne manque pas de goûter au célèbre ndolè, le plat emblématique du Cameroun. Le restaurant 'La Fourchette' en propose une excellente version, avec des crevettes fraîches et de la pâte d'arachide.",
        "L'après-midi, monte au sommet du Mont Fébé pour une vue imprenable sur toute la ville. C'est le spot parfait pour des photos souvenirs inoubliables.",
        "Termine ta journée en beauté par un coucher de soleil sur la plage d'Akwa, avec un cocktail à la main et les pieds dans le sable fin."
      ],
      images: ["/gastro.jpeg", "/chemin.jpeg"],
      date: "2025-12-01",
      author: "Jean Dupont",
      readTime: "5 min"
    },
    {
      id: "2",
      title: "Conseils photo: mettre en valeur un POI",
      excerpt: "Lumière, cadrage et informations utiles: 6 astuces pour des photos qui donnent envie.",
      content: [
        "1. La lumière est primordiale : privilégie les heures dorées (tôt le matin ou en fin d'après-midi) pour des clichés aux couleurs chaudes et des ombres douces.",
        "2. Pense au cadrage : utilise la règle des tiers pour des compositions équilibrées. Place ton point d'intérêt sur les lignes de force ou aux intersections.",
        "3. Montre l'échelle : inclus des éléments de référence (personnes, objets) pour donner une idée des dimensions du lieu.",
        "4. Capture les détails : en plus des vues d'ensemble, photographie des éléments caractéristiques qui font l'identité du lieu.",
        "5. Soigne le premier plan : un premier plan intéressant donne de la profondeur à tes images.",
        "6. N'oublie pas les informations pratiques : note les horaires d'ouverture, le prix d'entrée et les conditions d'accès pour compléter tes photos."
      ],
      images: ["/chemin.jpeg", "/gastro.jpeg"],
      date: "2025-12-10",
      author: "Jean Dupont",
      readTime: "4 min"
    },
    {
      id: "3",
      title: "Itinéraire nature: chutes + plage",
      excerpt: "Un week-end entre fraîcheur des chutes et détente au bord de l'océan.",
      content: [
        "Jour 1 - Les chutes de la Lobe : Départ matinal pour les chutes de la Lobe, un site naturel exceptionnel où la rivière se jette directement dans l'océan. Prévoyez de bonnes chaussures pour la randonnée d'environ 45 minutes à travers la forêt tropicale. Le sentier est bien aménagé mais peut être glissant par endroits.",
        "Sur place, vous pourrez vous baigner dans les bassins naturels formés par les chutes. Ne manquez pas de faire un tour en pirogue pour admirer le spectacle des chutes depuis la mer.",
        "Nuit à Kribi : Installez-vous dans un des hébergements de Kribi pour la nuit. Le soir, baladez-vous sur la plage et dégustez des fruits de mer frais dans l'un des restaurants du bord de mer.",
        "Jour 2 - Plage de Grand-Batanga : Direction la plage de Grand-Batanga, à environ 1h30 de route de Kribi. Cette plage de sable fin bordée de cocotiers est encore préservée du tourisme de masse. Profitez de la journée pour vous détendre, vous baigner dans les eaux turquoises ou faire du snorkeling dans les récifs coralliens proches du rivage.",
        "Conseils pratiques : Prévoyez de la crème solaire, un chapeau et assez d'eau. La meilleure période pour ce circuit est la saison sèche, de novembre à mars."
      ],
      images: ["/gastro.jpeg", "/chemin.jpeg"],
      date: "2025-12-20",
      author: "Marie Martin",
      readTime: "7 min"
    }
  ];

  return blogPosts.find(post => post.id === id) || null;
};

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = getBlogPost(params.id);

  if (!post) {
    notFound();
  }
  
  // Récupérer les articles connexes
  const relatedPosts = [1, 2, 3]
    .filter((id) => id.toString() !== params.id)
    .map((id) => getBlogPost(id.toString()))
    .filter(Boolean);

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Retour aux articles
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="mx-2">•</span>
              <span>{post.readTime} de lecture</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, index) => (
              <div key={index} className="mb-6">
                <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                {index < post.images.length && (
                  <div className="mt-4 mb-8 rounded-lg overflow-hidden">
                    <Image
                      src={post.images[index % post.images.length]}
                      alt={`${post.title} - Image ${index + 1}`}
                      width={1200}
                      height={630}
                      className="w-full h-auto rounded-lg"
                      priority={index < 2}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vous pourriez aussi aimer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.id}`}
                  className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={relatedPost.images[0]}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {relatedPost.readTime} • {relatedPost.author}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
